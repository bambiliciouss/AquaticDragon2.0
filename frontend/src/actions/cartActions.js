import axios from "axios";
import {
  ADD_TO_CART,
  REMOVE_ITEM_CART,
  SAVE_STOREBRANCH_INFO,
  CLEAR_CART,
  ADD_TO_CART_PRODUCT,
  REMOVE_ITEM_CART_PRODUCT,
} from "../constants/cartConstants";

export const addItemToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v1/admin/typeofgallon/${id}`);
  console.log(data);
  dispatch({
    type: ADD_TO_CART,
    payload: {
      gallon: data.gallonType._id,
      type: data.gallonType.typeofGallon,
      price: data.gallonType.price,
      quantity,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const addProductToCart =
  (id, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/v1/admin/all/product//${id}`);
    console.log("PRODUCTS", data);
    dispatch({
      type: ADD_TO_CART_PRODUCT,
      payload: {
        product: data.product._id,
        type: data.product.typesgallon,
        price: data.product.price,
        quantity,
      },
    });
    localStorage.setItem(
      "cartProductItems",
      JSON.stringify(getState().cartProduct.cartProductItems)
    );
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

export const removeProductFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_ITEM_CART_PRODUCT,
    payload: id,
  });
  localStorage.setItem(
    "cartProductItems",
    JSON.stringify(getState().cartProduct.cartProductItems)
  );
};

export const clearCart = () => async (dispatch) => {
  dispatch({
    type: CLEAR_CART,
  });
};
