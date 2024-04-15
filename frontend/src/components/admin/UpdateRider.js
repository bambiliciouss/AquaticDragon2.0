import React, { Fragment, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
  getStaffDetails,
  updateRider,
  deleteUser,
  clearErrors,
} from "actions/userActions";
import { MDBDataTable } from "mdbreact";

import Sidebar from "components/Sidebar/Sidebar";
import MetaData from "components/layout/MetaData";
import AdminNavbar from "components/Navbars/AdminNavbar";
import Header2 from "components/Headers/Header2";
import AdminFooter from "components/Footers/AdminFooter.js";

import swal from "sweetalert";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
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
  allAdminStoreBranch,
  deleteStoreBranch,
} from "actions/storebranchActions";
const UpdateRider = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { error, isUpdated } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.userDetails);
  const { id } = useParams();

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
  const [role, setRole] = useState("");
  const [medcert, setMedcert] = useState("");
  const [medcertPreview, setMedcertPreview] = useState(
    "/images/default_avatar.jpg"
  );
  const [barangayclearance, setBarangayclearance] = useState("");
  const [barangayclearancePreview, setBarangayclearancePreview] = useState(
    "/images/default_avatar.jpg"
  );
  const [driverslicense, setDriversLicense] = useState("");
  const [driverslicensePreview, setDriverslicensePreview] = useState(
    "/images/default_avatar.jpg"
  );

  const [selectedFileName, setSelectedFileName] = useState("");
  const [selectedFileNameBC, setSelectedFileNameBC] = useState("");
  const [selectedFileNameDL, setSelectedFileNameDL] = useState("");
  const [store, setStore] = useState("");

  const { storeBranch } = useSelector((state) => state.allStoreBranch);

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
    setRole("rider");
    dispatch(allAdminStoreBranch());
    const defaultAddress =
      user?.addresses?.find((address) => address.isDefault) || {};

    if (user && user._id !== id) {
      dispatch(getStaffDetails(id));
    } else {
      setFname(user.fname);
      setLname(user.lname);
      setPhone(user.phone);
      setHouseNo(defaultAddress.houseNo);
      setStreetName(defaultAddress.streetName);
      setPurokNum(defaultAddress.purokNum);
      setBarangay(defaultAddress.barangay);
      setCity(defaultAddress.city);
      setAvatarPreview(user.avatar.url);
      setMedcertPreview(user.medcert.url);
      setBarangayclearancePreview(user.barangayclearance.url);
      setDriverslicensePreview(user.driverslicense.url);
      setStore(user.storebranch._id);
    }

    if (error) {
      notifyError(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      swal("Updated Successfully!", "", "success");

      navigate("/riderlist", { replace: true });
      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, error, isUpdated, navigate, user]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fname", fname);
    formData.append("lname", lname);
    formData.append("phone", phone);
    formData.append("houseNo", houseNo);
    formData.append("streetName", streetName);
    formData.append("purokNum", purokNum);
    formData.append("barangay", barangay);
    formData.append("city", city);
    formData.append("avatar", avatar);
    formData.append("medcert", medcert);
    formData.append("barangayclearance", barangayclearance);
    formData.append("driverslicense", driverslicense);
    formData.append("role", role);
    formData.append("storebranch", store);
    dispatch(updateRider(id, formData));
  };

  // const onChange = (e) => {
  //   if (e.target.name === "avatar") {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       if (reader.readyState === 2) {
  //         setAvatarPreview(reader.result);
  //         setAvatar(reader.result);
  //       }
  //     };

  //     reader.readAsDataURL(e.target.files[0]);
  //   } else if (e.target.name === "medcert") {
  //     // Handle medcert file upload
  //     const medcertfile = e.target.files[0] ? e.target.files[0].name : "";
  //     setSelectedFileName(medcertfile);
  //     const reader = new FileReader();

  //     reader.onload = () => {
  //       if (reader.readyState === 2) {
  //         setMedcert(reader.result);
  //       }
  //     };

  //     reader.readAsDataURL(e.target.files[0]);
  //   } else if (e.target.name === "barangayclearance") {
  //     // Handle barangayclearance file upload
  //     const barangayclearancefile = e.target.files[0]
  //       ? e.target.files[0].name
  //       : "";
  //     setSelectedFileNameBC(barangayclearancefile);

  //     const reader = new FileReader();

  //     reader.onload = () => {
  //       if (reader.readyState === 2) {
  //         setBarangayclearance(reader.result);
  //       }
  //     };

  //     reader.readAsDataURL(e.target.files[0]);
  //   } else if (e.target.name === "driverslicense") {
  //     // Handle driverslicense file upload
  //     const driverslicensefile = e.target.files[0]
  //       ? e.target.files[0].name
  //       : "";
  //     setSelectedFileNameDL(driverslicensefile);

  //     const reader = new FileReader();

  //     reader.onload = () => {
  //       if (reader.readyState === 2) {
  //         setDriversLicense(reader.result);
  //       }
  //     };
  //     reader.readAsDataURL(e.target.files[0]);
  //   }
  // };

  const onChange = (e) => {
    const file = e.target.files[0];
    const allowedImageTypes = ["image/png", "image/jpeg", "image/jpg"]; // Allowed image file types

    if (e.target.name === "avatar") {
      if (file && allowedImageTypes.includes(file.type)) {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setAvatarPreview(reader.result);
            setAvatar(reader.result);
          }
        };
        reader.readAsDataURL(file);
      } else {
        swal("Please select a valid image file (PNG, JPEG, JPG).", "", "error");
        e.target.value = null; // Clear the input value
      }
    } else if (e.target.name === "medcert") {
      if (file && allowedImageTypes.includes(file.type)) {
        const medcertfile = e.target.files[0] ? e.target.files[0].name : "";
        setSelectedFileName(medcertfile);
        const reader = new FileReader();

        reader.onload = () => {
          if (reader.readyState === 2) {
            setMedcert(reader.result);
          }
        };

        reader.readAsDataURL(e.target.files[0]);
      } else {
        swal("Please select a valid image file (PNG, JPEG, JPG).", "", "error");
        e.target.value = null; // Clear the input value
      }
    } else if (e.target.name === "barangayclearance") {
      if (file && allowedImageTypes.includes(file.type)) {
        const barangayclearancefile = e.target.files[0]
          ? e.target.files[0].name
          : "";
        setSelectedFileNameBC(barangayclearancefile);

        const reader = new FileReader();

        reader.onload = () => {
          if (reader.readyState === 2) {
            setBarangayclearance(reader.result);
          }
        };

        reader.readAsDataURL(e.target.files[0]);
      } else {
        swal("Please select a valid image file (PNG, JPEG, JPG).", "", "error");
        e.target.value = null; // Clear the input value
      }
    } else if (e.target.name === "driverslicense") {
      if (file && allowedImageTypes.includes(file.type)) {
        const driverslicensefile = e.target.files[0]
          ? e.target.files[0].name
          : "";
        setSelectedFileNameDL(driverslicensefile);

        const reader = new FileReader();

        reader.onload = () => {
          if (reader.readyState === 2) {
            setDriversLicense(reader.result);
          }
        };
        reader.readAsDataURL(e.target.files[0]);
      } else {
        swal("Please select a valid image file (PNG, JPEG, JPG).", "", "error");
        e.target.value = null; // Clear the input value
      }
    }
  };

  return (
    <>
      <MetaData title={"Update Rider"} />
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
            <div class="wrapper ">
              <div className="content">
                <div className="row">
                  <div className="col-md-12">
                    <Card className="bg-secondary shadow">
                      <CardHeader className="bg-white border-0">
                        <Row className="align-items-center">
                          <Col xs="8">
                            <h3 className="mb-0">Rider's Details</h3>
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
                                Avatar
                              </label>

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

                              <div>
                                <label className="form-control-label">
                                  Assigned Store
                                </label>
                                <select
                                  className="form-control"
                                  value={store}
                                  onChange={(e) => setStore(e.target.value)}>
                                  <option value="">Select Store</option>
                                  {storeBranch.map((branch) => (
                                    <option key={branch._id} value={branch._id}>
                                      {branch.branch}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </Col>
                            <Col lg="9">
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
                                <Col lg="5">
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
                                      onChange={(e) =>
                                        setHouseNo(e.target.value)
                                      }
                                    />
                                  </FormGroup>
                                </Col>
                                <Col lg="4">
                                  <FormGroup>
                                    <label className="form-control-label">
                                      Purok No.
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Purok No."
                                      value={purokNum}
                                      onChange={(e) =>
                                        setPurokNum(e.target.value)
                                      }
                                    />
                                  </FormGroup>
                                </Col>
                              </Row>

                              <Row>
                                <Col lg="12">
                                  <FormGroup>
                                    <label className="form-control-label">
                                      Street Name
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Street Name"
                                      value={streetName}
                                      onChange={(e) =>
                                        setStreetName(e.target.value)
                                      }
                                    />
                                  </FormGroup>
                                </Col>
                              </Row>
                              <Row>
                                <Col lg="6">
                                  <FormGroup>
                                    <label className="form-control-label">
                                      Barangay
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Street Name"
                                      value={barangay}
                                      onChange={(e) =>
                                        setBarangay(e.target.value)
                                      }
                                    />
                                  </FormGroup>
                                </Col>
                                <Col lg="6">
                                  <FormGroup>
                                    <label className="form-control-label">
                                      City
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Street Name"
                                      value={city}
                                      onChange={(e) => setCity(e.target.value)}
                                    />
                                  </FormGroup>
                                </Col>
                              </Row>
                            </Col>
                          </Row>

                          <label className="form-control-label">
                            Medical Certificate
                          </label>

                          <Row>
                            <Col lg="6">
                              <Button
                                className="my-1"
                                color="success"
                                size="md"
                                onClick={() =>
                                  window.open(medcertPreview, "_blank")
                                }
                                block>
                                View Medical Certificate
                              </Button>
                            </Col>

                            <Col lg="6">
                              <FormGroup>
                                <div className="row">
                                  <div className="col-sm-12">
                                    <div className="custom-file">
                                      <input
                                        type="file"
                                        name="medcert"
                                        className="custom-file-input"
                                        id="customFileMedCert"
                                        accept="images/*"
                                        onChange={(e) => {
                                          onChange(e);
                                          e.target.blur();
                                        }}
                                      />
                                      <label
                                        className="custom-file-label"
                                        htmlFor="customFileMedCert">
                                        {selectedFileName || "Choose Image"}
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </FormGroup>
                            </Col>
                          </Row>

                          <label className="form-control-label">
                            Barangay Clearance
                          </label>

                          <Row>
                            <Col lg="6">
                              <Button
                                className="my-1"
                                color="success"
                                size="md"
                                onClick={() =>
                                  window.open(
                                    barangayclearancePreview,
                                    "_blank"
                                  )
                                }
                                block>
                                View Barangay Clearance
                              </Button>
                            </Col>

                            <Col lg="6">
                              <FormGroup>
                                <div className="row">
                                  <div className="col-sm-12">
                                    <div className="custom-file">
                                      <input
                                        type="file"
                                        name="barangayclearance" // Change the name to barangayclearance
                                        className="custom-file-input"
                                        id="customFileBarangayClearance" // Change the ID
                                        accept="images/*"
                                        onChange={(e) => {
                                          onChange(e);
                                          e.target.blur();
                                        }}
                                      />
                                      <label
                                        className="custom-file-label"
                                        htmlFor="customFileBarangayClearance">
                                        {" "}
                                        {selectedFileNameBC || "Choose Image"}
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </FormGroup>
                            </Col>
                          </Row>

                          <label className="form-control-label">
                            Driver's License
                          </label>

                          <Row>
                            <Col lg="6">
                              <Button
                                className="my-1"
                                color="success"
                                size="md"
                                onClick={() =>
                                  window.open(driverslicensePreview, "_blank")
                                }
                                block>
                                View Driver's License
                              </Button>
                            </Col>
                            <Col lg="6">
                              <FormGroup>
                                <div className="row">
                                  <div className="col-sm-12">
                                    <div className="custom-file">
                                      <input
                                        type="file"
                                        name="driverslicense" // Change the name to driverslicense
                                        className="custom-file-input"
                                        id="customFileDriversLicense" // Change the ID
                                        accept="images/*"
                                        onChange={(e) => {
                                          onChange(e);
                                          e.target.blur();
                                        }}
                                      />
                                      <label
                                        className="custom-file-label"
                                        htmlFor="customFileDriversLicense">
                                        {" "}
                                        {selectedFileNameDL || "Choose Image"}
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </FormGroup>
                            </Col>
                          </Row>

                          <div className="text-right">
                            <Button className="my-4" color="info" type="submit">
                              Update
                            </Button>
                            <Button
                              className="my-4 mr-4"
                              color="secondary"
                              onClick={() => navigate(`/riderlist/${store}`)}>
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

export default UpdateRider;
