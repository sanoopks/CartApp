import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {get} from '../api';

const initialState = {
  apiStatus: '',
  products: [],
  categories: [],
};

export const fetchCategories = createAsyncThunk('home/categories', async () => {
  const data = await get('categories.php');
  return data;
});

export const fetchProducts = createAsyncThunk(
  'home/products',
  async category => {
    const data = await get('filter.php?c=' + category);
    return data;
  },
);

export const homeSlice = createSlice({
  name: 'home',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.apiStatus = 'fulfilled';
      if (action.payload && 'categories' in action.payload) {
        state.categories = action.payload.categories;
      }
    });
    builder.addCase(fetchProducts.pending, (state, action) => {
      state.apiStatus = 'pending';
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.apiStatus = 'fulfilled';
      if (action.payload && 'meals' in action.payload) {
        state.products = action.payload.meals;
      }
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.apiStatus = 'rejected';
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = homeSlice.actions;

export default homeSlice.reducer;

export const getApiStatus = rootState => rootState.home.apiStatus;
export const getCategories = rootState => rootState.home.categories;
export const getProducts = rootState => rootState.home.products;
