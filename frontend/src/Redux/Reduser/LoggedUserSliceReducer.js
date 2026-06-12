import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useUpdateData } from "../../Hooks/UseUpdateData";

//UPDATE USER ADDRESS
export const updateUserDataSlice = createAsyncThunk(
    "userData/updateData",
    async (body , { rejectWithValue }) => {
        try {
            const response = await useUpdateData(`/api/v1/users/updateMe`, body);    
            console.log("The res of update userData", response)
            if (!response) {
                throw new Error("لم يتم استلام استجابة من السيرفر");
            }

            return response;
        } catch (error) {
            console.error("Error update userData:", error);
            return rejectWithValue(error.response?.data || "حدث خطاء غير معروف");
        }
    }
)

//UPDATE USER password
export const updateUserPasswordSlice = createAsyncThunk(
    "userData/updatePassword",
    async (body , { rejectWithValue }) => {
        try {
            const response = await useUpdateData(`/api/v1/users/changeMyPassword`, body);    
            console.log("The res of update password", response)
            if (!response) {
                throw new Error("لم يتم استلام استجابة من السيرفر");
            }

            return response;
        } catch (error) {
            console.error("Error update password:", error);
            return rejectWithValue(error.response?.data || "حدث خطاء غير معروف");
        }
    }
)
const userDataSlice = createSlice({
    name: "userData",
    initialState: {
        userInfo: [],
        updateData: [], 
        updatePassword: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {   
        builder.addCase(updateUserDataSlice.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(updateUserDataSlice.fulfilled, (state, action) => {
            state.isLoading = false;
            state.userInfo = action.payload
            state.error = null
        })
        .addCase(updateUserDataSlice.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });      

        // UPDATE USER PASSWORD
        builder.addCase(updateUserPasswordSlice.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(updateUserPasswordSlice.fulfilled, (state, action) => {
            state.isLoading = false;
            state.updatePassword = action.payload
            localStorage.setItem("user", JSON.stringify(action.payload));
        })
        .addCase(updateUserPasswordSlice.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        }); 
    },
});

export default userDataSlice.reducer;