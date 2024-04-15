import React, { Fragment, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { allUsers, deleteUser } from "actions/userActions";
import { MDBDataTable } from "mdbreact";

import Sidebar from "components/Sidebar/Sidebar";
import MetaData from "components/layout/MetaData";
import AdminNavbar from "components/Navbars/AdminNavbar";
import Header2 from "components/Headers/Header2";
import AdminFooter from "components/Footers/AdminFooter.js";

import QRCode from "react-qr-code";
import { DELETE_GALLON_RESET } from "../../constants/gallonConstants";
import swal from "sweetalert";
import { allOrdersRider, clearErrors } from "../../actions/orderActions";
import Loader from "components/layout/Loader";
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
  Badge,
} from "reactstrap";

const RiderOrderList = () => {
  const dispatch = useDispatch();

  let navigate = useNavigate();

  const { loading, error, orders } = useSelector(
    (state) => state.allOrdersStaff
  );

  useEffect(() => {
    dispatch(allOrdersRider());
    if (error) {
      dispatch(clearErrors());
    }
    console.log("Employee Orders", orders);
  }, [dispatch, error]);

  const setOrders = () => {
    let data = {
      columns: [
        {
          label: "Customer",
          field: "customer",
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

    if (!orders) {
      return data; // Return initial empty data
    }

    const sortedOrders = orders.sort((a, b) => {
        const lastStatusA = a.orderStatus[a.orderStatus.length - 1];
        const lastStatusB = b.orderStatus[b.orderStatus.length - 1];
        return new Date(lastStatusB.datedAt) - new Date(lastStatusA.datedAt);
      });
      
    sortedOrders.forEach((order) => {
      const latestOrderStatus = order.orderStatus[order.orderStatus.length - 1];

      let statusBadgeColor = "";
      switch (latestOrderStatus.orderLevel) {
        case "Order Placed":
          statusBadgeColor = "secondary";
          break;
        case "Order Accepted":
          statusBadgeColor = "primary";
          break;

        case "Container for pick up":
        case "Container has been picked up":
        case "Container is at the Store":
          statusBadgeColor = "info";
          break;
        case "Out for Delivery":
          statusBadgeColor = "warning";
          break;
        case "Delivered":
          statusBadgeColor = "success";
          break;
        case "Rejected":
          statusBadgeColor = "danger";
          break;
        default:
          statusBadgeColor = "light";
          break;
      }

      data.rows.push({
        customer: `${order.customer.fname} ${order.customer.lname}`,
        numOfItems: order.orderItems.length + order.orderProducts.length,
        amount: `₱${order.totalPrice}`,
        status: (
          <Badge color={statusBadgeColor}>
            {latestOrderStatus.orderLevel || "N/A"}
          </Badge>
        ),
        actions: (
          <Link to={`/update/order/${order._id}`} className="btn btn-info">
            <i className="fa fa-eye"></i>
          </Link>
        ),
      });
    });

    return data;
  };

  return (
    <>
      <MetaData title={"Order(s)"} />
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
                  <h3 className="mb-0">List of Order(s)</h3>
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
        </Container>
        <Container fluid>
          <AdminFooter />
        </Container>
      </div>
    </>
  );
};

export default RiderOrderList;
