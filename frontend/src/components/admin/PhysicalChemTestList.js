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
  createPhysicalChemTest,
  allPhysicalChemTest,
  deletePhysicalChemTest,
  clearErrors,
} from "actions/physicalchemtestActions";
import {
  CREATE_PHYSICALCHEMTEST_RESET,
  DELETE_PHYSICALCHEMTEST_RESET,
} from "../../constants/physicalchemtestConstants";

import { getStoreDetails } from "actions/storebranchActions";

const PhysicalChemTestList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { storeBranch } = useSelector((state) => state.storeDetails);
  const { physicalchemtestcreated } = useSelector(
    (state) => state.newPhysicalChemTest
  );
  const { physicalchemtest, error } = useSelector(
    (state) => state.allPhysicalChemTest
  );
  const { physicalchemtestdetails } = useSelector(
    (state) => state.singlePhysicalChemTest
  );

  const { isDeleted } = useSelector((state) => state.physicalchemtestrecord);

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [testingImage, settestingImage] = useState("");
  const [testingImagePreview, settestingImagePreview] = useState(
    "/images/default_avatar.jpg"
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    dispatch(allPhysicalChemTest(id));
    dispatch(getStoreDetails(id));

    if (physicalchemtestcreated) {
      console.log("success adding of record");
      swal("Record Saved!", "", "success");
      setModal(false);
      navigate(`/create/store/physicalchemtest/${id}`, { replace: true });
      dispatch({
        type: CREATE_PHYSICALCHEMTEST_RESET,
      });
      reset();
      settestingImage("");
      settestingImagePreview("/images/default_avatar.jpg");
    }

    if (error) {
      console.log(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      navigate(`/create/store/physicalchemtest/${id}`);
      dispatch({ type: DELETE_PHYSICALCHEMTEST_RESET });
    }
  }, [dispatch, navigate, physicalchemtestcreated, error, isDeleted]);

  const submitHandler = (e) => {
    const formData = new FormData();
    formData.set("certImage", testingImage);
    formData.set("dateTested", e.dateTested);

    dispatch(createPhysicalChemTest(formData, id));
  };

  const onChange = (e) => {
    const file = e.target.files[0];
    const allowedImageTypes = ["image/png", "image/jpeg", "image/jpg"]; // Allowed image file types

    if (e.target.name === "testingImage") {
      if (file && allowedImageTypes.includes(file.type)) {
        const reader = new FileReader();

        reader.onload = () => {
          if (reader.readyState === 2) {
            settestingImagePreview(reader.result);
            settestingImage(reader.result);
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
        dispatch(deletePhysicalChemTest(id));
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

    // const sortedMachineCleaning = [...machinecleaning].sort((a, b) => {
    //   const dateA = new Date(a.createdAt);
    //   const dateB = new Date(b.createdAt);
    //   return dateB - dateA;
    // });

    const sortedPhysicalChemTest = physicalchemtest.sort((a, b) => {
      return new Date(b.dateTested) - new Date(a.dateTested);
    });

    sortedPhysicalChemTest.forEach((physicalchemtests) => {
      // machinecleaning.forEach((machinecleanings) => {
      const dateObject = new Date(physicalchemtests.dateTested);
      data.rows.push({
        image: (
          <img
            style={{ width: 100, height: 100 }}
            src={physicalchemtests.certImage.url}
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
                  `/update/store/physicalchemtest/${physicalchemtests._id}`
                )
              }>
              <i className="fa fa-info-circle"></i>
            </button>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => deleterecord(physicalchemtests._id)}>
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
      <MetaData title={"Physical and Chemical Test"} />
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
                    Physical and Chemical Test Records ( {storeBranch.branch} )
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
                        Physical and Chemical Test Record
                      </ModalHeader>
                      <ModalBody>
                        <Row>
                          <Col md="12">
                            <div className="form-group">
                              <label htmlFor="avatar_upload">
                                Image Certificate
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
                                      src={testingImagePreview}
                                      alt="User"
                                    />
                                  </div>

                                  <div className="custom-file">
                                    <input
                                      type="file"
                                      name="storeImage"
                                      className="custom-file-input"
                                      id="testingImage"
                                      accept="images/*"
                                      {...register("testingImage", {
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
                              {errors.testingImage && !testingImage && (
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
                          <span>Date Tested</span>{" "}
                          <input
                            //placeholder="Add Notes here ..."
                            className="form-control"
                            type="date"
                            name="dateTested"
                            {...register("dateTested", {
                              required: "Please enter date.",
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

export default PhysicalChemTestList;
