import React from "react";
import { useNavigate } from "react-router-dom";
import "../cart/Checkout.css";
const CheckoutSteps = ({
  store,
  gallon,
  containerstatus,
  payment,
  ordersummary,
}) => {
  const navigate = useNavigate();

  return (
    <div className="checkout-progress d-flex justify-content-center mt-5">
      {store ? (
        <div
          className="float-right"
          onClick={() => navigate("/storeselection")}>
          <div className="triangle2-active"></div>
          <div className="step active-step">Store</div>
          <div className="triangle-active"></div>
        </div>
      ) : (
        <div>
          <div className="triangle2-incomplete"></div>
          <div className="step incomplete">Store</div>
          <div className="triangle-incomplete"></div>
        </div>
      )}

      {gallon ? (
        <div className="float-right" onClick={() => navigate("/gallon/order")}>
          <div className="triangle2-active"></div>
          <div className="step active-step">Gallon</div>
          <div className="triangle-active"></div>
        </div>
      ) : (
        <div>
          <div className="triangle2-incomplete"></div>
          <div className="step incomplete">Gallon</div>
          <div className="triangle-incomplete"></div>
        </div>
      )}

      {containerstatus ? (
        <div
          className="float-right"
          onClick={() => navigate("/containerstatus")}>
          <div className="triangle2-active"></div>
          <div className="step active-step">Container Status</div>
          <div className="triangle-active"></div>
        </div>
      ) : (
        <div>
          <div className="triangle2-incomplete"></div>
          <div className="step incomplete">Confirm Order</div>
          <div className="triangle-incomplete"></div>
        </div>
      )}

      {payment ? (
        <div className="float-right" onClick={() => navigate("/payment")}>
          <div className="triangle2-active"></div>
          <div className="step active-step">Payment</div>
          <div className="triangle-active"></div>
        </div>
      ) : (
        <div>
          <div className="triangle2-incomplete"></div>
          <div className="step incomplete">Payment</div>
          <div className="triangle-incomplete"></div>
        </div>
      )}

      {ordersummary ? (
        <div className="float-right" onClick={() => navigate("/ordersummary")}>
          <div className="triangle2-active"></div>
          <div className="step active-step">Order Summary</div>
          <div className="triangle-active"></div>
        </div>
      ) : (
        <div>
          <div className="triangle2-incomplete"></div>
          <div className="step incomplete">Order Summary</div>
          <div className="triangle-incomplete"></div>
        </div>
      )}
    </div>
  );
};

export default CheckoutSteps;
