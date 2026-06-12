import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {  useGetDataToken } from "../../Hooks/UseGetData";
import { useInsertData } from "../../Hooks/UseInsertData";
import { useDeleteDataToken } from "../../Hooks/UseDeleteData";

//All REVIEW
export const featchAllWishListProduct = createAsyncThunk("ALL_WISH_PRODUCT", async (_,{rejectWithValue} )=>{
    //_ "Know why we added it + i was have error (forget _)"
    try{
        const response = await useGetDataToken(`/api/v1/wishlist`)
        console.log("API Response all wish product:", response); 
        return response;        
    }catch(error){
        console.log("Error all wish  product", error)
        throw rejectWithValue(error.response?.data || { errors: [{ msg: "حدث خطاء غير معروف" }] });
    }
})

//ADD REVIEW
export const featchAddWishListProduct = createAsyncThunk("ADD_WISH_PRODUCT", async (body,{rejectWithValue} )=>{
    //_ "Know why we added it + i was have error (forget _)"
    try{
        const response = await useInsertData(`/api/v1/wishlist`, body)
        console.log("API Response add wish product:", response); 
        return response;        
    }catch(error){
        console.log("Error add wish  product", error)
        throw rejectWithValue(error.response?.data || { errors: [{ msg: "حدث خطاء غير معروف" }] });
    }
})
//DELETE REVIEW
export const featchDeleteWishListProduct = createAsyncThunk("DELETE _WISH_PRODUCT", async (id,{rejectWithValue} )=>{
    //_ "Know why we added it + i was have error (forget _)"
    try{
        const response = await useDeleteDataToken(`/api/v1/wishlist/${id}`)
        console.log("API Response Delete wish product:", response); 
        return response;        
    }catch(error){
        console.log("Error delete wish  product", error)
        throw rejectWithValue(error.response?.data || { errors: [{ msg: "حدث خطاء غير معروف" }] });
    }
})

const WishSliceSlice = createSlice({
    name: "WishList",
    initialState:{
        allWishList:[],
        addWishList:[],
        deleteWishList:[],
        error: null,
        isLoading:false
    },
    
    extraReducers (builder){                                                               
        //ALL
        builder.addCase(featchAllWishListProduct.pending,(state, action)=>{
            state.isLoading = true
        }).addCase(featchAllWishListProduct.fulfilled, (state, action)=>{
            state.allWishList = action.payload;
            state.isLoading = false
            state.error = null;
        }).addCase(featchAllWishListProduct.rejected, (state, action)=>{
            state.isLoading = false 
            state.error = action.payload
        })

        //ADD
        builder.addCase(featchAddWishListProduct.pending,(state, action)=>{
            state.isLoading = true
        }).addCase(featchAddWishListProduct.fulfilled, (state, action)=>{
            state.addWishList = action.payload;
            state.isLoading = false
            state.error = null;
        }).addCase(featchAddWishListProduct.rejected, (state, action)=>{
            state.isLoading = false 
            state.error = action.payload
        })

        //DELETE
        builder.addCase(featchDeleteWishListProduct.pending,(state, action)=>{
            state.isLoading = true
        }).addCase(featchDeleteWishListProduct.fulfilled, (state, action)=>{
            state.deleteWishList = action.payload;
            state.isLoading = false
            state.error = null;
        }).addCase(featchDeleteWishListProduct.rejected, (state, action)=>{
            state.isLoading = false 
            state.error = action.payload
        })
    }
})

export default WishSliceSlice.reducer