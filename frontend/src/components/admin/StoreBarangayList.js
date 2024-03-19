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
  singleStorebarangay,
  updateStorebarangay,
  clearErrors,
} from "actions/storebarangayActions";
import {
  CREATE_STOREBARANGAY_RESET,
  DELETE_STOREBARANGAY_RESET,
  UPDATE_STOREBARANGAY_RESET,
} from "../../constants/storebarangayConstant";

import { getStoreDetails } from "actions/storebranchActions";

const StoreBarangayList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { storeBranch } = useSelector((state) => state.storeDetails);

  const { storebarangayCreated, error } = useSelector(
    (state) => state.newStorebarangay
  );
  const { allStorebarangay } = useSelector((state) => state.allStorebarangay);

  const { storebarangayDetails } = useSelector(
    (state) => state.singleStorebarangay
  );
  const { isDeleted, isUpdated, errorbar } = useSelector(
    (state) => state.storebarangay
  );

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  const [UpdateBarangay, setUpdateBarangay] = useState(false);
  const [updateID, setupdateID] = useState(false);
  const toggleUpdateModal = (ID) => {
    setOpenUpdateModal(!openUpdateModal);
    setupdateID(ID);
    dispatch(singleStorebarangay(ID));
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
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
      swal(error, "", "error");
      dispatch(clearErrors());
    }

    if (isDeleted) {
      navigate(`/create/store/barangay/${id}`);
      dispatch({ type: DELETE_STOREBARANGAY_RESET });
    }

    if (storebarangayDetails) {
      setUpdateBarangay(storebarangayDetails.barangay);
    }

    if (isUpdated) {
      swal("Updated Successfully!", "", "success");
      navigate(`/create/store/barangay/${id}`, { replace: true });
      dispatch({
        type: UPDATE_STOREBARANGAY_RESET,
      });
      setOpenUpdateModal(!openUpdateModal);
    }

    if (errorbar) {
      swal(errorbar, "", "error");
      dispatch(clearErrors());
    }

    console.log("details result", storebarangayDetails);
  }, [
    dispatch,
    navigate,
    storebarangayCreated,
    error,
    isDeleted,
    storebarangayDetails,
    updateID,
    errorbar,
    isUpdated,
  ]);

  const submitHandler = (e) => {
    const formData = new FormData();
    formData.set("barangay", e.barangay);

    dispatch(createStorebarangay(formData, id));
  };

  const submitUpdateHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("barangay", UpdateBarangay);

    dispatch(updateStorebarangay(updateID, formData));

    //console.log(formData)
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
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };

    allStorebarangay.forEach((allStorebarangays) => {
      data.rows.push({
        bname: allStorebarangays.barangay,

        actions: (
          <Fragment>
            <button
              className="btn btn-primary py-1 px-2 ml-2"
              onClick={() => toggleUpdateModal(allStorebarangays._id)}>
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
                    className="modal-dialog-top"
                    isOpen={modal}
                    toggle={toggle}>
                    <Form role="form" onSubmit={handleSubmit(submitHandler)}>
                      <ModalHeader toggle={toggle}>Add Barangay</ModalHeader>
                      <ModalBody>
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-pin-3" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <select
                              className="form-control"
                              name="barangay"
                              {...register("barangay", {
                                required: "Please select a barangay.",
                              })}>
                              <option value="" disabled selected>
                                Select Barangay...
                              </option>
                              <option value="Bagumbayan">Bagumbayan</option>
                              <option value="Bambang">Bambang</option>
                              <option value="Calzada">Calzada</option>
                              <option value="Central Bicutan">
                                Central Bicutan
                              </option>
                              <option value="Central Signal Village">
                                Central Signal Village
                              </option>
                              <option value="Fort Bonifacio">
                                Fort Bonifacio
                              </option>
                              <option value="Hagonoy">Hagonoy</option>
                              <option value="Ibayo-Tipas">Ibayo-Tipas</option>
                              <option value="Katuparan">Katuparan</option>
                              <option value="Ligid-Tipas">Ligid-Tipas</option>
                              <option value="Lower Bicutan">
                                Lower Bicutan
                              </option>
                              <option value="Maharlika Village">
                                Maharlika Village
                              </option>
                              <option value="Napindan">Napindan</option>
                              <option value="New Lower Bicutan">
                                New Lower Bicutan
                              </option>
                              <option value="North Daang Hari">
                                North Daang Hari
                              </option>
                              <option value="North Signal Village">
                                North Signal Village
                              </option>
                              <option value="Palingon">Palingon</option>
                              <option value="Pinagsama">Pinagsama</option>
                              <option value="San Miguel">San Miguel</option>
                              <option value="Santa Ana">Santa Ana</option>
                              <option value="Sta. Cruz">Sta. Cruz</option>
                              <option value="Tanyag">Tanyag</option>
                              <option value="Tuktukan">Tuktukan</option>
                              <option value="Upper Bicutan">
                                Upper Bicutan
                              </option>
                              <option value="Ususan">Ususan</option>
                              <option value="South Daang Hari">
                                South Daang Hari
                              </option>
                              <option value="South Signal Village">
                                South Signal Village
                              </option>
                              <option value="Wawa">Wawa</option>
                              <option value="Western Bicutan">
                                Western Bicutan
                              </option>
                            </select>
                          </InputGroup>
                          {errors.barangay && (
                            <h2
                              className="h1-seo"
                              style={{ color: "red", fontSize: "small" }}>
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

          <Modal isOpen={openUpdateModal} toggle={toggleUpdateModal}>
            <Form onSubmit={submitUpdateHandler} encType="multipart/form-data">
              <ModalHeader toggle={toggle}>Update Barangay</ModalHeader>
              <ModalBody>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-pin-3" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <select
                      className="form-control"
                      value={UpdateBarangay}
                      onChange={(e) => setUpdateBarangay(e.target.value)}>
                      <option value="" disabled selected>
                        Select Barangay...
                      </option>
                      <option value="Bagumbayan">Bagumbayan</option>
                      <option value="Bambang">Bambang</option>
                      <option value="Calzada">Calzada</option>
                      <option value="Central Bicutan">Central Bicutan</option>
                      <option value="Central Signal Village">
                        Central Signal Village
                      </option>
                      <option value="Fort Bonifacio">Fort Bonifacio</option>
                      <option value="Hagonoy">Hagonoy</option>
                      <option value="Ibayo-Tipas">Ibayo-Tipas</option>
                      <option value="Katuparan">Katuparan</option>
                      <option value="Ligid-Tipas">Ligid-Tipas</option>
                      <option value="Lower Bicutan">Lower Bicutan</option>
                      <option value="Maharlika Village">
                        Maharlika Village
                      </option>
                      <option value="Napindan">Napindan</option>
                      <option value="New Lower Bicutan">
                        New Lower Bicutan
                      </option>
                      <option value="North Daang Hari">North Daang Hari</option>
                      <option value="North Signal Village">
                        North Signal Village
                      </option>
                      <option value="Palingon">Palingon</option>
                      <option value="Pinagsama">Pinagsama</option>
                      <option value="San Miguel">San Miguel</option>
                      <option value="Santa Ana">Santa Ana</option>
                      <option value="Sta. Cruz">Sta. Cruz</option>
                      <option value="Tanyag">Tanyag</option>
                      <option value="Tuktukan">Tuktukan</option>
                      <option value="Upper Bicutan">Upper Bicutan</option>
                      <option value="Ususan">Ususan</option>
                      <option value="South Daang Hari">South Daang Hari</option>
                      <option value="South Signal Village">
                        South Signal Village
                      </option>
                      <option value="Wawa">Wawa</option>
                      <option value="Western Bicutan">Western Bicutan</option>
                    </select>
                  </InputGroup>
                </FormGroup>
              </ModalBody>{" "}
              <ModalFooter>
                <Button className="my-4" color="info" type="submit">
                  Update
                </Button>
                <Button color="secondary" onClick={toggleUpdateModal}>
                  Cancel
                </Button>
              </ModalFooter>
            </Form>
          </Modal>
        </Container>
        <Container fluid>
          <AdminFooter />
        </Container>
      </div>
    </>
  );
};

export default StoreBarangayList;
