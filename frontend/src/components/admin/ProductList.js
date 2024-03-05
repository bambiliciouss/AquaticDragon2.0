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
  allProductList,
  createProduct,
  allProductStockLogs,
  clearErrors,
  deleteProduct,
} from "../../actions/productActions";

import {
  CREATE_PRODUCT_RESET,
  UPDATE_PRODUCTSTOCKLOG_RESET,
  DELETE_PRODUCT_RESET,
} from "../../constants/productConstants";

import { allTypesGallon } from "actions/typesgallonAction";

import {
  CREATE_WALKINPOS_RESET,
  DELETE_WALKINPOS_RESET,
} from "../../constants/walkinPOSConstants";

import { getStoreDetails } from "actions/storebranchActions";

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { storeBranch } = useSelector((state) => state.storeDetails);

  const { products } = useSelector((state) => state.allProducts);
  const { productCreated, error } = useSelector((state) => state.newProduct);

  const { typeofGallon } = useSelector((state) => state.allTypesGallon);
  const { productstocklog } = useSelector(
    (state) => state.allProductsStockLogs
  );

  const { isDeletedProduct } = useSelector((state) => state.productDetails);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = (ID) => {
    setIsModalOpen(!isModalOpen);
  };

  const [ModalVisible, setModalVisible] = useState(false);
  const [IdModal, setIdModal] = useState(null);

  const toggleStockLogsModal = () => setModalVisible(!ModalVisible);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const submitHandler = (e) => {
    const formData = new FormData();
    formData.set("typesgallon", e.type);
    formData.set("quantity", e.quantity);
    formData.set("price", e.price);

    dispatch(createProduct(formData, id));
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
        dispatch(deleteProduct(id));
      } else {
        swal("Record is not record!", "", "info");
        console.log(id);
      }
    });
  };

  useEffect(() => {
    dispatch(getStoreDetails(id));
    dispatch(allProductList(id));
    dispatch(allTypesGallon());

    if (IdModal !== null) {
      dispatch(allProductStockLogs(IdModal));
    }

    if (productCreated) {
      console.log("success registration");
      swal("Brandnew Gallon Stock Created!", "", "success");
      toggleModal();
      navigate(`/admin/product/store/${id}`, { replace: true });
      dispatch({
        type: CREATE_PRODUCT_RESET,
      });
      reset();
    }
    if (isDeletedProduct) {
      console.log("deleted ");
      navigate(`/admin/product/store/${id}`);
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    if (error) {
      //notifyError(error);
      swal(error, "", "error");
      console.log(error);
      dispatch(clearErrors());
    }
  }, [dispatch, productCreated, IdModal, error, isDeletedProduct]);

  const openStocklogsModal = (id) => {
    setIdModal(id);
    toggleStockLogsModal();
  };

  const setInventory = () => {
    const data = {
      columns: [
        {
          label: "Type",
          field: "type",
        },
        {
          label: "Selling Price",
          field: "price",
          sort: "desc",
        },

        {
          label: "Total Stocks",
          field: "stock",
          sort: "desc",
        },

        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };

    const sortedData = products.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    sortedData.forEach((productss) => {
      const activeStocks = productss.stocks.filter((stock) => !stock.deleted);

      const totalQuantity = activeStocks.reduce(
        (acc, stock) => acc + stock.quantity,
        0
      );
      data.rows.push({
        type: productss.typesgallon.typeofGallon,
        price: ` ₱ ${productss.price}.00`,
        stock: totalQuantity,

        actions: (
          <Fragment>
            <button
              className="btn btn-info py-1 px-2 ml-2"
              onClick={() =>
                navigate(`/admin/product/update/${productss._id}`)
              }>
              View Stock Logs
            </button>

            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => deleterecord(productss._id)}>
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
                  <h3 className="mb-0">
                    Brandnew Gallon Item Stock Inventory ( {storeBranch.branch}{" "}
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
                            </FormGroup>
                          </Col>
                        </Row>

                        <Row>
                          <Col lg="12">
                            <FormGroup>
                              <label className="form-control-label">
                                Selling Price
                              </label>

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
                              <label className="form-control-label">
                                Stock Quantity
                              </label>

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

export default ProductList;
