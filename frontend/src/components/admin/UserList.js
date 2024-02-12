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

import { DELETE_USER_RESET } from "../../constants/userConstants";
import swal from "sweetalert";

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
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";

const UserList = () => {
  const dispatch = useDispatch();

  let navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { loading, error, users } = useSelector((state) => state.allUsers);
  const { isDeleted } = useSelector((state) => state.user);

  const [modal, setModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    dispatch(allUsers());
    if (isDeleted) {
      navigate("/userlist");
      dispatch({ type: DELETE_USER_RESET });
    }
  }, [dispatch, isDeleted, navigate]);

  const toggleModal = () => {
    setModal(!modal);
  };

  const showUserDetails = (user) => {
    setSelectedUser(user);
    toggleModal();
  };

  const closeModal = () => {
    setSelectedUser(null);
    toggleModal();
  };

  const deleteUserHandler = (id) => {
    swal({
      title: "Are you sure you want to delete this user?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("User has been deleted!", "", "success");
        dispatch(deleteUser(id));
      } else {
        swal("User is not deleted!", "", "info");
      }
    });
  };

  const setUsers = () => {
    // const filter = user ? users.filter((x) => x._id !== user._id) : users;
    const filter = user
      ? users.filter((x) => x._id !== user._id && x.role === "user")
      : users;

    const data = {
      columns: [
        {
          label: "Profile",
          field: "image",
          sort: "asc",
        },

        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Phone",
          field: "phone",
          sort: "asc",
        },
        {
          label: "Address",
          field: "address",
          sort: "asc",
        },

        {
          label: "Email",
          field: "email",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],

      rows: [],
    };

    filter.forEach((user) => {
      data.rows.push({
        name: `${user.fname} ${user.lname}`,
        phone: user.phone,
        address: `${user.houseNo}, ${user.purokNum}, ${user.streetName}, ${user.barangay}, ${user.city}`,
        email: user.email,
        image: (
          <img
            className="d-block w-100"
            src={user.avatar.url}
            alt={user.title}
            img
            style={{ width: 50, height: 50 }}
          />
        ),
        actions: (
          <Fragment>
            {" "}
            <button
              className="btn btn-info py-1 px-2 ml-2"
              onClick={() => showUserDetails(user)}>
              <i className="fa fa-info-circle"></i>
            </button>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => deleteUserHandler(user._id)}>
              <i className="fa fa-trash"></i>
            </button>
          </Fragment>
        ),
      });
    });

    return data;
  };

  return (
    <>
      <MetaData title={"Customer(s)"} />
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
          <Card className="bg-secondary shadow">
            <CardHeader className="bg-white border-0">
              <Row className="align-items-center">
                <Col xs="8">
                  <h3 className="mb-0">List of Customer(s)</h3>
                </Col>
              </Row>
            </CardHeader>
            <CardBody style={{ overflowX: "auto" }}>
              <MDBDataTable
                data={setUsers()}
                className="px-3"
                bordered
                hover
                noBottomColumns
                responsive
              />
            </CardBody>
          </Card>
        </Container>
        <Container fluid>
          <AdminFooter />
        </Container>
      </div>

      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={closeModal}>User Details</ModalHeader>
        <ModalBody>
          {selectedUser && (
            <div>
              <p><strong>Name:</strong> {`${selectedUser.fname} ${selectedUser.lname}`}</p>
              <p><strong>Phone:</strong> {selectedUser.phone}</p>
              <p><strong>Address:</strong> {`${selectedUser.houseNo}, ${selectedUser.purokNum}, ${selectedUser.streetName}, ${selectedUser.barangay}, ${selectedUser.city}`}</p>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Profile Image:</strong></p>
              <img
                src={selectedUser.avatar.url}
                alt={selectedUser.title}
                style={{ width: 100, height: 100 }}
              />
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={closeModal}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default UserList;
