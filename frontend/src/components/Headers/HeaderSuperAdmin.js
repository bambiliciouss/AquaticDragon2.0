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
import { Link } from "react-router-dom";
import {
  allUsersSA,
  allPendingSA,
  allAdminSA,
} from "actions/superadminActions";
const HeaderSuperAdmin = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.allUsersSA);
  const { ausers } = useSelector((state) => state.allAdminSA);
  const { pusers } = useSelector((state) => state.allPendingAdminSA);

  useEffect(() => {
    dispatch(allUsersSA());
    console.log("USERS", users);
    dispatch(allPendingSA());
    console.log("pENDING", pusers);
    dispatch(allAdminSA());
    console.log("ADMIN", ausers);
  }, [dispatch]);
  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <Col lg="4">
                <Link to="/superadmin/userlist">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0">
                            Users
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {users && users.length}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                            <i className="fas fa-chart-bar" />
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Link>
              </Col>
              <Col lg="4">
                <Link to="/superadmin/pendinglist">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0">
                            Pending Admin Approval
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {pusers ? pusers.length : 0}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                            <i className="fas fa-chart-pie" />
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Link>
              </Col>
              <Col lg="4">
                <Link to="/superadmin/adminlist">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0">
                            Admin
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {ausers ? ausers.length : 0}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                            <i className="fas fa-users" />
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Link>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default HeaderSuperAdmin;
