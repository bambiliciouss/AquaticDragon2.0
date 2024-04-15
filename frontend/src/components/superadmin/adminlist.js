import React, { Fragment, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import { allEmployee, deleteUser } from "actions/userActions";
import { MDBDataTable } from "mdbreact";

import Sidebar from "components/Sidebar/Sidebar";
import MetaData from "components/layout/MetaData";
import AdminNavbar from "components/Navbars/AdminNavbar";
import Header2 from "components/Headers/Header2";
import AdminFooter from "components/Footers/AdminFooter.js";

import { DELETE_USER_RESET } from "../../constants/userConstants";
import swal from "sweetalert";

import { clearErrors, newemployee } from "../../actions/userActions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import {
  createStoreStaff,
  singleStoreStaff,
} from "../../actions/storestaffAction";
import { allStoreBranch } from "actions/storebranchActions";
import { allAdminSA } from "actions/superadminActions";
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
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Form,
  Input,
  CardText,
} from "reactstrap";
import { CREATE_STORESTAFF_RESET } from "../../constants/storestaffConstants";
import { REGISTER_USER_RESET } from "../../constants/userConstants";

import { getStoreDetails } from "actions/storebranchActions";
const AdminList = (args) => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { ausers } = useSelector((state) => state.allAdminSA);
  const { storestaffcreated } = useSelector((state) => state.newStorestaff);
  const { isDeleted } = useSelector((state) => state.user);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const { id } = useParams();

  const [empuser, setUser] = useState({
    fname: "",
    lname: "",
    phone: "",
    houseNo: "",
    streetName: "",
    purokNum: "",
    barangay: "",
    city: "",
    email: "",
    password: "",
  });
  const [role, setRole] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { storeBranch } = useSelector((state) => state.storeDetails);
  const [avatar, setAvatar] = useState("");
  const [medcert, setMedcert] = useState("");
  const [barangayclearance, setBarangayclearance] = useState("");

  const [selectedFileName, setSelectedFileName] = useState("");
  const [selectedFileNameBC, setSelectedFileNameBC] = useState("");

  const [avatarPreview, setAvatarPreview] = useState(
    "/images/default_avatar.jpg"
  );

  const [employeeDetailsModal, setEmployeeDetailsModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState({});

  // const openEmployeeDetailsModal = (employee) => {
  //   setSelectedEmployee(employee);
  //   setEmployeeDetailsModal(true);
  // };

  const [userIdModal, setUserIdModal] = useState(null);
  const { storeStaffdetails } = useSelector((state) => state.singleStoreStaff);

  const handleStaffDetails = async (userId) => {
    try {
      await dispatch(singleStoreStaff(userId));
    } catch (error) {
      console.error("Error fetching singleStoreStaff:", error);
      // Handle error if needed
    }
  };

  const openUserIdModal = (userId) => {
    setUserIdModal(userId);
    dispatch(allStoreBranch());
    handleStaffDetails(userId);
    toggleUserIdModal();
  };

  const [userIdModalVisible, setUserIdModalVisible] = useState(false);
  const toggleUserIdModal = () => setUserIdModalVisible(!userIdModalVisible);

  const [selectedBranch, setSelectedBranch] = useState(null);
  const handleBranchSelection = (branch) => {
    setSelectedBranch((prevSelectedBranch) => {
      console.log("selected Branch", branch);
      return branch;
    });
  };

  const assignHandler = (e) => {
    if (selectedBranch) {
      const storeStaffData = {
        storebranch: selectedBranch,
      };
      dispatch(createStoreStaff(storeStaffData, userIdModal));
    } else {
      // Handle the case when selectedBranch is null, e.g., show an error message
      console.error("Please select a branch before assigning.");
    }
    // window.location.reload();
  };

  useEffect(() => {
    dispatch(allAdminSA());
    dispatch(getStoreDetails(id));

    if (isDeleted) {
      navigate("/superadmin/pendinglist");
      dispatch({ type: DELETE_USER_RESET });
    }
  }, [dispatch, isDeleted, navigate]);

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

    ausers.forEach((user) => {
      const defaultAddress =
        user.addresses.find((address) => address.isDefault) || {};
      data.rows.push({
        name: `${user.fname} ${user.lname}`,
        phone: `+63${user.phone}`,
        address: `${defaultAddress.houseNo} ${defaultAddress.purokNum} ${defaultAddress.streetName} ${defaultAddress.barangay} ${defaultAddress.city}`,
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
            {/* <button
              className="btn btn-info py-1 px-2 ml-2"
              onClick={() => openEmployeeDetailsModal(user)}>
              <i className="fa fa-info-circle"></i>
            </button> */}
            <button
              className="btn btn-primary py-1 px-2 ml-2"
              onClick={() => navigate(`/superadmin/admin/details/${user._id}`)}>
              <i className="fa fa-info-circle"></i>
            </button>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => deleteUserHandler(user._id)}>
              <i className="fa fa-trash"></i>
            </button>
            {/* <button
              className="btn btn-info py-1 px-2 ml-2"
              onClick={() => openUserIdModal(user._id)}>
              Assign Store
            </button> */}
          </Fragment>
        ),
      });
    });

    return data;
  };

  return (
    <>
      <MetaData title={"Pending Admin Approval"} />
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
                  <h3 className="mb-0">List of Admins </h3>
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
    </>
  );
};

export default AdminList;
