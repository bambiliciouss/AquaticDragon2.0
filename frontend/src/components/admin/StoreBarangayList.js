import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form"; // Import the useForm hook

import { MDBDataTable } from "mdbreact";
import swal from "sweetalert";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
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
} from "reactstrap";
import Sidebar from "components/Sidebar/Sidebar";
import MetaData from "components/layout/MetaData";
import AdminNavbar from "components/Navbars/AdminNavbar";
import Header2 from "components/Headers/Header2";
import AdminFooter from "components/Footers/AdminFooter.js";

import { useNavigate, useParams } from "react-router-dom";

import {
  createStorebarangay,
  allStorebarangayList,
  deleteStorebarangay,
} from "actions/storebarangayActions";
import {
  CREATE_STOREBARANGAY_RESET,
  DELETE_STOREBARANGAY_RESET,
} from "../../constants/storebarangayConstant";

import { getStoreDetails } from "actions/storebranchActions";

const StoreBarangayList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { storeBranch } = useSelector((state) => state.storeDetails);

  const { storebarangayCreated } = useSelector(
    (state) => state.newStorebarangay
  );
  const { allStorebarangay, error } = useSelector(
    (state) => state.allStorebarangay
  );

  const { isDeleted } = useSelector((state) => state.storebarangay);

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    dispatch(allStorebarangayList(id));
    dispatch(getStoreDetails(id));

    if (storebarangayCreated) {
      console.log("success adding of record");
      swal("Record Saved!", "", "success");
      setModal(false);
      navigate(`/create/store/barangay/${id}`, { replace: true });
      dispatch({
        type: CREATE_STOREBARANGAY_RESET,
      });
      reset();
    }

    if (error) {
      console.log(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      navigate(`/create/store/barangay/${id}`);
      dispatch({ type: DELETE_STOREBARANGAY_RESET });
    }
  }, [dispatch, navigate, storebarangayCreated, error, isDeleted]);

  const submitHandler = (e) => {
    const formData = new FormData();
    formData.set("barangay", e.barangay);

    dispatch(createStorebarangay(formData, id));
  };

  const deleterecord = (id) => {
    swal({
      title: "Are you sure you want to delete this record?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Record has been deleted!", "", "success");
        dispatch(deleteStorebarangay(id));
      } else {
        swal("Record is not deleted!", "", "info");
      }
    });
  };

  const setMCRecord = () => {
    const data = {
      columns: [
        {
          label: "Barangay",
          field: "bname",
        },
        {
          label: "Date",
          field: "date",
          sort: "desc",
        },

        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };

    const sortedBarangay = allStorebarangay.sort((a, b) => {
      return new Date(b.dateIssued) - new Date(a.dateIssued);
    });

    sortedBarangay.forEach((allStorebarangays) => {
      data.rows.push({
        bname: allStorebarangays.barangay,

        actions: (
          <Fragment>
            <button
              className="btn btn-primary py-1 px-2 ml-2"
              onClick={() =>
                navigate(
                  `/update/store/businesspermit/${allStorebarangays._id}`
                )
              }>
              <i className="fa fa-info-circle"></i>
            </button>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => deleterecord(allStorebarangays._id)}>
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
      <MetaData title={"Barangay Scope"} />
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
                  <h3 className="mb-0">
                    Barangay Scope ( {storeBranch.branch} )
                  </h3>
                </Col>
                <Col md="4">
                  <Button
                    block
                    className="mb-3"
                    color="primary"
                    type="button"
                    onClick={toggle}>
                    Add New Record
                  </Button>
                  <Modal
                    className="modal-dialog-centered"
                    isOpen={modal}
                    toggle={toggle}>
                    <Form role="form" onSubmit={handleSubmit(submitHandler)}>
                      <ModalHeader toggle={toggle}>Add Barangay</ModalHeader>
                      <ModalBody>
                        <FormGroup>
                          <span style={{ fontWeight: "bold" }}>Barangay</span>{" "}
                          <input
                            //placeholder="Add Notes here ..."
                            className="form-control"
                            // type="date"
                            name="barangay"
                            {...register("barangay", {
                              required: "Please enter valid text.",
                            })}
                          />
                          {errors.barangay && (
                            <h2
                              className="h1-seo"
                              style={{
                                color: "red",
                                fontSize: "small",
                              }}>
                              {errors.barangay.message}
                            </h2>
                          )}
                        </FormGroup>
                      </ModalBody>
                      <ModalFooter>
                        <Button color="primary" type="submit">
                          Add
                        </Button>{" "}
                        <Button color="secondary" onClick={toggle}>
                          Cancel
                        </Button>
                      </ModalFooter>{" "}
                    </Form>
                  </Modal>
                </Col>
              </Row>
            </CardHeader>
            <CardBody style={{ overflowX: "auto" }}>
              <MDBDataTable
                data={setMCRecord()}
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

export default StoreBarangayList;
