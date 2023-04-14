import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  user: {},
};

export const wishListSlice = createSlice({
  name: 'wishlist',
  initialState: initialState,
  reducers: {},
});

// Action creators are generated for each case reducer function
export const {} = wishListSlice.actions;

export default wishListSlice.reducer;
