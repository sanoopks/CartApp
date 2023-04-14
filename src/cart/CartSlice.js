import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  items: [],
  subTotal: 0,
  tax: 0,
  delivery: 0,
  total: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      state.items.push(item);
    },
    updateItem: (state, action) => {
      const items = action.payload;
      state.items = items;
    },
  },
});

// Action creators are generated for each case reducer function
export const {addItem, updateItem} = cartSlice.actions;

export default cartSlice.reducer;

export const getCartItems = rootState => rootState.cart.items;
