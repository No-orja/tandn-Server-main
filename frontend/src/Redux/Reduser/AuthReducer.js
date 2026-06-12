import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useInsertData } from '../../Hooks/UseInsertData';
import {useUpdateData, useUpdateDataWithImage} from '../../Hooks/UseUpdateData';

//Create a user
export const fetchCreateUserSlice  = createAsyncThunk("CREATE_USER",async (formData,{rejectWithValue}) => {
    try{
        const response = await useInsertData(`/api/v1/auth/signup`,formData) 
        console.log("API Response Create User:", response);
        return response;

    }catch(error){
        console.log("Error create user", error)
        return rejectWithValue(error.response?.data || { errors: [{ msg: "حدث خطأ غير معروف" }] });
    }
  
}) 
export const fetchLoginSlice = createAsyncThunk("LOGIN_USER",async (formData,{rejectWithValue}) => {
    try{
        const response = await useInsertData(`/api/v1/auth/login`, formData) 
        console.log("API Response Login User:", response);
        return response;

    }catch(error){
        console.log("Error login user", error)
        return rejectWithValue(error.response?.data || { errors: [{ msg: "حدث خطاء غير معروف" }] });
    }
})

export const fetchForgetPasswordSlice = createAsyncThunk("FORGET_PASSWORD",async (data,{rejectWithValue}) => {
    try{
        const response = await useInsertData(`/api/v1/auth/forgotPasswords`, data) 
        console.log("API Response Forget Password User:", response);
        return response;

    }catch(error){
        console.log("Error forget password data user", error)
        return rejectWithValue(error.response?.data || { errors: [{ msg: "حدث خطاء غير معروف" }] });
    }  
})

export const fetchVerifyResetCodeSlice = createAsyncThunk("VERIFY_CODE",async (data,{rejectWithValue}) => {
    try{
        const response = await useInsertData(`/api/v1/auth/verifyResetCode`, data) 

        console.log("API Response rest Password User:", response);
        return response;

    }catch(error){
        console.log("Error rest Password User", error)
        return rejectWithValue(error.response?.data || { errors: [{ msg: "حدث خطاء غير معروف" }] });
    }  
})

//Reset Password
export const fetcResetPasswordSlice = createAsyncThunk("RESET_PASSWORD",async (data,{rejectWithValue}) => {
    try{
        const response = await useUpdateData(`/api/v1/auth/resetPassword`, data) 

        console.log("API Response final step for rest Password User:", response);
        return response;

    }catch(error){
        console.log("Error final step for rest Password User", error)
        return rejectWithValue(error.response?.data || { errors: [{ msg: "حدث خطاء غير معروف" }] });
    }  
})

const authSlice = createSlice({
    name: 'auth',
    initialState:{
        user:[],
        auth:[],
        login:[],
        forgetPassword:[],
        verifyCode:[],
        resetPassword:[],
        isLoading: false,
        error: null,
    },
    extraReducers (builder) {    
        //Register
        builder.addCase(fetchCreateUserSlice.pending,(state, action)=>{
            state.isLoading = true
            state.error = null
        }).addCase(fetchCreateUserSlice.fulfilled, (state, action)=>{
            state.auth = action.payload;
            state.isLoading = false
            state.error = null 
        }).addCase(fetchCreateUserSlice.rejected, (state, action)=>{
            state.isLoading = false 
            state.error = action.payload
        })
        //Login
        builder.addCase(fetchLoginSlice.pending,(state, action)=>{
            state.isLoading = true
            state.error = null
        }).addCase(fetchLoginSlice.fulfilled, (state, action)=>{
            state.login = action.payload;
            state.isLoading = false
            state.error = null 
        }).addCase(fetchLoginSlice.rejected, (state, action)=>{
            state.isLoading = false 
            state.error = action.payload
        })

        //Forget Password
        builder.addCase(fetchForgetPasswordSlice.pending,(state, action)=>{
            state.isLoading = true
            state.error = null
        }).addCase(fetchForgetPasswordSlice.fulfilled, (state, action)=>{
            state.forgetPassword = action.payload;
            state.isLoading = false
            state.error = null 
        }).addCase(fetchForgetPasswordSlice.rejected, (state, action)=>{
            state.forgetPassword = false 
            state.error = action.payload
        })

        //Verify reset code
        builder.addCase(fetchVerifyResetCodeSlice.pending,(state, action)=>{
            state.isLoading = true
            state.error = null
        }).addCase(fetchVerifyResetCodeSlice.fulfilled, (state, action)=>{
            state.verifyCode = action.payload;
            state.isLoading = false
            state.error = null 
        }).addCase(fetchVerifyResetCodeSlice.rejected, (state, action)=>{
            state.verifyCode = false 
            state.error = action.payload
        })

        //Reset password
        builder.addCase(fetcResetPasswordSlice.pending,(state, action)=>{
            state.isLoading = true
            state.error = null
        }).addCase(fetcResetPasswordSlice.fulfilled, (state, action)=>{
            state.resetPassword = action.payload;
            state.isLoading = false
            state.error = null 
        }).addCase(fetcResetPasswordSlice.rejected, (state, action)=>{
            state.resetPassword = false 
            state.error = action.payload
        })
    }
});

export default authSlice.reducer;