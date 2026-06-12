import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { featchProductsByCategory, featchProductsByCategoryPage } from "../../Redux/Reduser/ProductSliceReducer";

export default function ViewProductsByCatHook({id}){

    const dispatch = useDispatch()

    useEffect(() => {
        const get = async () => {
            await dispatch(featchProductsByCategory({id: id}))
        }
        get()
    },[id, dispatch])

    const isLaoding = useSelector(state=>state.allProduct.isLoading)
    const error = useSelector(state=>state.allProduct.error)
    const response = useSelector(state=>state.allProduct.peoductsByCategory)

    useEffect(() => {
        // dispatch(featchAllBrand());
        // dispatch(featchAllCategory());
    }, []);

    useEffect(() => {
        if(!isLaoding){
            if(error){
                console.log("error",error)
            }
            else if(response){
                console.log("The res from productsCat", response)
            }
        }
    },[isLaoding, error, response])

    const pagination =  response?.paginationResult
        
    //Pagenation 
    let pageCount = 0 
    if (pagination) {
        pageCount = pagination.numberOfPages;
    }
    
    console.log(pageCount)
    const getPage = (page)=>{
        dispatch(featchProductsByCategoryPage({id: id, limit:20, page:page}))
    } 

    return [response, isLaoding, pageCount,getPage, pagination]
}