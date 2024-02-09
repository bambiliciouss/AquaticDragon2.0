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
import { useState } from "react";
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
import { useSelector } from "react-redux";
var ps;

const Sidebar = (props) => {
  const { user, loading } = useSelector((state) => state.auth);
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

            <br />
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
              <NavLink href="/employeelist" onClick={closeCollapse}>
                <i className="ni ni-badge text-blue" /> Employees
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/riderlist" onClick={closeCollapse}>
                <i className="ni ni-user-run text-orange" /> Riders
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/gallonlist" onClick={closeCollapse}>
                <i className="ni ni-settings-gear-65 text-yellow" /> Gallons
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/storebranchlist" onClick={closeCollapse}>
                <i className="ni ni-shop text-red" /> Store Branch
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink href="/orderlist" onClick={closeCollapse}>
                <i className="ni ni-basket text-green" /> Orders
              </NavLink>
            </NavItem>
          </Nav>

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
          </Nav>
          <Nav className="mb-md-3" navbar>
            <NavItem className="active-pro active">
              <NavLink href="https://www.creative-tim.com/product/argon-dashboard-pro-react?ref=adr-admin-sidebar">
                <i className="ni ni-spaceship" />
                Upgrade to PRO
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
