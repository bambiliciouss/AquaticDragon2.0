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
  createMachineCleaning,
  allMachineCleaning,
  deleteMachineCleaning,
  clearErrors,
} from "actions/machinecleaningActions";
import {
  CREATE_MACHINECLEANING_RESET,
  DELETE_MACHINECLEANING_RESET,
} from "../../constants/machinecleaningConstants";

import { getStoreDetails } from "actions/storebranchActions";

const MachineCleaningList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { storeBranch } = useSelector((state) => state.storeDetails);
  const { machinecleaningcreated } = useSelector(
    (state) => state.newMachineCleaning
  );
  const { machinecleaning, error } = useSelector(
    (state) => state.allMachineCleaning
  );
  const { machinecleaningdetails } = useSelector(
    (state) => state.singleMachineCleaning
  );

  const { isDeleted } = useSelector((state) => state.machinerecord);

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [notes, setNotes] = useState("");
  const [cleaningImage, setcleaningImage] = useState("");
  const [cleaningImagePreview, setcleaningImagePreview] = useState(
    "/images/default_avatar.jpg"
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    dispatch(allMachineCleaning(id));
    dispatch(getStoreDetails(id));

    if (machinecleaningcreated) {
      console.log("success adding of record");
      swal("Record Saved!", "", "success");
      setModal(false);
      navigate(`/create/store/machincecleaning/${id}`, { replace: true });
      dispatch({
        type: CREATE_MACHINECLEANING_RESET,
      });
      reset();
      setcleaningImage("");
      setcleaningImagePreview("/images/default_avatar.jpg");
    }

    if (error) {
      console.log(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      navigate(`/create/store/machincecleaning/${id}`);
      dispatch({ type: DELETE_MACHINECLEANING_RESET });
    }
  }, [dispatch, navigate, machinecleaningcreated, error, isDeleted]);

  const submitHandler = (e) => {
    const formData = new FormData();
    formData.set("notes", e.notes);
    formData.set("cleaningImage", cleaningImage);

    dispatch(createMachineCleaning(formData, id));
  };

  // const onChange = (e) => {
  //   if (e.target.name === "cleaningImage") {
  //     const reader = new FileReader();

  //     reader.onload = () => {
  //       if (reader.readyState === 2) {
  //         setcleaningImagePreview(reader.result);
  //         setcleaningImage(reader.result);
  //       }
  //     };

  //     reader.readAsDataURL(e.target.files[0]);
  //   }
  // };

  const onChange = (e) => {
    const file = e.target.files[0];
    const allowedImageTypes = ["image/png", "image/jpeg", "image/jpg"]; // Allowed image file types

    if (e.target.name === "cleaningImage") {
      if (file && allowedImageTypes.includes(file.type)) {
        const reader = new FileReader();

        reader.onload = () => {
          if (reader.readyState === 2) {
            setcleaningImagePreview(reader.result);
            setcleaningImage(reader.result);
          }
        };

        reader.readAsDataURL(e.target.files[0]);
      } else {
        swal("Please select a valid image file (PNG, JPEG, JPG).", "", "error");
        e.target.value = null;
      }
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
        dispatch(deleteMachineCleaning(id));
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
          label: "Notes",
          field: "notes",
          sort: "desc",
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

    // const sortedMachineCleaning = [...machinecleaning].sort((a, b) => {
    //   const dateA = new Date(a.createdAt);
    //   const dateB = new Date(b.createdAt);
    //   return dateB - dateA;
    // });

    const sortedMachineCleaning = machinecleaning.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    sortedMachineCleaning.forEach((machinecleanings) => {
      // machinecleaning.forEach((machinecleanings) => {
      const dateObject = new Date(machinecleanings.createdAt);
      data.rows.push({
        notes: machinecleanings.notes,
        image: (
          <img
            style={{ width: 100, height: 100 }}
            src={machinecleanings.cleaningImage.url}
            alt="image"
            img
          />
        ),
        // date: machinecleanings.createdAt,
        date: dateObject.toLocaleDateString(),
        actions: (
          <Fragment>
            <button
              className="btn btn-primary py-1 px-2 ml-2"
              onClick={() =>
                navigate(
                  `/update/store/machincecleaning/${machinecleanings._id}`
                )
              }>
              <i className="fa fa-info-circle"></i>
            </button>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => deleterecord(machinecleanings._id)}>
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
      <MetaData title={"Machine Cleaning"} />
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
                    Machine Cleaning Records ( {storeBranch.branch} )
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
                        Machine Cleaning Record
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
                                      src={cleaningImagePreview}
                                      alt="User"
                                    />
                                  </div>

                                  <div className="custom-file">
                                    <input
                                      type="file"
                                      name="storeImage"
                                      className="custom-file-input"
                                      id="cleaningImage"
                                      accept="images/*"
                                      {...register("cleaningImage", {
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
                              {errors.cleaningImage && !cleaningImage && (
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
                          <span style={{ fontWeight: "bold" }}>Notes:</span>{" "}
                          <textarea
                            placeholder="Add Notes here ..."
                            className="form-control"
                            type="text"
                            name="notes"
                            {...register("notes", {
                              required: "Please enter notes.",
                            })}
                          />
                          {errors.notes && (
                            <h2
                              className="h1-seo"
                              style={{
                                color: "red",
                                fontSize: "small",
                              }}>
                              {errors.notes.message}
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

export default MachineCleaningList;
