import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useInsertData } from "../../Hooks/UseInsertData";
import {useGetDataToken} from "../../Hooks/UseGetData" 
import {useUpdateData } from "../../Hooks/UseUpdateData"
// ADD USER ADDRESS
export const addCashOrder = createAsyncThunk("cashOrder/add",
    async ({id,shippingAddress}, { rejectWithValue }) => {
        try {
            const response = await useInsertData(`/api/v1/orders/${id}`, shippingAddress);
            console.log("API Response add cash card:", response);
            return response;
        } catch (error) {
            console.error("Error add add cash card:", error);
            return rejectWithValue(error.response?.data || "حدث خطأ أثناء الإضافة");
        }
    }
);

//ALL USER ADDRESS
export const getAllUserOrder = createAsyncThunk(
    "userOrder/getAll",
    async (queryString = "", { rejectWithValue }) => {
        try {
            const response = await useGetDataToken(`/api/v1/orders${queryString ? `?${queryString}` : ""}`);
            console.log("API Response all user order:", response);
            return response;
        } catch (error) {
            console.error("Error getting all user order:", error);
            return rejectWithValue(error.response?.data || "حدث خطاء غير معروف");
        }
    }
)

//GET SPECIFIC USER ORDER
export const featchOneOrser = createAsyncThunk( "userOrder/getSpecific", async (id, { rejectWithValue }) => {
    try {
        const response = await useGetDataToken(`/api/v1/orders/${id}`);
        console.log("API Response get specific user order:", response);
        return response;
    } catch (error) {
        console.error("Error get specific user order:", error);
        return rejectWithValue(error.response?.data || "حدث خطاء غير معروف");
    }
})

//UPDATE TO PAID
export const updateToPaid = createAsyncThunk(
    "userOrder/updateToPaid",
    async (id, { rejectWithValue }) => {
        try {
            const response = await useUpdateData(`/api/v1/orders/${id}/pay`);
            console.log("API Response update to paid:", response);
            return response;
        } catch (error) {
            console.error("Error update to paid:", error);
            return rejectWithValue(error.response?.data || "حدث خطاء غير معروف");
        }
    }
)

//UPDATE TO DELIVERED
export const updateToDelivered = createAsyncThunk(
    "userOrder/updateToDelivered",
    async (id, { rejectWithValue }) => {
        try {
            const response = await useUpdateData(`/api/v1/orders/${id}/deliver`);
            console.log("API Response update to delivered:", response);
            return response;
        } catch (error) {
            console.error("Error update to delivered:", error);
            return rejectWithValue(error.response?.data || "حدث خطاء غير معروف");
        }
    }
)



const orderSlice = createSlice({
    name: "userOreder",
    initialState: {
        addCashOrder: [],
        getAllUserOrder: [],
        oneUserOrder: [],
        updateToPaid: [],
        updateToDelivered: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        // ADD USER ORDER
        builder.addCase(addCashOrder.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(addCashOrder.fulfilled, (state, action) => {
            state.isLoading = false;
            state.addCashOrder = action.payload;
        })
        .addCase(addCashOrder.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
        // ALL USER ORDER
        builder.addCase(getAllUserOrder.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(getAllUserOrder.fulfilled, (state, action) => {
            state.isLoading = false;
            state.getAllUserOrder = action.payload;
        })
        .addCase(getAllUserOrder.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
        // ONE USER ORDER
        builder.addCase(featchOneOrser.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(featchOneOrser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.oneUserOrder = action.payload;
        })
        .addCase(featchOneOrser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
        
        // UPDATE TO PAID
        builder.addCase(updateToPaid.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(updateToPaid.fulfilled, (state, action) => {
            state.isLoading = false;
            state.updateToPaid = action.payload;
        })
        .addCase(updateToPaid.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });

        // UPDATE TO DELIVERED
        builder.addCase(updateToDelivered.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(updateToDelivered.fulfilled, (state, action) => {
            state.isLoading = false;
            state.updateToDelivered = action.payload;
        })
        .addCase(updateToDelivered.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
    },

});

export default orderSlice.reducer;
