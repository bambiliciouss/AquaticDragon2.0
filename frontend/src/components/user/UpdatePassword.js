import React, { Fragment, useState, useEffect } from "react";
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import AuthFooter from "components/Footers/AuthFooter.js";
import MetaData from "components/layout/MetaData";

import { useNavigate, useLocation } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { updatePassword, clearErrors } from "../../actions/userActions";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
} from "reactstrap";

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { error, isUpdated, loading } = useSelector((state) => state.user);

  const notifyError = (message = "") =>
    toast.error(message, {
      position: "bottom-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const notifySuccess = (message = "") =>
    toast.success(message, {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  useEffect(() => {
    if (error) {
      console.log(error);
      notifyError(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      console.log("Password updated successfully");
      notifySuccess("Password updated successfully");
      navigate("/my-profile");

      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, navigate, isUpdated]);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("oldPassword", oldPassword);
    formData.set("password", password);
    dispatch(updatePassword(formData));
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
      <MetaData title={"Update Password"} />

      <div
        className="user-profile-container"
        style={{
          minHeight: "700px",
          marginTop: "100px",
          marginLeft: "20%",
          marginRight: "20%",
        }}>
        <div className="user-profile">
          <div class="wrapper ">
            <div className="content">
              <div className="row">
                <div className="col-md-12">
                  <Card className="bg-secondary shadow">
                    <CardHeader className="bg-white border-0">
                      <Row className="align-items-center">
                        <Col xs="8">
                          <h3 className="mb-0">Update Password</h3>
                        </Col>
                      </Row>
                    </CardHeader>
                    <CardBody>
                      <Form
                        onSubmit={submitHandler}
                        encType="multipart/form-data">
                        <Row>
                          <Col lg="12">
                            <FormGroup>
                              <label className="form-control-label">
                                Old Password
                              </label>
                              <input
                                type="password"
                                className="form-control"
                                placeholder="Old Password"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg="12">
                            <FormGroup>
                              <label className="form-control-label">
                                New Password
                              </label>
                              <input
                                type="password"
                                className="form-control"
                                placeholder="New Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <div className="text-center">
                          <Button className="my-4" color="info" type="submit">
                            Update Password
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
      </div>
      <AuthFooter />
    </>
  );
};

export default UpdatePassword;
