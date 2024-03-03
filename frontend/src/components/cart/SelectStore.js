import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardTitle,
  CardText,
  Row,
  Col,
  CardHeader,
} from "reactstrap";
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import MetaData from "../layout/MetaData";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { allStoreBranch, deleteStoreBranch } from "actions/storebranchActions";

const SelectStore = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { storeBranch } = useSelector((state) => state.allStoreBranch);

  const [selectedStore, setSelectedStore] = useState(null);

  useEffect(() => {
    dispatch(allStoreBranch());
  }, [dispatch]);

  const handleSelectStore = (store) => {
    setSelectedStore(store);
    sessionStorage.setItem("selectedStore", JSON.stringify(store));
    navigate("/payment");
  };

  return (
    <>
      <AuthNavbar />
      <MetaData title={"Select Store"} />

      <div
        className="user-profile-container"
        style={{
          minHeight: "700px",
          marginTop: "100px",
          marginLeft: "20%",
          marginRight: "20%",
        }}>
        <Card className="bg-secondary shadow">
          <CardHeader className="bg-white border-0">
            <Row className="align-items-center">
              <Col xs="8">
                <h3 className="mb-0">Select your preferred store</h3>
              </Col>
            </Row>
          </CardHeader>
          <Row>
            {storeBranch.map((storeBranches) => (
              <Col key={storeBranches._id} md="6">
                <CardBody className="d-flex justify-content-center align-items-center">
                  <Card style={{ width: "20rem" }}>
                    <CardImg alt="..." src={storeBranches.storeImage.url} top />
                    <CardBody>
                      <CardTitle>{storeBranches.branch}</CardTitle>
                      <CardText>
                        Address: {storeBranches.address.houseNo}
                        {storeBranches.address.purokNum}{" "}
                        {storeBranches.address.streetName}
                        {storeBranches.address.barangay}{" "}
                        {storeBranches.address.city}
                      </CardText>
                      <CardText>
                        Delivery Fee: {storeBranches.deliverFee}
                      </CardText>
                      <Button
                        block
                        color="info"
                        onClick={() => handleSelectStore(storeBranches)}>
                        Select Store
                      </Button>
                    </CardBody>
                  </Card>
                </CardBody>
              </Col>
            ))}
          </Row>
        </Card>
      </div>
    </>
  );
};

export default SelectStore;
