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

import { CREATE_PRODUCT_RESET } from "../../constants/productConstants";

import { useForm } from "react-hook-form";

import { allTypesGallon } from "actions/typesgallonAction";

import { createProduct, clearErrors } from "actions/productActions";

const Product = (args) => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const { loading, storeBranch } = useSelector((state) => state.allStoreBranch);

  const { typeofGallon } = useSelector((state) => state.allTypesGallon);

  const { productCreated, error } = useSelector((state) => state.newProduct);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ModalID, setModalID] = useState("");
  const [selectedGallonType, setSelectedGallonType] = useState(""); // Added state for selected gallon type

  const toggleModal = (ID) => {
    setModalID(ID);
    setIsModalOpen(!isModalOpen);
  };

  const handleGallonTypeChange = (e) => {
    setSelectedGallonType(e.target.value);
  };

  const setStoreBranch = () => {
    const data = {
      columns: [
        {
          label: "Branch",
          field: "branchNo",
          sort: "asc",
        },
        {
          field: "inventory",
          sort: "asc",
        },

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
                navigate(`/admin/product/store/${storeBranches._id}`)
              }>
              View Stocks Inventory
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
    dispatch(allTypesGallon());

    if (productCreated) {
      console.log("success registration");
      swal("Brandnew Gallon Stock Created!", "", "success");
      toggleModal();
      navigate(`/admin/product`, { replace: true });
      dispatch({
        type: CREATE_PRODUCT_RESET,
      });
      reset();
    }

    if (error) {
      //notifyError(error);
      swal(error, "", "error");
      console.log(error);
      dispatch(clearErrors());
    }
  }, [dispatch, ModalID, productCreated, error]);

  const submitHandler = (e) => {
    const formData = new FormData();
    formData.set("typesgallon", e.type);
    formData.set("quantity", e.quantity);
    formData.set("price", e.price);

    dispatch(createProduct(formData, ModalID));

    //window.location.reload();
  };

  return (
    <>
      <MetaData title={"BrandnewGallon"} />
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
                  <h3 className="mb-0">Brandnew Gallon Item Stock</h3>
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
          Add Brandnew Gallon Stock
        </ModalHeader>
        <Form role="form" onSubmit={handleSubmit(submitHandler)}>
          <ModalBody>
            <Row>
              <Col lg="12">
                <FormGroup>
                  <label className="form-control-label">Type</label>
                  <select
                    className="form-control"
                    id="typeSelect"
                    name="type"
                    defaultValue=""
                    {...register("type", {
                      required: "Please select gallon type",
                    })}
                    style={{ backgroundColor: "#f2f2f2" }}>
                    <option value="" disabled>
                      Select Type
                    </option>
                    {typeofGallon.map((gallon) => (
                      <option key={gallon._id} value={gallon._id}>
                        {gallon.typeofGallon}
                      </option>
                    ))}
                  </select>
                </FormGroup>

                {errors.type && (
                  <h2
                    className="h1-seo"
                    style={{
                      color: "red",
                      fontSize: "small",
                    }}>
                    {errors.type.message}
                  </h2>
                )}
              </Col>
            </Row>

            <Row>
              <Col lg="12">
                <FormGroup>
                  <label className="form-control-label">Selling Price</label>

                  <input
                    placeholder="Selling Price..."
                    className="form-control"
                    type="text"
                    name="price"
                    {...register("price", {
                      required: "Please enter a valid price.",
                    })}></input>

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
              </Col>
            </Row>

            <Row>
              <Col lg="12">
                <FormGroup>
                  <label className="form-control-label">Stock Quantity</label>

                  <input
                    placeholder="Quantity..."
                    className="form-control"
                    type="text"
                    name="quantity"
                    {...register("quantity", {
                      required: "Please enter a valid quantity.",
                    })}></input>

                  {errors.quantity && (
                    <h2
                      className="h1-seo"
                      style={{
                        color: "red",
                        fontSize: "small",
                      }}>
                      {errors.quantity.message}
                    </h2>
                  )}
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

export default Product;
