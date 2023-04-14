import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  user: {},
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState: initialState,
  reducers: {},
});

// Action creators are generated for each case reducer function
export const {} = profileSlice.actions;

export default profileSlice.reducer;
