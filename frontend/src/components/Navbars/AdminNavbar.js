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
import React, { useEffect, useState, useRef } from 'react'
import { Link } from "react-router-dom";
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Navbar,
  Nav,
  Container,
  Media,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions";
import swal from "sweetalert";
import DropdownComponent from "components/button/Dropdown";

import socket from '../../socket'
import { toast } from 'react-toastify'
import NotificationBell from 'components/button/NotificationBell';
const AdminNavbar = (props) => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  const logoutHandler = () => {
    dispatch(logout());
    localStorage.clear();
    socket.disconnect();
    swal("Logout Sucessfully", "", "success");
  };
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const hasRun = useRef(false);
  const newOrderNotif = useRef(false);
  const [orderCount, setOrderCount] = useState(0);

  useEffect(() => {
    socket.emit('login', { adminId: user._id })
    socket.off('notification');
    socket.on('notification', (data) => {
      

      // Broadcast the received message to all connected clients


      setNotifications([])
      setUnreadCount(0);
      data.forEach((item, index) => {
        const refill = item.orders.orderItems.length;

        const newItem = item.orders.orderProducts.length;

        const fullMessage = `${refill} refill, ${newItem} new container`;

        setNotifications(prevNotifications => [...prevNotifications, { message: fullMessage, title: item.title, notificationId: item._id, order: item.orders._id }]);
        setUnreadCount(prevCount => prevCount + 1);

      });

      if (data.length > 0) {
        setOrderCount(data.length);

      }
    })
  }, [])

  useEffect(() => {
    if (orderCount) {
      toast.success(`You have ${orderCount} new order(s)`)

    }
  }, [orderCount])


  const toggleDropdown = () => {

    setUnreadCount(0); // Reset unread count when dropdown is opened
  };
  
  return (
    <>
      {user ? (
        <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
          <Container fluid>
            <Link
              className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
              to="/">
              {props.brandText}
            </Link>
            {/* <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
              <FormGroup className="mb-0">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fas fa-search" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Search" type="text" />
                </InputGroup>
              </FormGroup>
            </Form> */}
            <Nav className="align-items-center d-none d-md-flex" navbar>
              <NotificationBell notifications={notifications} unreadCount={unreadCount} toggleDropdown={toggleDropdown} />
              {user && user.role === "admin" && <DropdownComponent />}

              <UncontrolledDropdown nav>
                <DropdownToggle className="pr-0" nav>
                  <Media className="align-items-center">
                    <span className="avatar avatar-sm rounded-circle">
                      <img alt="..." src={user.avatar && user.avatar.url} />
                    </span>
                    <Media className="ml-2 d-none d-lg-block">
                      <span className="mb-0 text-sm font-weight-bold">
                        {user.fname} {user.lname}
                      </span>
                    </Media>
                  </Media>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow" right>
                  <DropdownItem className="noti-title" header tag="div">
                    <h6 className="text-overflow m-0">Welcome!</h6>
                  </DropdownItem>
                  <DropdownItem to="/admin-profile" tag={Link}>
                    <i className="ni ni-single-02" />
                    <span>My profile</span>
                  </DropdownItem>
                  {/* <DropdownItem to="/admin/user-profile" tag={Link}>
                    <i className="ni ni-settings-gear-65" />
                    <span>Settings</span>
                  </DropdownItem>
                  <DropdownItem to="/admin/user-profile" tag={Link}>
                    <i className="ni ni-calendar-grid-58" />
                    <span>Activity</span>
                  </DropdownItem>
                  <DropdownItem to="/admin/user-profile" tag={Link}>
                    <i className="ni ni-support-16" />
                    <span>Support</span>
                  </DropdownItem> */}
                  <DropdownItem divider />
                  <DropdownItem href="/login" onClick={logoutHandler}>
                    <i className="ni ni-user-run" />
                    <span>Logout</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Container>
        </Navbar>
      ) : null}
    </>
  );
};

export default AdminNavbar;
