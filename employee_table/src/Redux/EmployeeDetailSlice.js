import {createSlice} from "@reduxjs/toolkit";
const initialState = {}
const employeeDetailSlice = createSlice({
    name: "employeeDetail",
    initialState,
    reducers: {

        setEditableData: (state, action) => {
            state.initialState = action.payload;
        },
        setChartType: (state, action) => {
            state.chartType = action.payload;
        },
        setChartDetailsVisibility:(state,action)=>{ 
            state.chartDetailsVisibility=action.payload
        },setEmployeeData:(state, action) => {
            state.employeeData = action.payload;
        },
        setChartTitle: (state, action) => {
            state.chartTitle = action.payload;
        },
        setDataType: (state, action) => {       
            state.dataType = action.payload;
        },
        setField: (state, action) => {
            state.field = action.payload;
        },
        setChartData:(state,action)=>{ 
            state.chartData=action.payload
         },
         setUpdated:(state,action)=>{
            state.updated=action.payload
         }


    }
})
export const {  setEditableData, setChartType,setChartDetailsVisibility ,setEmployeeData,setChartTitle,setDataType,setField,setChartData,setUpdated} = employeeDetailSlice.actions;
export default employeeDetailSlice.reducer