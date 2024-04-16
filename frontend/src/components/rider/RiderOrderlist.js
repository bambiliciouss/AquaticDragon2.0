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
import { allStoreSalesAction, getSalesWalkin, getSalesOrderByBranchEmployee, getEmployeeBranch } from "../../actions/adminAction";

import { allOrdersRider, clearErrors } from "../../actions/orderActions";
import Loader from "components/layout/Loader";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
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


  const { user } = useSelector((state) => state.auth) // Get the user id
  const { sales: walkinSales } = useSelector((state) => state.adminSalesWalkin); // Get the sales of all walk in orders
  const { orders: orderSales } = useSelector((state) => state.employeeOrderSales)
  const { branches: branch } = useSelector((state) => state.employeeBranch) // Get employee branch
  // const { sales } = useSelector((state) => state.adminStoreSales); // Get the sales of all stores

  let navigate = useNavigate();
  const [totalSales, setTotalSales] = useState(0)

  // Function to calculate the total sales of the selected branch
  const getTotalSales = (order, walkin) => {
    if (order.length > 0 || walkin.length > 0) {
      const totalSalesOrder = order.find((sale) => sale._id === branch.branches.storebranch)?.totalSales || 0;
      const totalSalesWalkin = walkin.find((sale) => sale._id === branch.branches.storebranch)?.totalSales || 0;
      setTotalSales(totalSalesOrder + totalSalesWalkin)
      localStorage.setItem("totalSales", totalSalesOrder + totalSalesWalkin)
    }
    else{
      setTotalSales(0)
      localStorage.setItem("totalSales", 0)
    
    }
  }
  const { loading, error, orders } = useSelector(
    (state) => state.allOrdersStaff
  );

  useEffect(() => {
    dispatch(allOrdersRider());
    if (error) {
      dispatch(clearErrors());
    }
    
  }, [dispatch, error]);
  // Universal UseEffect
  useEffect(() => {
    if (user.role === 'rider') {

 

      // Action for walkinSales state
      // Gets the total sales of all walkin sales
      dispatch(getSalesWalkin());

      // Action for orders state
      // Gets the total sales of all orders
      dispatch(getSalesOrderByBranchEmployee(user._id));

      //Get all admin branches
      dispatch(getEmployeeBranch(user._id));

      if (error) {
        dispatch(clearErrors())
      }
    }
  }, [dispatch, error, user])


  useEffect(() => {
    if (branch) {
      getTotalSales(orderSales, walkinSales)

    }
  }, [branch])

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
          <Row>
            <Col className="mb-5 mb-xl-4" lg="6" xl="4">

              <Card className="shadow card-stats mb-4 mb-xl-0">
                <CardBody>
                  <Row className="align-items-center">
                    <div className="col">
                      <CardTitle
                        tag="h2"
                        className="text-uppercase text-black mb-0  font-weight-bolder">
                        Total Sales
                      </CardTitle>

                    </div>
                    <Col className="col-auto">
                    <CardTitle
                        tag="h1"
                        className="text-uppercase text-primary mb-0 font-weight-bolder">
                        {totalSales && totalSales > 0 ? `₱${totalSales}` : localStorage.getItem("totalSales") && localStorage.getItem("totalSales") > 0 ? `₱${localStorage.getItem("totalSales")}` : <span className="text-danger">₱0</span>}
                      </CardTitle>

                    </Col>
                  </Row>
                </CardBody>
              </Card>

            </Col>
            <Col className="mb-5 mb-xl-4" lg="6" xl="4">

              <Card className="shadow card-stats mb-4 mb-xl-0">
                <CardBody>
                  <Row className="align-items-center">
                    <div className="col">
                      <CardTitle
                        tag="h2"
                        className="text-uppercase text-black mb-0  font-weight-bolder">
                        Total Sales Ordering
                      </CardTitle>

                    </div>
                    <Col className="col-auto">
                    <CardTitle
                        tag="h1"
                        className="text-uppercase text-primary mb-0 font-weight-bolder">
                        {orderSales && branch && branch.branches && orderSales.find((sale) => sale._id === branch.branches.storebranch) ? `₱${orderSales.find((sale) => sale._id === branch.branches.storebranch).totalSales}` : <span className="text-danger">₱0</span>}
                      </CardTitle>

                    </Col>
                  </Row>
                </CardBody>
              </Card>

            </Col>
            <Col className="mb-5 mb-xl-4" lg="6" xl="4">

              <Card className="shadow card-stats mb-4 mb-xl-0">
                <CardBody>
                  <Row className="align-items-center">
                    <div className="col">
                      <CardTitle
                        tag="h2"
                        className="text-uppercase text-black mb-0  font-weight-bolder">
                        Total Sales Walk In
                      </CardTitle>

                    </div>
                    <Col className="col-auto">
                    <CardTitle
                        tag="h1"
                        className="text-uppercase text-primary mb-0 font-weight-bolder">
                        {walkinSales && branch && branch.branches && walkinSales.find((sale) => sale._id === branch.branches.storebranch) ? `₱${walkinSales.find((sale) => sale._id === branch.branches.storebranch).totalSales}` : <span className="text-danger">₱0</span>}
                      </CardTitle>

                    </Col>
                  </Row>
                </CardBody>
              </Card>

            </Col>
          </Row>
          <Row>
            <Col className="mb-5 mb-xl-0" xl="12">
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
            </Col>
          </Row>
        </Container>
        <Container fluid>
          <AdminFooter />
        </Container>
      </div>
    </>
  );
};

export default RiderOrderList;
