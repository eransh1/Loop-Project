import { createSlice } from "@reduxjs/toolkit";

let initialState={
    calculating:false,
    rawData:[],
    data:[],
    finalDataToShow:[],
}

const homeSlice=createSlice({
    name:"home",
    initialState,
reducers:{
    setCalculating:(state,action)=>{
 state.calculating= action.payload
    },
    setRawData:(state,action)=>{
        state.rawData= action.payload
           },
           setData:(state,action)=>{
            state.data= action.payload
               }, 
               setFinalDataToShow:(state,action)=>{
            state.finalDataToShow= action.payload
               },
}
})
export const {setCalculating,setRawData,setData,setFinalDataToShow}=homeSlice.actions
export default homeSlice.reducer