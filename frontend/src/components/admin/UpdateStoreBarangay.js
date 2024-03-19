import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import Sidebar from "components/Sidebar/Sidebar";
import MetaData from "components/layout/MetaData";
import AdminNavbar from "components/Navbars/AdminNavbar";
import Header2 from "components/Headers/Header2";
import AdminFooter from "components/Footers/AdminFooter.js";

import swal from "sweetalert";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
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
} from "reactstrap";

import {
  updatedStoreBarangay,
  singleStorebarangay,
  clearErrors,
} from "actions/storebarangayActions";
import { UPDATE_STOREBARANGAY_RESET } from "../../constants/storebarangayConstant";

const UpdateStoreBarangay = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { storebarangayDetails } = useSelector(
    (state) => state.singleStorebarangay
  );

  const { error, isUpdated } = useSelector((state) => state.storebarangay);
  const { id } = useParams();

  const [barangay, setBarangay] = useState("");

  useEffect(() => {
    if (storebarangayDetails && storebarangayDetails._id !== id) {
      dispatch(singleStorebarangay(id));
    } else {
      setBarangay(storebarangayDetails.barangay);
    }

    if (error) {
      swal("Error Updating!", "", "error");
      dispatch(clearErrors());
    }

    if (isUpdated) {
      swal("Updated Successfully!", "", "success");
      navigate(`/create/store/barangay/${storebarangayDetails.storebranch}`, {
        replace: true,
      });
      dispatch({
        type: UPDATE_STOREBARANGAY_RESET,
      });
    }

  }, [dispatch, error, isUpdated, navigate, storebarangayDetails]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("barangay", barangay);
   
    dispatch(updateTypesGallon(id, formData));
    //console.log(formData)
  };

  const onChange = (e) => {
    const file = e.target.files[0];
    const allowedImageTypes = ["image/png", "image/jpeg", "image/jpg"]; // Allowed image file types

    if (e.target.name === "gallonImage") {
      if (file && allowedImageTypes.includes(file.type)) {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setgallonImagePreview(reader.result);
            setgallonImage(reader.result);
          }
        };

        reader.readAsDataURL(e.target.files[0]);
      } else {
        swal("Please select a valid image file (PNG, JPEG, JPG).", "", "error");
        e.target.value = null;
      }
    }
  };
  return (
    <>
      <MetaData title={"Update Record"} />
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
          <div className="user-profile">
            <div className="wrapper ">
              <div className="content">
                <div className="row">
                  <div className="col-md-12">
                    <Card className="bg-secondary shadow">
                      <CardHeader className="bg-white border-0">
                        <Row className="align-items-center">
                          <Col xs="8">
                            <h3 className="mb-0">Machine Cleaning Record</h3>
                          </Col>
                        </Row>
                      </CardHeader>
                      <CardBody>
                        <Form
                          onSubmit={submitHandler}
                          encType="multipart/form-data">
                          <Row>
                            <Col lg="3">
                              <label className="form-control-label">
                                Gallon Image
                              </label>

                              <div className="text-center">
                                <img
                                  className="avatar border-gray"
                                  style={{
                                    width: "200px",
                                    height: "200px",
                                    borderRadius: "50%",
                                  }}
                                  src={gallonImagePreview}
                                  alt="documentation"
                                />
                              </div>

                              <div className="custom-file">
                                <input
                                  type="file"
                                  className="custom-file-input"
                                  name="gallonImage"
                                  accept="images/*"
                                  onChange={onChange}
                                />
                                <label
                                  htmlFor="customFile"
                                  className="custom-file-label">
                                  Choose Image
                                </label>
                              </div>
                            </Col>
                            <Col lg="9">
                              <Row>
                                <Col lg="12">
                                  <FormGroup>
                                    <label className="form-control-label">
                                      Type of Gallon
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Add notes here"
                                      value={typeofGallon}
                                      onChange={(e) =>
                                        setTypeofGallon(e.target.value)
                                      }
                                    />
                                  </FormGroup>
                                </Col>
                              </Row>

                              <Row>
                                <Col lg="12">
                                  <FormGroup>
                                    <label className="form-control-label">
                                      Price
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Add notes here"
                                      value={price}
                                      onChange={(e) => setPrice(e.target.value)}
                                    />
                                  </FormGroup>
                                </Col>
                              </Row>
                            </Col>
                          </Row>

                          <div className="text-right">
                            <Button className="my-4" color="info" type="submit">
                              Update
                            </Button>
                            <Button
                              className="my-4 mr-4"
                              color="secondary"
                              onClick={() => navigate(`/typesgallonlist`)}>
                              Back
                            </Button>
                          </div>
                        </Form>
                      </CardBody>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
        <Container fluid>
          <AdminFooter />
        </Container>
      </div>
    </>
  );
};

export default UpdateStoreBarangay;
