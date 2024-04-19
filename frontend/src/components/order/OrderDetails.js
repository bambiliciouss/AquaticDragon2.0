import React, { useState, useEffect } from "react";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  CardTitle,
  CardText,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import MetaData from "../layout/MetaData";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrderDetails,
  clearErrors,
  updateOrder,
} from "../../actions/orderActions";
import moment from "moment-timezone";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";
import ReviewOrder from "./ReviewOrder";
import ReviewItems from "./ReviewItems";
import {
  createReview,
  getUserReviews,
  getSingleReview,
} from "actions/adminAction";
import {
  DELETE_REVIEW_RESET,
  UPDATE_REVIEW_RESET,
} from "constants/adminConstants";
import { deleteReview } from "actions/adminAction";
import { updateSingleReview } from "actions/adminAction";
const OrderDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { reviews, isUpdated, isDeleted, singleReviews } = useSelector(
    (state) => state.review
  );
  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const editCommentToggle = () => setEdit(!edit);
  const toggle = () => setModal(!modal);
  const [orderLevelup, setOrderLevel] = useState("");
  const {
    loading,
    error,
    order = {},
  } = useSelector((state) => state.orderDetails);

  const {
    orderItems,
    orderProducts,
    containerStatus,
    orderclaimingOption,
    selectedStore,
    deliveryAddress,
    paymentInfo,
    orderStatus,
    // notes,
    customer,
    totalPrice,
    createdAt,
  } = order;

  let { id } = useParams();

  useEffect(() => {
    dispatch(getOrderDetails(id));
    if (error) {
      console.log(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, id]);
  useEffect(() => {
    if (order && order._id) {
      dispatch(getUserReviews(user._id, order._id));
    }

    if (isUpdated) {
      navigate(`/order/${order._id}`);
      dispatch({ type: UPDATE_REVIEW_RESET });
    }

    if (isDeleted) {
      navigate(`/order/${order._id}`);
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  
  }, [dispatch, order, isUpdated, isDeleted]);
  const handleEdit = (data) => {
    // console.log("data", data);
    dispatch(getSingleReview(data._id));
    editCommentToggle();
    
  };
  const handleDelete = (data) => {
    // console.log("data", data);
    dispatch(deleteReview(data._id));
  };
  const updateOrderHandler = (id) => {
    const formData = new FormData();

    formData.set("orderLevel", orderLevelup);

    dispatch(updateOrder(id, formData));
    toggle();
    window.location.reload();
  };
  const handleSubmit = async (data) => {
    const formData = new FormData();
    formData.set("comment", data.comment);
    formData.set("rating", data.rating);
    formData.set("order", data.order);
    formData.set("branchID", selectedStore.store)
    formData.set("branchName", selectedStore.branchNo)
    formData.set("user", user._id);

    await dispatch(createReview(formData));
    await dispatch(getUserReviews(user._id, order._id));
    toggle();
  };
  const updateCommentHandler = (data) => {
    console.log("data", data);
    const formData = new FormData();
    formData.set("comment", data.comment);
    formData.set("rating", data.rating);
    formData.set("order", data.order);
    formData.set("user", user._id);
    dispatch(updateSingleReview(data.commentID, formData));
    dispatch(getUserReviews(user._id, order._id));
  };

  return (
    <>
      <AuthNavbar />
      <MetaData title={"Order Details"} />
      <div className="d-flex justify-content-center">
        <div
          className="user-profile-container"
          style={{
            minHeight: "700px",
            marginTop: "100px",
            marginLeft: "5%",
            marginRight: "20px"
          }}
        >
          {singleReviews && (
            <Modal
              className="modal-dialog-centered"
              isOpen={edit}
              toggle={editCommentToggle}
              backdrop="static"
            >
              <ModalHeader toggle={()=>{
                editCommentToggle()
                dispatch(getUserReviews(user._id, order._id))}}>
                Leave us a Review!
              </ModalHeader>
              <ModalBody>
                <ReviewOrder
                  onSubmit={updateCommentHandler}
                  order={order._id}
                  values={singleReviews}
                  commentID={singleReviews._id}
                />
              </ModalBody>
            </Modal>
          )}
          <Card className="bg-secondary shadow">
            <CardHeader className="bg-white border-0">
              <Row className="align-items-center">
                <Col xs="9">
                  <h3 className="mb-0">Order Details</h3>
                </Col>
                {user &&
                  user.role === "user" &&
                  orderStatus &&
                  orderStatus.some(
                    (status) => status.orderLevel === "Delivered"
                  ) && (
                    <Col md="3">
                      <Button
                        block
                        className="mb-3"
                        color="primary"
                        type="button"
                        onClick={toggle}
                      >
                        Write a review!
                      </Button>

                      <Modal
                        className="modal-dialog-centered"
                        isOpen={modal}
                        toggle={toggle}
                      >
                        <ModalHeader toggle={toggle}>
                          Leave us a Review!
                        </ModalHeader>
                        <ModalBody>
                          <ReviewOrder
                            onSubmit={handleSubmit}
                            order={order._id}
                          />
                        </ModalBody>
                      </Modal>
                    </Col>
                  )}
                {user && user.role === "admin" && (
                  <Col md="4">
                    <Button
                      block
                      className="mb-3"
                      color="primary"
                      type="button"
                      onClick={toggle}
                    >
                      Update Order Status
                    </Button>

                    <Modal
                      className="modal-dialog-centered"
                      isOpen={modal}
                      toggle={toggle}
                    >
                      <ModalHeader toggle={toggle}>Update Status</ModalHeader>
                      <ModalBody>
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-circle-08" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <select
                              className="form-control"
                              name="orderStatus"
                              value={orderStatus && orderStatus.orderLevel}
                              onChange={(e) => setOrderLevel(e.target.value)}
                            >
                              <option value="" disabled>
                                Select Status
                              </option>
                              <option value="Order Placed">Order Placed</option>
                              <option value="Order Accepted">
                                Order Accepted
                              </option>
                              <option value="Out for Delivery">
                                Out for Delivery
                              </option>
                              <option value="Delivered">Delivered</option>
                            </select>
                          </InputGroup>
                        </FormGroup>
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          color="primary"
                          type="submit"
                          onClick={() => updateOrderHandler(order._id)}
                        >
                          Update
                        </Button>
                        <Button color="secondary" onClick={toggle}>
                          Back
                        </Button>
                      </ModalFooter>
                    </Modal>
                  </Col>
                )}
              </Row>
            </CardHeader>
            <CardBody>
              {user && user.role === "admin" && (
                <Row>
                  <Col sm="12">
                    <Card body>
                      <CardText>
                        <span style={{ fontWeight: "bold" }}>Name:</span>{" "}
                        {customer && customer.fname}{" "}
                        {customer && customer.lname}
                      </CardText>
                      <CardText>
                        <span style={{ fontWeight: "bold" }}>Email:</span>{" "}
                        {customer && customer.email}
                      </CardText>
                    </Card>
                  </Col>
                </Row>
              )}
              <div style={{ marginBottom: "20px" }}></div>

              <Row>
                <Col sm="12">
                  <Card body>
                    <Row>
                      <Col lg="3">
                        <CardTitle tag="h2">
                          <i className="ni ni-square-pin" /> Delivery Address
                          {/* <b>Name:</b> {user && user.fname} */}
                        </CardTitle>

                        <CardText>
                          {deliveryAddress && deliveryAddress.houseNo}{" "}
                          {deliveryAddress && deliveryAddress.purokNum}
                          {deliveryAddress && deliveryAddress.streetName}{" "}
                          {deliveryAddress && deliveryAddress.barangay}
                          {deliveryAddress && deliveryAddress.city}
                        </CardText>
                      </Col>
                      <Col lg="2"></Col>
                      <Col lg="7">
                        <CardTitle tag="h2">
                          {" "}
                          <i className="ni ni-delivery-fast" /> Order Status
                        </CardTitle>
                        {orderStatus &&
                          orderStatus
                            .sort(
                              (a, b) =>
                                new Date(b.datedAt) - new Date(a.datedAt)
                            )
                            .map((item, index) => (
                              <CardText key={index}>
                                {new Date(item.datedAt).toLocaleString()}{" "}
                                {item.orderLevel} by{" "}
                                {item.staff
                                  ? `${item.staff.fname} ${item.staff.lname}`
                                  : "User"}
                              </CardText>
                            ))}
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
              <div style={{ marginBottom: "20px" }}></div>

              <Row>
                <Col sm="12">
                  <Card body>
                    <CardTitle tag="h2">
                      {" "}
                      <i className="ni ni-cart" /> Order(s)
                    </CardTitle>
                    <CardText>
                      {" "}
                      {orderItems &&
                        orderItems.map((item, index) => (
                          <Row key={index}>
                            <Col sm="5">{item.type}</Col>
                            <Col sm="3" style={{ textAlign: "center" }}>
                              {item.quantity} pc(s)
                            </Col>
                            <Col sm="4" style={{ textAlign: "right" }}>
                              ₱{item.price}.00
                            </Col>
                          </Row>
                        ))}
                      {orderProducts &&
                        orderProducts.map((item, index) => (
                          <Row key={index}>
                            <Col sm="5">
                              {item.type.typeofGallon} (NEW CONTAINER)
                            </Col>
                            <Col sm="3" style={{ textAlign: "center" }}>
                              {item.quantity} pc(s)
                            </Col>
                            <Col sm="4" style={{ textAlign: "right" }}>
                              ₱{item.price}.00
                            </Col>
                          </Row>
                        ))}
                    </CardText>
                  </Card>
                </Col>
              </Row>

              <div style={{ marginBottom: "20px" }}></div>
              <Row>
                <Col sm="12">
                  <Card body>
                    <CardTitle tag="h2">
                      <i className="ni ni-shop" /> Store Branch
                    </CardTitle>

                    <Row>
                      <Col sm="6">
                        <CardText>
                          {selectedStore && selectedStore.branchNo}
                        </CardText>
                        <CardText>
                          {selectedStore && selectedStore.address}
                        </CardText>
                      </Col>
                      <Col sm="6" style={{ textAlign: "right" }}>
                        <CardText>
                          Shipping Fee: ₱{" "}
                          {selectedStore && selectedStore.deliveryFee}.00
                        </CardText>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>

              <div style={{ marginBottom: "20px" }}></div>

              <Row>
                <Col sm="12">
                  <Card body>
                    <CardText>
                      <span style={{ fontWeight: "bold" }}>
                        Container Status:{" "}
                      </span>
                      {containerStatus}
                    </CardText>
                  </Card>
                </Col>
              </Row>
              <div style={{ marginBottom: "20px" }}></div>

              <Row>
                <Col sm="12">
                  <Card body>
                    <CardText>
                      <span style={{ fontWeight: "bold" }}>
                        Order Claiming Method:{" "}
                      </span>{" "}
                      {orderclaimingOption}
                    </CardText>
                  </Card>
                </Col>
              </Row>
              <div style={{ marginBottom: "20px" }}></div>

              <Row>
                <Col sm="12">
                  <Card body>
                    <CardText>
                      <span style={{ fontWeight: "bold" }}>
                        Payment Method:
                      </span>{" "}
                      {paymentInfo}
                    </CardText>
                  </Card>
                </Col>
              </Row>
              <div style={{ marginBottom: "20px" }}></div>
              {/* <Row>
              <Col sm="12">
                <Card body>
                  <CardText>
                    <span style={{ fontWeight: "bold" }}>Notes:</span>{" "}
                    <Input
                      placeholder="Add Notes here ..."
                      rows="3"
                      type="textarea"
                      value={notes}
                      readOnly
                    />
                  </CardText>
                </Card>
              </Col>
            </Row> */}
              <div style={{ marginBottom: "20px" }}></div>
              <Row>
                <Col sm="12">
                  <CardText style={{ textAlign: "right" }}>
                    <span style={{ fontWeight: "bold" }}>Order Total:</span> ₱
                    {totalPrice}.00
                  </CardText>
                </Col>
              </Row>
              <div style={{ marginBottom: "20px" }}></div>
            </CardBody>
          </Card>
        </div>
        <div
          className="user-profile-container"
          style={{
            minHeight: "700px",
            minWidth: "500px",
            marginTop: "100px",
            
          }}
        >
          <Card className="bg-secondary shadow">
            <CardHeader className="bg-white border-0">
              <Row className="align-items-center">
                <Col xs="8">
                  <h3 className="mb-0">Your Comments ({reviews && reviews.length > 0 ? reviews.length : 0})</h3>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              {reviews &&
                reviews.map((comment, index) => (
                  <ReviewItems
                    key={index}
                    comment={comment}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                  />
                ))}
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
