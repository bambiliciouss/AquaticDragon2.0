import React, { useEffect, useState, useCallback, forwardRef } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Badge from "react-bootstrap/Badge";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faHourglassHalf,
  faTruckFast,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import moment from "moment-timezone";
import socket from "../../socket";
const NotificationBell = ({ notifications, unreadCount, toggleDropdown }) => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const CustomToggle = forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      className="text-white"
    >
      {children}
    </a>
  ));
  const CustomMenu = forwardRef(
    ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
      const [value, setValue] = useState("");

      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <ul className="list-unstyled">
            {React.Children.toArray(children).filter(
              (child) =>
                !value || child.props.children.toLowerCase().startsWith(value)
            )}
          </ul>
        </div>
      );
    }
  );
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = useCallback(() => {
    toggleDropdown();
    setIsOpen((prevIsOpen) => !prevIsOpen);
  }, [toggleDropdown]);
  const markAsRead = (id, orderid, renewal, documentType) => {
    if (user.role === "admin") {
      if (renewal) {
        socket.emit("readRenewalNotification", {
          adminId: user._id,
          notificationId: id,
        });
        if (documentType === "businessPermitID") {
          navigate(`/update/store/businesspermit/${orderid}`);
        }
        if (documentType === "PhyChemID") {
          navigate(`/physicalchemtest/update/${orderid}`);
        }
        if (documentType === "PotabilityID") {
          navigate(`/update/store/barangayhealth/${orderid}`);
        }
        if (documentType === "MachineCleaningID") {
          navigate(`/update/store/machincecleaning/${orderid}`);
        }
      } else {
        socket.emit("readNotification", {
          adminId: user._id,
          notificationId: id,
        });
        navigate(`/update/order/${orderid}`);
      }
    }
    if (user.role === "employee") {
      socket.emit("readNotification", {
        adminId: user._id,
        notificationId: id,
      });
      navigate(`/update/order/${orderid}`);
    }
    if (user.role === "rider") {
      socket.emit("readRiderNotification", {
        riderId: user._id,
        notificationId: id,
      });
      navigate(`/update/order/${orderid}`);
    }
    if (user.role === "user") {
      socket.emit("readCustomerNotification", {
        customerId: user._id,
        notificationId: id,
      });
      navigate(`/order/${orderid}`);
    }
  };
  return (
    <div style={{ position: "relative" }}>
      <Dropdown className="mr-3" show={isOpen} onToggle={handleToggle}>
        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
          <div style={{ position: "relative" }}>
            <FontAwesomeIcon icon={faBell} size="2x" />
            {unreadCount > 0 && (
              <Badge
                pill
                bg="danger"
                style={{
                  position: "absolute",
                  top: "-10px",
                  right: "-10px",
                  backgroundColor: "red",
                  borderRadius: "50%",
                  width: "20px",
                  height: "20px",
                  color: "white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {unreadCount}
              </Badge>
            )}
          </div>
        </Dropdown.Toggle>

        <Dropdown.Menu as={CustomMenu} className="custom-dropdown-menu" style={{minWidth: '500px', maxHeight: '300px', overflowY: 'auto' }}>
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <Dropdown.Item
                className="border-bottom border-dark"
                key={index}
                eventKey={index}
                onClick={() =>
                  markAsRead(
                    notification.notificationId,
                    notification.order,
                    notification.renewal,
                    notification.documentType ? notification.documentType : ""
                  )
                }
              >
                {notification.renewal ? (
                  <div className="p-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="text-danger mb-3" style={{ fontWeight: "bold" }}>
                        <FontAwesomeIcon
                          icon={faHourglassHalf}
                          size="xl"
                          className="text-danger"
                        />{" "}
                        ({notification.title})
                      </p>
                      <p
                        classname="text-muted text-sm"
                        style={{ fontWeight: "normal" }}
                      >
                        {moment(notification.createdAt)
                          .tz("Asia/Manila")
                          .format("MM-DD-YYYY")}
                      </p>
                    </div>
                    <div>
                      <p>{notification.message}</p>
                    </div>
                  </div>
                ) : (
                  <div className="p-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <p
                        className="text-primary mb-3"
                        style={{ fontWeight: "bold" }}
                      >
                        <FontAwesomeIcon
                          icon={faTruckFast}
                          size="xl"
                          className="text-primary"
                        />{" "}
                        ({notification.title})
                      </p>
                      <p
                        classname="text-muted text-sm"
                        style={{ fontWeight: "normal" }}
                      >
                        {moment(notification.createdAt)
                          .tz("Asia/Manila")
                          .format("MM-DD-YYYY")}
                      </p>
                    </div>
                    <div>
                      <p>{notification.message}</p>
                    </div>
                  </div>
                )}
              </Dropdown.Item>
            ))
          ) : (
            <Dropdown.Item disabled>No notifications</Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default NotificationBell;
