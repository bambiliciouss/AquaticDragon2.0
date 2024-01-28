import React, { Fragment, useEffect } from "react";

import { Link } from "react-router-dom";

import { MDBDataTable } from "mdbreact";

import MetaData from "../layout/MetaData";

import Loader from "../layout/Loader";

import { useDispatch, useSelector } from "react-redux";

import { myOrders, clearErrors } from "../../actions/orderActions";
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import AuthFooter from "components/Footers/AuthFooter.js";
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
  Table,
  Pagination,
} from "reactstrap";

const ListOrders = () => {
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.myOrders);

  useEffect(() => {
    dispatch(myOrders());

    if (error) {
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  const setOrders = () => {
    const sortedOrders = orders.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    const data = {
      columns: [
        {
          label: "Order ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Num of Items",
          field: "numOfItems",
          sort: "asc",
        },
        {
          label: "Amount",
          field: "amount",
          sort: "asc",
        },
        {
          label: "Status",
          field: "status",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };

    orders.forEach((order) => {
      // Find the latest order status
      const latestOrderStatus = order.orderStatus.reduce((latest, status) => {
        if (!latest.datedAt || status.datedAt > latest.datedAt) {
          return status;
        }
        return latest;
      }, {});

      data.rows.push({
        id: order._id,
        numOfItems: order.orderItems.length,
        amount: `₱${order.totalPrice}`,
        status: latestOrderStatus.orderLevel || "N/A",
        actions: (
          <Link to={`/order/${order._id}`} className="btn btn-primary">
            <i className="fa fa-eye"></i>
          </Link>
        ),
      });
    });

    return data;
  };

  return (
    <>
      <AuthNavbar />
      <MetaData title={"My Order(s)"} />

      <div
        className="user-profile-container"
        style={{
          minHeight: "700px",
          marginTop: "100px",
          marginLeft: "15%",
          marginRight: "15%",
        }}>
        <div className="row">
          {/* Sidebar */}
          {/* <div className="col-md-3">
            <div>
              <h5
                className="title"
                style={{
                  marginBottom: "10px",
                  paddingTop: "10px",
                }}>
                <i
                  className="now-ui-icons users_single-02"
                  style={{ marginRight: "5px" }}></i>
                My Account
              </h5>

              <ul style={{ listStyleType: "none", paddingLeft: "0" }}>
                <li>
                  <a className="nav-link" href="/my-profile">
                    Profile
                  </a>
                </li>
                <li>
                  <a className="nav-link" href="/password/update">
                    Change Password
                  </a>
                </li>
              </ul>

              <h5
                className="title"
                style={{
                  marginBottom: "10px",
                  paddingTop: "10px",
                }}>
                <i
                  className="now-ui-icons ui-1_simple-add"
                  style={{ marginRight: "5px" }}></i>
                My Gallons
              </h5>

              <ul style={{ listStyleType: "none", paddingLeft: "0" }}>
                <li>
                  <a className="nav-link active" href="/my-gallon">
                    List of my Gallon/s
                  </a>
                </li>
                <li>
                  <a className="nav-link" href="/register-gallon">
                    Register New Gallon
                  </a>
                </li>
              </ul>
            </div>
          </div> */}
          <div className="col-md-12">
            <div className="content">
              <div className="row">
                <div className="col-md-12">
                  <Card className="bg-secondary shadow">
                    <CardHeader className="bg-white border-0">
                      <Row className="align-items-center">
                        <Col xs="8">
                          <h3 className="mb-0">OrderList</h3>
                        </Col>
                      </Row>
                    </CardHeader>

                    <CardBody style={{ overflowX: "auto" }}>
                      {loading ? (
                        <Loader />
                      ) : (
                        <MDBDataTable
                          data={setOrders()}
                          className="px-3"
                          bordered
                          hover
                          noBottomColumns
                          responsive
                        />
                      )}
                    </CardBody>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AuthFooter />
    </>
  );
};

export default ListOrders;
