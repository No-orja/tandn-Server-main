//HOOKS:
import { useEffect } from "react";

//REDUX
import { useDispatch, useSelector } from "react-redux";
import { featchAllBrand } from "../../Redux/Reduser/BrandSliceReducer";

export default function BrandCardFeatchHook(){

    const dispatch = useDispatch()

    const allBrand = useSelector((state)=>{
        return state.allBrand.alBrand?.data ?? [];
    });
    

    const isLoading = useSelector((state)=>{
        return state.allBrand.isLoading;
    })

    useEffect(() => {
        dispatch(featchAllBrand(6));
    }, []);
    

    return [isLoading, allBrand]
}