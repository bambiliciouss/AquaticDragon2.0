import React, { Fragment, useEffect, useState, useRef } from "react";

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
  allAdminStoreBranch,
  deleteStoreBranch,
} from "actions/storebranchActions";
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
import * as htmlToImage from "html-to-image";
import QRCode from "react-qr-code";
const UserList = () => {
  const dispatch = useDispatch();

  let navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { loading, error, users } = useSelector((state) => state.allUsers);
  const { isDeleted } = useSelector((state) => state.user);

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

  const [modal, setModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserfname, setSelectedUserfname] = useState(null);
  const [selectedUserlname, setSelectedUserlname] = useState(null);
  const { storeBranch } = useSelector((state) => state.allStoreBranch);

  const toggleModal = () => {
    setModal(!modal);
  };

  const showUserDetails = (user) => {
    setSelectedUser(user._id);
    setSelectedUserfname(user.fname);
    setSelectedUserlname(user.lname);
    toggleModal();
  };

  const closeModal = () => {
    setSelectedUser(null);
    toggleModal();
  };

  const userId = user?._id;
  const [qrdetails, setQrDetails] = useState();

  const [activeStoreBranch, setActiveStoreBranch] = useState(null);

  const containerRef = useRef(null);

  const downloadImage = () => {
    const fileName = `${selectedUserfname}_${selectedUserlname}_QRCODE.png`;

    htmlToImage
      .toPng(containerRef.current, { backgroundColor: "white" })
      .then(function (dataUrl) {
        var link = document.createElement("a");
        link.download = fileName;
        link.href = dataUrl;
        link.click();
      });
  };

  useEffect(() => {
    dispatch(allUsers());
    dispatch(allAdminStoreBranch());

    if (isDeleted) {
      navigate("/userlist");
      dispatch({ type: DELETE_USER_RESET });
    }

    setQrDetails(`http://localhost:3000/details/${selectedUser}`);
  }, [dispatch, isDeleted, navigate, selectedUser, activeStoreBranch]);
  // console.log("result", qrdetails);

  const setUsers = () => {
    // const sortedOrders = users
    // .filter(
    //   (user) =>
    //     !activeStoreBranch ||
    //     user.selectedStore.store === activeStoreBranch._id
    // )
    // .sort((a, b) => {
    //   return new Date(b.createdAt) - new Date(a.createdAt);
    // });

    const data = {
      columns: [
        {
          label: "Profile",
          field: "image",
          sort: "asc",
        },
        // {
        //   label: "QR Code",
        //   field: "qr",
        //   sort: "asc",
        // },

        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        // {
        //   label: "Phone",
        //   field: "phone",
        //   sort: "asc",
        // },
        {
          label: "Address",
          field: "address",
          sort: "asc",
        },

        // {
        //   label: "Email",
        //   field: "email",
        //   sort: "asc",
        // },
        {
          label: "Actions",
          field: "actions",
        },
      ],

      rows: [],
    };

    users.forEach((user) => {
      const defaultAddress =
        user.addresses.find((address) => address.isDefault) || {};

      data.rows.push({
        name: `${user.fname} ${user.lname}`,
        phone: user.phone,
        address: `${defaultAddress.houseNo} ${defaultAddress.purokNum} ${defaultAddress.streetName} ${defaultAddress.barangay} ${defaultAddress.city}`,
        // email: user.email,
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
            <button
              className="btn btn-default py-1 px-2 ml-2"
              onClick={() => showUserDetails(user)}>
              QR Code
            </button>
            <button
              className="btn btn-primary py-1 px-2 ml-2"
              onClick={() => navigate(`/user/details/${user._id}`)}>
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

  const handleButtonClick = (storeId) => {
    // Handle button click logic, e.g., setting the active store branch
    setActiveStoreBranch(storeBranch.find((branch) => branch._id === storeId));
  };

  const allordersButton = () => {
    setActiveStoreBranch(null);

    // dispatch(allOrdersAdmin());
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
              <Row className="align-items-center">
                <Button
                //  onClick={() => allordersButton()}
                >
                  <h3 className="mb-0">All Customers</h3>
                </Button>
                {storeBranch.map((storeBranches) => (
                  <Button
                    key={storeBranches._id} // Assuming storeBranches has a unique identifier like _id
                    id={`button-${storeBranches._id}`} // Unique id for each button
                    // onClick={() => handleButtonClick(storeBranches._id)} // Replace with your click handler
                  >
                    <h3 className="mb-0">{storeBranches.branch}</h3>
                  </Button>
                ))}
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
                // noRecordsFoundLabel={false}
                // searching={false}
              />
            </CardBody>
          </Card>
        </Container>
        <Container fluid>
          <AdminFooter />
        </Container>
      </div>

      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={closeModal}>Customer QR Code</ModalHeader>
        <ModalBody
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column", // Stack children vertically
          }}>
          {" "}
          <div
            ref={containerRef}
            style={{
              backgroundColor: "white",
              padding: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "auto",
              width: "auto",
              border: "8px solid darkblue",
            }}>
            <img
              src="/images/qr_header.png"
              alt="QR Header"
              style={{
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "10px",
                marginBottom: "10px",
                width: "300px",
                height: "100px",
              }}
            />
            {qrdetails && <QRCode value={qrdetails} size={260} />}
            <div
              style={{
                textAlign: "center",
                marginTop: "10px",
                fontWeight: "bold",
                fontSize: "20px",
              }}>
              {selectedUserfname} {selectedUserlname}
            </div>
          </div>
          <Button className="my-2 mr-2" color="primary" onClick={downloadImage}>
            Download QR Code
          </Button>
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
