import React, { Fragment, useState, useEffect } from "react";
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import AuthFooter from "components/Footers/AuthFooter.js";
import MetaData from "components/layout/MetaData";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "components/Sidebar/Sidebar";
import AdminNavbar from "components/Navbars/AdminNavbar";
import Header2 from "components/Headers/Header2";
import AdminFooter from "components/Footers/AdminFooter.js";
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
const AdminUpdateProfile = () => {
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
      navigate("/admin-profile", { replace: true });
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

  const location = useLocation();
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [location]);

  //   const handlePhoneChange = (e) => {
  //     const numericValue = e.target.value.replace(/\D/g, "");
  //     const formattedPhone = numericValue.slice(0, 10);
  //     setPhone(formattedPhone);
  //   };

  return (
    <>
      <MetaData title={"Type of Gallon(s)"} />
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
                  <h3 className="mb-0">Edit Profile</h3>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <Form onSubmit={submitHandler} encType="multipart/form-data">
                <Row>
                  <Col lg="6">
                    <FormGroup>
                      <label className="form-control-label">First Name</label>
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
                      <label className="form-control-label">Last Name</label>
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
                  <Col lg="5">
                    <FormGroup>
                      <label className="form-control-label">Phone No.</label>

                      <input
                        type="text"
                        className="form-control"
                        placeholder="Phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="3">
                    <FormGroup>
                      <label className="form-control-label">
                        Unit, Building, House No.
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Unit, Building, House No."
                        value={houseNo}
                        onChange={(e) => setHouseNo(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="4">
                    {/* <FormGroup>
                              <label className="form-control-label">
                                Purok No.
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Purok No."
                                value={purokNum}
                                onChange={(e) => setPurokNum(e.target.value)}
                              />
                            </FormGroup> */}
                    <FormGroup>
                      <label className="form-control-label">Purok No.</label>
                      <select
                        className="form-control"
                        id="purokSelect"
                        value={purokNum}
                        onChange={(e) => setPurokNum(e.target.value)}>
                        <option value="" disabled>
                          Select Purok No.
                        </option>
                        <option value="Purok 1">Purok 1</option>
                        <option value="Purok 2">Purok 2</option>
                        <option value="Purok 3">Purok 3</option>
                        <option value="Purok 4">Purok 4</option>
                        <option value="Purok 5">Purok 5</option>
                        <option value="Purok 6">Purok 6</option>
                        <option value="Purok 7">Purok 7</option>
                        <option value="Purok 8">Purok 8</option>
                        <option value="Purok 9">Purok 9</option>
                        <option value="Purok 10">Purok 10</option>
                      </select>
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col lg="12">
                    <FormGroup>
                      <label className="form-control-label">Street Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Street Name"
                        value={streetName}
                        onChange={(e) => setStreetName(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col lg="6">
                    <FormGroup>
                      <label className="form-control-label">Barangay</label>
                      <select
                        className="form-control"
                        id="barangaySelect"
                        value={barangay}
                        onChange={(e) => setBarangay(e.target.value)}>
                        <option value="" disabled>
                          Select Barangay
                        </option>
                        <option value="Central Bicutan">Central Bicutan</option>
                        <option value="Upper Bicutan">Upper Bicutan</option>
                        <option value="New Lower Bicutan">
                          New Lower Bicutan
                        </option>
                      </select>
                    </FormGroup>
                  </Col>
                  <Col lg="6">
                    <FormGroup>
                      <label className="form-control-label">City</label>
                      <select
                        className="form-control"
                        id="citySelect"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}>
                        <option value="" disabled>
                          Select City
                        </option>
                        <option value="Taguig City">Taguig City</option>
                      </select>
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
                      <label htmlFor="customFile" className="custom-file-label">
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
        </Container>
        <Container fluid>
          <AdminFooter />
        </Container>
      </div>
    </>
  );
};

export default AdminUpdateProfile;
