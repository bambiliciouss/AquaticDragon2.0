import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form"; // Import the useForm hook

import { MDBDataTable } from "mdbreact";
import swal from "sweetalert";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
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
  Input,
  Label,
  Badge,
} from "reactstrap";

import MetaData from "components/layout/MetaData";
import Sidebar from "components/Sidebar/Sidebar";
import AdminNavbar from "components/Navbars/AdminNavbar";
import Header2 from "components/Headers/Header2";
import AdminFooter from "components/Footers/AdminFooter.js";

import { useNavigate } from "react-router-dom";

import {
  createAddress,
  allAddress,
  singleAddress,
  updateAddress,
  deleteAddress,
  clearErrors,
  setDefaultAddress,
} from "actions/addressAction";
import {
  CREATE_ADDRESS_RESET,
  UPDATE_ADDRESS_RESET,
  DELETE_ADDRESS_RESET,
  SET_ADDRESS_RESET,
} from "constants/addressConstants";

const AdminProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use useNavigate hook from react-router-dom
  const { user, loading } = useSelector((state) => state.auth);
  const { addresscreated } = useSelector((state) => state.newAddress);
  const { useraddress } = useSelector((state) => state.allAddress);
  const { isDeleted, isUpdated, error, isDefault } = useSelector(
    (state) => state.addressrecord
  );
  const { addressdetails } = useSelector((state) => state.singleAddress);
  const [isModalOpen, setModalOpen] = useState(false);
  const toggleModal = () => setModalOpen(!isModalOpen);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset: resetForm,
  } = useForm();

  const [houseNo, setHouseNo] = useState("");
  const [streetName, setStreetName] = useState("");
  const [purokNum, setPurokNum] = useState("");
  const [barangay, setBarangay] = useState("");
  const [city, setCity] = useState("");
  const [modalID, setModalID] = useState("");

  useEffect(() => {
    dispatch(allAddress());
    // console.group(modalID);
    if (addresscreated) {
      console.log("success ");
      swal("New Address is Added!", "", "success");
      toggleModal();
      navigate("/admin-profile", { replace: true });
      dispatch({
        type: CREATE_ADDRESS_RESET,
      });
      resetForm();
    }

    if (addressdetails && addressdetails._id !== modalID) {
      dispatch(singleAddress(modalID));
    } else {
      if (addressdetails) {
        setHouseNo(addressdetails.houseNo);
        setStreetName(addressdetails.streetName);
        setPurokNum(addressdetails.purokNum);
        setBarangay(addressdetails.barangay);
        setCity(addressdetails.city);
      }
    }

    if (isUpdated) {
      swal("Updated Successfully!", "", "success");

      navigate("/admin-profile", { replace: true });
      dispatch({
        type: UPDATE_ADDRESS_RESET,
      });

      toggleEditModal();
      setHouseNo("");
      setStreetName("");
      setPurokNum("");
      setBarangay("");
      setCity("");
    }

    if (error) {
      swal(error, "", "error");
      dispatch(clearErrors());
    }

    if (isDeleted) {
      navigate("/admin-profile");
      dispatch({ type: DELETE_ADDRESS_RESET });
    }
    if (isDefault) {
      navigate("/admin-profile");
      dispatch({ type: SET_ADDRESS_RESET });
    }
  }, [
    dispatch,
    addresscreated,
    addressdetails,
    modalID,
    isUpdated,
    error,
    isDeleted,
    isDefault,
  ]);

  const submitHandler = (e) => {
    //e.preventDefault();

    const formData = new FormData();
    formData.set("houseNo", e.houseNo);
    formData.set("streetName", e.streetName);
    formData.set("purokNum", e.purokNum);
    formData.set("barangay", e.barangay);
    formData.set("city", e.city);
    dispatch(createAddress(formData));
  };

  const updateHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("houseNo", houseNo);
    formData.append("streetName", streetName);
    formData.append("purokNum", purokNum);
    formData.append("barangay", barangay);
    formData.append("city", city);

    dispatch(updateAddress(modalID, formData));

    console.log(formData);
  };
  //console.log("State values:", houseNo, streetName, purokNum, barangay, city);
  const deleteHandler = (id) => {
    swal({
      title: "Are you sure you want to delete this address?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Address has been deleted!", "", "success");
        dispatch(deleteAddress(id));
      } else {
        swal("Address is not deleted!", "", "info");
      }
    });
  };

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const toggleEditModal = () => setEditModalOpen(!isEditModalOpen);

  const EditModal = (id) => {
    setModalID(id);
    toggleEditModal();
  };

  const setDefAddress = (id) => {
    dispatch(setDefaultAddress(id));
    swal("Set Default Address Sucessfully", "", "success");
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

        {
          label: "Actions",
          field: "actions",
        },
      ],

      rows: [],
    };

    useraddress.forEach((useraddresses) => {
      data.rows.push({
        address: `${useraddresses.houseNo} ${useraddresses.purokNum} ${useraddresses.streetName} ${useraddresses.barangay} ${useraddresses.city}`,
        actions: (
          <Fragment>
            <button
              className="btn btn-primary py-1 px-2 ml-2"
              onClick={() => EditModal(useraddresses._id)}>
              <i className="fa fa-info-circle"></i>
            </button>

            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => deleteHandler(useraddresses._id)}>
              <i className="fa fa-trash"></i>
            </button>
          </Fragment>
        ),
        default: (
          <Fragment>
            <Badge
              color={useraddresses.isDefault ? "success" : "secondary"}
              // href=""
              onClick={() => setDefAddress(useraddresses._id)}
              style={{ cursor: "pointer" }}>
              {useraddresses.isDefault ? "Default" : "Default"}
            </Badge>
          </Fragment>
        ),
      });
    });

    return data;
  };

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
                  <h3 className="mb-0">My account</h3>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
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
                          width: "150px",
                          height: "150px",
                          borderRadius: "40%",
                        }}
                        src={user && user.avatar && user.avatar.url}
                        alt="User"
                      />
                      <div className="button-container text-center">
                        <div className="btn-container d-block">
                          <button
                            className="btn btn-info btn-sm mb-2"
                            onClick={() => navigate("/admin/update")}>
                            Edit Profile
                          </button>
                        </div>
                        <div className="btn-container d-block">
                          <button
                            className="btn btn-info btn-sm mb-2"
                            onClick={() => navigate("/admin/password/update")}>
                            Change Password
                          </button>
                        </div>
                        <div className="btn-container d-block">
                          <Button
                            color="info"
                            size="sm"
                            className="mb-3"
                            onClick={toggleModal}>
                            Add Address
                          </Button>
                        </div>
                      </div>
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
                      <Col lg="12">
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
              <h6 className="heading-small text-muted mb-4">Addresses</h6>

              <Modal isOpen={isModalOpen} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Add Address</ModalHeader>

                <Form role="form" onSubmit={handleSubmit(submitHandler)}>
                  <ModalBody>
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
                        <select
                          className="form-control"
                          name="barangay"
                          {...register("barangay", {
                            required: "Please select a barangay",
                          })}>
                          <option value="" selected disabled>
                            Select Barangay
                          </option>
                          <option value="Central Bicutan">
                            Central Bicutan
                          </option>
                          <option value="Upper Bicutan">Upper Bicutan</option>
                          <option value="New Lower Bicutan">
                            New Lower Bicutan
                          </option>
                          {/* Add more options as needed */}
                        </select>
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
                            <i className="ni ni-pin-3" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <select
                          className="form-control"
                          name="city"
                          {...register("city", {
                            required: "Please select a city",
                          })}>
                          <option value="" selected disabled>
                            Select City
                          </option>
                          <option value="Taguig City">Taguig City</option>
                          {/* Add more options as needed */}
                        </select>
                      </InputGroup>
                      {errors.city && (
                        <h2
                          className="h1-seo"
                          style={{ color: "red", fontSize: "small" }}>
                          {errors.city.message}
                        </h2>
                      )}
                    </FormGroup>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" type="submit">
                      Register
                    </Button>{" "}
                    <Button color="secondary" onClick={toggleModal}>
                      Cancel
                    </Button>
                  </ModalFooter>
                </Form>
              </Modal>

              <MDBDataTable
                data={setAddresses()}
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

        <Modal isOpen={isEditModalOpen} toggle={toggleEditModal}>
          <ModalHeader toggle={toggleEditModal}>Edit Address</ModalHeader>
          <Form onSubmit={updateHandler} encType="multipart/form-data">
            <ModalBody>
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

              <FormGroup>
                <label className="form-control-label">Purok No.</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Purok No."
                  value={purokNum}
                  onChange={(e) => setPurokNum(e.target.value)}
                />
              </FormGroup>
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
                  <option value="New Lower Bicutan">New Lower Bicutan</option>
                </select>
              </FormGroup>

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
            </ModalBody>
            <ModalFooter>
              <Button color="primary" type="submit">
                Save Changes
              </Button>{" "}
              <Button color="secondary" onClick={toggleEditModal}>
                Cancel
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default AdminProfile;
