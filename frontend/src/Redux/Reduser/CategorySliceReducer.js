import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {useGetData} from "../../Hooks/UseGetData";
import { useInsertDataWithImage } from "../../Hooks/UseInsertData";

//GET ALL CATEGORY
export const featchAllCategory = createAsyncThunk("GET_ALL_CATEGORY",async (limit)=>{
    //const response = await baseURL.get("/api/v1/categories") 
    
    const response = await useGetData(`/api/v1/categories?limit=${limit}`)
    console.log("API Response All Category:", response); 
    return response;

})


//GET SPICIFIC CATEGORY
export const featchSpicificCategory = createAsyncThunk("GET_SPICIFIC_CATEGORY",async (id)=>{

    const response = await useGetData(`/api/v1/categories/${id}`)
    console.log("API Response Spicific Category :", response); 
    return response;
 
})

//CREATE CATEGORY
export const featchAddCategory = createAsyncThunk("CREATE_CATEGORY", async (formData)=>{

    const response = await useInsertDataWithImage(`/api/v1/categories`, formData)
    console.log("API Response Add Category:", response); 
    return response

})

//GET ALL CATEGORY WITH PAGINATION
export const featchAllCategoryPage = createAsyncThunk("GET_ALL_CATEGORY_PAGE",async ({page, limit})=>{
    try{
    const response = await useGetData(`/api/v1/categories?limit=${limit}&page=${page}`)
    console.log("API Response All Category Page:", response); 
    return response;

    }catch(error){
        console.log("Error show all category page", error)
    }        
})

const allCategoryApiSlice = createSlice({
    name: "allCategory",
    initialState:{
        allCategory:[],
        allCategoryPage:[],
        spicificCategory:{},
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
    
    }
})
export default allCategoryApiSlice.reducer