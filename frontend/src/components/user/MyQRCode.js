import React, { useEffect, useState, useRef } from "react";
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import AuthFooter from "components/Footers/AuthFooter.js";
import MetaData from "components/layout/MetaData";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";

import * as htmlToImage from "html-to-image";
import QRCode from "react-qr-code";

const MyQRCode = () => {
  const { user, loading } = useSelector((state) => state.auth);
  let navigate = useNavigate();
  let location = useLocation();
  const userId = user?._id;
  const [qrdetails, setQrDetails] = useState();

  const containerRef = useRef(null);

  const downloadImage = () => {
    const fileName = `${user?.fname}_${user?.lname}_QRCODE.png`;

    htmlToImage
      .toPng(containerRef.current, { backgroundColor: "white" })
      .then(function (dataUrl) {
        var link = document.createElement("a");
        link.download = fileName;
        link.href = dataUrl;
        link.click();
      });
  };

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;

    if (user) {
      setQrDetails(`http://localhost:3000/details/${userId}`);
    }
  }, [location, user, userId]);
  console.log("result", qrdetails);
  return (
    <>
      <AuthNavbar />
      <MetaData title={"My QR Code"} />

      <div
        className="user-profile-container"
        style={{
          minHeight: "700px",
          marginTop: "100px",
          marginLeft: "15%",
          marginRight: "15%",
        }}>
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-3">
            <div>
              <h5
                className="title"
                style={{
                  marginBottom: "10px",
                  paddingTop: "10px",
                }}>
                <i
                  className="now-ui-icons users_single-02"
                  style={{ marginRight: "5px" }}></i>
                My Account
              </h5>

              <ul style={{ listStyleType: "none", paddingLeft: "0" }}>
                <li>
                  <a className="nav-link active" href="/my-profile">
                    Profile
                  </a>
                </li>
                <li>
                  <a className="nav-link" href="/password/update">
                    Change Password
                  </a>
                </li>
                <li>
                  <a className="nav-link" href="/my-qr">
                    QR Code
                  </a>
                </li>
              </ul>

              <h5
                className="title"
                style={{
                  marginBottom: "10px",
                  paddingTop: "10px",
                }}>
                <i
                  className="now-ui-icons ui-1_simple-add"
                  style={{ marginRight: "5px" }}></i>
                My Gallons
              </h5>

              <ul style={{ listStyleType: "none", paddingLeft: "0" }}>
                <li>
                  <a className="nav-link" href="/my-gallon">
                    List of my Gallon/s
                  </a>
                </li>
                <li>
                  <a className="nav-link" href="/register-gallon">
                    Register New Gallon
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-9">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">My QR Code</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column", // Stack children vertically
                }}>
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

                  {/* <QRCode value={user?._id} size={200} /> */}
                  {qrdetails && <QRCode value={qrdetails} size={250} />}
                  <div
                    style={{
                      textAlign: "center",
                      marginTop: "10px",
                      fontWeight: "bold",
                      fontSize: "24px",
                    }}>
                    {user ? `${user.fname} ${user.lname}` : ""}
                  </div>
                </div>
                <Button
                  className="my-2 mr-2"
                  color="primary"
                  onClick={downloadImage}>
                  Download QR Code
                </Button>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
      <AuthFooter />
    </>
  );
};

export default MyQRCode;
