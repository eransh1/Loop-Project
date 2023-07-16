import { configureStore } from "@reduxjs/toolkit";
import homeSliceReducer from "./homeSlice"
import tableSliceReducer from "./tableSlice"


export const store = configureStore({
    reducer: {
      home:homeSliceReducer,
      table:tableSliceReducer,
   
    },
  });