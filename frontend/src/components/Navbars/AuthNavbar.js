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
import React, {useEffect, useState, useMemo} from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import NotificationBell from "components/button/NotificationBell";
import socket from '../../socket'
import {toast} from 'react-toastify'
const AdminNavbar = () => {
  const { user, loading } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const { cartProductItems } = useSelector((state) => state.cartProduct);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [customerNotifications, setCustomerNotifications] = useState([]);
  const [customerUnreadCount, setCustomerUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [renewalNotifications, setRenewalNotifications] = useState([]);
  const [renewalUnreadCount, setRenewalUnreadCount] = useState(0);

  const [orderCount, setOrderCount] = useState(0);

  const logoutHandler = () => {
    dispatch(logout());
    localStorage.clear();
    socket.disconnect();
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
  const toggleDropdown = () => {
    if (user && user.role === 'admin'){
      setUnreadCount(0); // Reset unread count when dropdown is opened
      setRenewalUnreadCount(0);
    }
    else if (user && user.role === 'user'){
      setCustomerUnreadCount(0);
   
    }
    
  };
  useEffect(()=>{
    socket.on('triggerRenewalNotification', ()=>{
      socket.emit('fetchRenewalNotification', {adminId: user._id})
    })
    return ()=>{
      socket.off('triggerRenewalNotification')
    }
  },[])
  useEffect(() => {
    socket.on("notifyAdmin", (data) => {
      console.log("notifyAdmin", data);
      setRenewalNotifications([]);
      setRenewalUnreadCount(0);
      data.forEach((notification) => {
        setRenewalNotifications((prevNotifications) => [
          ...prevNotifications,
          {
            message: notification.message,
            title: notification.title,
            notificationId: notification._id,
            order: notification.documentType === 'PotabilityID' ? notification.PotabilityID : notification.documentType === 'businessPermitID' ? notification.businessPermitID : notification.PhyChemID,
            documentType: notification.documentType,
            createdAt: notification.createdAt,
            renewal: true,
          },
        ]);
        setRenewalUnreadCount((prevCount) => prevCount + 1);
      });
    });
    return () => {
      socket.off("notifyAdmin");
    };
  }, []);
  useEffect(()=>{
    if (user && user.role === 'user'){
      socket.emit('login', {userID: user._id, role: user.role})
    }
    
    socket.off('customerNotification');
    socket.on('customerNotification', (data) => {
      console.log('riderNotification', data);
      setCustomerNotifications([])
      setCustomerUnreadCount(0);
      data.forEach((item, index) => {
     
        setCustomerNotifications(prevNotifications => [...prevNotifications, { message: item.message, title: item.title, notificationId: item._id, order: item.order, createdAt: item.createdAt}]);
        setCustomerUnreadCount(prevCount => prevCount + 1);
      
      });
      if (data.length > 0){
        setOrderCount(data.length);
      }
    })
  },[])
  useEffect(() => {
    if (user && user.role === 'admin'){
      socket.emit('login', { userID: user._id, role: user.role })
    }
    
    socket.off("notification");
    socket.on("notification", (data) => {
      // Broadcast the received message to all connected clients

      setNotifications([]);
      setUnreadCount(0);
      data.forEach((item, index) => {
        const refill = item.orders.orderItems.length;

        const newItem = item.orders.orderProducts.length;

        const fullMessage = `${refill} refill, ${newItem} new container`;

        setNotifications((prevNotifications) => [
          ...prevNotifications,
          {
            message: fullMessage,
            title: item.title,
            notificationId: item._id,
            order: item.orders._id,
            renewal: false,
            createdAt: item.createdAt,
          },
        ]);
        setUnreadCount((prevCount) => prevCount + 1);
      });

      if (data.length > 0) {
        setOrderCount(data.length);
      }
    });
  }, []);
  useEffect(()=>{
    if (orderCount){
      toast.success(`You have ${orderCount} new notification(s)`)
    }
  },[orderCount])
  const combinedNotifications = useMemo(() => [...renewalNotifications, ...notifications], [renewalNotifications, notifications]);
  const combinedUnreadCount = useMemo(() => renewalUnreadCount + unreadCount, [renewalUnreadCount, unreadCount]);
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
            Home
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
            <Nav className="ml-auto align-items-center d-none d-md-flex" navbar>
            
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
                  ) : user && user.role === "user" ? (
                    <NavItem>
                      <NavLink
                        className="nav-link-icon"
                        to="/storeselection"
                        tag={Link}>
                        <i className="ni ni-cart" />
                        <span className="nav-link-inner--text">Order Now</span>
                      </NavLink>
                    </NavItem>
                  ) : null}

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
                      {user &&
                      (user.role === "employee" ||
                        user.role === "admin" ||
                        user.role === "rider") ? (
                        <DropdownItem href="/admin-profile">
                          <i className="now-ui-icons users_single-02"></i>
                          Profile
                        </DropdownItem>
                      ) : (
                        <DropdownItem href="/my-profile">
                          <i className="now-ui-icons users_single-02"></i>
                          Profile
                        </DropdownItem>
                      )}
                      <DropdownItem href="/orders/me">
                        <i className="now-ui-icons users_single-02"></i>
                        My orders
                      </DropdownItem>
                      {user &&
                        (user.role === "rider" ||
                          user.role === "employee" ||
                          user.role === "admin") && (
                          <DropdownItem href={user.role==="admin"? "/dashboard" : user.role === "employee" ? "/employee/orderlist" : "/rider/orderlist"}>
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
              {user && user.role === 'user' && <NotificationBell notifications={customerNotifications} unreadCount={customerUnreadCount} toggleDropdown={toggleDropdown} />}
              {user && user.role === 'admin' && <NotificationBell notifications={combinedNotifications} unreadCount={combinedUnreadCount} toggleDropdown={toggleDropdown} />}
            </Nav>
          </UncontrolledCollapse>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;
