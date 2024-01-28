import React, { Fragment, useEffect } from "react";

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
import { allOrders, clearErrors } from "../../actions/orderActions";
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
} from "reactstrap";

const OrderList = () => {
  const dispatch = useDispatch();

  let navigate = useNavigate();

  const { loading, error, orders } = useSelector((state) => state.allOrders);

  useEffect(() => {
    dispatch(allOrders());

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
          <Link to={`/order/${order._id}`} className="btn btn-info">
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
          imgSrc: require("../../assets/img/brand/argon-react.png"),
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

export default OrderList;
