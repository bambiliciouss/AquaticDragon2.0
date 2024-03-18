import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Container,
} from "reactstrap";

import React, { useState, useEffect } from "react";
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import AuthFooter from "components/Footers/AuthFooter.js";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";

import { login, logout } from "../../actions/userActions";
import MetaData from "components/layout/MetaData";

import Loader from "../layout/Loader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import swal from "sweetalert";
const Login = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const { user, isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const submitHandler = (e) => {
    dispatch(login(e.email, e.password));
  };

  let location = useLocation();

  useEffect(() => {
    if (isAuthenticated) {
      // notifySuccess("Login Successfully");
      swal("Login Successfully", "", "success");

      if (user && user.role === "admin") {
        navigate("/dashboard");
      } else if (
        user &&
        user.verified &&
        user &&
        user.role === "PendingAdmin"
      ) {
        swal(
          "Your Account is still on process for admin activation.",
          "",
          "info"
        );
        dispatch(logout());
        navigate("/login");
      } else {
        navigate("/");
      }
    } else if (error) {
      //notifyError(error);
      swal(error, "", "error");
      console.log(error);
    }
  }, [dispatch, isAuthenticated, error, navigate]);

  // React.useEffect(() => {
  //   document.body.classList.add("bg-default");
  //   return () => {
  //     document.body.classList.remove("bg-default");
  //   };
  // }, []);
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [location]);

  return (
    <>
      <MetaData title={"Login"} />
      <div className="main-content">
        <AuthNavbar />
        <div className="header py-7 py-lg-8">
          <Container>
            <div className="header-body text-center mb-3">
              {/* <Row className="justify-content-center">
                <Col lg="5" md="6">
                  <h1 className="text-black">Login to Aquatic Dragon!</h1>
                </Col>
              </Row> */}
            </div>
          </Container>
        </div>
        <Container className="mt--8 pb-5">
          <Row className="justify-content-center">
            <Col lg="5" md="7">
              <Card className="bg-secondary shadow border-0">
                <CardHeader className="bg-white  text-center border-0 ">
                  <Row className="align-items-center">
                    <Col xs="12">
                      <h3 className="mb-0">Login Account</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody className="px-lg-5 py-lg-5">
                  <Form role="form" onSubmit={handleSubmit(submitHandler)}>
                    <FormGroup className="mb-3">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-email-83" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <input
                          id="email_field"
                          className="form-control"
                          placeholder="Email"
                          {...register("email", {
                            required: "Email is required",
                            pattern: {
                              value:
                                /^[a-zA-Z0-9_.+-]+@[a-zAZ0-9-]+\.[a-zA-Z0-9-.]+$/i,
                              message: "Entered email is in the wrong format",
                            },
                          })}
                        />
                      </InputGroup>
                    </FormGroup>
                    {errors.email && (
                      <div className="error">
                        {errors.email.type === "required" && (
                          <h2
                            className="h1-seo"
                            style={{ color: "red", fontSize: "small" }}>
                            {errors.email.message}
                          </h2>
                        )}
                        {errors.email.type === "pattern" && (
                          <h2
                            className="h1-seo"
                            style={{ color: "red", fontSize: "small" }}>
                            {errors.email.message}
                          </h2>
                        )}
                      </div>
                    )}
                    <FormGroup>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-lock-circle-open" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <input
                          type="password"
                          id="password_field"
                          placeholder="Password"
                          className="form-control"
                          {...register("password", {
                            required: "Password is required",
                          })}
                        />
                      </InputGroup>
                    </FormGroup>
                    {errors.password && (
                      <h2
                        className="h1-seo"
                        style={{ color: "red", fontSize: "small" }}>
                        {errors.password.message}
                      </h2>
                    )}

                    <div className="text-center">
                      <Button className="my-4" color="primary" type="submit">
                        Login
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
              <Row className="mt-3">
                <Col xs="6">
                  <a className="text-danger" href="/password/forgot">
                    <small>Forgot password?</small>
                  </a>
                </Col>
                <Col className="text-right" xs="6">
                  <a className="text-info" href="/register">
                    <small>Create new account</small>
                  </a>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
      <AuthFooter />
    </>
  );
};

export default Login;
