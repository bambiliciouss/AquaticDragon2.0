import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Container,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

import { useLocation } from "react-router-dom";
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import AuthFooter from "components/Footers/AuthFooter.js";

import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import { useDispatch, useSelector } from "react-redux";
import { newregister, clearErrors } from "../../actions/userActions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
const Register = () => {
  const [user, setUser] = useState({
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
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const {
    fname,
    lname,
    phone,
    houseNo,
    streetName,
    purokNum,
    barangay,
    city,
    email,
    password,
  } = user;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "/images/default_avatar.jpg"
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );

  const [terms, setTerms] = useState(false);

  const notifyError = (message = "") =>
    toast.error(message, {
      position: "bottom-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const notifySuccess = (message = "") =>
    toast.success(message, {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  useEffect(() => {
    setRole("user");

    if (isAuthenticated) {
      notifySuccess("An email sent to your Email account, please verify");
      navigate("/");
    }

    if (error) {
      notifyError(error);
      console.log(error);
      dispatch(clearErrors());
    }
  }, [dispatch, isAuthenticated, error, navigate]);

  const submitHandler = (e) => {
    //e.preventDefault();

    const formData = new FormData();
    formData.set("fname", e.fname);
    formData.set("lname", e.lname);
    formData.set("phone", e.phone);
    formData.set("houseNo", e.houseNo);
    formData.set("streetName", e.streetName);
    formData.set("purokNum", e.purokNum);
    formData.set("barangay", e.barangay);
    formData.set("city", e.city);
    formData.set("email", e.email);
    formData.set("password", e.password);
    formData.set("avatar", avatar);
    formData.set("role", role);
    formData.set("terms", terms);

    dispatch(newregister(formData));
  };

  const onChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setTerms(isChecked);
    console.log("Checkbox checked:", terms);
  };

  const location = useLocation();
  // React.useEffect(() => {
  //   document.body.classList.add("bg-default");
  //   return () => {
  //     document.body.classList.remove("bg-default");
  //   };
  // }, []);
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [location]);
  return (
    <>
      {loading ? (
        <Loader loadingTime={20} /> // Display the loader for 3 seconds
      ) : (
        <>
          <div className="main-content">
            <AuthNavbar />
            <div className="header py-7 py-lg-8">
              <Container>
                <div className="header-body text-center mb-3">
                  <Row className="justify-content-center">
                    <Col lg="5" md="6">
                      <h1 className="text-black">Welcome to Aquatic Dragon!</h1>
                    </Col>
                  </Row>
                </div>
              </Container>
            </div>
            <Container className="mt--8 pb-5">
              <Row className="justify-content-center">
                <Col lg="6" md="8">
                  <Card className="bg-secondary shadow border-0">
                    <CardBody className="px-lg-5 py-lg-5">
                      <div className="text-center text-muted mb-4">
                        <big>Create your account</big>
                      </div>
                      <Form role="form" onSubmit={handleSubmit(submitHandler)}>
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-circle-08" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <input
                              placeholder="First Name..."
                              className="form-control"
                              type="text"
                              name="fname"
                              {...register("fname", {
                                required: "Please enter a valid name.",
                              })}
                            />
                          </InputGroup>
                          {errors.fname && (
                            <h2
                              className="h1-seo"
                              style={{ color: "red", fontSize: "small" }}>
                              {errors.fname.message}
                            </h2>
                          )}
                        </FormGroup>
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-circle-08" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <input
                              placeholder="Last Name..."
                              className="form-control"
                              type="text"
                              name="lname"
                              {...register("lname", {
                                required: "Please enter a valid name.",
                              })}
                            />
                          </InputGroup>
                          {errors.lname && (
                            <h2
                              className="h1-seo"
                              style={{ color: "red", fontSize: "small" }}>
                              {errors.lname.message}
                            </h2>
                          )}
                        </FormGroup>

                        {/* <PhoneInput
                            international
                            defaultCountry="PH"
                            name="phone"
                           
                            style={{ padding: "10px" ,  border: '1px solid transparent'}}
                            {...register("phone", {
                              required: "Please enter a valid phone no.",
                            })}
                          />
                          {errors.phone && (
                            <h2
                              className="h1-seo"
                              style={{ color: "red", fontSize: "small" }}>
                              {errors.phone.message}
                            </h2>
                          )} */}
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <span disabled>+63</span>
                              </InputGroupText>
                            </InputGroupAddon>
                            <input
                              placeholder="Phone..."
                              className="form-control"
                              type="text"
                              name="phone"
                              {...register("phone", {
                                required: "Please enter a valid phone no.",
                                pattern: {
                                  value: /^[0-9]*$/,
                                  message:
                                    "Phone number must contain only numeric characters.",
                                },
                                maxLength: {
                                  value: 10,
                                  message:
                                    "Phone number must be 10 characters or less.",
                                },
                              })}
                            />
                          </InputGroup>
                          {errors.phone && (
                            <h2
                              className="h1-seo"
                              style={{ color: "red", fontSize: "small" }}>
                              {errors.phone.message}
                            </h2>
                          )}
                        </FormGroup>

                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-email-83" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <input
                              placeholder="Email..."
                              className="form-control"
                              name="email"
                              {...register("email", {
                                required: "Email is required",
                                pattern: {
                                  value:
                                    /^[a-zA-Z0-9_.+-]+@[a-zAZ0-9-]+\.[a-zA-Z0-9-.]+$/i,
                                  message:
                                    "Entered email is in the wrong format",
                                },
                              })}
                            />
                          </InputGroup>
                          {errors.email && (
                            <div className="error">
                              {errors.email.type === "required" && (
                                <h2
                                  className="h1-seo"
                                  style={{
                                    color: "red",
                                    fontSize: "small",
                                  }}>
                                  {errors.email.message}
                                </h2>
                              )}
                              {errors.email.type === "pattern" && (
                                <h2
                                  className="h1-seo"
                                  style={{
                                    color: "red",
                                    fontSize: "small",
                                  }}>
                                  {errors.email.message}
                                </h2>
                              )}
                            </div>
                          )}
                        </FormGroup>
                        <FormGroup>
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-lock-circle-open" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <input
                              placeholder="Password..."
                              className="form-control"
                              type="password"
                              name="password"
                              {...register("password", {
                                required: "Password is required",
                              })}
                            />
                          </InputGroup>
                          {errors.password && (
                            <h2
                              className="h1-seo"
                              style={{ color: "red", fontSize: "small" }}>
                              {errors.password.message}
                            </h2>
                          )}
                        </FormGroup>

                        <Row className="my-4">
                          <Col xs="12">
                            <div className="custom-control custom-checkbox mb-3">
                              <FormGroup check>
                                <Input
                                  id="checkbox2"
                                  type="checkbox"
                                  onChange={handleCheckboxChange}
                                  checked={terms}
                                />
                                <span className="text-muted">
                                  I agree with the{" "}
                                  <a href="#pablo" onClick={toggle}>
                                    Terms and Conditions
                                  </a>
                                </span>
                                <Modal
                                  className="modal-dialog-centered modal-lg "
                                  isOpen={modal}
                                  toggle={toggle}>
                                  <Form
                                    role="form"
                                    onSubmit={handleSubmit(submitHandler)}>
                                    <ModalHeader toggle={toggle}></ModalHeader>
                                    <ModalBody>
                                      <div style={{ textAlign: "center" }}>
                                        <h2>Terms and Conditions</h2>
                                      </div>
                                      <p
                                        style={{
                                          textIndent: "20px",
                                          textAlign: "justify",
                                        }}>
                                        By using the services of the water
                                        refilling station, customers acknowledge
                                        and agree to these terms and conditions.
                                      </p>
                                      <ol>
                                        <li>
                                          <strong>Service Agreement:</strong>
                                          <ul>
                                            <li>
                                              By agreeing to abide by the terms
                                              and conditions outlined herein,
                                              the customer demonstrates their
                                              commitment to maintaining a
                                              professional and respectful
                                              relationship with the water
                                              refilling station. These terms and
                                              conditions are guidelines to
                                              ensure a smooth and satisfactory
                                              experience for all parties
                                              involved. It is important for the
                                              customer to thoroughly understand
                                              and adhere to these provisions to
                                              avoid any potential
                                              misunderstandings or conflicts.
                                            </li>
                                          </ul>
                                        </li>
                                        <li>
                                          <strong>Water Quality:</strong>
                                          <ul>
                                            <li>
                                              The water refilling station, which
                                              strictly complies with the highest
                                              standards of health and safety,
                                              stands as a resolute guarantee of
                                              the water's purity and safety.
                                              This business is steadfast in its
                                              dedication to delivering water
                                              that exceeds regulatory standards
                                              and carefully monitors and
                                              maintains the quality of its water
                                              supply.
                                            </li>

                                            <li>
                                              The water refill station values
                                              and actively promotes its
                                              customers' attention in upholding
                                              the highest standards of water
                                              quality. A strong mechanism is in
                                              place to enable customers to
                                              report any issues or observations
                                              regarding the quality of the water
                                              as soon as they arise. In addition
                                              to encouraging transparency, this
                                              open line of contact is essential
                                              to the ongoing enhancement and
                                              guarantee of water safety.
                                            </li>
                                          </ul>
                                        </li>
                                        <li>
                                          <strong>Pricing and Payment:</strong>
                                          <ul>
                                            <li>
                                              Refilling five-gallon water
                                              containers costs ₱30.00, and the
                                              payment upon delivery option
                                              demonstrates the water refilling
                                              station's commitment to ease of
                                              use, affordability, and client
                                              pleasure. The station's goal of
                                              giving the community access to
                                              safe, dependable, and easily
                                              accessible water replenishment
                                              services is in line with this open
                                              and customer-focused pricing
                                              approach.
                                            </li>
                                          </ul>
                                        </li>
                                        <li>
                                          <strong>Operating Hours:</strong>
                                          <ul>
                                            <li>
                                              The water refilling station's
                                              operating hours are 8:00 am – 5:00
                                              pm, Monday to Saturday only.
                                            </li>
                                            <li>
                                              To streamline operations and
                                              ensure the efficiency of its
                                              services, the water refilling
                                              station has established a policy
                                              regarding the timing of delivery
                                              requests. Specifically, the
                                              station has decided not to
                                              entertain delivery requests made
                                              within 15 minutes before the
                                              scheduled closing time. However,
                                              the station recognizes that
                                              exceptional circumstances may
                                              arise, and to accommodate such
                                              situations, an alternative
                                              solution is provided – customers
                                              may still opt for pick-up
                                              arrangements during this
                                              timeframe.
                                            </li>
                                          </ul>
                                        </li>
                                        <li>
                                          <strong>Privacy Policy:</strong>
                                          <ul>
                                            <li>
                                              The purpose of the privacy policy
                                              is to give customers clarity and
                                              confidence about how their
                                              personal information is handled.
                                              It describes the precise
                                              categories of data that are
                                              gathered during transactions,
                                              including names, addresses, and
                                              contact information, and it
                                              clarifies the reason behind the
                                              need for this data. The station
                                              guarantees that the collection of
                                              consumer data is limited to
                                              appropriate business uses, like
                                              order processing, delivery
                                              assistance, and proper
                                              record-keeping.
                                            </li>
                                          </ul>
                                        </li>
                                        <li>
                                          <strong>
                                            Changes to Terms and Conditions:
                                          </strong>
                                          <ul>
                                            <li>
                                              The water refilling station
                                              reserves the right to modify these
                                              terms and conditions. Changes will
                                              be communicated in advance.
                                            </li>
                                          </ul>
                                        </li>
                                      </ol>
                                      <hr />
                                      <div style={{ textAlign: "center" }}>
                                        <h2>Privacy Policy</h2>
                                      </div>
                                      <p
                                        style={{
                                          textIndent: "20px",
                                          textAlign: "justify",
                                        }}>
                                        AQUATIC DRAGON Water Refilling Business
                                        (referred to as "we", "us", and "our")
                                        respects your privacy and is committed
                                        to protecting your personal information.
                                        This privacy policy describes how we
                                        collect, use, and share information when
                                        you use our services.
                                      </p>
                                      <ol type="1">
                                        <li>
                                          <strong>
                                            Information We Collect:{" "}
                                          </strong>
                                          We may collect personal information
                                          from you, such as your name, address,
                                          phone number, and email address when
                                          you use our services. We may also
                                          collect non-personal information such
                                          as your device's IP address, browser
                                          type, and operating system.
                                        </li>
                                        <li>
                                          <strong>
                                            How We Use Your Information:{" "}
                                          </strong>
                                          We may use your personal information
                                          to provide you with our services,
                                          communicate with you about our
                                          services, and improve our services. We
                                          may also use your non-personal
                                          information for statistical analysis,
                                          troubleshooting, and improving our
                                          website and services.
                                        </li>
                                        <li>
                                          <strong>
                                            Sharing Your Information:{" "}
                                          </strong>
                                          We may share your personal information
                                          with our employees and riders who need
                                          access to the information to provide
                                          our services. We will never sell your
                                          personal information to third parties.
                                        </li>
                                        <li>
                                          <strong>Security: </strong>
                                          We take appropriate measures to
                                          protect your personal information from
                                          unauthorized access, disclosure,
                                          alteration, or destruction. We
                                          implement industry-standard security
                                          measures such as encryption and
                                          password protection to safeguard your
                                          personal information.
                                        </li>
                                        <li>
                                          <strong>Cookies: </strong>
                                          We use cookies on our website to
                                          enhance your user experience and
                                          personalize your interactions with us.
                                          You can choose to disable cookies in
                                          your browser settings, but this may
                                          affect your ability to use our
                                          website.
                                        </li>
                                        <li>
                                          <strong>Third-Party Websites:</strong>
                                          Our website may contain links to
                                          third-party websites. We are not
                                          responsible for the privacy practices
                                          or content of these websites. We
                                          encourage you to read the privacy
                                          policies of these websites before
                                          using them.
                                        </li>

                                        <li>
                                          <strong>Children's Privacy: </strong>
                                          Our services are not intended for
                                          children under the age of 13. We do
                                          not knowingly collect personal
                                          information from children under 13. If
                                          we learn that we have collected
                                          personal information from a child
                                          under 13, we will promptly delete the
                                          information.
                                        </li>

                                        <li>
                                          <strong>
                                            Changes to This Policy:{" "}
                                          </strong>
                                          We may update this privacy policy from
                                          time to time to reflect changes in our
                                          business practices or legal
                                          requirements. We will post the updated
                                          policy on our website and notify you
                                          of any significant changes.We may
                                          update this privacy policy from time
                                          to time to reflect changes in our
                                          business practices or legal
                                          requirements. We will post the updated
                                          policy on our website and notify you
                                          of any significant changes.
                                        </li>
                                      </ol>

                                      <p
                                        style={{
                                          textIndent: "20px",
                                          textAlign: "justify",
                                        }}>
                                        By using our services, you consent to
                                        the collection, use, and sharing of your
                                        personal information as described in
                                        this privacy policy. If you have any
                                        questions or concerns about our privacy
                                        policy, please contact us.
                                      </p>
                                    </ModalBody>
                                    {/* <ModalFooter>
                                      <Button
                                        color="primary"
                                        type="submit"
                                        onClick={toggle}>
                                        Register
                                      </Button>{" "}
                                      <Button
                                        color="secondary"
                                        onClick={toggle}>
                                        Cancel
                                      </Button>
                                    </ModalFooter>{" "} */}
                                  </Form>
                                </Modal>
                              </FormGroup>
                            </div>
                          </Col>
                        </Row>

                        <div className="text-center">
                          <Button
                            className="mt-4 mb-4"
                            color="primary"
                            type="submit"
                            style={{ width: "300px" }}>
                            Create account
                          </Button>
                        </div>
                      </Form>{" "}
                      <div className="text-center text-muted mb-4">
                        Have already an account? <a href="/login">Login here</a>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </div>
          <AuthFooter />
        </>
      )}
    </>
  );
};

export default Register;
