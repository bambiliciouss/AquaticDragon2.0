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
} from "reactstrap";
import Sidebar from "components/Sidebar/Sidebar";
import MetaData from "components/layout/MetaData";
import AdminNavbar from "components/Navbars/AdminNavbar";
import Header2 from "components/Headers/Header2";
import AdminFooter from "components/Footers/AdminFooter.js";
import { DELETE_TYPESGALLON_RESET } from "../../constants/typesgallonConstants";
import { CREATE_TYPESGALLON_RESET } from "../../constants/typesgallonConstants";
import { useNavigate, useParams } from "react-router-dom";
import {
  allTypesGallon,
  deleteTypesGallon,
  createTypesGallon,
  clearErrors,
} from "actions/typesgallonAction";
import { getStoreDetails } from "actions/storebranchActions";

const TypesGallonList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use useNavigate hook from react-router-dom
  const { storeBranch } = useSelector((state) => state.storeDetails);
  const { error, typeofGallon } = useSelector((state) => state.allTypesGallon);
  const { typesGalloncreated } = useSelector((state) => state.newTypesGallon);
  const { isDeleted } = useSelector((state) => state.typesGallon);
  const { id } = useParams();
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm(); // Destructure the reset function from useForm
  console.log("INTIAL DATA: ", typeofGallon);

  const [gallonImage, setgallonImage] = useState("");
  const [gallonImagePreview, setgallonImagePreview] = useState(
    "/images/default_avatar.jpg"
  );

  useEffect(() => {
    dispatch(allTypesGallon(id));
    dispatch(getStoreDetails(id));
    if (isDeleted) {
      navigate(`/typesgallonlist/${storeBranch._id}`);
      dispatch({ type: DELETE_TYPESGALLON_RESET });
    }
    if (typesGalloncreated) {
      console.log("success gallon registration");
      swal("Type of Gallon Created!", "", "success");
      setModal(false);
      navigate(`/typesgallonlist/${storeBranch._id}`, { replace: true });
      dispatch({
        type: CREATE_TYPESGALLON_RESET,
      });
      reset(); // Call the reset function to reset the form inputs
    }

    if (error) {
      console.log(error);
      dispatch(clearErrors());
    }
  }, [dispatch, isDeleted, navigate, typesGalloncreated, error, reset]); // Add reset to dependency array

  const deletetypesGallonHandler = (id) => {
    swal({
      title: "Are you sure you want to delete this gallon?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Gallon has been deleted!", "", "success");
        dispatch(deleteTypesGallon(id));
      } else {
        swal("Gallon is not deleted!", "", "info");
      }
    });
  };

  const submitHandler = (data) => {
    // Adjust the argument to accept form data
    console.log(data.gallonType);
    const formData = new FormData();
    formData.set("typeofGallon", data.gallonType);
    formData.set("price", data.price);
    formData.set("gallonImage", gallonImage);

    dispatch(createTypesGallon(id, formData));
  };

  const onChange = (e) => {
    const file = e.target.files[0];
    const allowedImageTypes = ["image/png", "image/jpeg", "image/jpg"]; // Allowed image file types

    if (e.target.name === "gallonImage") {
      if (file && allowedImageTypes.includes(file.type)) {
        const reader = new FileReader();

        reader.onload = () => {
          if (reader.readyState === 2) {
            setgallonImagePreview(reader.result);
            setgallonImage(reader.result);
          }
        };

        reader.readAsDataURL(e.target.files[0]);
      } else {
        swal("Please select a valid image file (PNG, JPEG, JPG).", "", "error");
        e.target.value = null;
      }
    }
  };
  const setGallonTypes = () => {
    const data = {
      columns: [
        {
          label: "Gallon Image",
          field: "image",
        },
        {
          label: "Type of Gallon",
          field: "typeofGallon",
          sort: "asc",
        },
        {
          label: "Refill Price",
          field: "price",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };

    typeofGallon.forEach((typeofGallon) => {
      data.rows.push({
        image: (
          <img
            style={{ width: 100, height: 100 }}
            src={typeofGallon.gallonImage.url}
            alt="image"
            img
          />
        ),
        typeofGallon: typeofGallon.typeofGallon,
        price: `₱ ${typeofGallon.price}.00`,
        actions: (
          <Fragment>
            <button
              className="btn btn-primary py-1 px-2 ml-2"
              onClick={() =>
                navigate(`/update/typegallon/details/${typeofGallon._id}`)
              }>
              <i className="fa fa-info-circle"></i>
            </button>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => deletetypesGallonHandler(typeofGallon._id)}>
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
                  <h3 className="mb-0">
                    Types of Gallon ( {storeBranch.branch} ){" "}
                  </h3>
                </Col>
                <Col md="4">
                  <Button
                    block
                    className="mb-3"
                    color="primary"
                    type="button"
                    onClick={toggle}>
                    Register New Type of Gallon
                  </Button>
                  <Modal
                    className="modal-dialog-centered"
                    isOpen={modal}
                    toggle={toggle}>
                    <Form role="form" onSubmit={handleSubmit(submitHandler)}>
                      <ModalHeader toggle={toggle}>
                        Register New Type of Gallon
                      </ModalHeader>
                      <ModalBody>
                        <FormGroup>
                          <label htmlFor="avatar_upload">Gallon Image</label>

                          <div className="row">
                            <div className="col-sm-3"></div>
                            <div className="col-sm-6">
                              <div className="text-center">
                                <img
                                  className="avatar border-gray"
                                  style={{
                                    width: "200px",
                                    height: "200px",
                                  }}
                                  src={gallonImagePreview}
                                  alt="User"
                                />
                              </div>

                              <div className="custom-file">
                                <input
                                  type="file"
                                  name="gallonImage"
                                  className="custom-file-input"
                                  id="gallonImage"
                                  accept="images/*"
                                  {...register("gallonImage", {
                                    required: true,
                                  })}
                                  onChange={(e) => {
                                    onChange(e);
                                    e.target.blur();
                                  }}
                                />
                                <label
                                  className="custom-file-label"
                                  htmlFor="customFile">
                                  Choose Image
                                </label>
                              </div>
                            </div>
                          </div>
                          {errors.gallonImage && !gallonImage && (
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
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-caps-small" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <input
                              placeholder="Type of Gallon..."
                              className="form-control"
                              type="text"
                              name="gallonType"
                              {...register("gallonType", {
                                required:
                                  "Please enter a valid Type of Gallon.",
                              })}></input>
                          </InputGroup>
                          {errors.gallonType && (
                            <h2
                              className="h1-seo"
                              style={{
                                color: "red",
                                fontSize: "small",
                              }}>
                              {errors.gallonType.message}
                            </h2>
                          )}
                        </FormGroup>
                        <FormGroup>
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-money-coins" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <input
                              placeholder="Refill Price..."
                              className="form-control"
                              type="text"
                              name="price"
                              {...register("price", {
                                required: "Please enter a valid price.",
                              })}></input>
                          </InputGroup>
                          {errors.price && (
                            <h2
                              className="h1-seo"
                              style={{
                                color: "red",
                                fontSize: "small",
                              }}>
                              {errors.price.message}
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
                data={setGallonTypes()}
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
    </>
  );
};

export default TypesGallonList;
