import React, { Fragment, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { allUsers, deleteUser } from "actions/userActions";
import { MDBDataTable } from "mdbreact";

import Sidebar from "components/Sidebar/Sidebar";
import MetaData from "components/layout/MetaData";
import AdminNavbar from "components/Navbars/AdminNavbar";
import Header2 from "components/Headers/Header2";
import AdminFooter from "components/Footers/AdminFooter.js";

import QRCode from "react-qr-code";
import { DELETE_GALLON_RESET } from "../../constants/gallonConstants";
import swal from "sweetalert";
import { allGallons, deleteGallon } from "actions/gallonActions";
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
} from "reactstrap";

const GallonList = () => {
  const dispatch = useDispatch();

  let navigate = useNavigate();

  const { loading, error, gallons } = useSelector((state) => state.allGallons);
  const { isDeleted } = useSelector((state) => state.gallon);
  useEffect(() => {
    dispatch(allGallons());
    if (isDeleted) {
      navigate("/gallonlist");
      dispatch({ type: DELETE_GALLON_RESET });
    }
  }, [dispatch, isDeleted, navigate]);

  const deleteGallonHandler = (id) => {
    swal({
      title: "Are you sure you want to delete this gallon?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Gallon has been deleted!", "", "success");
        dispatch(deleteGallon(id));
      } else {
        swal("Gallon is not deleted!", "", "info");
        console.log(id);
      }
    });
  };

  const setGallons = () => {
    const data = {
      columns: [

        {
          label: "QR Code",
          field: "qr",
          sort: "asc",
        },

        {
          label: "Type",
          field: "type",
          sort: "asc",
        },
        {
          label: "Age",
          field: "age",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],

      rows: [],
    };

    gallons.forEach((gallon) => {
      data.rows.push({
        type: gallon.type,
        age: gallon.gallonAge,
        qr: (
          <QRCode
            value={gallon._id}
            style={{
              width: "100px",
              height: "100px",
            }}
          />
        ),
        actions: (
          <Fragment>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => deleteGallonHandler(gallon._id)}>
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
      <MetaData title={"Gallon(s)"} />
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
                  <h3 className="mb-0">List of Gallon(s)</h3>
                </Col>
              </Row>
            </CardHeader>
            <CardBody style={{ overflowX: "auto" }}>
              <MDBDataTable
                data={setGallons()}
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

export default GallonList;
