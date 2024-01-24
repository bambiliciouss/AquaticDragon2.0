// import {
//   Button,
//   Card,
//   CardHeader,
//   CardBody,
//   FormGroup,
//   Form,
//   Input,
//   InputGroupAddon,
//   InputGroupText,
//   InputGroup,
//   Row,
//   Col,
//   Container,
// } from "reactstrap";

// import React from "react";
// import { useLocation } from "react-router-dom";
// import AuthNavbar from "components/Navbars/AuthNavbar.js";
// import AuthFooter from "components/Footers/AuthFooter.js";

// const Home = () => {
//   const location = useLocation();
//   React.useEffect(() => {
//     document.documentElement.scrollTop = 0;
//     document.scrollingElement.scrollTop = 0;
//   }, [location]);

//   return (
//     <>
//       <div className="main-content clear-filter" filter-color="blue">
//         <AuthNavbar />
//         <div
//           className="header py-7 py-lg-8"
//           style={{
//             backgroundImage: "url(" + require("assets/img/header.jpg") + ")",
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             position: "relative",
//           }}>
//           <div
//             style={{
//               content: '""',
//               position: "absolute",
//               top: 0,
//               right: 0,
//               bottom: 0,
//               left: 0,
//               backgroundColor: "rgba(135, 206, 235, 0.5)",
//             }}></div>
//           <Container>
//             <div className="header-body text-center mb-5 mt-8">
//               <Row className="justify-content-center">
//                 <Col lg="5" md="6">
//                   <h1 className="text-black">Aquatic Dragon</h1>
//                   <p className="text-lead text-black">
//                     We Deliver Clean & Safe Water Right to your Door
//                   </p>
//                 </Col>
//               </Row>
//             </div>
//           </Container>
//         </div>
//       </div>
//       <AuthFooter />
//     </>
//   );
// };

// export default Home;

import React from "react";
// nodejs library that concatenates classes
import classnames from "classnames";

// reactstrap components
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardImg,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";
import { useLocation } from "react-router-dom";
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import AuthFooter from "components/Footers/AuthFooter.js";

const Home = () => {
  const location = useLocation();
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [location]);

  return (
    <>
      <AuthNavbar />
      <main>
        <section className="section section-lg mt-8">
          <Container>
            <Row className="row-grid align-items-center">
              <Col className="order-md-2" md="6">
                <img
                  alt="..."
                  className="img-fluid floating"
                  src={require("assets/img/landingpage-img2.jpg")}
                />
              </Col>
              <Col className="order-md-1" md="6">
                <div className="pr-md-5">
                  <h1 className="display-3 text-info">Aquatic Dragon</h1>

                  <p>
                    Aquatic Dragon Water Refilling Station is your go-to
                    location for clean, pure, and sustainable refreshment. At
                    Aquatic Dragon Water Refilling Station, it passes into
                    21-stages of water filtration purification and sterilization
                    that makes the water safe to drink.
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
      {/* <AuthFooter /> */}
    </>
  );
};

export default Home;
