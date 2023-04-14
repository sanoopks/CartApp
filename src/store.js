import {applyMiddleware, configureStore} from '@reduxjs/toolkit';
import cartReducer from '../src/cart/CartSlice';
import homeReducer from '../src/home/HomeSlice';
import profileReducer from '../src/profile/ProfileSlice';
import wishListReducer from '../src/wishlist/WishlistSlice';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

const reducer = {
  cart: cartReducer,
  home: homeReducer,
  profile: profileReducer,
  wishlist: wishListReducer,
};

const middleware = [thunk, logger];

const store = configureStore({
  reducer,
  middleware,
});

export default store;
