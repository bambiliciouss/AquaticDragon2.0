import React, { Fragment, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { MDBDataTable } from "mdbreact";

import Sidebar from "components/Sidebar/Sidebar";
import MetaData from "components/layout/MetaData";
import AdminNavbar from "components/Navbars/AdminNavbar";
import Header2 from "components/Headers/Header2";
import AdminFooter from "components/Footers/AdminFooter.js";

import { DELETE_STOREBRANCH_RESET } from "../../constants/storebranchConstants";
import swal from "sweetalert";
import { allAdminStoreBranch, deleteStoreBranch } from "actions/storebranchActions";
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
} from "reactstrap";

import {
  createStoreBranch,
  clearErrors,
} from "../../actions/storebranchActions";

import { CREATE_STOREBRANCH_RESET } from "../../constants/storebranchConstants";
import { useForm } from "react-hook-form";

import {
  allStoreStaff,
  deleteStoreStaff,
} from "../../actions/storestaffAction";
import {
  ALL_STORESTAFF_RESET,
  DELETE_STORESTAFF_RESET,
} from "../../constants/storestaffConstants";

const TypesGallon = (args) => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { loading, error, storeBranch } = useSelector(
    (state) => state.allStoreBranch
  );
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  console.log("Initial storeBranch state:", storeBranch);

  const setStoreBranch = () => {
    const data = {
      columns: [
        {
          label: "Branch",
          field: "branchNo",
          sort: "asc",
        },

        {
          // label: "Machine Cleaning Records",
          field: "machine",
        },
      ],

      rows: [],
    };

    storeBranch.forEach((storeBranches) => {
      data.rows.push({
        branchNo: storeBranches.branch,
        machine: (
          <Fragment>
            <button
              className="btn btn-primary py-1 px-2 ml-2"
              onClick={() =>
                navigate(`/typesgallonlist/${storeBranches._id}`)
              }>
              View Record
            </button>
          </Fragment>
        ),
      });
    });

    return data;
  };

  useEffect(() => {
    //DISPLAY OF STORE BRANCH
    dispatch(allAdminStoreBranch());
  }, [dispatch]);

  return (
    <>
      <MetaData title={"Types of Gallon"} />
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
                  <h3 className="mb-0">Types of Gallon</h3>
                </Col>
              </Row>
            </CardHeader>
            <CardBody style={{ overflowX: "auto" }}>
              <MDBDataTable
                data={setStoreBranch()}
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

export default TypesGallon;
