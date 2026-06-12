import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {useGetData} from "../../Hooks/UseGetData";
import {  useInsertDataWithImage } from "../../Hooks/UseInsertData";

//GET ALLBrand
export const featchAllBrand = createAsyncThunk("GET_ALL_BRAND",async (limit)=>{
    //const response = await baseURL.get("/api/v1/brands") 
    
    const response = await useGetData(`/api/v1/brands?limit=${limit}`)
    console.log("API Response AllBrand:", response); 
    return response;

})

//GET SPICIFIC CATEGORY
export const featchSpicificBrand = createAsyncThunk("GET_SPICIFIC_BRAND",async (id)=>{

    const response = await useGetData(`/api/v1/brands/${id}`)
    console.log("API Response Spicific Brand :", response); 
    return response;
 
})

//GET ALLBrand WITH PAGINATION
export const featchAllBrandPage = createAsyncThunk("GET_ALLBrand",async (page)=>{

    const response = await useGetData(`/api/v1/brands?limit=12&page=${page}`)
    console.log("API Response AllBrand Page:", response); 
    return response;

})

//CREATEBrand
export const featchAddBrand = createAsyncThunk("CREATEBrand", async (formData)=>{

    const response = await useInsertDataWithImage(`/api/v1/brands`, formData)

    console.log("API Response AddBrand:", response); 
    return response

})

const alBrandApiSlice = createSlice({
    name: "alBrand",
    initialState:{
        alBrand:[],
        spicificBrand:{},
        isLoading: false
    },
    extraReducers (builder){
        builder.addCase(featchAllBrand.pending,(state, action)=>{
            state.isLoading = true
        }).addCase(featchAllBrand.fulfilled, (state, action)=>{
            state.alBrand = action.payload;
            state.isLoading = false
        }).addCase(featchAllBrand.rejected, (state, action)=>{
            state.isLoading = false
        })

        //Page
        .addCase(featchAllBrandPage.pending,(state, action)=>{
            state.isLoading = true
        }).addCase(featchAllBrandPage.fulfilled, (state, action)=>{
            state.alBrand = action.payload;
            state.isLoading = false
        }).addCase(featchAllBrandPage.rejected, (state, action)=>{
            state.isLoading = false
        }).addCase(featchAddBrand.pending,(state, action)=>{
            state.isLoading = true
        }).addCase(featchAddBrand.fulfilled, (state, action)=>{
            state.alBrand = action.payload;
            state.isLoading = false
        }).addCase(featchAddBrand.rejected, (state, action)=>{
            state.isLoading = false
        })

        
        .addCase(featchSpicificBrand.pending,(state, action)=>{
            state.isLoading = true
        }).addCase(featchSpicificBrand.fulfilled, (state, action)=>{
            // state.spicificCategory = action.payload;
            state.spicificBrand = action.payload;
            state.isLoading = false
        }).addCase(featchSpicificBrand.rejected, (state, action)=>{
            state.isLoading = false
        })
    }
})
export const {changeResult} = alBrandApiSlice.actions;
export default alBrandApiSlice.reducer