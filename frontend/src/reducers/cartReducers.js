import {
  ADD_TO_CART,
  REMOVE_ITEM_CART,
  SAVE_STOREBRANCH_INFO,
  CLEAR_CART,
  ADD_TO_CART_PRODUCT,
  REMOVE_ITEM_CART_PRODUCT,
} from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;
      const isItemExist = state.cartItems.find((i) => i.gallon === item.gallon);
      if (isItemExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.gallon === isItemExist.gallon ? item : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case REMOVE_ITEM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i.gallon !== action.payload),
      };

    case SAVE_STOREBRANCH_INFO:
      return {
        ...state,

        storebranch: action.payload,
      };

    case CLEAR_CART:
      return {
        ...state,
        cartItems: [],
      };

    default:
      return state;
  }
};

export const cartProductReducer = (
  state = { cartProductItems: [] },
  action
) => {
  
  switch (action.type) {
    case ADD_TO_CART_PRODUCT:
      const item = action.payload;
      const isItemProductExist = state.cartProductItems.find(
        (i) => i.product === item.product
      );
      if (isItemProductExist) {
        return {
          ...state,
          cartProductItems: state.cartProductItems.map((i) =>
            i.product === isItemProductExist.product ? item : i
          ),
        };
      } else {
        return {
          ...state,
          cartProductItems: [...state.cartProductItems, item],
        };
      }

    case REMOVE_ITEM_CART_PRODUCT:
      return {
        ...state,
        cartProductItems: state.cartProductItems.filter(
          (i) => i.product !== action.payload
        ),
      };

    default:
      return state;
  }
};
