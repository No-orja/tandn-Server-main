import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useInsertData } from "../../Hooks/UseInsertData";
import { useDeleteDataToken } from "../../Hooks/UseDeleteData";
import { useGetDataToken } from "../../Hooks/UseGetData";
import {useUpdateData} from "../../Hooks/UseUpdateData"

// ADD USER ADDRESS
export const addUserAddress = createAsyncThunk(
    "userAddress/add",
    async (addressData, { rejectWithValue }) => {
        try {
            const response = await useInsertData("/api/v1/addresses", addressData);

            if (!response) {
                throw new Error("لم يتم استلام استجابة من السيرفر");
            }

            return response;
        } catch (error) {
            console.error("Error adding user address:", error);
            return rejectWithValue(error.response?.data || "حدث خطأ أثناء الإضافة");
        }
    }
);

//ALL USER ADDRESS
export const getAllUserAddress = createAsyncThunk(
    "userAddress/getAll",
    async (_, { rejectWithValue }) => {
        try {
            const response = await useGetDataToken("/api/v1/addresses");    

            if (!response) {
                throw new Error("لم يتم استلام استجابة من السيرفر");
            }

            return response;
        } catch (error) {
            console.error("Error getting user address:", error);
            return rejectWithValue(error.response?.data || "حدث خطاء غير معروف");
        }
    }
)

//DELETE USER ADDRESS
export const deleteUserAddress = createAsyncThunk(
    "userAddress/delete",
    async (id, { rejectWithValue }) => {
        try {
            const response = await useDeleteDataToken(`/api/v1/addresses/${id}`);    

            if (!response) {
                throw new Error("لم يتم استلام استجابة من السيرفر");
            }

            return response;
        } catch (error) {
            console.error("Error delete user address:", error);
            return rejectWithValue(error.response?.data || "حدث خطاء غير معروف");
        }
    }
)

//UPDATE USER ADDRESS
export const updateUserAddress = createAsyncThunk(
    "userAddress/update",
    async ({id ,body} , { rejectWithValue }) => {
        try {
            const response = await useUpdateData(`/api/v1/addresses/${id}`, body);    
            console.log("The res or pdate address", response)
            if (!response) {
                throw new Error("لم يتم استلام استجابة من السيرفر");
            }

            return response;
        } catch (error) {
            console.error("Error delete user address:", error);
            return rejectWithValue(error.response?.data || "حدث خطاء غير معروف");
        }
    }
)
//GET SPECIFIC USER ADDRESS
export const featchOneAddress = createAsyncThunk( "userAddress/getSpecific", async (id, { rejectWithValue }) => {
    try {
        const response = await useGetDataToken(`/api/v1/addresses/${id}`);
        console.log("API Response get specific user address:", response);
        return response;
    } catch (error) {
        console.error("Error get specific user address:", error);
        return rejectWithValue(error.response?.data || "حدث خطاء غير معروف");
    }
})



const userAddressSlice = createSlice({
    name: "userAddress",
    initialState: {
        addAddresses: [],
        allAddresses: [],
        deleteAddress: [],
        getSpecificUserAddress: [],
        updateAddress: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        // ADD USER ADDRESS
        builder.addCase(addUserAddress.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(addUserAddress.fulfilled, (state, action) => {
            state.isLoading = false;
            state.addAddresses.push(action.payload);
        })
        .addCase(addUserAddress.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });

        // ALL USER ADDRESS
        builder.addCase(getAllUserAddress.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(getAllUserAddress.fulfilled, (state, action) => {
            state.isLoading = false;
            state.allAddresses.push(action.payload);
        })
        .addCase(getAllUserAddress.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });

        // DELETE USER ADDRESS
        builder.addCase(deleteUserAddress.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(deleteUserAddress.fulfilled, (state, action) => {
            state.isLoading = false;
            state.deleteAddress.push(action.payload);
        })
        .addCase(deleteUserAddress.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });

        // UPDATE USER ADDRESS
        builder.addCase(updateUserAddress.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(updateUserAddress.fulfilled, (state, action) => {
            state.isLoading = false;
            state.updateAddress.push(action.payload);
        })
        .addCase(updateUserAddress.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });        
        // GET USER ADDRESS
        builder.addCase(featchOneAddress.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(featchOneAddress.fulfilled, (state, action) => {
            state.isLoading = false;
            state.getSpecificUserAddress = action.payload;
        })
        .addCase(featchOneAddress.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });     
    },
});

export default userAddressSlice.reducer;
