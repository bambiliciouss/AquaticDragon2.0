import React, { Fragment, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { MDBDataTable } from "mdbreact";

import Sidebar from "components/Sidebar/Sidebar";
import MetaData from "components/layout/MetaData";
import AdminNavbar from "components/Navbars/AdminNavbar";
import Header2 from "components/Headers/Header2";
import AdminFooter from "components/Footers/AdminFooter.js";

import { DELETE_STOREBRANCH_RESET } from "../../constants/storebranchConstants";
import swal from "sweetalert";
import { allStoreBranch, deleteStoreBranch } from "actions/storebranchActions";
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
  Input,
} from "reactstrap";

import { createWalkinpos } from "../../actions/walkinPOSActions";

import { CREATE_WALKINPOS_RESET } from "../../constants/walkinPOSConstants";

import { useForm } from "react-hook-form";

const WalkInPOS = (args) => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const { loading, error, storeBranch } = useSelector(
    (state) => state.allStoreBranch
  );
  const { walkinposcreated } = useSelector((state) => state.newWalkinPos);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ModalID, setModalID] = useState("");

  const toggleModal = (ID) => {
    setModalID(ID);
    setIsModalOpen(!isModalOpen);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

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

    dispatch(createWalkinpos(formData, ModalID));
  };

  const setStoreBranch = () => {
    const data = {
      columns: [
        // {
        //   label: "Store",
        //   field: "storeImage",
        //   sort: "asc",
        // },
        {
          label: "Branch",
          field: "branchNo",
          sort: "asc",
        },
        {
          // label: "Inventory",
          field: "inventory",
          sort: "asc",
        },
        // {
        //   label: "Address",
        //   field: "address",
        //   sort: "asc",
        // },
        {
          label: "Actions",
          field: "actions",
        },
      ],

      rows: [],
    };

    storeBranch.forEach((storeBranches) => {
      data.rows.push({
        storeImage: (
          <img
            className="d-block w-100"
            src={storeBranches.storeImage.url}
            alt={storeBranches.branchNo}
            img
            style={{ width: 80, height: 70 }}
          />
        ),
        branchNo: storeBranches.branch,
        address: `${storeBranches.address.houseNo} ${storeBranches.address.purokNum} ${storeBranches.address.streetName} ${storeBranches.address.barangay} ${storeBranches.address.city}`,
        actions: (
          <Fragment>
            <button
              className="btn btn-primary py-1 px-2 ml-2"
              onClick={() => toggleModal(storeBranches._id)}>
              Add
            </button>
          </Fragment>
        ),

        inventory: (
          <Fragment>
            
            <button
              className="btn btn-primary py-1 px-2 ml-2"
              onClick={() =>
                navigate(`/admin/POS/inventory/${storeBranches._id}`)
              }>
              View Walk In Sales Inventory
            </button>
          </Fragment>
        ),
      });
    });

    return data;
  };

  useEffect(() => {
    //DISPLAY OF STORE BRANCH
    dispatch(allStoreBranch());
    setTotal(price * quantity);

    if (walkinposcreated) {
      console.log("success registration");
      swal("Sales Created!", "", "success");
      toggleModal();
      navigate("/admin/POS", { replace: true });
      dispatch({
        type: CREATE_WALKINPOS_RESET,
      });
      setPrice(0);
      setQuantity(1);
      setTotal(0);
      setSelectedGallonType("");
    }
  }, [dispatch, ModalID, walkinposcreated, price, quantity]);

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
                    Other Type of Gallon Sales Inventory (Walk In Only)
                  </h3>
                </Col>
                <Col md="4"></Col>
              </Row>
            </CardHeader>
            <CardBody style={{ overflowX: "auto" }}>
              <MDBDataTable
                data={setStoreBranch()}
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

      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>
          Add Walk In Sales for other type of gallons
        </ModalHeader>
        <Form role="form" onSubmit={handleSubmit(submitHandler)}>
          <ModalBody>
            <Row>
              <Col sm="6">
                <FormGroup>
                  <label className="form-control-label">Select Type</label>
                  <div>
                    <Button
                      block
                      color={
                        selectedGallonType === "PETBottles"
                          ? "primary"
                          : "secondary"
                      }
                      size="lg"
                      onClick={() => handleGallonTypeClick("PETBottles")}
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
                      onClick={() => handleGallonTypeClick("7Liters")}
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
                      onClick={() => handleGallonTypeClick("Others")}
                      className="mr-2 mb-2">
                      Others
                    </Button>
                  </div>
                </FormGroup>
              </Col>

              <Col sm="6">
                <FormGroup>
                  <label className="form-control-label">Price</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Price"
                    value={price}
                    readOnly={selectedGallonType === "Others" ? false : true}
                    onChange={(e) => {
                      if (selectedGallonType === "Others") {
                        setPrice(e.target.value);
                      }
                    }}
                  />
                </FormGroup>

                <FormGroup>
                  <label className="form-control-label">Quantity</label>
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
                      onChange={(e) => setQuantity(Number(e.target.value))}
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
                  <label className="form-control-label">Total</label>
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
    </>
  );
};

export default WalkInPOS;
