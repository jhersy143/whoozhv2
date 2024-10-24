

import {configureStore } from "@reduxjs/toolkit";
import loginModalSlice from "./Features/loginModalSlice"
import registerModalSlice from "./Features/registerModalSlice"
export const store = configureStore({
  reducer:{
    loginModal:loginModalSlice,
    registerModal:registerModalSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch