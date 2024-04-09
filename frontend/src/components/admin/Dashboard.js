/*!

=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { useState, useEffect } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
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
  CardTitle,
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "../variables/charts.js";

import Header from "components/Headers/Header.js";

import React from "react";
import { useLocation, Route, Routes, Navigate } from "react-router-dom";

// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import MetaData from "components/layout/MetaData.js";


// Default Admin Chart (All store sales)
import { allStoreSalesAction, getSalesWalkin,getSalesOrderByBranch, getOrderTransactions, getOrderByGallonType, clearErrors } from "../../actions/adminAction";
import { useDispatch, useSelector } from "react-redux";
const Dashboard = (props) => {
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");
  const dispatch = useDispatch();
  const { sales, loading, error } = useSelector((state) => state.adminStoreSales);
  const {orders} = useSelector((state)=>state.adminSalesOrder)
  const {transactions} = useSelector((state) => state.adminOrderTransaction);
  const { user } = useSelector((state) => state.auth)
  const { branch } = useSelector((state) => state.adminStoreBranch)
  const { sales: walkinSales } = useSelector((state) => state.adminSalesWalkin);
  const {gallons} = useSelector((state) => state.adminOrderGallonType)
  const [totalSales, setTotalSales] = useState(0)
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "Sales",
        data: [],
        maxBarThickness: 20,
      },
    ],
  })
  const [data2, setData2] = useState({
    labels: [],
    datasets: [
      {
        label: "Sales",
        data: [],
        maxBarThickness: 20,
      },
    ],
  })
  const [data3, setData3] = useState({
    labels: [],
    datasets: [
      {
        label: "Sales",
        data: [],
        maxBarThickness: 20,
      },
    ],
  })
  const [data4, setData4] = useState({
    labels: [],
    datasets: [
      {
        label: "Sales",
        data: [],
        maxBarThickness: 20,
      },
    ],
  })
  let hue = Math.random() * 360;
  const goldenRatioConjugate = 0.618033988749895;
  function getRandomColor() {
      hue += goldenRatioConjugate;
      hue = hue % 1;
      const h = Math.floor(hue*360)
      return `hsl(${h},60%,60%)`
  }
  useEffect(() => {
    if (sales) {
      let salesData = {
        labels: sales.map((sale) => sale.branch),
        datasets: [
          {
            label: "Sales",
            data: sales.map((sale) => sale.totalSales),
            maxBarThickness: 30,
            backgroundColor: sales.map(() => getRandomColor()), // Add this line
          },
        ],
      }
      setData(salesData)
    }
    if (transactions){
      let salesData = {
        labels: transactions.map((sale) => sale._id),
        datasets: [
          {
            label: "Sales",
            data: transactions.map((sale) => sale.count),
            maxBarThickness: 30,
            backgroundColor: transactions.map(() => getRandomColor()), // Add this line
          },
        ],
      }
      setData2(salesData)
    }
    if (gallons && gallons.length > 0){
      let salesData = {
        labels: gallons[0]["Refill"].map((sale) => sale.typeName),
        datasets: [
          {
            label: "Sales",
            data: gallons[0]["Refill"].map((sale) => sale.count),
            maxBarThickness: 30,
            backgroundColor: gallons.map(() => getRandomColor()), // Add this line
          },
        ],
      }
      setData3(salesData)
      let salesData4 = {
        labels: gallons[0]["New Container"].map((sale) => sale.typeName),
        datasets: [
          {
            label: "Sales",
            data: gallons[0]["New Container"].map((sale) => sale.count),
            maxBarThickness: 30,
            backgroundColor: gallons[0]["New Container"].map(() => getRandomColor()),
          },
        ],
        
      }
      setData4(salesData4);
      
    }
  }, [sales, transactions, gallons])



  const getTotalSales = (order,walkin) => {
    if (order.length > 0 && walkin.length > 0){
      const totalSalesOrder = order.find((sale) => sale._id === branch).totalSales || 0;
      const totalSalesWalkin = walkin.find((sale) => sale._id === branch).totalSales || 0;
      setTotalSales(totalSalesOrder + totalSalesWalkin)
    }
  }
  useEffect(()=>{
    
    if (branch){
      getTotalSales(orders,walkinSales)
      dispatch(getOrderTransactions(branch));
      dispatch(getOrderByGallonType(branch));
    }
  },[sales, walkinSales, branch])
  useEffect(() => {
    dispatch(allStoreSalesAction(user._id));
    dispatch(getSalesWalkin());
    dispatch(getSalesOrderByBranch(user._id));
    
    if (error) {
      dispatch(clearErrors())
    }
  }, [dispatch, error])

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };

  const location = useLocation();

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [location]);

  return (
    <>
      <MetaData title={"Dashboard"} />
      <Sidebar
        logo={{
          innerLink: "/",
          imgSrc: require("../../assets/img/brand/logo2.1.jpg"),
          imgAlt: "...",
        }}
      />
      <div className="main-content">
        <AdminNavbar />
        <Header />

        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="mb-5 mb-xl-4" lg="6" xl="4">

              <Card className="card-stats mb-4 mb-xl-0">
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
                        tag={sales && branch && sales.find((sale) => sale._id === branch) ? "h1" : "h3"}
                        className="text-uppercase text-primary mb-0 font-weight-bolder">
                        {totalSales ? `₱${totalSales}` : "Select a branch"}
                      </CardTitle>

                    </Col>
                  </Row>
                </CardBody>
              </Card>

            </Col>
            <Col className="mb-5 mb-xl-4" lg="6" xl="4">

              <Card className="card-stats mb-4 mb-xl-0">
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
                        tag={orders && branch && orders .find((sale) => sale._id === branch) ? "h1" : "h3"}
                        className="text-uppercase text-primary mb-0 font-weight-bolder">
                        {orders && branch && orders.find((sale) => sale._id === branch) ? `₱${orders.find((sale) => sale._id === branch).totalSales}` : "Select a branch"}
                      </CardTitle>

                    </Col>
                  </Row>
                </CardBody>
              </Card>

            </Col>
            <Col className="mb-5 mb-xl-4" lg="6" xl="4">

              <Card className="card-stats mb-4 mb-xl-0">
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
                        tag={walkinSales && branch && walkinSales.find((sale) => sale._id === branch) ? "h1" : "h3"}
                        className="text-uppercase text-primary mb-0 font-weight-bolder">
                        {walkinSales && branch && walkinSales.find((sale) => sale._id === branch) ? `₱${walkinSales.find((sale) => sale._id === branch).totalSales}` : "Select a branch"}
                      </CardTitle>

                    </Col>
                  </Row>
                </CardBody>
              </Card>

            </Col>

          </Row>
          <Row>
            <Col className="mb-5 mb-xl-4" xl="4">
              <Card className="shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h6 className="text-uppercase text-muted ls-1 mb-1">
                        Performance
                      </h6>
                      <h2 className="mb-0">Order Transactions</h2>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>

                  <div className="chart">
                    <Bar
                      data={data2}
                      options={chartExample2.options}
                    />
                  </div>
                </CardBody>
              </Card>

            </Col>
            <Col className="mb-5 mb-xl-4" xl="4">
              <Card className="shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h6 className="text-uppercase text-muted ls-1 mb-1">
                        Performance
                      </h6>
                      <h2 className="mb-0">Gallon Type (Refill)</h2>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>

                  <div className="chart">
                    <Bar
                      data={data3}
                      options={chartExample2.options}
                    />
                  </div>
                </CardBody>
              </Card>

            </Col>
            <Col className="mb-5 mb-xl-4" xl="4">
              <Card className="shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h6 className="text-uppercase text-muted ls-1 mb-1">
                        Performance
                      </h6>
                      <h2 className="mb-0">Gallon Type (New Container)</h2>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>

                  <div className="chart">
                    <Bar
                      data={data4}
                      options={chartExample2.options}
                    />
                  </div>
                </CardBody>
              </Card>

            </Col>
          </Row>
          <Row>
          <Col className="mb-5 mb-xl-4" xl="4">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Product Inventory</h3>
                    </div>
                    <div className="col text-right">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        size="sm">
                        See all
                      </Button>
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Product</th>
                      <th scope="col">Stocks</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Facebook</th>
                      <td>1,480</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">60%</span>
                          <div>
                            <Progress
                              max="100"
                              value="60"
                              barClassName="bg-gradient-danger"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Facebook</th>
                      <td>5,480</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">70%</span>
                          <div>
                            <Progress
                              max="100"
                              value="70"
                              barClassName="bg-gradient-success"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Google</th>
                      <td>4,807</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">80%</span>
                          <div>
                            <Progress max="100" value="80" />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Instagram</th>
                      <td>3,678</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">75%</span>
                          <div>
                            <Progress
                              max="100"
                              value="75"
                              barClassName="bg-gradient-info"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">twitter</th>
                      <td>2,645</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">30%</span>
                          <div>
                            <Progress
                              max="100"
                              value="30"
                              barClassName="bg-gradient-warning"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card>
            </Col> 
          </Row>
          <Row>
            <Col className="mb-5 mb-xl-4" xl="12">
              <Card className="shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h6 className="text-uppercase text-muted ls-1 mb-1">
                        Performance
                      </h6>
                      <h2 className="mb-0">Total Sales By Branch</h2>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>

                  <div className="chart">
                    <Bar
                      data={data}
                      options={chartExample2.options}
                    />
                  </div>
                </CardBody>
              </Card>

            </Col>
          </Row>
          {/* <Row>
          <Col xl="4">
            <Card className="bg-gradient-default shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h6 className="text-uppercase text-light ls-1 mb-1">
                        Overview
                      </h6>
                      <h2 className="text-white mb-0">Sales value</h2>
                    </div>
                    <div className="col">
                      <Nav className="justify-content-end" pills>
                        <NavItem>
                          <NavLink
                            className={classnames("py-2 px-3", {
                              active: activeNav === 1,
                            })}
                            href="#pablo"
                            onClick={(e) => toggleNavs(e, 1)}>
                            <span className="d-none d-md-block">Month</span>
                            <span className="d-md-none">M</span>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames("py-2 px-3", {
                              active: activeNav === 2,
                            })}
                            data-toggle="tab"
                            href="#pablo"
                            onClick={(e) => toggleNavs(e, 2)}>
                            <span className="d-none d-md-block">Week</span>
                            <span className="d-md-none">W</span>
                          </NavLink>
                        </NavItem>
                      </Nav>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                
                  <div className="chart">
                    <Line
                      data={chartExample1[chartExample1Data]}
                      options={chartExample1.options}
                      getDatasetAtEvent={(e) => console.log(e)}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col className="mb-5 mb-xl-0" xl="8">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Page visits</h3>
                    </div>
                    <div className="col text-right">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        size="sm">
                        See all
                      </Button>
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Page name</th>
                      <th scope="col">Visitors</th>
                      <th scope="col">Unique users</th>
                      <th scope="col">Bounce rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">/argon/</th>
                      <td>4,569</td>
                      <td>340</td>
                      <td>
                        <i className="fas fa-arrow-up text-success mr-3" />{" "}
                        46,53%
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">/argon/index.html</th>
                      <td>3,985</td>
                      <td>319</td>
                      <td>
                        <i className="fas fa-arrow-down text-warning mr-3" />{" "}
                        46,53%
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">/argon/charts.html</th>
                      <td>3,513</td>
                      <td>294</td>
                      <td>
                        <i className="fas fa-arrow-down text-warning mr-3" />{" "}
                        36,49%
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">/argon/tables.html</th>
                      <td>2,050</td>
                      <td>147</td>
                      <td>
                        <i className="fas fa-arrow-up text-success mr-3" />{" "}
                        50,87%
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">/argon/profile.html</th>
                      <td>1,795</td>
                      <td>190</td>
                      <td>
                        <i className="fas fa-arrow-down text-danger mr-3" />{" "}
                        46,53%
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card>
            </Col>
            <Col xl="4">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Social traffic</h3>
                    </div>
                    <div className="col text-right">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        size="sm">
                        See all
                      </Button>
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Referral</th>
                      <th scope="col">Visitors</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Facebook</th>
                      <td>1,480</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">60%</span>
                          <div>
                            <Progress
                              max="100"
                              value="60"
                              barClassName="bg-gradient-danger"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Facebook</th>
                      <td>5,480</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">70%</span>
                          <div>
                            <Progress
                              max="100"
                              value="70"
                              barClassName="bg-gradient-success"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Google</th>
                      <td>4,807</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">80%</span>
                          <div>
                            <Progress max="100" value="80" />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Instagram</th>
                      <td>3,678</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">75%</span>
                          <div>
                            <Progress
                              max="100"
                              value="75"
                              barClassName="bg-gradient-info"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">twitter</th>
                      <td>2,645</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">30%</span>
                          <div>
                            <Progress
                              max="100"
                              value="30"
                              barClassName="bg-gradient-warning"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card>
            </Col> 
          </Row> */}
        </Container>
        <Container fluid>
          <AdminFooter />
        </Container>
      </div>
    </>
  );
};

export default Dashboard;
