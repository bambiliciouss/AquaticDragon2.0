import {
  ADD_TO_CART,
  REMOVE_ITEM_CART,
  SAVE_STOREBRANCH_INFO,
  CLEAR_CART,
} from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  console.log(state.cartItems);
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;
      const isItemExist = state.cartItems.find(
        (i) => i.gallon === item.gallon
      );
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
