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
  singleTypesGallon,
  clearErrors,
  updateTypesGallon,
} from "actions/typesgallonAction";
import {
  UPDATE_TYPESGALLON_RESET,
  DELETE_TYPESGALLON_RESET,
} from "../../constants/typesgallonConstants";

const UpdateTypeGallon = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { typeofgallondetails } = useSelector(
    (state) => state.singleTypeOfGallon
  );

  const { error, isUpdated, isDeleted } = useSelector(
    (state) => state.typesGallon
  );
  const { id } = useParams();

  const [typeofGallon, setTypeofGallon] = useState("");
  const [price, setPrice] = useState("");
  const [gallonImage, setgallonImage] = useState("");
  const [gallonImagePreview, setgallonImagePreview] = useState(
    "/images/default_avatar.jpg"
  );

  useEffect(() => {
    //setRole("rider");

    if (typeofgallondetails && typeofgallondetails._id !== id) {
      dispatch(singleTypesGallon(id));
    } else {
      setTypeofGallon(typeofgallondetails.typeofGallon);
      setPrice(typeofgallondetails.price);
      setgallonImagePreview(typeofgallondetails.gallonImage.url);
    }

    if (error) {
      swal("Error Updating!", "", "error");
      dispatch(clearErrors());
    }

    if (isUpdated) {
      swal("Updated Successfully!", "", "success");
      navigate(`/typesgallonlist`, {
        replace: true,
      });
      dispatch({
        type: UPDATE_TYPESGALLON_RESET,
      });
    }

    if (isDeleted) {
      navigate(`/typesgallonlist`);
      dispatch({ type: DELETE_TYPESGALLON_RESET });
    }
  }, [dispatch, error, isUpdated, navigate, typeofgallondetails, isDeleted]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("typeofGallon", typeofGallon);
    formData.append("price", price);
    formData.append("gallonImage", gallonImage);

    dispatch(updateTypesGallon(id, formData));
    //console.log(formData)
  };

  const onChange = (e) => {
    if (e.target.name === "gallonImage") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setgallonImagePreview(reader.result);
          setgallonImage(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
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

export default UpdateTypeGallon;
