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
  singleBusinessPermitRecord,
  updateBusinessPermit,
  clearErrors,
} from "actions/businesspermitAction";
import { UPDATE_BUSINESSPERMIT_RESET } from "../../constants/businesspermitConstant";

const UpdateBusinessPermit = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { businesspermitdetails } = useSelector(
    (state) => state.singleBusinessPermit
  );

  const { error, isUpdated } = useSelector(
    (state) => state.businesspermitrecord
  );

  const { id } = useParams();

  const [dateIssued, setdateIssued] = useState("");
  const [permitImage, setpermitImage] = useState("");
  const [permitPreview, setpermitPreview] = useState(
    "/images/default_avatar.jpg"
  );
  const [storeId, setStoreId] = useState("");

  useEffect(() => {
    if (businesspermitdetails && businesspermitdetails._id !== id) {
      dispatch(singleBusinessPermitRecord(id));
    } else {
      const dateObject = new Date(businesspermitdetails.dateIssued);
      setdateIssued(dateObject.toISOString().split("T")[0]);
      setpermitPreview(businesspermitdetails.permitImage.url);
    }

    if (isUpdated) {
      swal("Updated Successfully!", "", "success");
      navigate(
        `/create/store/businesspermit/${businesspermitdetails.storebranch}`,
        {
          replace: true,
        }
      );
      dispatch({
        type: UPDATE_BUSINESSPERMIT_RESET,
      });
    }
  }, [dispatch, error, navigate, businesspermitdetails, isUpdated]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("dateIssued", dateIssued);
    formData.append("permitImage", permitImage);

    dispatch(updateBusinessPermit(id, formData));
    //console.log(formData)
  };

  const onChange = (e) => {
    if (e.target.name === "permitImage") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setpermitPreview(reader.result);
          setpermitImage(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
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
                            <h3 className="mb-0">Business Permit Record</h3>
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
                                    //className="avatar border-gray"
                                    style={{
                                      width: "300px",
                                      height: "auto",
                                      //borderRadius: "50%",
                                    }}
                                    src={permitPreview}
                                    alt="documentation"
                                    onClick={() =>
                                      window.open(permitPreview, "_blank")
                                    }
                                  />
                                </div>

                          

                                <div className="custom-file">
                                  <input
                                    type="file"
                                    className="custom-file-input"
                                    name="permitImage"
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
                                  value={dateIssued}
                                  max={
                                    new Date(
                                      new Date().getTime() + 24 * 60 * 60 * 1000
                                    )
                                      .toISOString()
                                      .split("T")[0]
                                  } // Setting min attribute to today's date
                                  onChange={(e) =>
                                    setdateIssued(e.target.value)
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
                                navigate(`/store/businesspermit/${storeId}`)
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

export default UpdateBusinessPermit;
