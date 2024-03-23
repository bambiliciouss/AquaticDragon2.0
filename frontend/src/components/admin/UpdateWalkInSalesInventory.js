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
  getWalkinposDetails,
  updateWalkinpos,
  clearErrors,
} from "actions/walkinPOSActions";
import { UPDATE_WALKINPOS_RESET } from "../../constants/walkinPOSConstants";
import { allTypesGallon } from "actions/typesgallonAction";
const UpdateWalkInSalesInventory = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { walkinposdetails } = useSelector((state) => state.singleWalkinPos);

  const { error, isUpdated } = useSelector((state) => state.walkinPos);
  const { id } = useParams();

  const [quantity, setQuantity] = useState(1);
  const [selectedGallonType, setSelectedGallonType] = useState("");
  const [price, setPrice] = useState(0);
  const [total, setTotal] = useState(0);
  const { typeofGallon } = useSelector((state) => state.allTypesGallon);

  useEffect(() => {
    // getWalkinposDetails(id);
    // console.log("data result", walkinposdetails);
    // setTotal(price * quantity);
    dispatch(allTypesGallon(walkinposdetails.storebranch));

    if (walkinposdetails && walkinposdetails._id !== id) {
      dispatch(getWalkinposDetails(id));
    } else {
      setQuantity(walkinposdetails.quantity);
      setSelectedGallonType(walkinposdetails.othertypeGallon);
      setPrice(walkinposdetails.price);
      setTotal(walkinposdetails.price * walkinposdetails.quantity);
    }

    if (error) {
      swal("Error Updating!", "", "error");
      dispatch(clearErrors());
    }

    if (isUpdated) {
      swal("Updated Successfully!", "", "success");
      navigate(`/admin/POS/inventory/${walkinposdetails.storebranch}`, {
        replace: true,
      });
      dispatch({
        type: UPDATE_WALKINPOS_RESET,
      });
    }
  }, [dispatch, error, isUpdated, navigate, walkinposdetails, id]);

  const handleQuantityChange = (amount) => {
    setQuantity(Math.max(1, quantity + amount));
  };

  const handleGallonTypeClick = (type) => {
    setSelectedGallonType(type);

    switch (type) {
      case "PETBottles":
        setPrice(5);
        break;
      case "7Liters":
        setPrice(15);
        break;
      case "Others":
        setPrice(0);
        break;
      default:
        const dynamicType = typeofGallon.find(
          (gallon) => gallon.typeofGallon === type
        );
        if (dynamicType) {
          setPrice(dynamicType.price);
        } else {
          setPrice(0);
        }
        break;
    }
  };

  const isActiveButton = (gallonType) => {
    return selectedGallonType === gallonType ? "primary" : "secondary";
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("othertypeGallon", selectedGallonType);
    formData.append("price", price);
    formData.append("quantity", quantity);

    dispatch(updateWalkinpos(id, formData));
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
            <div className="wrapper ">
              <div className="content">
                <div className="row">
                  <div className="col-md-12">
                    <Card className="bg-secondary shadow">
                      <CardHeader className="bg-white border-0">
                        <Row className="align-items-center">
                          <Col xs="8">
                            <h3 className="mb-0">Sales Details</h3>
                          </Col>
                        </Row>
                      </CardHeader>
                      <CardBody>
                        <Form
                          onSubmit={submitHandler}
                          encType="multipart/form-data">
                          <Row>
                            <Col sm="6">
                              <FormGroup>
                                <label className="form-control-label">
                                  Select Type
                                </label>
                                <div>
                                  {typeofGallon.map((typeofGallons) => (
                                    <>
                                      <div>
                                        <Button
                                          block
                                          color={
                                            selectedGallonType ===
                                            typeofGallons.typeofGallon
                                              ? "primary"
                                              : "secondary"
                                          }
                                          size="lg"
                                          onClick={() =>
                                            handleGallonTypeClick(
                                              typeofGallons.typeofGallon
                                            )
                                          }
                                          className="mr-2 mb-2">
                                          {typeofGallons.typeofGallon}
                                        </Button>
                                      </div>
                                      <div
                                        style={{ marginBottom: "20px" }}></div>
                                    </>
                                  ))}

                                  <Button
                                    block
                                    color={isActiveButton("PETBottles")}
                                    size="lg"
                                    onClick={() =>
                                      handleGallonTypeClick("PETBottles")
                                    }
                                    className="mr-2 mb-2">
                                    PET Bottles
                                  </Button>
                                </div>
                                <div style={{ marginBottom: "20px" }}></div>
                                <div>
                                  <Button
                                    block
                                    color={isActiveButton("7Liters")}
                                    size="lg"
                                    onClick={() =>
                                      handleGallonTypeClick("7Liters")
                                    }
                                    className="mr-2 mb-2">
                                    7 Liters
                                  </Button>
                                </div>
                                <div style={{ marginBottom: "20px" }}></div>
                                <div>
                                  <Button
                                    block
                                    color={isActiveButton("Others")}
                                    size="lg"
                                    onClick={() =>
                                      handleGallonTypeClick("Others")
                                    }
                                    className="mr-2 mb-2">
                                    Others
                                  </Button>
                                </div>
                              </FormGroup>
                            </Col>

                            <Col sm="6">
                              <FormGroup>
                                <label className="form-control-label">
                                  Price
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Price"
                                  value={price}
                                  readOnly={
                                    selectedGallonType === "Others"
                                      ? false
                                      : true
                                  }
                                  onChange={(e) => {
                                    if (selectedGallonType === "Others") {
                                      setPrice(e.target.value);
                                    }
                                  }}
                                />
                              </FormGroup>

                              <FormGroup>
                                <label className="form-control-label">
                                  Quantity
                                </label>
                                <InputGroup>
                                  <InputGroupAddon addonType="prepend">
                                    <Button
                                      color="primary"
                                      onClick={() => handleQuantityChange(-1)}>
                                      -
                                    </Button>
                                  </InputGroupAddon>
                                  <input
                                    type="text"
                                    className="form-control text-center"
                                    placeholder="Quantity"
                                    value={quantity}
                                    onChange={(e) =>
                                      setQuantity(Number(e.target.value))
                                    }
                                  />
                                  <InputGroupAddon addonType="append">
                                    <Button
                                      color="primary"
                                      onClick={() => handleQuantityChange(1)}>
                                      +
                                    </Button>
                                  </InputGroupAddon>
                                </InputGroup>
                              </FormGroup>

                              <FormGroup>
                                <label className="form-control-label">
                                  Total
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Total"
                                  value={quantity * price}
                                  readOnly
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
                                navigate(
                                  `/admin/POS/inventory/${walkinposdetails.storebranch}`
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

export default UpdateWalkInSalesInventory;
