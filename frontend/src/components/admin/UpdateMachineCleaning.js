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
  singleMachineCleaningRecord,
  updateMachineCleaning,
  clearErrors,
  deleteMachineCleaning,
} from "actions/machinecleaningActions";
import {
  UPDATE_MACHINECLEANING_RESET,
  DELETE_MACHINECLEANING_RESET,
} from "../../constants/machinecleaningConstants";

const UpdateMachineCleaning = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { machinecleaningdetails } = useSelector(
    (state) => state.singleMachineCleaning
  );

  const { error, isUpdated, isDeleted } = useSelector(
    (state) => state.machinerecord
  );
  const { id } = useParams();

  const [notes, setNotes] = useState("");
  const [cleaningImage, setCleaningImage] = useState("");
  const [storeId, setStoreId] = useState("");
  const [cleaningImagePreview, setCleaningImagePreview] = useState(
    "/images/default_avatar.jpg"
  );

  useEffect(() => {
    //setRole("rider");

    if (machinecleaningdetails && machinecleaningdetails._id !== id) {
      dispatch(singleMachineCleaningRecord(id));
    } else {
      setNotes(machinecleaningdetails.notes);
      setCleaningImagePreview(machinecleaningdetails.cleaningImage.url);
      setStoreId(machinecleaningdetails.storebranch);
    }

    if (error) {
      swal("Error Updating!", "", "error");
      dispatch(clearErrors());
    }

    if (isUpdated) {
      swal("Updated Successfully!", "", "success");
      navigate(`/create/store/machincecleaning/${storeId}`, {
        replace: true,
      });
      dispatch({
        type: UPDATE_MACHINECLEANING_RESET,
      });
    }

    if (isDeleted) {
      navigate(`/create/store/machincecleaning/${storeId}`);
      dispatch({ type: DELETE_MACHINECLEANING_RESET });
    }
  }, [dispatch, error, isUpdated, navigate, machinecleaningdetails, isDeleted]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("notes", notes);
    formData.append("cleaningImage", cleaningImage);

    dispatch(updateMachineCleaning(machinecleaningdetails._id, formData));
    //console.log(formData)
  };

  const onChange = (e) => {
    if (e.target.name === "cleaningImage") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setCleaningImagePreview(reader.result);
          setCleaningImage(reader.result);
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
                            <h3 className="mb-0">Machine Cleaning Record</h3>
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
                                Documentation
                              </label>

                              <div className="text-center">
                                <img
                                  className="avatar border-gray"
                                  style={{
                                    width: "200px",
                                    height: "200px",
                                    borderRadius: "50%",
                                  }}
                                  src={cleaningImagePreview}
                                  alt="documentation"
                                />
                              </div>

                              <div className="custom-file">
                                <input
                                  type="file"
                                  className="custom-file-input"
                                  name="cleaningImage"
                                  accept="images/*"
                                  onChange={onChange}
                                />
                                <label
                                  htmlFor="customFile"
                                  className="custom-file-label">
                                  Choose Image
                                </label>
                              </div>
                            </Col>
                            <Col lg="9">
                              <Row>
                                <Col lg="12">
                                  <FormGroup>
                                    <label className="form-control-label">
                                      Notes
                                    </label>
                                    <textarea
                                      type="text"
                                      className="form-control"
                                      placeholder="Add notes here"
                                      value={notes}
                                      onChange={(e) => setNotes(e.target.value)}
                                      rows={11}
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
                              onClick={() =>
                                navigate(
                                  `/create/store/machincecleaning/${storeId}`
                                )
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

export default UpdateMachineCleaning;
