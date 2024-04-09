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

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allUsers } from "../../actions/userActions";

import { getAllStaff, getSingleBranchUsers } from "../../actions/adminAction";
import { allGallons } from "../../actions/gallonActions";

const Header = () => {
  const dispatch = useDispatch();
  const { users, loading: customerLoading } = useSelector((state) => state.adminStoreCustomer);
  const {users: staff, loading: staffLoading} = useSelector((state)=>state.adminStoreStaff);
  const { gallons } = useSelector((state) => state.allGallons);
  const currentDate = new Date();
  const formattedDate = currentDate.toDateString();
  const {branch: branchID} = useSelector((state) => state.adminStoreBranch);
  useEffect(() => {
    
    
    dispatch(allGallons());
    
  }, [dispatch]);
  useEffect(()=>{
    if (branchID){
      dispatch(getSingleBranchUsers(branchID));
      dispatch(getAllStaff(branchID))
    }
  },[branchID])
  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <Col lg="6" xl="4">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0">
                          Customers
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {users && !customerLoading &&
                            users.filter((user) => user.role === "user").length > 0 ? users.filter((user) => user.role === "user").length :<span className="text-danger">Select a branch</span>}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fas fa-chart-bar" />
                        </div>
                      </Col>
                    </Row>
                    {/* <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fa fa-arrow-up" /> As of
                      </span>{" "}
                      <span className="text-nowrap">{formattedDate}</span>
                    </p> */}
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="4">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0">
                          Employees
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {" "}
                          {staff && !staffLoading &&
                            staff.filter((user) => user.role === "employee")
                              .length > 0 ? staff.filter((user) => user.role === "employee").length:<span className="text-danger">Select a branch</span>}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <i className="fas fa-chart-pie" />
                        </div>
                      </Col>
                    </Row>
                    {/* <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-danger mr-2">
                        <i className="fas fa-arrow-down" /> As of
                      </span>{" "}
                      <span className="text-nowrap">{formattedDate}</span>
                    </p> */}
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="4">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0">
                          Riders
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {staff &&!staffLoading &&
                            staff.filter((user) => user.role === "rider")
                              .length > 0 ? staff.filter((user) => user.role === "rider").length:<span className="text-danger">Select a branch</span>}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                          <i className="fas fa-users" />
                        </div>
                      </Col>
                    </Row>
                    {/* <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-warning mr-2">
                        <i className="fas fa-arrow-down" /> As of 
                      </span>{" "}
                      <span className="text-nowrap">{formattedDate}</span>
                    </p> */}
                  </CardBody>
                </Card>
              </Col>
              
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
