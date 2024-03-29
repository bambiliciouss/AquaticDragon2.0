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
import { Link } from "react-router-dom";
// reactstrap components
import {
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  Button,
  DropdownItem,
} from "reactstrap";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
const AdminNavbar = () => {
  const { user, loading } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const { cartProductItems } = useSelector((state) => state.cartProduct);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    swal("Logout Sucessfully", "", "success");
  };

  const storeBranchinfo = JSON.parse(sessionStorage.getItem("selectedStore"));

  const Avatar = ({ src, alt, size }) => {
    const avatarStyle = {
      width: "25px",
      height: "25px",
      borderRadius: "50%", // Makes the avatar circular
      overflow: "hidden", // Hide overflow in case the image is not a perfect square
    };

    const imgStyle = {
      width: "100%",
      height: "100%",
      objectFit: "cover", // Maintain aspect ratio and cover the entire container
    };

    return (
      <div style={avatarStyle}>
        <img src={src} alt={alt} style={imgStyle} />
      </div>
    );
  };
  return (
    <>
      <Navbar
        className="navbar-top navbar-horizontal navbar-dark"
        expand="md"
        style={{
          backgroundColor: "#3498db",
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 1000,
        }}>
        <Container className="px-4">
          <NavbarBrand to="/" tag={Link}>
            {/* <img
              alt="..."
              src={require("../../assets/img/brand/logoss.png")}
              style={{ width: "150px", height: "auto" }}
            /> */}
            Aquatic Dragon
          </NavbarBrand>
          <button className="navbar-toggler" id="navbar-collapse-main">
            <span className="navbar-toggler-icon" />
          </button>
          <UncontrolledCollapse navbar toggler="#navbar-collapse-main">
            <div className="navbar-collapse-header d-md-none">
              <Row>
                <Col className="collapse-brand" xs="6">
                  <Link to="/">
                    <img
                      alt="..."
                      src={require("../../assets/img/brand/logo2.1.jpg")}
                    />{" "}
                  </Link>
                </Col>
                <Col className="collapse-close" xs="6">
                  <button className="navbar-toggler" id="navbar-collapse-main">
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>
            <Nav className="ml-auto" navbar>
              {user ? (
                <>
                  {storeBranchinfo ? (
                    <NavItem>
                      <NavLink className="nav-link-icon" to="/cart" tag={Link}>
                        <i className="ni ni-cart" />
                        <span className="nav-link-inner--text">
                          {cartItems.length + cartProductItems.length}
                        </span>
                      </NavLink>
                    </NavItem>
                  ) : (
                    <NavItem>
                      <NavLink
                        className="nav-link-icon"
                        to="/storeselection"
                        tag={Link}>
                        <i className="ni ni-cart" />
                        <span className="nav-link-inner--text">Order Now</span>
                      </NavLink>
                    </NavItem>
                  )}
                  <UncontrolledDropdown nav>
                    <DropdownToggle
                      caret
                      color="default"
                      nav
                      className="d-flex align-items-center">
                      <Avatar src={user.avatar && user.avatar.url} size="sm" />
                      {/* <span className="ml-2">Profile</span> */}
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem href="/my-profile">
                        <i className="now-ui-icons users_single-02"></i>
                        Profile
                      </DropdownItem>
                      <DropdownItem href="/orders/me">
                        <i className="now-ui-icons users_single-02"></i>
                        My orders
                      </DropdownItem>
                      {user && user.role === "admin" && (
                        <DropdownItem href="/dashboard">
                          <i className="now-ui-icons business_chart-bar-32"></i>
                          Dashboard
                        </DropdownItem>
                      )}
                      {/* 
                      <DropdownItem href="/gallon/order">
                        <i className="now-ui-icons business_chart-bar-32"></i>
                        Gallons
                      </DropdownItem> */}

                      {/* <DropdownItem href="/storeselection">
                        <i className="now-ui-icons business_chart-bar-32"></i>
                        Order Now
                      </DropdownItem> */}
                      <DropdownItem href="/login" onClick={logoutHandler}>
                        <i className="now-ui-icons media-1_button-power"></i>
                        Logout
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </>
              ) : (
                <NavItem>
                  <NavLink className="nav-link-icon" to="/login" tag={Link}>
                    <i className="ni ni-key-25" />
                    <span className="nav-link-inner--text">Login</span>
                  </NavLink>
                </NavItem>
              )}
              {/* <NavItem>
                <NavLink className="nav-link-icon" to="/" tag={Link}>
                  <i className="ni ni-planet" />
                  <span className="nav-link-inner--text">Dashboard</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link-icon" to="/register" tag={Link}>
                  <i className="ni ni-circle-08" />
                  <span className="nav-link-inner--text">Register</span>
                </NavLink>
              </NavItem>
             
              <NavItem>
                <NavLink className="nav-link-icon" to="/my-profile" tag={Link}>
                  <i className="ni ni-single-02" />
                  <span className="nav-link-inner--text">Profile</span>
                </NavLink>
              </NavItem> */}
            </Nav>
          </UncontrolledCollapse>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;
