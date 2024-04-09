import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createGallon, clearErrors } from "../../actions/gallonActions";

import AuthNavbar from "components/Navbars/AuthNavbar.js";
import AuthFooter from "components/Footers/AuthFooter.js";
import { useNavigate, useLocation } from "react-router-dom";
import MetaData from "components/layout/MetaData";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  CardFooter,
} from "reactstrap";
import { CREATE_GALLON_RESET } from "../../constants/gallonConstants";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { allTypesGallon } from "actions/typesgallonAction";

const RegisterGallon = () => {
  const [gallon, setGallon] = useState({
    type: "",
    gallonAge: "",
  });

  const { type, gallonAge } = gallon;
  const { typeofGallon } = useSelector((state) => state.allTypesGallon);

  const [gallonImage, setgallonImage] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/images/gallon.png");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { galloncreated, error, loading } = useSelector(
    (state) => state.newGallon
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    dispatch(allTypesGallon());

    if (galloncreated) {
      console.log("success gallon registration");
      swal("Your Gallon Created!", "", "success");
      navigate("/my-gallon", { replace: true });
      dispatch({
        type: CREATE_GALLON_RESET,
      });
    }

    if (error) {
      console.log(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, galloncreated, navigate]);

  const submitHandler = (e) => {
    //e.preventDefault();
    // console.log(e);
    const formData = new FormData();
    formData.set("type", e.type);
    formData.set("gallonAge", e.gallonAge);
    formData.set("gallonImage", gallonImage);

    dispatch(createGallon(formData));
  };

  const onChange = (e) => {
    if (e.target.name === "gallonImage") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setgallonImage(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setGallon({ ...gallon, [e.target.name]: e.target.value });
    }
  };
  // React.useEffect(() => {
  //   document.body.classList.add("bg-default");
  //   return () => {
  //     document.body.classList.remove("bg-default");
  //   };
  // }, []);
  const location = useLocation();
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [location]);

  return (
    <>
      <AuthNavbar />
      <MetaData title={"Gallon Registration"} />
      <div
        className="user-profile-container"
        style={{
          minHeight: "700px",
          marginTop: "100px",
          marginLeft: "15%",
          marginRight: "15%",
        }}>
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-3">
            <div>
              <h5
                className="title"
                style={{
                  marginBottom: "10px",
                  paddingTop: "10px",
                }}>
                <i
                  className="now-ui-icons users_single-02"
                  style={{ marginRight: "5px" }}></i>
                My Account
              </h5>

              <ul style={{ listStyleType: "none", paddingLeft: "0" }}>
                <li>
                  <a className="nav-link" href="/my-profile">
                    Profile
                  </a>
                </li>
                <li>
                  <a className="nav-link" href="/password/update">
                    Change Password
                  </a>
                </li>
                <li>
                  <a className="nav-link" href="/my-qr">
                    QR Code
                  </a>
                </li>
              </ul>

              <h5
                className="title"
                style={{
                  marginBottom: "10px",
                  paddingTop: "10px",
                }}>
                <i
                  className="now-ui-icons ui-1_simple-add"
                  style={{ marginRight: "5px" }}></i>
                My Gallons
              </h5>

              <ul style={{ listStyleType: "none", paddingLeft: "0" }}>
                <li>
                  <a className="nav-link" href="/my-gallon">
                    List of my Gallon/s
                  </a>
                </li>
                <li>
                  <a className="nav-link active" href="/register-gallon">
                    Register New Gallon
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-9">
            <div className="user-profile">
              <div className="wrapper ">
                <div className="content">
                  <div className="row">
                    <div className="col-md-12">
                      <Card className="bg-secondary shadow">
                        <CardHeader className="bg-white border-0">
                          <Row className="align-items-center">
                            <Col xs="8">
                              <h3 className="mb-0">Register New Gallon</h3>
                            </Col>
                          </Row>
                        </CardHeader>
                        <div className="card-body">
                          <Form onSubmit={handleSubmit(submitHandler)}>
                            <CardBody>
                              <Row>
                                <Col>
                                  {/* <FormGroup>
                                    <label className="form-control-label">
                                      Type
                                    </label>
                                    <select
                                      className="form-control"
                                      id="typeSelect"
                                      name="type"
                                      defaultValue=""
                                      {...register("type", {
                                        required: "Please select gallon type",
                                      })}
                                      style={{ backgroundColor: "#f2f2f2" }}>
                                      <option value="" disabled>
                                        Select Type
                                      </option>
                                      <option value="Slim 5 Gallons">
                                        Slim 5 Gallons
                                      </option>
                                      <option value="Round 5 Gallons">
                                        Round 5 Gallons
                                      </option>
                                    </select>
                                  </FormGroup> */}

                                  <FormGroup>
                                    <label className="form-control-label">
                                      Type
                                    </label>
                                    <select
                                      className="form-control"
                                      id="typeSelect"
                                      name="type"
                                      defaultValue=""
                                      {...register("type", {
                                        required: "Please select gallon type",
                                      })}
                                      style={{ backgroundColor: "#f2f2f2" }}>
                                      <option value="" disabled>
                                        Select Type
                                      </option>
                                      {typeofGallon.map((gallon) => (
                                        <option
                                          key={gallon._id}
                                          value={gallon._id}>
                                          {gallon.typeofGallon}
                                        </option>
                                      ))}
                                    </select>
                                  </FormGroup>

                                  {errors.type && (
                                    <h2
                                      className="h1-seo"
                                      style={{
                                        color: "red",
                                        fontSize: "small",
                                      }}>
                                      {errors.type.message}
                                    </h2>
                                  )}
                                </Col>
                              </Row>

                              <Row>
                                <Col md="12">
                                  <div className="form-group">
                                    <label className="form-control-label">
                                      Gallon Image
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
                                              borderRadius: "50%",
                                            }}
                                            src={avatarPreview}
                                            alt="gallon"
                                          />
                                        </div>

                                        <div className="custom-file">
                                          <input
                                            type="file"
                                            name="gallonImage"
                                            className="custom-file-input"
                                            id="customFile"
                                            accept="images/*"
                                            {...register("gallonImage", {
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
                                    {errors.gallonImage && !gallonImage && (
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
                            </CardBody>

                            <div className="text-center">
                              <Button
                                className="my-4"
                                color="primary"
                                type="submit">
                                Register
                              </Button>
                            </div>
                          </Form>
                        </div>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AuthFooter />
    </>
  );
};

export default RegisterGallon;
