import axios from "axios";
import {
  ADD_TO_CART,
  REMOVE_ITEM_CART,
  SAVE_STOREBRANCH_INFO,
  CLEAR_CART,
} from "../constants/cartConstants";

export const addItemToCart = (id, quantity, price) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v1/gallon/${id}`);
  dispatch({
    type: ADD_TO_CART,
    payload: {
      gallon: data.gallon._id,
      image: data.gallon.gallonImage.url,
      age: data.gallon.gallonAge,
      type: data.gallon.type,
      quantity,
      price,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const storebranchInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_STOREBRANCH_INFO,
    payload: data,
  });
  localStorage.setItem("storebranch", JSON.stringify(data));
};

export const removeItemFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_ITEM_CART,
    payload: id,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const clearCart = () => async (dispatch) => {
  dispatch({
    type: CLEAR_CART,
  });
};
