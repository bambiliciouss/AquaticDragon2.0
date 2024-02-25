import React, { Fragment, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
  getStoreDetails,
  updateStoreBranch,
  clearErrors,
} from "actions/storebranchActions";
import { MDBDataTable } from "mdbreact";

import Sidebar from "components/Sidebar/Sidebar";
import MetaData from "components/layout/MetaData";
import AdminNavbar from "components/Navbars/AdminNavbar";
import Header2 from "components/Headers/Header2";
import AdminFooter from "components/Footers/AdminFooter.js";

import swal from "sweetalert";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UPDATE_STOREBRANCH_RESET } from "../../constants/storebranchConstants";

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

const UpdateStoreBranch = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { error, isUpdated } = useSelector((state) => state.storeBranch);
  const { storeBranch } = useSelector((state) => state.storeDetails);
  const { id } = useParams();

  const [houseNo, setHouseNo] = useState("");
  const [streetName, setStreetName] = useState("");
  const [purokNum, setPurokNum] = useState("");
  const [barangay, setBarangay] = useState("");
  const [city, setCity] = useState("");
  const [storeImage, setStoreImage] = useState("");
  const [deliveryFee, setDeliveryFee] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "/images/default_avatar.jpg"
  );

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
    if (storeBranch && storeBranch._id !== id) {
      dispatch(getStoreDetails(id));
    } else {
      setHouseNo(storeBranch.address.houseNo);
      setStreetName(storeBranch.address.streetName);
      setPurokNum(storeBranch.address.purokNum);
      setBarangay(storeBranch.address.barangay);
      setCity(storeBranch.address.city);
      setAvatarPreview(storeBranch.storeImage.url);
      setDeliveryFee(storeBranch.deliverFee);
    }

    if (error) {
      swal(error, "", "error");
      dispatch(clearErrors());
    }

    if (isUpdated) {
      //notifySuccess("Update Successfully");
      swal("Updated Successfully", "", "success");
      navigate("/storebranchlist", { replace: true });
      dispatch({
        type: UPDATE_STOREBRANCH_RESET,
      });
    }
  }, [dispatch, navigate, storeBranch, error, isUpdated]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("address[houseNo]", houseNo);
    formData.append("address[streetName]", streetName);
    formData.append("address[purokNum]", purokNum);
    formData.append("address[barangay]", barangay);
    formData.append("address[city]", city);
    formData.append("deliverFee", deliveryFee);
    formData.append("storeImage", storeImage);

    dispatch(updateStoreBranch(id, formData));
  };

  const onChange = (e) => {
    if (e.target.name === "storeImage") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setStoreImage(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <>
      <MetaData title={"Update Store"} />
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
                            <h3 className="mb-0">Store's Details</h3>
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
                                  name="storeImage"
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
                            <Col lg="9">
                              <Row>
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

                                <Col lg="5">
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

                              <Row>
                                <Col lg="12">
                                  <FormGroup>
                                    <label className="form-control-label">
                                      Delivery Fee
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Delivery Fee"
                                      value={deliveryFee}
                                      onChange={(e) =>
                                        setDeliveryFee(e.target.value)
                                      }
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
                              onClick={() => navigate("/storebranchlist")}>
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

export default UpdateStoreBranch;
