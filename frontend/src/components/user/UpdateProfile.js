import React, { Fragment, useState, useEffect } from "react";
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import AuthFooter from "components/Footers/AuthFooter.js";
import MetaData from "components/layout/MetaData";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  updateProfile,
  loadUser,
  clearErrors,
} from "../../actions/userActions";
import swal from "sweetalert";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
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
const UpdateProfile = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [phone, setPhone] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [streetName, setStreetName] = useState("");
  const [purokNum, setPurokNum] = useState("");
  const [barangay, setBarangay] = useState("");
  const [city, setCity] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "/images/default_avatar.jpg"
  );

  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
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
    if (user) {
      setFname(user.fname);
      setLname(user.lname);
      setPhone(user.phone);
      setHouseNo(user.houseNo);
      setStreetName(user.streetName);
      setPurokNum(user.purokNum);
      setBarangay(user.barangay);
      setCity(user.city);
      setAvatarPreview(user.avatar.url);
    }

    if (error) {
      swal(error, "", "error");
      dispatch(clearErrors());
    }

    if (isUpdated) {
      swal("Updated Successfully!", "", "success");

      dispatch(loadUser());
      navigate("/my-profile", { replace: true });
      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, error, isUpdated, navigate, user]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("fname", fname);
    formData.set("lname", lname);
    formData.set("phone", phone);
    formData.set("houseNo", houseNo);
    formData.set("streetName", streetName);
    formData.set("purokNum", purokNum);
    formData.set("barangay", barangay);
    formData.set("city", city);

    formData.set("avatar", avatar);

    dispatch(updateProfile(formData));
  };

  const onChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);

        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
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
      <MetaData title={"Update Profile"} />

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
                          <h3 className="mb-0">Edit Profile</h3>
                        </Col>
                      </Row>
                    </CardHeader>
                    <CardBody>
                      <Form
                        onSubmit={submitHandler}
                        encType="multipart/form-data">
                        <Row>
                          <Col lg="6">
                            <FormGroup>
                              <label className="form-control-label">
                                First Name
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="First Name"
                                value={fname}
                                onChange={(e) => setFname(e.target.value)}
                              />
                            </FormGroup>
                          </Col>
                          <Col lg="6">
                            <FormGroup>
                              <label className="form-control-label">
                                Last Name
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Last Name"
                                value={lname}
                                onChange={(e) => setLname(e.target.value)}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg="12">
                            <FormGroup>
                              <label className="form-control-label">
                                Phone No.
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                              />
                            </FormGroup>
                          </Col>
                         
                        </Row>
                        <label className="form-control-label">Avatar</label>

                        <Row>
                          <Col lg="3"></Col>
                          <Col lg="6">
                            <div className="text-center">
                              <img
                                className="avatar border-gray"
                                style={{
                                  width: "200px",
                                  height: "200px",
                                  borderRadius: "50%",
                                }}
                                src={avatarPreview}
                                alt="User"
                              />
                            </div>

                            <div className="custom-file">
                              <input
                                type="file"
                                className="custom-file-input"
                                name="avatar"
                                accept="images/*"
                                onChange={onChange}
                              />
                              <label
                                htmlFor="customFile"
                                className="custom-file-label">
                                Choose Avatar
                              </label>
                            </div>
                          </Col>
                        </Row>
                        <div className="text-center">
                          <Button className="my-4" color="info" type="submit">
                            Update Profile
                          </Button>
                          <Button
                            className="my-4 mr-4"
                            color="secondary"
                            onClick={() => navigate("/userlist")}>
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
      </div>
      <AuthFooter />
    </>
  );
};

export default UpdateProfile;
