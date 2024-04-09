import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form"; // Import the useForm hook

import { MDBDataTable } from "mdbreact";
import swal from "sweetalert";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Form,
  Input,
} from "reactstrap";
import Sidebar from "components/Sidebar/Sidebar";
import MetaData from "components/layout/MetaData";
import AdminNavbar from "components/Navbars/AdminNavbar";
import Header2 from "components/Headers/Header2";
import AdminFooter from "components/Footers/AdminFooter.js";

import { useNavigate, useParams } from "react-router-dom";
import { getStoreDetails } from "actions/storebranchActions";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

import {
  CREATE_BARANGAYHEALTH_RESET,
  DELETE_BARANGAYHEALTH_RESET,
} from "constants/barangayHealthConstants";
import {
  createBarangayHealth,
  allBarangayHealth,
  deleteBarangayHealth,
  clearErrors,
} from "actions/barangayhealthActions";
const BarangayHealthList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { storeBranch } = useSelector((state) => state.storeDetails);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const { barangayhealthcreated } = useSelector(
    (state) => state.newBarangayHealth
  );
  const { barangayhealth, error } = useSelector(
    (state) => state.allBarangayHealth
  );

  const { isDeleted } = useSelector((state) => state.barangayHealthrecord);

  const [dateVisited, setdateVisited] = useState("");
  const [certPotability, setcertPotability] = useState("");
  const [certPotabilityPreview, setcertPotabilityPreview] = useState(
    "/images/default_avatar.jpg"
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    dispatch(getStoreDetails(id));
    dispatch(allBarangayHealth(id));

    if (barangayhealthcreated) {
      swal("Record Saved!", "", "success");
      setModal(false);
      navigate(`/store/barangaycleaning/${id}`, { replace: true });
      dispatch({
        type: CREATE_BARANGAYHEALTH_RESET,
      });
      reset();
      setcertPotability("");
      setcertPotabilityPreview("/images/default_avatar.jpg");
    }
    if (error) {
      console.log(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      navigate(`/store/barangaycleaning/${id}`);
      dispatch({ type: DELETE_BARANGAYHEALTH_RESET });
    }
  }, [dispatch, barangayhealthcreated, error, isDeleted]);

  const deleterecord = (id) => {
    swal({
      title: "Are you sure you want to delete this record?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Record has been deleted!", "", "success");
        dispatch(deleteBarangayHealth(id));
      } else {
        swal("Record is not deleted!", "", "info");
      }
    });
  };

  const onChange = (e) => {
    const file = e.target.files[0];
    const allowedImageTypes = ["image/png", "image/jpeg", "image/jpg"]; // Allowed image file types

    if (e.target.name === "certPotability") {
      if (file && allowedImageTypes.includes(file.type)) {
        const reader = new FileReader();

        reader.onload = () => {
          if (reader.readyState === 2) {
            setcertPotabilityPreview(reader.result);
            setcertPotability(reader.result);
          }
        };

        reader.readAsDataURL(e.target.files[0]);
      } else {
        swal("Please select a valid image file (PNG, JPEG, JPG).", "", "error");
        e.target.value = null;
      }
    }
  };

  const submitHandler = (e) => {
    const formData = new FormData();
    formData.set("dateVisited", e.dateVisited);
    formData.set("certPotability", certPotability);

    dispatch(createBarangayHealth(formData, id));
  };

  const setBHRecord = () => {
    const data = {
      columns: [
        {
          label: "Certificate",
          field: "image",
        },
        {
          label: "Date Visited",
          field: "date",
          sort: "desc",
        },

        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };
    const sortedData = [...barangayhealth].sort((a, b) => {
      return new Date(b.dateVisited) - new Date(a.dateVisited);
    });

    // barangayhealth.forEach((barangayhealths) => {
    sortedData.forEach((barangayhealths) => {
      const dateObject = new Date(barangayhealths.dateVisited);
      data.rows.push({
        date: dateObject.toLocaleDateString(),
        image: (
          <img
            style={{ width: 100, height: 100 }}
            src={barangayhealths.certPotability.url}
            alt="image"
            img
          />
        ),
        // date: machinecleanings.createdAt,
        // date: dateObject.toLocaleDateString(),
        actions: (
          <Fragment>
            <button
              className="btn btn-primary py-1 px-2 ml-2"
              onClick={() =>
                navigate(`/update/store/barangayhealth/${barangayhealths._id}`)
              }>
              <i className="fa fa-info-circle"></i>
            </button>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => deleterecord(barangayhealths._id)}>
              <i className="fa fa-trash"></i>
            </button>
          </Fragment>
        ),
      });
    });

    return data;
  };

  return (
    <>
      <MetaData title={"Barangay Health"} />
      <Sidebar
        logo={{
          innerLink: "/",
          imgSrc: require("../../assets/img/brand/logo2.1.jpg"),
          imgAlt: "...",
        }}
      />
      <div className="main-content">
        <AdminNavbar />
        <Header2 />
        <Container className="mt--7" fluid>
          <Card className="bg-secondary shadow">
            <CardHeader className="bg-white border-0">
              <Row className="align-items-center">
                <Col xs="8">
                  <h3 className="mb-0">
                    Barangay Health Sanitation Records ({storeBranch.branch})
                  </h3>
                </Col>
                <Col md="4">
                  <Button
                    block
                    className="mb-3"
                    color="primary"
                    type="button"
                    onClick={toggle}>
                    Add New Record
                  </Button>
                  <Modal
                    className="modal-dialog-centered"
                    isOpen={modal}
                    toggle={toggle}>
                    <Form role="form" onSubmit={handleSubmit(submitHandler)}>
                      <ModalHeader toggle={toggle}>
                        Barangay Health Sanitation Record
                      </ModalHeader>
                      <ModalBody>
                        <Row>
                          <Col md="12">
                            <div className="form-group">
                              <label htmlFor="avatar_upload">
                                Certification
                              </label>

                              <div className="row">
                                <div className="col-sm-3"></div>
                                <div className="col-sm-6">
                                  <div className="text-center">
                                    <img
                                      className="avatar border-gray"
                                      style={{
                                        width: "200px",
                                        height: "200px",
                                      }}
                                      src={certPotabilityPreview}
                                      alt="User"
                                    />
                                  </div>

                                  <div className="custom-file">
                                    <input
                                      type="file"
                                      name="certPotability"
                                      className="custom-file-input"
                                      id="certPotability"
                                      accept="images/*"
                                      {...register("certPotability", {
                                        required: true,
                                      })}
                                      onChange={(e) => {
                                        onChange(e);
                                        e.target.blur();
                                      }}
                                    />
                                    <label
                                      className="custom-file-label"
                                      htmlFor="customFile">
                                      Choose Image
                                    </label>
                                  </div>
                                </div>
                              </div>
                              {errors.certPotability && !certPotability && (
                                <h2
                                  className="h1-seo"
                                  style={{
                                    color: "red",
                                    fontSize: "small",
                                  }}>
                                  Please select a valid image.
                                </h2>
                              )}
                            </div>
                          </Col>
                        </Row>
                        <FormGroup>
                          <span style={{ fontWeight: "bold" }}>
                            Date Visited
                          </span>{" "}
                          <input
                            placeholder="Add Notes here ..."
                            className="form-control"
                            type="date"
                            name="dateVisited"
                            {...register("dateVisited", {
                              required: "Please enter notes.",
                            })}
                          />
                          {errors.dateVisited && (
                            <h2
                              className="h1-seo"
                              style={{
                                color: "red",
                                fontSize: "small",
                              }}>
                              {errors.dateVisited.message}
                            </h2>
                          )}
                        </FormGroup>
                      </ModalBody>
                      <ModalFooter>
                        <Button color="primary" type="submit">
                          Add
                        </Button>{" "}
                        <Button color="secondary" onClick={toggle}>
                          Cancel
                        </Button>
                      </ModalFooter>{" "}
                    </Form>
                  </Modal>
                </Col>
              </Row>
            </CardHeader>
            <CardBody style={{ overflowX: "auto" }}>
              <MDBDataTable
                data={setBHRecord()}
                className="px-3"
                bordered
                hover
                noBottomColumns
                responsive
                id="barangayHealthTable"
              />
            </CardBody>
          </Card>

          {/* <ReactHTMLTableToExcel
            className="btn btn-success"
            table="barangayHealthTable"
            filename="barangay_health_records"
            sheet="sheet 1"
            buttonText="Export to Excel"
          /> */}
        </Container>
        <Container fluid>
          <AdminFooter />
        </Container>
      </div>
    </>
  );
};

export default BarangayHealthList;
