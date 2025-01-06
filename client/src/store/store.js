//It will create a global reducer
// need to create slices
// we need to connect the store with react app 

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import adminProductsSlice from './admin/products-slice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductsSlice,
  },
});

export default store;