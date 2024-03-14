import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import Sidebar from "components/Sidebar/Sidebar";
import MetaData from "components/layout/MetaData";
import AdminNavbar from "components/Navbars/AdminNavbar";
import Header2 from "components/Headers/Header2";
import AdminFooter from "components/Footers/AdminFooter.js";

import swal from "sweetalert";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  singleBarangayHealth,
  updateBarangayHealth,

  clearErrors,
} from "actions/barangayhealthActions";
import {
  UPDATE_BARANGAYHEALTH_RESET,

} from "../../constants/barangayHealthConstants";

const UpdateBarangayHealth = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { barangayhealthdetails } = useSelector(
    (state) => state.singleBarangayHealth
  );

  const { error, isUpdated } = useSelector(
    (state) => state.barangayHealthrecord
  );

  const { id } = useParams();

  const [dateVisited, setdateVisited] = useState("");
  const [certPotability, setcertPotability] = useState("");
  const [certPotabilityPreview, setcertPotabilityPreview] = useState(
    "/images/default_avatar.jpg"
  );
  const [storeId, setStoreId] = useState("");

  useEffect(() => {
    if (barangayhealthdetails && barangayhealthdetails._id !== id) {
      dispatch(singleBarangayHealth(id));
    } else {
      const dateObject = new Date(barangayhealthdetails.dateVisited);
      setdateVisited(dateObject.toISOString().split("T")[0]);
      setcertPotabilityPreview(barangayhealthdetails.certPotability.url);
      setStoreId(barangayhealthdetails.storebranch);
    }

    if (error) {
      swal("Error Updating!", "", "error");
      dispatch(clearErrors());
    }

    if (isUpdated) {
      swal("Updated Successfully!", "", "success");
      navigate(`/store/barangaycleaning/${storeId}`, {
        replace: true,
      });
      dispatch({
        type: UPDATE_BARANGAYHEALTH_RESET,
      });
    }


  }, [dispatch, error, navigate, barangayhealthdetails, isUpdated]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("dateVisited", dateVisited);
    formData.append("certPotability", certPotability);

    dispatch(updateBarangayHealth(barangayhealthdetails._id, formData));
    //console.log(formData)
  };

  const onChange = (e) => {
    const file = e.target.files[0];
    const allowedImageTypes = ['image/png', 'image/jpeg', 'image/jpg']; // Allowed image file types
  
    if (e.target.name === "certPotability") {
      if (file && allowedImageTypes.includes(file.type)) {
        const reader = new FileReader();
  
        reader.onload = () => {
          if (reader.readyState === 2) {
            setcertPotabilityPreview(reader.result);
            setcertPotability(reader.result);
          }
        };
  
        reader.readAsDataURL(e.target.files[0]);
      } else {
        swal("Please select a valid image file (PNG, JPEG, JPG).", "", "error");
        e.target.value = null; 
      }
    } 
  
  };

  return (
    <>
      <MetaData title={"Update Record"} />
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
                            <h3 className="mb-0">
                              Barangay Health Sanitation Record
                            </h3>
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
                                  Certification
                                </label>

                                <div className="text-center">
                                  <img
                                    className="avatar border-gray"
                                    style={{
                                      width: "200px",
                                      height: "200px",
                                      borderRadius: "50%",
                                    }}
                                    src={certPotabilityPreview}
                                    alt="documentation"
                                  />
                                </div>

                                <div className="custom-file">
                                  <input
                                    type="file"
                                    className="custom-file-input"
                                    name="certPotability"
                                    accept="images/*"
                                    onChange={onChange}
                                  />
                                  <label
                                    htmlFor="customFile"
                                    className="custom-file-label">
                                    Choose Image
                                  </label>
                                </div>
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col lg="12">
                              <FormGroup>
                                <label className="form-control-label">
                                  Date Visited:
                                </label>
                                <input
                                  type="date"
                                  className="form-control"
                                  value={dateVisited}
                                  onChange={(e) =>
                                    setdateVisited(e.target.value)
                                  }
                                />
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
                              onClick={() =>
                                navigate(`/store/barangaycleaning/${storeId}`)
                              }>
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

export default UpdateBarangayHealth;
