import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useInsertData } from "../../Hooks/UseInsertData";
import { useGetData } from "../../Hooks/UseGetData";
import {useDeleteDataToken} from "../../Hooks/UseDeleteData";
import { useUpdateData } from "../../Hooks/UseUpdateData";

//ADD REVIEW
export const featchAddReviewProduct = createAsyncThunk("ADD_REVIEW_PRODUCT", async ({ id, body }, { rejectWithValue })=>{
    try{
        const response = await useInsertData(`/api/v1/products/${id}/reviews`, body)
        console.log("API Response Review product:", response); 
        return response;        
    }catch(error){
        console.log("Error Review product", error)
        throw rejectWithValue(error.response?.data || { errors: [{ msg: "حدث خطاء غير معروف" }] });
    }
})

//ADD REVIEW
export const featchAllReviewProduct = createAsyncThunk("ALL_REVIEW_PRODUCT", async ({id, limit, page}, { rejectWithValue })=>{
    try{
        const response = await useGetData(`/api/v1/products/${id}/reviews?limit=${limit}&page=${page}`)
        console.log("API Response all Review product:", response); 
        return response;        
    }catch(error){
        console.log("Error all Review  product", error)
        throw rejectWithValue(error.response?.data || { errors: [{ msg: "حدث خطاء غير معروف" }] });
    }
})

//DELETE SPECIFIC REVIEW
export const featchDeleteSpecificReview = createAsyncThunk("DELETE_SPECIFIC_REVIEW", async (id, { rejectWithValue })=>{
    try{
        const response = await useDeleteDataToken(`/api/v1/reviews/${id}`)
        console.log("API Response delete specific Review :", response); 
        return response;        
    }catch(error){
        console.log("Error delete specific Review", error)
        throw rejectWithValue(error.response?.data || { errors: [{ msg: "حدث خطاء غير معروف" }] });
    }
})

//UPDATE SPECIFIC REVIEW
export const featchUpdateSpecificReview = createAsyncThunk("UPDATE_SPECIFIC_REVIEW", async ({id, body}, { rejectWithValue })=>{
    try{
        const response = await useUpdateData(`/api/v1/reviews/${id}`, body)
        console.log("API Response update specific Review :", response); 
        return response;        
    }catch(error){
        console.log("Error update specific Review", error)
        throw rejectWithValue(error.response?.data || { errors: [{ msg: "حدث خطاء غير معروف" }] });
    }
})


const allReviewsApiSlice = createSlice({
    name: "Reviews",
    initialState:{
        createReviews:null,
        allReviewProduct:[],
        deleteSpecificReview: [],
        updateSpecificReview:[],
        error: null,
        isLoading:false
    },
    
    extraReducers (builder){                                                               
        //ADD
        builder.addCase(featchAddReviewProduct.pending,(state, action)=>{
            state.isLoading = true
        }).addCase(featchAddReviewProduct.fulfilled, (state, action)=>{
            state.createReviews = action.payload;
            state.isLoading = false
            state.error = null;
        }).addCase(featchAddReviewProduct.rejected, (state, action)=>{
            state.isLoading = false 
            state.error = action.payload
        })

        //ALL
        builder.addCase(featchAllReviewProduct.pending,(state, action)=>{
            state.isLoading = true
        }).addCase(featchAllReviewProduct.fulfilled, (state, action)=>{
            state.allReviewProduct = action.payload;
            state.isLoading = false
            state.error = null;
        }).addCase(featchAllReviewProduct.rejected, (state, action)=>{
            state.isLoading = false 
            state.error = action.payload
        })

        //DELETE
        builder.addCase(featchDeleteSpecificReview.pending,(state, action)=>{
            state.isLoading = true
        }).addCase(featchDeleteSpecificReview.fulfilled, (state, action)=>{
            state.deleteSpecificReview = action.payload;
            state.isLoading = false
            state.error = null;
        }).addCase(featchDeleteSpecificReview.rejected, (state, action)=>{
            state.isLoading = false 
            state.error = action.payload
        })

        //UODATE
        builder.addCase(featchUpdateSpecificReview.pending,(state, action)=>{
            state.isLoading = true
        }).addCase(featchUpdateSpecificReview.fulfilled, (state, action)=>{
            state.updateSpecificReview = action.payload;
            state.isLoading = false
            state.error = null;
        }).addCase(featchUpdateSpecificReview.rejected, (state, action)=>{
            state.isLoading = false 
            state.error = action.payload
        })
    }
})

export default allReviewsApiSlice.reducer