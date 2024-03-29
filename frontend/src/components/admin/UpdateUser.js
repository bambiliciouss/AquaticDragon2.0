import React, { Fragment, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";

import {
  getUserDetails,
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
  Badge,
  Input,
} from "reactstrap";

import { AdminallAddress } from "actions/addressAction";

const UpdateUser = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { error, isUpdated } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.userDetails);
  const { id } = useParams();

  const { useraddress } = useSelector((state) => state.allAddress);

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

  const [email, setEmail] = useState("");
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
    dispatch(AdminallAddress(id));

    if (user && user._id !== id) {
      dispatch(getUserDetails(id));
    } else {
      setFname(user.fname);
      setLname(user.lname);
      setPhone(user.phone);
      setHouseNo(user.houseNo);
      setStreetName(user.streetName);
      setPurokNum(user.purokNum);
      setBarangay(user.barangay);
      setCity(user.city);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
      setMedcertPreview(user.medcert.url);
      setBarangayclearancePreview(user.barangayclearance.url);
      setDriverslicensePreview(user.driverslicense.url);
    }

    if (error) {
      notifyError(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      swal("Updated Successfully!", "", "success");

      navigate("/userlist", { replace: true });
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
    formData.append("role", role);

    dispatch(updateRider(id, formData));
    //console.log(formData)
  };

  const onChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (/^image\/(png|jpg|jpeg)$/.test(file.type)) {
        const reader = new FileReader();

        reader.onload = () => {
          if (reader.readyState === 2) {
            setAvatarPreview(reader.result);
            setAvatar(reader.result);
          }
        };

        reader.readAsDataURL(file);
      } else {
        swal("Please select .png, .jpg, or .jpeg image file.", "", "error");
        e.target.value = null;
      }
    }
  };
  const setAddresses = () => {
    const data = {
      columns: [
        {
          label: "Address",
          field: "address",
          sort: "asc",
        },
        {
          label: "Set Default",
          field: "default",
          sort: "asc",
        },

        // {
        //   label: "Actions",
        //   field: "actions",
        // },
      ],

      rows: [],
    };

    useraddress.forEach((useraddresses) => {
      data.rows.push({
        address: `${useraddresses.houseNo} ${useraddresses.purokNum} ${useraddresses.streetName} ${useraddresses.barangay} ${useraddresses.city}`,
        actions: (
          <Fragment>
            {/* <button
              className="btn btn-primary py-1 px-2 ml-2"
              onClick={() => EditModal(useraddresses._id)}>
              <i className="fa fa-info-circle"></i>
            </button>

            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => deleteHandler(useraddresses._id)}>
              <i className="fa fa-trash"></i>
            </button> */}
          </Fragment>
        ),
        default: (
          <Fragment>
            <Badge
              color={useraddresses.isDefault ? "success" : "secondary"}
              // href=""
              // onClick={() => setDefAddress(useraddresses._id)}
            >
              {useraddresses.isDefault ? "Default" : "Default"}
            </Badge>
          </Fragment>
        ),
      });
    });

    return data;
  };
  const defaultAddress =
    user?.addresses?.find((address) => address.isDefault) || {};

  return (
    <>
      <MetaData title={"Update Customer"} />
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
                            <h3 className="mb-0">Customer's Details</h3>
                          </Col>
                        </Row>
                      </CardHeader>
                      <CardBody>
                        <Form>
                          <h6 className="heading-small text-muted mb-4">
                            User information
                          </h6>
                          <div className="pl-lg-4">
                            <Row>
                              <Col lg="3">
                                <div className="text-center">
                                  <img
                                    className="avatar border-gray"
                                    style={{
                                      width: "180px",
                                      height: "180px",
                                      borderRadius: "30%",
                                    }}
                                    src={user.avatar && user.avatar.url}
                                    alt="User"
                                  />
                                </div>
                              </Col>
                              <Col lg="9">
                                <Row>
                                  <Col lg="6">
                                    <FormGroup>
                                      <label
                                        className="form-control-label"
                                        htmlFor="input-first-name">
                                        First name
                                      </label>
                                      <Input
                                        className="form-control-alternative"
                                        id="input-first-name"
                                        type="text"
                                        value={user ? user.fname : ""}
                                        readOnly
                                      />
                                    </FormGroup>
                                  </Col>
                                  <Col lg="6">
                                    <FormGroup>
                                      <label
                                        className="form-control-label"
                                        htmlFor="input-last-name">
                                        Last name
                                      </label>
                                      <Input
                                        className="form-control-alternative"
                                        id="input-last-name"
                                        type="text"
                                        value={user ? user.lname : ""}
                                        readOnly
                                      />
                                    </FormGroup>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col lg="12">
                                    <FormGroup>
                                      <label
                                        className="form-control-label"
                                        htmlFor="input-email">
                                        Email address
                                      </label>
                                      <Input
                                        className="form-control-alternative"
                                        id="input-email"
                                        type="email"
                                        value={user ? user.email : ""}
                                        readOnly
                                      />
                                    </FormGroup>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col md="12">
                                    <FormGroup>
                                      <label
                                        className="form-control-label"
                                        htmlFor="input-address">
                                        Phone No.
                                      </label>
                                      <Input
                                        className="form-control-alternative"
                                        id="input-phone"
                                        type="text"
                                        value={user ? user.phone : ""}
                                        readOnly
                                      />
                                    </FormGroup>
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                          </div>
                          <hr className="my-4" />
                          {/* Address */}
                          <h6 className="heading-small text-muted mb-4">
                            Contact information
                          </h6>
                          <div className="pl-lg-4">
                            <Row>
                              <Col lg="6">
                                <FormGroup>
                                  <label
                                    className="form-control-label"
                                    htmlFor="input-city">
                                    House No.
                                  </label>
                                  <Input
                                    className="form-control-alternative"
                                    id="input-city"
                                    type="text"
                                    placeholder={
                                      defaultAddress &&
                                      defaultAddress.houseNo !== ""
                                        ? defaultAddress.houseNo
                                        : "Update..."
                                    }
                                    value={
                                      defaultAddress
                                        ? defaultAddress.houseNo
                                        : ""
                                    }
                                    readOnly
                                  />
                                </FormGroup>
                              </Col>
                              <Col lg="6">
                                <FormGroup>
                                  <label
                                    className="form-control-label"
                                    htmlFor="input-country">
                                    Purok No.
                                  </label>
                                  <Input
                                    className="form-control-alternative"
                                    id="input-country"
                                    type="text"
                                    placeholder={
                                      defaultAddress &&
                                      defaultAddress.purokNum !== ""
                                        ? defaultAddress.purokNum
                                        : "Update..."
                                    }
                                    value={
                                      defaultAddress
                                        ? defaultAddress.purokNum
                                        : ""
                                    }
                                    readOnly
                                  />
                                </FormGroup>
                              </Col>
                            </Row>

                            <Row>
                              <Col md="12">
                                <FormGroup>
                                  <label
                                    className="form-control-label"
                                    htmlFor="input-address">
                                    Street Name.
                                  </label>
                                  <Input
                                    className="form-control-alternative"
                                    id="input-phone"
                                    type="text"
                                    placeholder={
                                      defaultAddress &&
                                      defaultAddress.streetName !== ""
                                        ? defaultAddress.streetName
                                        : "Update..."
                                    }
                                    value={
                                      defaultAddress
                                        ? defaultAddress.streetName
                                        : ""
                                    }
                                    readOnly
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg="6">
                                <FormGroup>
                                  <label
                                    className="form-control-label"
                                    htmlFor="input-city">
                                    Barangay
                                  </label>
                                  <Input
                                    className="form-control-alternative"
                                    id="input-city"
                                    type="text"
                                    placeholder={
                                      defaultAddress &&
                                      defaultAddress.barangay !== ""
                                        ? defaultAddress.barangay
                                        : "Update..."
                                    }
                                    value={
                                      defaultAddress
                                        ? defaultAddress.barangay
                                        : ""
                                    }
                                    readOnly
                                  />
                                </FormGroup>
                              </Col>
                              <Col lg="6">
                                <FormGroup>
                                  <label
                                    className="form-control-label"
                                    htmlFor="input-country">
                                    City
                                  </label>
                                  <Input
                                    className="form-control-alternative"
                                    id="input-country"
                                    type="text"
                                    placeholder={
                                      defaultAddress &&
                                      defaultAddress.city !== ""
                                        ? defaultAddress.city
                                        : "Update..."
                                    }
                                    value={
                                      defaultAddress ? defaultAddress.city : ""
                                    }
                                    readOnly
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
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

export default UpdateUser;
