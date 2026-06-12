import { useDispatch, useSelector } from "react-redux";
import { featchAllBrand } from "../../Redux/Reduser/BrandSliceReducer";
import { featchAllCategory } from "../../Redux/Reduser/CategorySliceReducer";
import { useEffect, useState } from "react";
import RiewSearchProductHook from "../Product/RiewSearchProductHook";

export default function SideBarSearchHook(){
    const [allProduct,item,pagination, onPress, getProduct, seartch, isLoading]  = RiewSearchProductHook()
    const [seleckedCategory, setSeleckedCategory] = useState([]);
    const [seleckedBrand, setSeleckedBrand] = useState([]);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(featchAllBrand());
        dispatch(featchAllCategory());
    }, []);

    const allCategory = useSelector((state) => state.allCategory.allCategory?.data ?? []);
    const allBrand = useSelector((state) => state.allBrand.alBrand?.data ?? []);

    const clickCategory = (e) => {
        let value = e.target.value
        if(value === "0"){
            setSeleckedCategory([])
            return
        }else{
            if(e.target.checked === true){
                setSeleckedCategory([...seleckedCategory, value])
            }
            else if(e.target.checked === false){
                setSeleckedCategory(seleckedCategory.filter((e) => e !== value))
            }
        }
    }
    const clickBrand = (e) => {
        let value = e.target.value;
        
        if (value === "0") {
            setSeleckedBrand([]); 
            return;
        }
        else{
            if (e.target.checked) {
                setSeleckedBrand([...seleckedBrand, value]);
            } else {
                setSeleckedBrand(seleckedBrand.filter((e) => e !== value));
            }    
        }
    };

    // const getQuert = () => {
    //     let quertCategory = seleckedCategory.map(value => "category[in][]="+value).join("&")
    //     let quertBrand = seleckedBrand.map(value => "brand[in][]="+value).join("&")
    //     return quertCategory + "&" + quertBrand
    // }

    useEffect(()=>{
        const newQuery = seleckedCategory.map(value => "category[in][]="+value).join("&")
        localStorage.setItem("quertCategory",newQuery )
        setTimeout(() => {
            getProduct("");
        }, 100);
        
    },[seleckedCategory])

    useEffect(()=>{
        const newQuery = seleckedBrand.map(value => "brand[in][]="+value).join("&")
        localStorage.setItem("quertBrand",newQuery )
        setTimeout(() => {
            getProduct("");
        }, 100);
        
    },[seleckedBrand])

    

    
    console.log("seleckedCategory", seleckedCategory)
    console.log("seleckedBrand", seleckedBrand)
    
    return [allCategory, allBrand, clickCategory, clickBrand]
}