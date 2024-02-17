import React, { Fragment, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { allUsers, deleteUser } from "actions/userActions";
import { MDBDataTable } from "mdbreact";

import Sidebar from "components/Sidebar/Sidebar";
import MetaData from "components/layout/MetaData";
import AdminNavbar from "components/Navbars/AdminNavbar";
import Header2 from "components/Headers/Header2";
import AdminFooter from "components/Footers/AdminFooter.js";

import { DELETE_USER_RESET } from "../../constants/userConstants";
import swal from "sweetalert";

import { clearErrors, newemployee } from "../../actions/userActions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";

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

const EmployeeList = (args) => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { loading, error, users } = useSelector((state) => state.allUsers);
  const { isDeleted } = useSelector((state) => state.user);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [empuser, setUser] = useState({
    fname: "",
    lname: "",
    phone: "",
    houseNo: "",
    streetName: "",
    purokNum: "",
    barangay: "",
    city: "",
    email: "",
    password: "",
  });
  const [role, setRole] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
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

  const [avatar, setAvatar] = useState("");
  const [medcert, setMedcert] = useState("");
  const [barangayclearance, setBarangayclearance] = useState("");

  const [selectedFileName, setSelectedFileName] = useState("");
  const [selectedFileNameBC, setSelectedFileNameBC] = useState("");

  const [avatarPreview, setAvatarPreview] = useState(
    "/images/default_avatar.jpg"
  );

  const [employeeDetailsModal, setEmployeeDetailsModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState({});

  const openEmployeeDetailsModal = (employee) => {
    setSelectedEmployee(employee);
    setEmployeeDetailsModal(true);
  };

  useEffect(() => {
    setRole("employee");
    dispatch(allUsers());
    if (isDeleted) {
      navigate("/employeelist");
      dispatch({ type: DELETE_USER_RESET });
    }
  }, [dispatch, isDeleted, navigate]);

  const submitHandler = (e) => {
    //e.preventDefault();

    const formData = new FormData();
    formData.set("fname", e.fname);
    formData.set("lname", e.lname);
    formData.set("phone", e.phone);
    formData.set("houseNo", e.houseNo);
    formData.set("streetName", e.streetName);
    formData.set("purokNum", e.purokNum);
    formData.set("barangay", e.barangay);
    formData.set("city", e.city);
    formData.set("email", e.email);
    formData.set("password", e.password);
    formData.set("avatar", avatar);
    formData.set("medcert", medcert);
    formData.set("barangayclearance", barangayclearance);
    formData.set("role", role);

    dispatch(newemployee(formData));
    toggle();
    window.location.reload();
    notifySuccess(
      "An email sent to your employee's email account, please verify"
    );
  };

  const deleteUserHandler = (id) => {
    swal({
      title: "Are you sure you want to delete this user?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("User has been deleted!", "", "success");
        dispatch(deleteUser(id));
      } else {
        swal("User is not deleted!", "", "info");
      }
    });
  };

  const onChange = (e) => {
    if (e.target.name === "medcert") {
      // Handle medcert file upload
      const medcertfile = e.target.files[0] ? e.target.files[0].name : "";
      setSelectedFileName(medcertfile);
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setMedcert(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else if (e.target.name === "barangayclearance") {
      // Handle barangayclearance file upload
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
      setUser({ ...empuser, [e.target.name]: e.target.value });
    }
  };

  const setUsers = () => {
    // const filter = user ? users.filter((x) => x._id !== user._id) : users;
    const filter = user
      ? users.filter((x) => x._id !== user._id && x.role === "employee")
      : users;

    const data = {
      columns: [
        {
          label: "Profile",
          field: "image",
          sort: "asc",
        },

        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Phone",
          field: "phone",
          sort: "asc",
        },
        {
          label: "Address",
          field: "address",
          sort: "asc",
        },

        {
          label: "Email",
          field: "email",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],

      rows: [],
    };

    filter.forEach((user) => {
      data.rows.push({
        name: `${user.fname} ${user.lname}`,
        phone: user.phone,
        address: `${user.houseNo} ${user.purokNum} ${user.streetName} ${user.barangay} ${user.city}`,
        email: user.email,
        image: (
          <img
            className="d-block w-100"
            src={user.avatar.url}
            alt={user.title}
            img
            style={{ width: 50, height: 50 }}
          />
        ),
        actions: (
          <Fragment>
            {/* <button
              className="btn btn-info py-1 px-2 ml-2"
              onClick={() => openEmployeeDetailsModal(user)}>
              <i className="fa fa-info-circle"></i>
            </button> */}
            <button
              className="btn btn-primary py-1 px-2 ml-2"
              onClick={() => navigate(`/employee/details/${user._id}`)}>
              <i className="fa fa-info-circle"></i>
            </button>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => deleteUserHandler(user._id)}>
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
      <MetaData title={"Employee(s)"} />
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
                  <h3 className="mb-0">List of Employee(s)</h3>
                </Col>
                <Col md="4">
                  <Button
                    block
                    className="mb-3"
                    color="primary"
                    type="button"
                    onClick={toggle}>
                    Register New Employee
                  </Button>
                  <Modal
                    className="modal-dialog-centered"
                    isOpen={modal}
                    toggle={toggle}
                    {...args}>
                    <Form role="form" onSubmit={handleSubmit(submitHandler)}>
                      <ModalHeader toggle={toggle}>
                        Register New Employee
                      </ModalHeader>
                      <ModalBody>
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-circle-08" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <input
                              placeholder="First Name..."
                              className="form-control"
                              type="text"
                              name="fname"
                              {...register("fname", {
                                required: "Please enter a valid name.",
                              })}
                            />
                          </InputGroup>
                          {errors.fname && (
                            <h2
                              className="h1-seo"
                              style={{ color: "red", fontSize: "small" }}>
                              {errors.fname.message}
                            </h2>
                          )}
                        </FormGroup>

                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-circle-08" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <input
                              placeholder="Last Name..."
                              className="form-control"
                              type="text"
                              name="lname"
                              {...register("lname", {
                                required: "Please enter a valid name.",
                              })}
                            />
                          </InputGroup>
                          {errors.lname && (
                            <h2
                              className="h1-seo"
                              style={{ color: "red", fontSize: "small" }}>
                              {errors.lname.message}
                            </h2>
                          )}
                        </FormGroup>

                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-mobile-button" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <input
                              placeholder="Phone..."
                              className="form-control"
                              type="text"
                              name="phone"
                              {...register("phone", {
                                required: "Please enter a valid phone no.",
                              })}
                            />
                          </InputGroup>
                          {errors.phone && (
                            <h2
                              className="h1-seo"
                              style={{ color: "red", fontSize: "small" }}>
                              {errors.phone.message}
                            </h2>
                          )}
                        </FormGroup>

                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni ni-pin-3" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <input
                              placeholder="House No..."
                              className="form-control"
                              type="text"
                              name="houseNo"
                              {...register("houseNo", {
                                required: "Please enter a valid house no.",
                              })}
                            />
                          </InputGroup>
                          {errors.houseNo && (
                            <h2
                              className="h1-seo"
                              style={{ color: "red", fontSize: "small" }}>
                              {errors.houseNo.message}
                            </h2>
                          )}
                        </FormGroup>

                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni ni-pin-3" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <input
                              placeholder="Purok No."
                              className="form-control"
                              type="text"
                              name="purokNum"
                              {...register("purokNum", {
                                required: "Please enter a valid purok no.",
                              })}
                            />
                          </InputGroup>
                          {errors.purokNum && (
                            <h2
                              className="h1-seo"
                              style={{ color: "red", fontSize: "small" }}>
                              {errors.purokNum.message}
                            </h2>
                          )}
                        </FormGroup>

                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-mobile-button" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <input
                              placeholder="Street Name..."
                              className="form-control"
                              type="text"
                              name="streetName"
                              {...register("streetName", {
                                required: "Please enter a valid house no.",
                              })}
                            />
                          </InputGroup>
                          {errors.streetName && (
                            <h2
                              className="h1-seo"
                              style={{ color: "red", fontSize: "small" }}>
                              {errors.streetName.message}
                            </h2>
                          )}
                        </FormGroup>

                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni ni-pin-3" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <input
                              placeholder="Barangay"
                              className="form-control"
                              type="text"
                              name="barangay"
                              {...register("barangay", {
                                required: "Please enter a valid barangay",
                              })}
                            />
                          </InputGroup>
                          {errors.barangay && (
                            <h2
                              className="h1-seo"
                              style={{ color: "red", fontSize: "small" }}>
                              {errors.barangay.message}
                            </h2>
                          )}
                        </FormGroup>

                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni ni-pin-3" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <input
                              placeholder="City"
                              className="form-control"
                              type="text"
                              name="city"
                              {...register("city", {
                                required: "Please enter a valid city",
                              })}
                            />
                          </InputGroup>
                          {errors.city && (
                            <h2
                              className="h1-seo"
                              style={{ color: "red", fontSize: "small" }}>
                              {errors.city.message}
                            </h2>
                          )}
                        </FormGroup>

                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-email-83" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <input
                              placeholder="Email..."
                              className="form-control"
                              name="email"
                              {...register("email", {
                                required: "Email is required",
                                pattern: {
                                  value:
                                    /^[a-zA-Z0-9_.+-]+@[a-zAZ0-9-]+\.[a-zA-Z0-9-.]+$/i,
                                  message:
                                    "Entered email is in the wrong format",
                                },
                              })}
                            />
                          </InputGroup>
                          {errors.email && (
                            <div className="error">
                              {errors.email.type === "required" && (
                                <h2
                                  className="h1-seo"
                                  style={{
                                    color: "red",
                                    fontSize: "small",
                                  }}>
                                  {errors.email.message}
                                </h2>
                              )}
                              {errors.email.type === "pattern" && (
                                <h2
                                  className="h1-seo"
                                  style={{
                                    color: "red",
                                    fontSize: "small",
                                  }}>
                                  {errors.email.message}
                                </h2>
                              )}
                            </div>
                          )}
                        </FormGroup>

                        <FormGroup>
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-lock-circle-open" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <input
                              placeholder="Password..."
                              className="form-control"
                              type="password"
                              name="password"
                              {...register("password", {
                                required: "Password is required",
                              })}
                            />
                          </InputGroup>
                          {errors.password && (
                            <h2
                              className="h1-seo"
                              style={{ color: "red", fontSize: "small" }}>
                              {errors.password.message}
                            </h2>
                          )}
                        </FormGroup>

                        <FormGroup>
                          <label className="form-control-label">
                            Medical Certificate
                          </label>

                          <div className="row">
                            <div className="col-sm-12">
                              <div className="custom-file">
                                <input
                                  type="file"
                                  name="medcert"
                                  className="custom-file-input"
                                  id="customFileMedCert"
                                  accept="images/*"
                                  {...register("medcert", {
                                    required: true,
                                  })}
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
                          {errors.medcert && !medcert && (
                            <h2
                              className="h1-seo"
                              style={{
                                color: "red",
                                fontSize: "small",
                              }}>
                              Please select a valid image.
                            </h2>
                          )}
                        </FormGroup>

                        <FormGroup>
                          <label className="form-control-label">
                            Barangay Clearance
                          </label>

                          <div className="row">
                            <div className="col-sm-12">
                              <div className="custom-file">
                                <input
                                  type="file"
                                  name="barangayclearance" // Change the name to barangayclearance
                                  className="custom-file-input"
                                  id="customFileBarangayClearance" // Change the ID
                                  accept="images/*"
                                  {...register("barangayclearance", {
                                    required: true,
                                  })}
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
                          {errors.barangayclearance && !barangayclearance && (
                            <h2
                              className="h1-seo"
                              style={{
                                color: "red",
                                fontSize: "small",
                              }}>
                              Please select a valid image.
                            </h2>
                          )}
                        </FormGroup>
                      </ModalBody>
                      <ModalFooter>
                        <Button color="primary" type="submit">
                          Register
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
                data={setUsers()}
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

      <Modal
        className="modal-dialog-centered"
        isOpen={employeeDetailsModal}
        toggle={() => setEmployeeDetailsModal(!employeeDetailsModal)}
        {...args}>
        <ModalHeader
          toggle={() => setEmployeeDetailsModal(!employeeDetailsModal)}>
          Employee Details
        </ModalHeader>
        <ModalBody>
          <p>
            <strong>Profile:</strong>{" "}
            <img
              src={selectedEmployee.avatar?.url || "/images/default_avatar.jpg"}
              alt="Avatar"
              style={{ width: 50, height: 50 }}
            />
          </p>
          <p>
            <strong>Name:</strong>{" "}
            {`${selectedEmployee.fname} ${selectedEmployee.lname}`}
          </p>
          <p>
            <strong>Phone:</strong> {selectedEmployee.phone}
          </p>
          <p>
            <strong>Address:</strong>{" "}
            {`${selectedEmployee.houseNo}, ${selectedEmployee.purokNum}, ${selectedEmployee.streetName}, ${selectedEmployee.barangay}, ${selectedEmployee.city}`}
          </p>
          <p>
            <strong>Email:</strong> {selectedEmployee.email}
          </p>

          <p>
            <strong>Medical Certificate:</strong>{" "}
            <img
              src={
                selectedEmployee.medcert?.url || "/images/default_avatar.jpg"
              }
              alt="MedCert"
              style={{ width: 100, height: 100 }}
            />
          </p>
          <p>
            <strong>Barangay Clearance:</strong>{" "}
            <img
              src={
                selectedEmployee.barangayclearance?.url ||
                "/images/default_avatar.jpg"
              }
              alt="BarangayClearance"
              style={{ width: 100, height: 100 }}
            />
          </p>
        </ModalBody>

        <ModalFooter>
          <Button
            color="secondary"
            onClick={() => setEmployeeDetailsModal(!employeeDetailsModal)}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default EmployeeList;
