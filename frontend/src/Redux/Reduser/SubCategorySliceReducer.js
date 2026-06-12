import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useInsertData } from "../../Hooks/UseInsertData";
import {useGetData} from "../../Hooks/UseGetData";

//CREAT SUBCATEGORY 
export const featchAddSubCategory = createAsyncThunk("CREATE_SUBCATEGORY", async (data)=>{

    const response = await useInsertData(`/api/v1/subcategories`, data)

    console.log("API Response AddSubCategory: ", response); 
    return response

})

export const featchAllSubCategory = createAsyncThunk("ALL_SUBCATEGORY", async ()=>{
    const response = await useGetData("/api/v1/subcategories")
    console.log("API Response AllSubCategory: ", response); 
    return response

})

export const featchOneSubCategory = createAsyncThunk("GET_ONE_CATEGOTY", async (id)=>{
    const response = await useGetData(`/api/v1/categories/${id}/subcategories`)
    console.log("API Response get one subCategory: ", response); 
    return response

})


const alSubCategoryApiSlice = createSlice({
    name: "allSubCategory",
    initialState:{
        allSubCategory:[],
        isLoading: false
    },
    extraReducers (builder){
        builder.addCase(featchAddSubCategory.pending,(state, action)=>{
            state.isLoading = true
        }).addCase(featchAddSubCategory.fulfilled, (state, action)=>{
            state.allSubCategory = action.payload;
            state.isLoading = false
        }).addCase(featchAddSubCategory.rejected, (state, action)=>{
            state.isLoading = false
        }).addCase(featchAllSubCategory.pending,(state, action)=>{
            state.isLoading = true
        }).addCase(featchAllSubCategory.fulfilled, (state, action)=>{
            state.allSubCategory = action.payload;
            state.isLoading = false
        }).addCase(featchAllSubCategory.rejected, (state, action)=>{
            state.isLoading = false
        }).addCase(featchOneSubCategory.pending,(state, action)=>{
            state.isLoading = true
        }).addCase(featchOneSubCategory.fulfilled, (state, action)=>{
            state.allSubCategory = action.payload;
            state.isLoading = false
        }).addCase(featchOneSubCategory.rejected, (state, action)=>{
            state.isLoading = false
        })
    }
})
export default alSubCategoryApiSlice.reducer