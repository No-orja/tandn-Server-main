//HOOKS:
import { useEffect } from "react";

//REDUX
import { useDispatch, useSelector } from "react-redux";
import { featchAllCategory } from "../../Redux/Reduser/CategorySliceReducer";

export default function AllCategoryHook(){
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(featchAllCategory(12)); 
    }, []);

    const categoryResponse = useSelector(state=> state.allCategory.allCategory)
    const isLoading = useSelector(state=> state.allCategory.isLoading)

    let allCategory= []
    if(categoryResponse){
        allCategory = categoryResponse.data
    }
    
    return [allCategory, isLoading]
}