

import {configureStore } from "@reduxjs/toolkit";
import modalSlice from "./Features/showModalSlice"

export const store = configureStore({
  reducer:{
    modalSlice:modalSlice,

  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch