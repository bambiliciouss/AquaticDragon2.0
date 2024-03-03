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
} from "reactstrap";
import Sidebar from "components/Sidebar/Sidebar";
import MetaData from "components/layout/MetaData";
import AdminNavbar from "components/Navbars/AdminNavbar";
import Header2 from "components/Headers/Header2";
import AdminFooter from "components/Footers/AdminFooter.js";

import { useNavigate, useParams } from "react-router-dom";

import {
  createWalkinpos,
  allWalkinpos,
  deleteWalkinpos,
} from "../../actions/walkinPOSActions";

import {
  CREATE_WALKINPOS_RESET,
  DELETE_WALKINPOS_RESET,
} from "../../constants/walkinPOSConstants";

import { getStoreDetails } from "actions/storebranchActions";

const WalkInSalesInventory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { storeBranch } = useSelector((state) => state.storeDetails);

  const { walkinposcreated } = useSelector((state) => state.newWalkinPos);

  const { walkinpos } = useSelector((state) => state.allWalkinPos);

  const { isDeleted } = useSelector((state) => state.walkinPos);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = (ID) => {
    setIsModalOpen(!isModalOpen);
  };

  const [quantity, setQuantity] = useState(1);
  const [selectedGallonType, setSelectedGallonType] = useState("");
  const [price, setPrice] = useState(0);
  const [total, setTotal] = useState(0);

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
        setPrice(10);
        break;
      case "Others":
        setPrice(0);
        break;
      default:
        setPrice(0);
    }
  };

  const submitHandler = (e) => {
    const formData = new FormData();
    formData.set("othertypeGallon", selectedGallonType);
    formData.set("price", price);
    formData.set("quantity", quantity);

    dispatch(createWalkinpos(formData, id));
  };

  const deleterecord = (id) => {
    swal({
      title: "Are you sure you want to delete this record?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Record has been deleted!", "", "success");
        dispatch(deleteWalkinpos(id));
      } else {
        swal("Branch is not record!", "", "info");
        console.log(id);
      }
    });
  };

  useEffect(() => {
    dispatch(getStoreDetails(id));
    dispatch(allWalkinpos(id));
    setTotal(price * quantity);

    if (walkinposcreated) {
      console.log("success registration");
      swal("Sales Created!", "", "success");
      toggleModal();
      navigate(`/admin/POS/inventory/${id}`, { replace: true });
      dispatch({
        type: CREATE_WALKINPOS_RESET,
      });
      setPrice(0);
      setQuantity(1);
      setTotal(0);
      setSelectedGallonType("");
    }

    if (isDeleted) {
      console.log("deleted ");
      navigate(`/admin/POS/inventory/${id}`);
      dispatch({ type: DELETE_WALKINPOS_RESET });
    }
  }, [dispatch, price, quantity, walkinposcreated, isDeleted]);

  const setInventory = () => {
    const data = {
      columns: [
        {
          label: "Type",
          field: "type",
        },
        {
          label: "Price",
          field: "price",
          sort: "desc",
        },

        {
          label: "Quantity",
          field: "quantity",
          sort: "desc",
        },

        {
          label: "Total",
          field: "total",
          sort: "desc",
        },

        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };

    const sortedData = walkinpos.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    sortedData.forEach((walkinposs) => {
      data.rows.push({
        type: walkinposs.othertypeGallon,
        price: ` ₱ ${walkinposs.price}.00`,
        quantity: walkinposs.quantity,
        total: `₱ ${walkinposs.quantity * walkinposs.price}.00`,
        actions: (
          <Fragment>
            <button
              className="btn btn-primary py-1 px-2 ml-2"
              onClick={() =>
                navigate(`/admin/POS/inventory/update/${walkinposs._id}`)
              }>
              <i className="fa fa-info-circle"></i>
            </button>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => deleterecord(walkinposs._id)}>
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
      <MetaData title={"Walk In"} />
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
                    Other Type of Gallon Sales Inventory ( {storeBranch.branch}{" "}
                    )
                  </h3>
                </Col>
                <Col md="4">
                  <Button
                    block
                    className="mb-3"
                    color="primary"
                    type="button"
                    onClick={toggleModal}>
                    Add New
                  </Button>
                  <Modal isOpen={isModalOpen} toggle={toggleModal}>
                    <ModalHeader toggle={toggleModal}>
                      Add Walk In Sales for other type of gallons
                    </ModalHeader>
                    <Form role="form" onSubmit={submitHandler}>
                      <ModalBody>
                        <Row>
                          <Col sm="6">
                            <FormGroup>
                              <label className="form-control-label">
                                Select Type
                              </label>
                              <div>
                                <Button
                                  block
                                  color={
                                    selectedGallonType === "PETBottles"
                                      ? "primary"
                                      : "secondary"
                                  }
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
                                  color={
                                    selectedGallonType === "7Liters"
                                      ? "primary"
                                      : "secondary"
                                  }
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
                                  color={
                                    selectedGallonType === "Others"
                                      ? "primary"
                                      : "secondary"
                                  }
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
                                  selectedGallonType === "Others" ? false : true
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
                                value={total}
                                readOnly
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </ModalBody>
                      <ModalFooter>
                        <Button color="primary" type="submit">
                          Add
                        </Button>
                        <Button color="secondary" onClick={toggleModal}>
                          Cancel
                        </Button>
                      </ModalFooter>
                    </Form>
                  </Modal>
                </Col>
              </Row>
            </CardHeader>
            <CardBody style={{ overflowX: "auto" }}>
              <MDBDataTable
                data={setInventory()}
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

export default WalkInSalesInventory;
