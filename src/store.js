import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./features/test-feature/cartSlice";

const store = configureStore({
  reducer: {
    cart: cartSlice,
  },
});

export default store;
