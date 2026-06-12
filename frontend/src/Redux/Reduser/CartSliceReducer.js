import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useInsertData } from "../../Hooks/UseInsertData";
import { useGetData, useGetDataToken } from "../../Hooks/UseGetData";
import { useDeleteDataToken } from "../../Hooks/UseDeleteData";
import { useUpdateData } from "../../Hooks/UseUpdateData";


//ALL CART
export const featchAddToCart = createAsyncThunk("ADD_TO_CART", async (body, { rejectWithValue })=>{
    try{
        const response = await useInsertData(`/api/v1/cart`, body)
        console.log("API Response add to cart :", response); 
        return response;        
    }catch(error){
        console.log("Error add to cart", error)
        throw rejectWithValue(error.response?.data || { errors: [{ msg: "حدث خطاء غير معروف" }] });
    }
})
//ALL CART
export const featchAllCart = createAsyncThunk("ALL_CART", async (_,{ rejectWithValue })=>{
    try{
        const response = await useGetDataToken(`/api/v1/cart`)
        console.log("API Response all cart :", response); 
        return response;        
    }catch(error){
        throw rejectWithValue(error.response?.data || { errors: [{ msg: "حدث خطاء غير معروف" }] });
    }
})

//DELETE ALL CART
export const featchDeleteAllCart = createAsyncThunk("DELETE_ALL_CART", async (_,{ rejectWithValue })=>{
    try{
        const response = await useDeleteDataToken(`/api/v1/cart`)
        console.log("API Response delete all cart :", response); 
        return response;        
    }catch(error){
        console.log("Error delete all cart", error)
        throw rejectWithValue(error.response?.data || { errors: [{ msg: "حدث خطاء غير معروف" }] });
    }
})
//DELETE SPISIFIC CART
export const featchDeleteSpecificCart = createAsyncThunk("DELETE_SPECIFIC_CART", async (id,{ rejectWithValue })=>{
    try{
        const response = await useDeleteDataToken(`/api/v1/cart/${id}`)
        console.log("API Response delete spisific cart :", response); 
        return response;        
    }catch(error){
        console.log("Error delete spisific cart", error)
        throw rejectWithValue(error.response?.data || { errors: [{ msg: "حدث خطاء غير معروف" }] });
    }
})

//UPDATE SPISIFIC CART
export const featchUpdateSpecificCart = createAsyncThunk("UPDATE_SPECIFIC_CART", async ({id, body},{ rejectWithValue })=>{
    try{
        const response = await useUpdateData(`/api/v1/cart/${id}`, body)
        console.log("API Response update spisific cart :", response); 
        return response;        
    }catch(error){
        console.log("Error update spisific cart", error)
        throw rejectWithValue(error.response?.data || { errors: [{ msg: "حدث خطاء غير معروف" }] });
    }
})
//APPLY COUPON
export const featchApplyCoupon = createAsyncThunk("APPLY_COUPON_CART", async (body,{ rejectWithValue })=>{
    try{
        const response = await useUpdateData(`/api/v1/cart/applyCoupon`, body)
        console.log("API Response apply coupon cart :", response); 
        return response;        
    }catch(error){
        console.log("Error apply coupon cart", error)
        throw rejectWithValue(error.response?.data || { errors: [{ msg: "حدث خطاء غير معروف" }] });
    }
})

const CartSlice = createSlice({
    name: "Cart",
    initialState:{
        createCart:[],
        cartItems:[],
        deleteSpecificCartItem:[],
        updateSpecificCartItem:[],
        applyCoupon:[],
        deleteAllCart:[],
        error: null,
        isLoading:false
    },
    
    extraReducers (builder){   
        //ADD
        builder.addCase(featchAddToCart.pending,(state, action)=>{
            state.isLoading = true
        }).addCase(featchAddToCart.fulfilled, (state, action)=>{
            state.createCart = action.payload;
            state.isLoading = false
            state.error = null;
        }).addCase(featchAddToCart.rejected, (state, action)=>{
            state.isLoading = false 
            state.error = action.payload
        })
        //ALL
        builder.addCase(featchAllCart.pending,(state, action)=>{
            state.isLoading = true
        }).addCase(featchAllCart.fulfilled, (state, action)=>{
            state.cartItems = action.payload;
            state.isLoading = false
            state.error = null;
        }).addCase(featchAllCart.rejected, (state, action)=>{
            state.isLoading = false 
            state.error = action.payload
        })
        //DELETE All
        builder.addCase(featchDeleteAllCart.pending,(state, action)=>{
            state.isLoading = true
        }).addCase(featchDeleteAllCart.fulfilled, (state, action)=>{
            state.deleteAllCart = action.payload;
            state.isLoading = false
            state.error = null;
        }).addCase(featchDeleteAllCart.rejected, (state, action)=>{
            state.isLoading = false 
            state.error = action.payload
        })
        //DELETE SPISIFIC
        builder.addCase(featchDeleteSpecificCart.pending,(state, action)=>{
            state.isLoading = true
        }).addCase(featchDeleteSpecificCart.fulfilled, (state, action)=>{
            state.deleteSpecificCartItem = action.payload;
            state.isLoading = false
            state.error = null;
        }).addCase(featchDeleteSpecificCart.rejected, (state, action)=>{
            state.isLoading = false 
            state.error = action.payload
        })
        //UPDATE SPISIFIC
        builder.addCase(featchUpdateSpecificCart.pending,(state, action)=>{
            state.isLoading = true
        }).addCase(featchUpdateSpecificCart.fulfilled, (state, action)=>{
            state.updateSpecificCartItem = action.payload;
            state.isLoading = false
            state.error = null;
        }).addCase(featchUpdateSpecificCart.rejected, (state, action)=>{
            state.isLoading = false 
            state.error = action.payload
        })

        //APPLY COUPON  
        builder.addCase(featchApplyCoupon.pending,(state, action)=>{
            state.isLoading = true
        }).addCase(featchApplyCoupon.fulfilled, (state, action)=>{
            state.applyCoupon = action.payload;
            state.isLoading = false
            state.error = null;
        }).addCase(featchApplyCoupon.rejected, (state, action)=>{
            state.isLoading = false 
            state.error = action.payload
        })    
    }  
        
})
export default CartSlice.reducer