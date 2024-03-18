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

import {
  createBusinessPermit,
  allBusinessPermit,
  deleteBusinessPermit,
  clearErrors,
} from "actions/businesspermitAction";
import {
  CREATE_BUSINESSPERMIT_RESET,
  DELETE_BUSINESSPERMIT_RESET,
} from "../../constants/businesspermitConstant";

import { getStoreDetails } from "actions/storebranchActions";

const BusinessPermitList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { storeBranch } = useSelector((state) => state.storeDetails);
  // const { businesspermitcreated } = useSelector((state) => state.newBusinessPermit) || {};
  // const { businesspermit, error } = useSelector((state) => state.allBusinessPermit) || {};
  // const { businesspermitdetails } = useSelector((state) => state.singleBusinessPermit) || {};

  const { businesspermitcreated } = useSelector(
    (state) => state.newBusinessPermit
  );
  const { businesspermit, error } = useSelector(
    (state) => state.allBusinessPermit
  );
  const { businesspermitdetails } = useSelector(
    (state) => state.singleBusinessPermit
  );

  const { isDeleted } = useSelector((state) => state.businesspermitrecord);

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [permitImage, setpermitImage] = useState("");
  const [permitImagePreview, setpermitImagePreview] = useState(
    "/images/default_avatar.jpg"
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    dispatch(allBusinessPermit(id));
    dispatch(getStoreDetails(id));

    if (businesspermitcreated) {
      console.log("success adding of record");
      swal("Record Saved!", "", "success");
      setModal(false);
      navigate(`/create/store/businesspermit/${id}`, { replace: true });
      dispatch({
        type: CREATE_BUSINESSPERMIT_RESET,
      });
      reset();
      setpermitImage("");
      setpermitImagePreview("/images/default_avatar.jpg");
    }

    if (error) {
      console.log(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      navigate(`/create/store/businesspermit/${id}`);
      dispatch({ type: DELETE_BUSINESSPERMIT_RESET });
    }
  }, [dispatch, navigate, businesspermitcreated, error, isDeleted]);

  const submitHandler = (e) => {
    const formData = new FormData();
    formData.set("permitImage", permitImage);
    formData.set("dateIssued", e.dateIssued);

    dispatch(createBusinessPermit(formData, id));
  };

  const onChange = (e) => {
    if (e.target.name === "permitImage") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setpermitImagePreview(reader.result);
          setpermitImage(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const deleterecord = (id) => {
    swal({
      title: "Are you sure you want to delete this record?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Record has been deleted!", "", "success");
        dispatch(deleteBusinessPermit(id));
      } else {
        swal("Record is not deleted!", "", "info");
      }
    });
  };

  const setMCRecord = () => {
    const data = {
      columns: [
        {
          label: "Documentation",
          field: "image",
        },
        {
          label: "Date",
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

    const sortedBusinessPermit = businesspermit.sort((a, b) => {
      return new Date(b.dateIssued) - new Date(a.dateIssued);
    });

    sortedBusinessPermit.forEach((businesspermits) => {
      const dateObject = new Date(businesspermits.dateIssued);
      data.rows.push({
        image: (
          <img
            style={{ width: 100, height: 100 }}
            src={businesspermits.permitImage.url}
            alt="image"
            img
          />
        ),

        date: dateObject.toLocaleDateString(),
        actions: (
          <Fragment>
            <button
              className="btn btn-primary py-1 px-2 ml-2"
              onClick={() =>
                navigate(`/update/store/businesspermit/${businesspermits._id}`)
              }>
              <i className="fa fa-info-circle"></i>
            </button>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => deleterecord(businesspermits._id)}>
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
      <MetaData title={"Business Permit Record"} />
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
                    Business Permit Record ( {storeBranch.branch} )
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
                        Business Permit Record
                      </ModalHeader>
                      <ModalBody>
                        <Row>
                          <Col md="12">
                            <div className="form-group">
                              <label htmlFor="avatar_upload">
                                Documentation
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
                                      src={permitImagePreview}
                                      alt="User"
                                    />
                                  </div>

                                  <div className="custom-file">
                                    <input
                                      type="file"
                                      name="storeImage"
                                      className="custom-file-input"
                                      id="permitImage"
                                      accept="images/*"
                                      {...register("permitImage", {
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
                              {errors.permitImage && !permitImage && (
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
                            Date Issued
                          </span>{" "}
                          <input
                            //placeholder="Add Notes here ..."
                            className="form-control"
                            type="date"
                            name="dateTested"
                            max={new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]}// Setting min attribute to today's date
                            {...register("dateIssued", {
                              required: "Please enter date.",
                            })}
                          />
                          {errors.dateIssued && (
                            <h2
                              className="h1-seo"
                              style={{
                                color: "red",
                                fontSize: "small",
                              }}>
                              {errors.dateIssued.message}
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
                data={setMCRecord()}
                className="px-3"
                bordered
                hover
                noBottomColumns
                responsive
              />
            </CardBody>
          </Card>
        </Container>
        <Container fluid>
          <AdminFooter />
        </Container>
      </div>
    </>
  );
};

export default BusinessPermitList;
