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
/*eslint-disable*/
import { useState, useEffect } from "react";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";

import { useDispatch, useSelector } from "react-redux";
import { getStoreDetails } from "actions/storebranchActions";
var ps;

const Sidebar = (props) => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  const { storeBranch } = useSelector((state) => state.storeDetails);
  const [collapseOpen, setCollapseOpen] = useState();
  const activeRoute = (routeName) => {
    return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  const toggleCollapse = () => {
    setCollapseOpen((data) => !data);
  };
  const closeCollapse = () => {
    setCollapseOpen(false);
  };

  const { bgColor, routes, logo } = props;
  let navbarBrandProps;
  if (logo && logo.innerLink) {
    navbarBrandProps = {
      to: logo.innerLink,
      tag: Link,
    };
  } else if (logo && logo.outterLink) {
    navbarBrandProps = {
      href: logo.outterLink,
      target: "_blank",
    };
  }

  useEffect(() => {
    dispatch(getStoreDetails(user.storebranch));
    
    // console.log(user.storebranch);
   
  }, [dispatch]);

  return (
    <Navbar
      className="navbar-vertical fixed-left navbar-light bg-white"
      expand="md"
      id="sidenav-main">
      <Container fluid>
        {/* Toggler */}

        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleCollapse}>
          <span className="navbar-toggler-icon" />
        </button>
        {/* Brand */}
        {logo ? (
          <NavbarBrand className="pt-0" {...navbarBrandProps}>
            <img
              alt={logo.imgAlt}
              className="navbar-brand-img"
              src={logo.imgSrc}
              style={{ width: "200px", height: "300px" }}
            />
            <br />{" "}
            {user && (user.role === "rider" || user.role === "employee") && (
              <h3 className="text-overflow m-0">{`${storeBranch.branch}`}</h3>
            )}
            <h3
              className="text-overflow m-0"
              style={{ textTransform: "uppercase" }}>
              {`${user ? user.role : ""}`}
            </h3>
          </NavbarBrand>
        ) : null}

        {/* Collapse */}
        <Collapse navbar isOpen={collapseOpen}>
          {/* Collapse header */}
          <div className="navbar-collapse-header d-md-none">
            <Row>
              {logo ? (
                <Col className="collapse-brand" xs="6">
                  {logo.innerLink ? (
                    <Link to={logo.innerLink}>
                      <img alt={logo.imgAlt} src={logo.imgSrc} />
                    </Link>
                  ) : (
                    <a href={logo.outterLink}>
                      <img alt={logo.imgAlt} src={logo.imgSrc} />
                    </a>
                  )}
                </Col>
              ) : null}
              <Col className="collapse-close" xs="6">
                <button
                  className="navbar-toggler"
                  type="button"
                  onClick={toggleCollapse}>
                  <span />
                  <span />
                </button>
              </Col>
            </Row>
          </div>
          {/* Form */}
          <Form className="mt-4 mb-3 d-md-none">
            <InputGroup className="input-group-rounded input-group-merge">
              <Input
                aria-label="Search"
                className="form-control-rounded form-control-prepended"
                placeholder="Search"
                type="search"
              />
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <span className="fa fa-search" />
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </Form>
          {/* Navigation */}

          {user && user.role === "admin" && (
            <>
              <Nav navbar>
                <NavItem>
                  <NavLink href="/dashboard" onClick={closeCollapse}>
                    <i className="ni ni-chart-bar-32 text-pink" /> Dashboard
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/userlist" onClick={closeCollapse}>
                    <i className="ni ni-single-02 text-info" /> Customers
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/employee" onClick={closeCollapse}>
                    <i className="ni ni-badge text-blue" /> Employees
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/rider" onClick={closeCollapse}>
                    <i className="ni ni-user-run text-orange" /> Riders
                  </NavLink>
                </NavItem>
                <NavLink href="/storebranchlist">
                  <i className="ni ni-shop text-red" /> Stores
                </NavLink>

                {/* <NavItem>
              <NavLink href="/gallonlist" onClick={closeCollapse}>
                <i className="ni ni-settings-gear-65 text-yellow" /> Gallons
              </NavLink>
            </NavItem> */}
                {/* <NavItem>
              <NavLink href="/storebranchlist" onClick={closeCollapse}>
                <i className="ni ni-shop text-red" /> Store Branch
              </NavLink>
            </NavItem> */}
              </Nav>
              <hr className="my-3" />
              <h6 className="navbar-heading text-muted">POS</h6>
              <Nav navbar>
                <NavItem>
                  <NavLink href="/admin/POS/" onClick={closeCollapse}>
                    <i className="ni ni-active-40 text-yellow" /> Walk In Refill
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink href="/orderlist" onClick={closeCollapse}>
                    <i className="ni ni-basket text-green" /> Orders
                  </NavLink>
                </NavItem>
              </Nav>

              <hr className="my-3" />
              <h6 className="navbar-heading text-muted">Store Records</h6>

              <Nav navbar>
                <NavLink href="/machinecleaning">
                  <i className="ni ni-collection text-blue" /> Machine Cleaning
                </NavLink>

                <NavLink href="/barangayhealth">
                  <i className="ni ni-collection text-pink" /> Potability Test
                </NavLink>

                <NavLink href="/physicalchemtest">
                  <i className="ni ni-collection text-black" /> Physical &
                  Chemical Test
                </NavLink>

                <NavLink href="/businesspermit">
                  <i className="ni ni-collection text-info" /> Business Permit
                </NavLink>
              </Nav>

              <hr className="my-3" />
              <h6 className="navbar-heading text-muted">Store Container</h6>
              <Nav navbar>
                <NavLink href="/admin/product">
                  <i className="ni ni-bag-17 text-orange" /> Stocks
                </NavLink>
                <NavItem>
                  <NavLink href="/typesgallonlist" onClick={closeCollapse}>
                    <i className="ni ni-check-bold" />
                    Types & Pricing
                  </NavLink>
                </NavItem>
              </Nav>
            </>
          )}

          {user && user.role === "superadmin" && (
            <>
              <Nav navbar>
                <NavItem>
                  <NavLink href="/superadmin/dashboard" onClick={closeCollapse}>
                    <i className="ni ni-chart-bar-32 text-pink" /> Dashboard
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/superadmin/userlist" onClick={closeCollapse}>
                    <i className="ni ni-single-02 text-info" /> Users
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    href="/superadmin/pendinglist"
                    onClick={closeCollapse}>
                    <i className="ni ni-badge text-blue" /> Pending Admin
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/superadmin/adminlist" onClick={closeCollapse}>
                    <i className="ni ni-user-run text-orange" /> Admin
                  </NavLink>
                </NavItem>
                <NavLink href="/storebranchlist">
                  <i className="ni ni-shop text-red" /> Stores
                </NavLink>

                {/* <NavItem>
              <NavLink href="/gallonlist" onClick={closeCollapse}>
                <i className="ni ni-settings-gear-65 text-yellow" /> Gallons
              </NavLink>
            </NavItem> */}
                {/* <NavItem>
              <NavLink href="/storebranchlist" onClick={closeCollapse}>
                <i className="ni ni-shop text-red" /> Store Branch
              </NavLink>
            </NavItem> */}
              </Nav>
            </>
          )}

          {user && user.role === "employee" && (
            <>
              <Nav navbar>
               
                <NavItem>
                  <NavLink href="/employee/orderlist" onClick={closeCollapse}>
                    <i className="ni ni-single-02 text-info" /> Orders
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    href={`/admin/POS/inventory/${user.storebranch}`}
                    onClick={closeCollapse}>
                    <i className="ni ni-badge text-blue" /> Walk In Refill
                  </NavLink>
                </NavItem>
              </Nav>
            </>
          )}

          {user && user.role === "rider" && (
            <>
              <Nav navbar>
                
                <NavItem>
                  <NavLink href="/rider/orderlist" onClick={closeCollapse}>
                    <i className="ni ni-single-02 text-info" /> Orders
                  </NavLink>
                </NavItem>
              </Nav>
            </>
          )}

          {/* <Nav vertical>
                <NavItem>
                  <NavLink href="/subpage1" onClick={closeCollapse}>
                    Sub Page 1
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/subpage2" onClick={closeCollapse}>
                    Sub Page 2
                  </NavLink>
                </NavItem>
               
              </Nav> */}

          {/* <hr className="my-3" />

          <h6 className="navbar-heading text-muted">Documentation</h6>

          <Nav className="mb-md-3" navbar>
            <NavItem>
              <NavLink href="https://demos.creative-tim.com/argon-dashboard-react/#/documentation/overview?ref=adr-admin-sidebar">
                <i className="ni ni-spaceship" />
                Getting started
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://demos.creative-tim.com/argon-dashboard-react/#/documentation/colors?ref=adr-admin-sidebar">
                <i className="ni ni-palette" />
                Foundation
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://demos.creative-tim.com/argon-dashboard-react/#/documentation/alerts?ref=adr-admin-sidebar">
                <i className="ni ni-ui-04" />
                Components
              </NavLink>
            </NavItem>
          </Nav> */}
        </Collapse>
      </Container>
    </Navbar>
  );
};

Sidebar.defaultProps = {
  routes: [{}],
};

Sidebar.propTypes = {
  // links that will be displayed inside the component
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the image src of the logo
    imgSrc: PropTypes.string.isRequired,
    // the alt for the img
    imgAlt: PropTypes.string.isRequired,
  }),
};

export default Sidebar;
