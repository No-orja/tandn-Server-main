import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {useGetData} from "../../Hooks/UseGetData";
import {  useInsertDataWithImage } from "../../Hooks/UseInsertData";
import { useDeleteDataToken } from "../../Hooks/UseDeleteData";
import { useUpdateDataWithImage } from "../../Hooks/UseUpdateData";

//GET ALLBrand
export const featchAllBrand = createAsyncThunk("GET_ALL_BRAND",async (limit = 20)=>{
    //const response = await baseURL.get("/brands") 
    
    const response = await useGetData(`/brands?limit=${limit}`)
    console.log("API Response AllBrand:", response); 
    return response;

})

//GET SPICIFIC CATEGORY
export const featchSpicificBrand = createAsyncThunk("GET_SPICIFIC_BRAND",async (id)=>{

    const response = await useGetData(`/brands/${id}`)
    console.log("API Response Spicific Brand :", response); 
    return response;
 
})

//GET ALLBrand WITH PAGINATION
export const featchAllBrandPage = createAsyncThunk("GET_ALLBrand",async (page)=>{

    const response = await useGetData(`/brands?limit=12&page=${page}`)
    console.log("API Response AllBrand Page:", response); 
    return response;

})

//CREATEBrand
export const featchAddBrand = createAsyncThunk("CREATEBrand", async (formData)=>{

    const response = await useInsertDataWithImage(`/brands`, formData)

    console.log("API Response AddBrand:", response); 
    return response

})

//DELETE BRAND (admin)
export const featchDeleteBrand = createAsyncThunk("DELETE_BRAND", async (id, { rejectWithValue })=>{
    try{
        const response = await useDeleteDataToken(`/brands/${id}`)
        console.log("API Response Delete Brand:", response);
        return response;
    }catch(error){
        console.log("Error delete brand", error)
        return rejectWithValue(error.response?.data || { message: error.message });
    }
})

//UPDATE BRAND (admin) — multipart (name + optional image). Returns the body.
export const featchUpdateBrand = createAsyncThunk("UPDATE_BRAND", async ({ id, formData }, { rejectWithValue })=>{
    try{
        const response = await useUpdateDataWithImage(`/brands/${id}`, formData)
        console.log("API Response Update Brand:", response);
        return response;
    }catch(error){
        console.log("Error update brand", error)
        return rejectWithValue(error.response?.data || { message: error.message });
    }
})

const alBrandApiSlice = createSlice({
    name: "alBrand",
    initialState:{
        alBrand:[],
        spicificBrand:{},
        deleteBrand:[],
        updateBrand:[],
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

        //Delete
        .addCase(featchDeleteBrand.pending,(state, action)=>{
            state.isLoading = true
        }).addCase(featchDeleteBrand.fulfilled, (state, action)=>{
            state.deleteBrand = action.payload;
            state.isLoading = false
        }).addCase(featchDeleteBrand.rejected, (state, action)=>{
            state.isLoading = false
        })

        //Update
        .addCase(featchUpdateBrand.pending,(state, action)=>{
            state.isLoading = true
        }).addCase(featchUpdateBrand.fulfilled, (state, action)=>{
            state.updateBrand = action.payload;
            state.isLoading = false
        }).addCase(featchUpdateBrand.rejected, (state, action)=>{
            state.isLoading = false
        })
    }
})
export const {changeResult} = alBrandApiSlice.actions;
export default alBrandApiSlice.reducer