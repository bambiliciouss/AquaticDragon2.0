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
import {
  allStoreBranchUser,
  deleteStoreBranch,
} from "actions/storebranchActions";
import CheckoutSteps from "./CheckoutSteps";

const SelectStore = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { storeBranch } = useSelector((state) => state.allStoreBranch);

  const [selectedStore, setSelectedStore] = useState(null);

  useEffect(() => {
    dispatch(allStoreBranchUser());
  }, [dispatch]);

  const handleSelectStore = (store) => {
    setSelectedStore(store);
    sessionStorage.setItem("selectedStore", JSON.stringify(store));
    navigate("/gallon/order");
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
        <CheckoutSteps store />
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
              <Col sm="12">
                <Card body>
                  {/* </Card> <Card style={{ width: "20rem" }}> */}
                  <Row>
                    <Col sm="4">
                      <CardImg
                        alt="..."
                        src={storeBranches.storebranch.storeImage.url}
                        left
                      />
                    </Col>
                    <Col sm="8">
                      <CardBody>
                        <CardTitle>
                          {storeBranches.storebranch.branch}
                        </CardTitle>
                        <CardText>
                          Address: {storeBranches.storebranch.address.houseNo}{" "}
                          {storeBranches.storebranch.address.purokNum}{" "}
                          {storeBranches.storebranch.address.streetName}{" "}
                          {storeBranches.storebranch.address.barangay}{" "}
                          {storeBranches.storebranch.address.city}
                        </CardText>
                        <CardText>
                          Delivery Fee: {storeBranches.storebranch.deliverFee}
                        </CardText>
                        <Button
                          block
                          color="info"
                          onClick={() => handleSelectStore(storeBranches)}>
                          Select Store
                        </Button>
                      </CardBody>
                    </Col>
                  </Row>
                </Card>
                {/* </CardBody> */}
              </Col>
            ))}
          </Row>
        </Card>
      </div>
    </>
  );
};

export default SelectStore;
