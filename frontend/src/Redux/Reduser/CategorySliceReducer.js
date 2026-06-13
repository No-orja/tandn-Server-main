import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {useGetData} from "../../Hooks/UseGetData";
import { useInsertDataWithImage } from "../../Hooks/UseInsertData";
import { useDeleteDataToken } from "../../Hooks/UseDeleteData";
import { useUpdateDataWithImage } from "../../Hooks/UseUpdateData";

//GET ALL CATEGORY
export const featchAllCategory = createAsyncThunk("GET_ALL_CATEGORY",async (limit = 20)=>{
    //const response = await baseURL.get("/categories") 
    
    const response = await useGetData(`/categories?limit=${limit}`)
    console.log("API Response All Category:", response); 
    return response;

})


//GET SPICIFIC CATEGORY
export const featchSpicificCategory = createAsyncThunk("GET_SPICIFIC_CATEGORY",async (id)=>{

    const response = await useGetData(`/categories/${id}`)
    console.log("API Response Spicific Category :", response); 
    return response;
 
})

//CREATE CATEGORY
export const featchAddCategory = createAsyncThunk("CREATE_CATEGORY", async (formData)=>{

    const response = await useInsertDataWithImage(`/categories`, formData)
    console.log("API Response Add Category:", response); 
    return response

})

//GET ALL CATEGORY WITH PAGINATION
export const featchAllCategoryPage = createAsyncThunk("GET_ALL_CATEGORY_PAGE",async ({page, limit})=>{
    try{
    const response = await useGetData(`/categories?limit=${limit}&page=${page}`)
    console.log("API Response All Category Page:", response); 
    return response;

    }catch(error){
        console.log("Error show all category page", error)
    }        
})

//DELETE CATEGORY (admin)
export const featchDeleteCategory = createAsyncThunk("DELETE_CATEGORY", async (id, { rejectWithValue })=>{
    try{
        const response = await useDeleteDataToken(`/categories/${id}`)
        console.log("API Response Delete Category:", response);
        return response;
    }catch(error){
        console.log("Error delete category", error)
        return rejectWithValue(error.response?.data || { message: error.message });
    }
})

//UPDATE CATEGORY (admin) — multipart (name + optional image). Returns the body.
export const featchUpdateCategory = createAsyncThunk("UPDATE_CATEGORY", async ({ id, formData }, { rejectWithValue })=>{
    try{
        const response = await useUpdateDataWithImage(`/categories/${id}`, formData)
        console.log("API Response Update Category:", response);
        return response;
    }catch(error){
        console.log("Error update category", error)
        return rejectWithValue(error.response?.data || { message: error.message });
    }
})

const allCategoryApiSlice = createSlice({
    name: "allCategory",
    initialState:{
        allCategory:[],
        allCategoryPage:[],
        spicificCategory:{},
        deleteCategory:[],
        updateCategory:[],
        error: null,
        isLoading:false
    },
    extraReducers (builder){
        builder.addCase(featchAllCategory.pending,(state, action)=>{
            state.isLoading = true
        }).addCase(featchAllCategory.fulfilled, (state, action)=>{
            state.allCategory = action.payload;
            state.isLoading = false
        }).addCase(featchAllCategory.rejected, (state, action)=>{
            state.isLoading = false
        })
        
        .addCase(featchAddCategory.pending,(state, action)=>{
            state.isLoading = true
        }).addCase(featchAddCategory.fulfilled, (state, action)=>{
            state.allCategory = action.payload;
            state.isLoading = false
        }).addCase(featchAddCategory.rejected, (state, action)=>{
            state.isLoading = false
        })

        .addCase(featchSpicificCategory.pending,(state, action)=>{
            state.isLoading = true
        }).addCase(featchSpicificCategory.fulfilled, (state, action)=>{
            state.spicificCategory = action.payload;
            state.isLoading = false
        }).addCase(featchSpicificCategory.rejected, (state, action)=>{
            state.isLoading = false
        })

        //Category with pagination (more)
        .addCase(featchAllCategoryPage.pending,(state, action)=>{
            state.isLoading = true
        }).addCase(featchAllCategoryPage.fulfilled, (state, action)=>{
            state.allCategoryPage = action.payload;
            state.isLoading = false
            state.error = null;
        }).addCase(featchAllCategoryPage.rejected, (state, action)=>{
            state.isLoading = false
            state.error = action.payload
        })

        //Delete
        .addCase(featchDeleteCategory.pending,(state, action)=>{
            state.isLoading = true
        }).addCase(featchDeleteCategory.fulfilled, (state, action)=>{
            state.deleteCategory = action.payload;
            state.isLoading = false
            state.error = null;
        }).addCase(featchDeleteCategory.rejected, (state, action)=>{
            state.isLoading = false
            state.error = action.payload
        })

        //Update
        .addCase(featchUpdateCategory.pending,(state, action)=>{
            state.isLoading = true
        }).addCase(featchUpdateCategory.fulfilled, (state, action)=>{
            state.updateCategory = action.payload;
            state.isLoading = false
            state.error = null;
        }).addCase(featchUpdateCategory.rejected, (state, action)=>{
            state.isLoading = false
            state.error = action.payload
        })

    }
})
export default allCategoryApiSlice.reducer