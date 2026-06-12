import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useInsertData } from "../../Hooks/UseInsertData";
import { useGetData, useGetDataToken } from "../../Hooks/UseGetData";
import {useDeleteDataToken} from "../../Hooks/UseDeleteData";
import { useUpdateData } from "../../Hooks/UseUpdateData";


//ADD COPONE
export const featchAddComponentProduct = createAsyncThunk("ADD_COUPONE_PRODUCT", async (body, { rejectWithValue })=>{
    try{
        const response = await useInsertData(`/api/v1/coupons`, body)
        console.log("API Response add copone product:", response); 
        return response;        
    }catch(error){
        console.log("Error add copone  product", error)
        throw rejectWithValue(error.response?.data || { errors: [{ msg: "حدث خطاء غير معروف" }] });
    }
})

//ALL COPONE
export const featchAllComponentProduct = createAsyncThunk("ALL_COUPONE_PRODUCT", async (_,{ rejectWithValue })=>{
    try{
        const response = await useGetDataToken(`/api/v1/coupons`)
        console.log("API Response all copone product:", response); 
        return response;        
    }catch(error){
        console.log("Error all copone  product", error)
        throw rejectWithValue(error.response?.data || { errors: [{ msg: "حدث خطاء غير معروف" }] });
    }
})
//ALL COPONE
export const featchDeleteComponentProduct = createAsyncThunk("DELETE_COUPONE_PRODUCT", async (id,{ rejectWithValue })=>{
    try{
        const response = await useDeleteDataToken(`/api/v1/coupons/${id}`)
        console.log("API Response delete copone product:", response); 
        return response;        
    }catch(error){
        console.log("Error delete copone  product", error)
        throw rejectWithValue(error.response?.data || { errors: [{ msg: "حدث خطاء غير معروف" }] });
    }
})

//UPDATE COPONE
export const featchUpdateCouponeProduct = createAsyncThunk("UPDATE_COUPONE_PRODUCT", async (id, {body},{ rejectWithValue })=>{
    try{
        console.log("doing update")
        const response = await useUpdateData(`/api/v1/coupons/${id}`, body)
        console.log("API Response update copone product:", response); 
        return response;        
    }catch(error){
        console.log("Error update copone  product", error)
        throw rejectWithValue(error.response?.data || { errors: [{ msg: "حدث خطاء غير معروف" }] });
    }
})

//SPICIFIC COPONE
export const featchSpicificComponentProduct = createAsyncThunk("SPICIFIC_COUPONE_PRODUCT", async (id,{ rejectWithValue })=>{
    try{
        const response = await useGetDataToken(`/api/v1/coupons/${id}`)
        console.log("API Response spicific copone product:", response); 
        return response;        
    }catch(error){
        console.log("Error spicific copone  product", error)
        throw rejectWithValue(error.response?.data || { errors: [{ msg: "حدث خطاء غير معروف" }] });
    }
})


const allCoponeApiSlice = createSlice({
    name: "Copone",
    initialState:{
        createCopone:null,
        allCopone: null,
        deleteCopone: [],
        updateCopone: [],
        spicificCopone: [],
        error: null,
        isLoading:false
    },
    
    extraReducers (builder){     
        //update
        builder.addCase(featchUpdateCouponeProduct.pending,(state, action)=>{
            state.isLoading = true
        }).addCase(featchUpdateCouponeProduct.fulfilled, (state, action)=>{
            state.updateCopone = action.payload;
            state.isLoading = false
            state.error = null;
        }).addCase(featchUpdateCouponeProduct.rejected, (state, action)=>{
            state.isLoading = false 
            state.error = action.payload
        })

                
        //ADD
        builder.addCase(featchAddComponentProduct.pending,(state, action)=>{
            state.isLoading = true
        }).addCase(featchAddComponentProduct.fulfilled, (state, action)=>{
            state.createCopone = action.payload;
            state.isLoading = false
            state.error = null;
        }).addCase(featchAddComponentProduct.rejected, (state, action)=>{
            state.isLoading = false 
            state.error = action.payload
        })

        //ALL
        builder.addCase(featchAllComponentProduct.pending,(state, action)=>{
            state.isLoading = true
        }).addCase(featchAllComponentProduct.fulfilled, (state, action)=>{
            state.allCopone = action.payload;
            state.isLoading = false
            state.error = null;
        }).addCase(featchAllComponentProduct.rejected, (state, action)=>{
            state.isLoading = false 
            state.error = action.payload
        })
        //DELETE
        builder.addCase(featchDeleteComponentProduct.pending,(state, action)=>{
            state.isLoading = true
        }).addCase(featchDeleteComponentProduct.fulfilled, (state, action)=>{
            state.deleteCopone = action.payload;
            state.isLoading = false
            state.error = null;
        }).addCase(featchDeleteComponentProduct.rejected, (state, action)=>{
            state.isLoading = false 
            state.error = action.payload
        })

        //SPICIFIC
        builder.addCase(featchSpicificComponentProduct.pending,(state, action)=>{
            state.isLoading = true
        }).addCase(featchSpicificComponentProduct.fulfilled, (state, action)=>{
            state.spicificCopone = action.payload;
            state.isLoading = false
            state.error = null;
        }).addCase(featchSpicificComponentProduct.rejected, (state, action)=>{
            state.isLoading = false 
            state.error = action.payload
        })
    }
})

export default allCoponeApiSlice.reducer