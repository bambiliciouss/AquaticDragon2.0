import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import Sidebar from "components/Sidebar/Sidebar";
import MetaData from "components/layout/MetaData";
import AdminNavbar from "components/Navbars/AdminNavbar";
import Header2 from "components/Headers/Header2";
import AdminFooter from "components/Footers/AdminFooter.js";
import { useForm } from "react-hook-form"; // Import the useForm hook
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
  Label,
  Input,
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
  SINGLE_MACHINECLEANING_RESET,
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
  const [dateIssued, setDateIssued] = useState(new Date());
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm();
  const [selectedItems, setSelectedItems] = useState({
    cleanTank: false,
    cleanPipeline: false,
    cleanSedimentFilters: false,
    cleanBrineTank: false,
    replaceTank: false,
    replaceBoosterPump: false,
    replacePipelines: false,
    replaceSedimentFilter: false,
  });
  const handleCheckboxChange = (event) => {
    setSelectedItems({
      ...selectedItems,
      [event.target.name]: event.target.checked,
    });
  };
  useEffect(() => {
    //setRole("rider");

    if (machinecleaningdetails && machinecleaningdetails._id !== id) {
      dispatch(singleMachineCleaningRecord(id));
    } else {
      setSelectedItems(machinecleaningdetails.checklist);
      setDateIssued(new Date(machinecleaningdetails.dateIssued));
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
      dispatch({
        type: SINGLE_MACHINECLEANING_RESET
      })
    }

    if (isDeleted) {
      navigate(`/create/store/machincecleaning/${storeId}`);
      dispatch({ type: DELETE_MACHINECLEANING_RESET });
    }
  }, [dispatch, error, isUpdated, navigate, machinecleaningdetails, isDeleted]);
  useEffect(() => {
    setValue("cleanTank", selectedItems.cleanTank);
    setValue("cleanPipeline", selectedItems.cleanPipeline);
    setValue("cleanSedimentFilters", selectedItems.cleanSedimentFilters);
    setValue("cleanBrineTank", selectedItems.cleanBrineTank);
    setValue("replaceBoosterPump", selectedItems.replaceBoosterPump);
    setValue("replaceTank", selectedItems.replaceTank);
    setValue("replacePipelines", selectedItems.replacePipelines);
    setValue("replaceSedimentFilter", selectedItems.replaceSedimentFilter);
    setValue("dateIssued", dateIssued.toISOString().split("T")[0]);
  }, [selectedItems, dateIssued, setValue]);
  const submitHandler = (e) => {
    

    const formData = new FormData();
    console.log('dateIssued', e.dateIssued)
    formData.set("dateIssued", e.dateIssued);
    formData.set("selectedItems", JSON.stringify(selectedItems));

    dispatch(updateMachineCleaning(machinecleaningdetails._id, formData));
    //console.log(formData)
  };

  // const onChange = (e) => {
  //   if (e.target.name === "cleaningImage") {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       if (reader.readyState === 2) {
  //         setCleaningImagePreview(reader.result);
  //         setCleaningImage(reader.result);
  //       }
  //     };

  //     reader.readAsDataURL(e.target.files[0]);
  //   }
  // };
  const onChange = (e) => {
    const file = e.target.files[0];
    const allowedImageTypes = ["image/png", "image/jpeg", "image/jpg"]; // Allowed image file types

    if (e.target.name === "cleaningImage") {
      if (file && allowedImageTypes.includes(file.type)) {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setCleaningImagePreview(reader.result);
            setCleaningImage(reader.result);
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
                            <h3 className="mb-0">Machine Cleaning Record</h3>
                          </Col>
                        </Row>
                      </CardHeader>
                      <CardBody>
                        <Form role="form" onSubmit={handleSubmit(submitHandler)}>
                          <Row>
                            <Col md="12">
                              <h5>Cleaning Checklist</h5>
                              <FormGroup check>
                                <Label check>
                                  <Input
                                    type="checkbox"
                                    name="cleanTank"
                                    checked={selectedItems.cleanTank}
                                    onChange={handleCheckboxChange}
                                  />{" "}
                                  Tank
                                </Label>
                              </FormGroup>
                              <FormGroup check>
                                <Label check>
                                  <Input
                                    type="checkbox"
                                    name="cleanPipeline"
                                    checked={selectedItems.cleanPipeline}
                                    onChange={handleCheckboxChange}
                                  />{" "}
                                  Pipeline
                                </Label>
                              </FormGroup>
                              <FormGroup check>
                                <Label check>
                                  <Input
                                    type="checkbox"
                                    name="cleanSedimentFilters"
                                    checked={selectedItems.cleanSedimentFilters}
                                    onChange={handleCheckboxChange}
                                  />{" "}
                                  Sediment Filters
                                </Label>
                              </FormGroup>
                              <FormGroup check>
                                <Label check>
                                  <Input
                                    type="checkbox"
                                    name="cleanBrineTank"
                                    checked={selectedItems.cleanBrineTank}
                                    onChange={handleCheckboxChange}
                                  />{" "}
                                  Brine Tank
                                </Label>
                              </FormGroup>

                              <h5>Replacement Checklist</h5>
                              <FormGroup check>
                                <Label check>
                                  <Input
                                    type="checkbox"
                                    name="replaceBoosterPump"
                                    checked={selectedItems.replaceBoosterPump}
                                    onChange={handleCheckboxChange}
                                  />{" "}
                                  Booster Pump
                                </Label>
                              </FormGroup>
                              <FormGroup check>
                                <Label check>
                                  <Input
                                    type="checkbox"
                                    name="replaceTank"
                                    checked={selectedItems.replaceTank}
                                    onChange={handleCheckboxChange}
                                  />{" "}
                                  Tank
                                </Label>
                              </FormGroup>
                              <FormGroup check>
                                <Label check>
                                  <Input
                                    type="checkbox"
                                    name="replacePipelines"
                                    checked={selectedItems.replacePipelines}
                                    onChange={handleCheckboxChange}
                                  />{" "}
                                  Pipelines
                                </Label>
                              </FormGroup>
                              <FormGroup check>
                                <Label check>
                                  <Input
                                    type="checkbox"
                                    name="replaceSedimentFilter"
                                    checked={
                                      selectedItems.replaceSedimentFilter
                                    }
                                    onChange={handleCheckboxChange}
                                  />{" "}
                                  Sediment Filter
                                </Label>
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row className="mt-3">
                            <Col md="12">
                              <FormGroup>
                                <span style={{ fontWeight: "bold" }}>
                                  Date Issued
                                </span>{" "}
                                <input
                                  //placeholder="Add Notes here ..."
                                  className="form-control"
                                  type="date"
                                  name="dateTested"
                                  max={
                                    new Date(
                                      new Date().getTime() + 24 * 60 * 60 * 1000
                                    )
                                      .toISOString()
                                      .split("T")[0]
                                  } // Setting min attribute to today's date
                                  {...register("dateIssued", {
                                    required: "Please enter date.",
                                  })}
                                />
                                {errors.dateIssued && (
                                  <h2
                                    className="h1-seo"
                                    style={{
                                      color: "red",
                                      fontSize: "small",
                                    }}
                                  >
                                    {errors.dateIssued.message}
                                  </h2>
                                )}
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
                                navigate(
                                  `/create/store/machincecleaning/${storeId}`
                                )
                              }
                            >
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
