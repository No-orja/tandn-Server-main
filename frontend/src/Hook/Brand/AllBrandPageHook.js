import { useDispatch, useSelector } from "react-redux";
import { featchAllBrand, featchAllBrandPage } from "../../Redux/Reduser/BrandSliceReducer";
import { useEffect } from "react";

export default function AllCategoryPageHook(){

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(featchAllBrand());
    }, [dispatch]);

    

    const allBrand = useSelector((state)=>{
        return state.allBrand.alBrand?.data ?? [];
    })
    const isLoading = useSelector((state)=>{
        return state.allBrand.isLoading;
    })

    //Pagenation 
    let pageCount = 0 
    if (allBrand.paginationResult) {
        pageCount = allBrand.paginationResult.numberOfPages;
    }
    
    const getPage=(page)=>{
        dispatch(featchAllBrandPage(page))
    }   

    return [pageCount, getPage, allBrand, isLoading]
}