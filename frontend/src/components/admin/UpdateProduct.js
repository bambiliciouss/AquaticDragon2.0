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
  updateProductStockLog,
  deleteProductStockLog,
  getProductDetails,
  updateProductDetails,
} from "../../actions/productActions";

import {
  CREATE_PRODUCT_RESET,
  UPDATE_PRODUCTSTOCKLOG_RESET,
  DELETE_PRODUCTSTOCKLOG_RESET,
  UPDATE_PRODUCT_RESET,
} from "../../constants/productConstants";

import { allTypesGallon } from "actions/typesgallonAction";

import {
  CREATE_WALKINPOS_RESET,
  DELETE_WALKINPOS_RESET,
} from "../../constants/walkinPOSConstants";

import { getStoreDetails } from "actions/storebranchActions";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { productstocklog } = useSelector(
    (state) => state.allProductsStockLogs
  );

  const { isUpdated, isDeleted } = useSelector(
    (state) => state.productsStockLogs
  );

  const { productdetails } = useSelector((state) => state.singleProduct);
  const { isUpdatedProduct } = useSelector((state) => state.productDetails);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [price, setPrice] = useState("");

  const [store, setStore] = useState("");
  const [typegallon, settypegallon] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const [totalStockQuantity, setTotalStockQuantity] = useState(0);

  useEffect(() => {
    dispatch(allProductStockLogs(id));

    if (isUpdated) {
      swal("Updated Successfully", "", "success");
      navigate(`/admin/product/update/${id}`, { replace: true });
      dispatch({
        type: UPDATE_PRODUCTSTOCKLOG_RESET,
      });
      reset();
      toggleModal();
    }

    if (isUpdatedProduct) {
      swal("Updated Successfully", "", "success");
      navigate(`/admin/product/update/${id}`, { replace: true });
      dispatch({
        type: UPDATE_PRODUCT_RESET,
      });
    }

    if (isDeleted) {
      console.log("deleted ");
      navigate(`/admin/product/update/${id}`);
      dispatch({ type: DELETE_PRODUCTSTOCKLOG_RESET });
    }

    if (productdetails && productdetails._id !== id) {
      dispatch(getProductDetails(id));
    } else {
      setPrice(productdetails.price);
      setStore(productdetails.storebranch.branch);
      settypegallon(productdetails.typesgallon.typeofGallon);
    }

    if (productstocklog && productstocklog.length > 0) {
      const totalQuantity = productstocklog.reduce(
        (total, log) => total + log.quantity,
        0
      );
      setTotalStockQuantity(totalQuantity);
    }
  }, [
    dispatch,
    isUpdated,
    isDeleted,
    navigate,
    productdetails,
    isUpdatedProduct,
  ]);

  const submitHandler = (e) => {
    const formData = new FormData();
    formData.set("quantity", e.quantity);
    dispatch(updateProductStockLog(id, formData));
  };

  const deleteStock = (stockid) => {
    swal({
      title: "Are you sure you want to delete this record?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Record has been deleted!", "", "success");
        dispatch(deleteProductStockLog(id, stockid));
      } else {
        swal("Record is not record!", "", "info");
        console.log(id);
      }
    });
  };

  const setStockLogs = () => {
    const data = {
      columns: [
        {
          label: "Quantity",
          field: "quantity",
          sort: "asc",
        },

        {
          label: "Date",
          field: "date",
          sort: "asc",
        },

        {
          label: "Action",
          field: "action",
          sort: "asc",
        },
      ],
      rows: [],
    };

    productstocklog.forEach((productstocklogs) => {
      const dateObject = new Date(productstocklogs.datedAt);

      data.rows.push({
        quantity: productstocklogs.quantity,
        date: dateObject.toLocaleDateString(),
        action: (
          <Fragment>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => deleteStock(productstocklogs._id)}>
              <i className="fa fa-trash"></i>
            </button>
          </Fragment>
        ),
      });
    });

    return data;
  };

  const updateHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("price", price);

    dispatch(updateProductDetails(id, formData));
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
                  <h3 className="mb-0">Brandnew Gallon Item Stock Inventory</h3>
                </Col>
              </Row>
            </CardHeader>
            <CardBody style={{ overflowX: "auto" }}>
              <Form onSubmit={updateHandler} encType="multipart/form-data">
                <Row>
                  <Col lg="4">
                    <FormGroup>
                      <label className="form-control-label">Store</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="First Name"
                        value={store}
                        onChange={(e) => setStore(e.target.value)}
                        readOnly
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="4">
                    <FormGroup>
                      <label className="form-control-label">Gallon Type</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Last Name"
                        value={typegallon}
                        onChange={(e) => settypegallon(e.target.value)}
                        readOnly
                      />
                    </FormGroup>
                  </Col>

                  <Col lg="4">
                    <FormGroup>
                      <label className="form-control-label">
                        Selling Price
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Last Name"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <div className="text-right">
                  <Button className="my-4" color="info" type="submit">
                    Update Price
                  </Button>
                  {/* <Button
                  className="my-4 mr-4"
                  color="secondary"
                  onClick={() =>
                    navigate(
                      `/admin/product/store/${productdetails.storebranch._id}`
                    )
                  }>
                  Back
                </Button> */}
                </div>
              </Form>

              <hr className="my-4" />

              <h2 className="mb-0 text-center">Stock Logs</h2>
              <div className="text-center">
                <Button
                  className="mb-3"
                  color="info"
                  type="button"
                  onClick={toggleModal}>
                  Add Stock
                </Button>
              </div>
              <div className="text-left mb-3">
                <h2>Total Stock Quantity: {totalStockQuantity}</h2>
              </div>
              <Modal isOpen={isModalOpen} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>
                  Add Walk In Sales for other type of gallons
                </ModalHeader>
                <Form role="form" onSubmit={handleSubmit(submitHandler)}>
                  <ModalBody>
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

              <MDBDataTable
                data={setStockLogs()}
                className="px-3"
                bordered
                hover
                noBottomColumns
                responsive
                searching={false}
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

export default UpdateProduct;
