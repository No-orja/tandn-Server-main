//HOOKS:
import { useEffect } from "react";

//REDUX
import { useDispatch, useSelector } from "react-redux";
import { featchAllCategory } from "../../Redux/Reduser/CategorySliceReducer";

export default function HomeCategoryHook(){

    const limit = 6
    const dispatch = useDispatch();
    const allCategory = useSelector((state) => {
        return state.allCategory.allCategory?.data ?? [];
    });
    
    const isLoading = useSelector((state)=>{
        return state.allCategory.isLoading;
    })
    
    useEffect(()=>{
        dispatch(featchAllCategory(limit))
    },[dispatch])

    return  [isLoading,allCategory]
}