import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { myGallons, clearErrors } from "../../actions/gallonActions";
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import AuthFooter from "components/Footers/AuthFooter.js";
import MetaData from "components/layout/MetaData";
import QRCode from "react-qr-code";
import { addItemToCart } from "../../actions/cartActions";
import { useLocation } from "react-router-dom";
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
  Table,
  Pagination,
} from "reactstrap";
const MyGallon = () => {
  const dispatch = useDispatch();
  let location = useLocation();
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(30);
  const { loading, error, gallon } = useSelector((state) => state.myGallon);

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // The code below will only be executed if there is no error
    if (error) {
      dispatch(clearErrors());
    }
    dispatch(myGallons());
  }, [dispatch, error]);

  // Check if gallon is undefined before slicing
  const itemsToDisplay = gallon
    ? gallon.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : [];

  const totalPages = gallon ? Math.ceil(gallon.length / itemsPerPage) : 1;
  const paginationItems = [];
  for (let i = 1; i <= totalPages; i++) {
    paginationItems.push(
      <li key={i} className={`page-item ${i === currentPage ? "active" : ""}`}>
        <a className="page-link" href="#" onClick={() => setCurrentPage(i)}>
          {i}
        </a>
      </li>
    );
  }

  const addToCart = (id) => {
    dispatch(addItemToCart(id, quantity, price));

    // notify("Item Added to Cart");
  };

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [location]);

  return (
    <>
      <AuthNavbar />
      <MetaData title={"My Gallon/s"} />

      <div
        className="user-profile-container"
        style={{
          minHeight: "700px",
          marginTop: "100px",
          marginLeft: "20%",
          marginRight: "20%",
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
                  <a className="nav-link" href="/my-profile">
                    Profile
                  </a>
                </li>
                <li>
                  <a className="nav-link" href="/password/update">
                    Change Password
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
                  <a className="nav-link active" href="/my-gallon">
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
            <div className="content">
              <div className="row">
                <div className="col-md-12">
                  <Card className="bg-secondary shadow">
                    <CardHeader className="bg-white border-0">
                      <Row className="align-items-center">
                        <Col xs="8">
                          <h3 className="mb-0">List of my Gallon/s</h3>
                        </Col>
                      </Row>
                    </CardHeader>
                    <div className="card-header-profile ">
                      <h5
                        className="title"
                        style={{
                          fontsize: "small",
                          marginBottom: "0px",
                          padding: "10px",
                        }}>
                        No. of Gallon/s: {itemsToDisplay.length}
                      </h5>
                    </div>
                    <CardBody>
                      {itemsToDisplay.length === 0 ? (
                        <p>No gallons to display</p>
                      ) : (
                        <>
                          <Table
                            className="align-items-center table-flush"
                            responsive>
                            <table className="table text-center">
                              <thead className="thead-light">
                                <th scope="col">QR Code</th>
                                <th scope="col">Type of Gallon</th>
                                <th scope="col">Gallon Age</th>
                                <th scope="col">Gallon Image</th>
                                <th scope="col">Add To Cart</th>
                              </thead>
                              <tbody>
                                {itemsToDisplay.map((gallons) => (
                                  <tr key={gallons._id}>
                                    {/* <td>{gallons._id}</td> */}
                                    <td>
                                      <QRCode
                                        value={gallons._id}
                                        style={{
                                          width: "100px",
                                          height: "100px",
                                        }}
                                      />
                                    </td>
                                    <td>{gallons.type}</td>
                                    <td>{gallons.gallonAge}</td>
                                    <td>
                                      {gallons.gallonImage && (
                                        <img
                                          src={gallons.gallonImage.url}
                                          alt={gallons.type}
                                          style={{ width: "100px" }}
                                        />
                                      )}
                                    </td>
                                    <td>
                                      <button
                                        className="btn btn-danger py-1 px-2 ml-2"
                                        onClick={() => addToCart(gallons._id)}>
                                        <i class="fas fa-plus"> Add to Cart</i>
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </Table>
                          <nav
                            aria-label="Page navigation example"
                            className="d-flex justify-content-center">
                            <Pagination
                              className="pagination justify-content-end mb-0"
                              listClassName="justify-content-end mb-0">
                              <li
                                className={`page-item ${
                                  currentPage === 1 ? "disabled" : ""
                                }`}>
                                <a
                                  className="page-link"
                                  href="#"
                                  onClick={() =>
                                    setCurrentPage(currentPage - 1)
                                  }>
                                  <i className="fas fa-angle-left" />
                                </a>
                              </li>
                              {paginationItems}
                              <li
                                className={`page-item ${
                                  currentPage === totalPages ? "disabled" : ""
                                }`}>
                                <a
                                  className="page-link"
                                  href="#"
                                  onClick={() =>
                                    setCurrentPage(currentPage + 1)
                                  }>
                                  <i className="fas fa-angle-right" />
                                </a>
                              </li>
                            </Pagination>
                          </nav>
                        </>
                      )}
                    </CardBody>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AuthFooter />
    </>
  );
};

export default MyGallon;
