import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {useGetData} from "../../Hooks/UseGetData";
import {useDeleteData} from "../../Hooks/UseDeleteData";
import {useUpdateDataWithImage} from "../../Hooks/UseUpdateData"
import { useInsertDataWithImage } from "../../Hooks/UseInsertData";


//GET ALL PRODUCT
export const featchAllProduct = createAsyncThunk("GET_ALL_PRODUCT", async (limit)=>{
    try{
        const response = await useGetData(`/api/v1/products?limit=${limit}`)
        console.log("API Response All product:", response); 
        return response;        
    }catch(error){
        console.log("Error show all product", error)
        throw error
    }
})

//GET ALL PRODUCT
export const featchAllProductPage = createAsyncThunk("GET_ALL_PRODUCT_Page", async ({limit, page})=>{
    try{
        const response = await useGetData(`/api/v1/products?limit=${limit}&page=${page}`)
        console.log("API Response All product page:", response); 
        return response;        
    }catch(error){
        console.log("Error show all product", error)
        throw error
    }
})

//GET PRODUCTS SEARCH
export const featchProductSearch = createAsyncThunk("GET_SEARTCH_PRODUCT", async (queryString) => {
    try {
        const response = await useGetData(`/api/v1/products?${queryString}`);
        console.log("API Response (Search):", response);
        return response;
    } catch (error) {
        console.log("Error fetching specific product via search", error);
        throw error;
    }
});

//ADD PRODUCT
export const featchAddProduct = createAsyncThunk("ADD_PRODUCT", async (formData) => {
    try {
        const response = await useInsertDataWithImage(`/api/v1/products`, formData);
        console.log("API Response Add Product:", response);
        return response;
    } catch (error) {
        console.error("Error adding product:", error);
        throw error;
    }
});

export const featchGittingSpecificProduct = createAsyncThunk("GET_SPECIFIC_PRODUCT", async (id)=>{
    try{
        const response = await useGetData(`/api/v1/products/${id}`)
        console.log("API Response Specific Product:", response);
        return response
    }catch(error){
        console.error("Error getting specific product", error)
        throw error
    }
})
//GET PRODUCT LIKE
export const featchGittingProductLike = createAsyncThunk("GET_PRODUCT_LIKE", async (id)=>{
    try{
        const response = await useGetData(`/api/v1/products?category=${id}`)
        console.log("API Response Product like:", response);
        return response
    }catch(error){
        console.error("Error getting product like:", error)
        throw error
    }
})

//DELETE PRODUCT
export const featchDeletingProduct = createAsyncThunk("DELETE_PRODUCT", async (id, thunkAPI) => {
    try {
        const response = await useDeleteData(`/api/v1/products/${id}` );
        console.log("API Response Delete Product:", response); 
        return response; 
    } catch (error) {
        console.error("Error deleting product:", error);
        return thunkAPI.rejectWithValue(error.message);
    }
});

//UPDATE PRODUCT
export const featchUpdatingProduct = createAsyncThunk("UPDATE_PRODUCT", async ({ id, formData }, thunkAPI) => {
    try {
        const response = await useUpdateDataWithImage(`/api/v1/products/${id}`, formData);
        console.log("API Response Update Product:", response); 
        return response; 
    } catch (error) {
        console.error("Error updating product:", error);
        return thunkAPI.rejectWithValue(error.message);
    }
});

//GET PRODUCTS BY CATEGORY
export const featchProductsByCategory = createAsyncThunk("PRODUCTS_BY_CATEGORY", async ({ id, limit = 20}, thunkAPI) => {
    try {
        const response = await useGetData(`/api/v1/products?category=${id}&&limit=${limit}`);
        console.log("API Response Products By Category:", response); 
        return response; 
    } catch (error) {
        console.error("Error getting products by category:", error);
        return thunkAPI.rejectWithValue(error.message);
    }
});
//GET PRODUCTS BY CATEGORY
export const featchProductsByCategoryPage = createAsyncThunk("PRODUCTS_BY_CATEGORY_page", async ({ id, limit = 20, page = 1 }, thunkAPI) => {
    try {
        const response = await useGetData(`/api/v1/products?category=${id}&limit=${limit}&page=${page}`);
        console.log("API Response Products By Category page:", response); 
        return response; 
    } catch (error) {
        console.error("Error getting products by category page:", error);
        return thunkAPI.rejectWithValue(error.message);
    }
});
//GET PRODUCTS BY BRAND
export const featchProductsByBrandPage = createAsyncThunk("PRODUCTS_BY_BRAND_PAGE", async ( id,thunkAPI) => {
    try {
        const response = await useGetData(`/api/v1/products?brand=${id}`);
        console.log("API Response Products By brand page:", response); 
        return response; 
    } catch (error) {
        console.error("Error getting products by brand page:", error);
        return thunkAPI.rejectWithValue(error.message);
    }
});

const allCategoryApiSlice = createSlice({
    name: "allProduct",
    initialState:{
        allProduct:[],
        searchResults: [],
        peoductsByCategory:[],
        peoductsByCategoryPage:[],
        productByBrandPage: [],
        updateProduct:[],
        deleteProduct:[],
        selectedProduct: null,
        isLoading: false,
        error: null
    },
    extraReducers (builder){                                                               
        //All
        builder.addCase(featchAllProduct.pending,(state, action)=>{
            state.isLoading = true
        }).addCase(featchAllProduct.fulfilled, (state, action)=>{
            state.allProduct = action.payload;
            state.isLoading = false
            state.error = null;
        }).addCase(featchAllProduct.rejected, (state, action)=>{
            state.isLoading = false 
            state.error = action.payload

        })

        //Search
        builder.addCase(featchProductSearch.pending, (state) => {
            state.isLoading = true;
        }).addCase(featchProductSearch.fulfilled, (state, action) => {
            state.searchResults = action.payload;
            state.isLoading = false;
            state.error = null;
        }).addCase(featchProductSearch.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload

        });


        //All Page
        builder.addCase(featchAllProductPage.pending,(state, action)=>{
            state.isLoading = true
        }).addCase(featchAllProductPage.fulfilled, (state, action)=>{
            state.allProduct = action.payload;
            state.isLoading = false
            state.error = null
        }).addCase(featchAllProductPage.rejected, (state, action)=>{
            state.isLoading = false
            state.error = action.payload
        })

        //Add
        .addCase(featchAddProduct.pending,(state, action)=>{
            state.isLoading = true
        }).addCase(featchAddProduct.fulfilled, (state, action)=>{
            state.allProduct = action.payload;
            state.isLoading = false
            state.error = null
        }).addCase(featchAddProduct.rejected, (state, action)=>{
            state.isLoading = false
            state.error = action.payload
        })

        //Getting specific product
        .addCase(featchGittingSpecificProduct.pending,(state, action)=>{
            state.isLoading = true
        }).addCase(featchGittingSpecificProduct.fulfilled, (state, action)=>{
            state.selectedProduct = action.payload;
            state.isLoading = false
            state.error = null
        }).addCase(featchGittingSpecificProduct.rejected, (state, action)=>{
            state.isLoading = false
            state.error = action.payload
        })
        

        //Getting products like 
        .addCase(featchGittingProductLike.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(featchGittingProductLike.fulfilled, (state, action) => {
            state.productsByCategory = action.payload;
            state.isLoading = false;
            state.error = null;
        }).addCase(featchGittingProductLike.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload
        });

        //Delete product
        builder.addCase(featchDeletingProduct.pending, (state) => {
            state.isLoading = true;
        }).addCase(featchDeletingProduct.fulfilled, (state, action) => {
            console.log("Delete Response:", action.payload);
            if (action.payload.status === 200) { // التحقق من نجاح الحذف
                console.log("Product deleted successfully!");
                state.deleteProduct = action.payload
            }
            state.isLoading = false;
            state.error = null;
        }).addCase(featchDeletingProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload
        });

        //Update product
        builder.addCase(featchUpdatingProduct.pending, (state) => {
            state.isLoading = true;
        }).addCase(featchUpdatingProduct.fulfilled, (state, action) => {
            console.log("Update Response:", action.payload);
            if (action.payload.status === 200) { // التحقق من نجاح الحذف
                console.log("Product deleted successfully!");
                state.updateProduct = action.payload
            }
            state.isLoading = false;
            state.error = null;
        }).addCase(featchUpdatingProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload
        });

        //PRODUCTS BY CATEGORY
        builder.addCase(featchProductsByCategory.pending, (state) => {
            state.isLoading = true;
        }).addCase(featchProductsByCategory.fulfilled, (state, action) => {
            state.peoductsByCategory = action.payload
            state.isLoading = false;
            state.error = null;
        }).addCase(featchProductsByCategory.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload
        });
        //PRODUCTS BY CATEGORY
        builder.addCase(featchProductsByCategoryPage.pending, (state) => {
            state.isLoading = true;
        }).addCase(featchProductsByCategoryPage.fulfilled, (state, action) => {
            // الصفحة تقرا من peoductsByCategory لذلك نكتب نتيجة الصفحة الجديدة فيها
            state.peoductsByCategory = action.payload
            state.isLoading = false;
            state.error = null;
        }).addCase(featchProductsByCategoryPage.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload
        });

        //PRODUCTS BY BRAND
        builder.addCase(featchProductsByBrandPage.pending, (state) => {
            state.isLoading = true;
        }).addCase(featchProductsByBrandPage.fulfilled, (state, action) => {
            state.productByBrandPage = action.payload
            state.isLoading = false;
            state.error = null;
        }).addCase(featchProductsByBrandPage.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload
        });    
    }

})

export default allCategoryApiSlice.reducer