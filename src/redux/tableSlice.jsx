import { createSlice } from "@reduxjs/toolkit";

let initialState={
    pageNumber:0,
}

const tableSlice=createSlice({
    name:"Table",
    initialState,
reducers:{
    setPageNumber:(state,action)=>{
 state.pageNumber= action.payload
    },
}
})
export const {setPageNumber}=tableSlice.actions
export default tableSlice.reducer