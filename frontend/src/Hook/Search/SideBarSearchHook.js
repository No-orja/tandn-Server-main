import { useDispatch, useSelector } from "react-redux";
import { featchAllBrand } from "../../Redux/Reduser/BrandSliceReducer";
import { featchAllCategory } from "../../Redux/Reduser/CategorySliceReducer";
import { useEffect, useState } from "react";
import RiewSearchProductHook from "../Product/RiewSearchProductHook";

export default function SideBarSearchHook(){
    const [allProduct,item,pagination, onPress, getProduct, seartch, isLoading]  = RiewSearchProductHook()
    const [seleckedCategory, setSeleckedCategory] = useState([]);
    const [seleckedBrand, setSeleckedBrand] = useState([]);
    const [priceFrom, setPriceFrom] = useState("");
    const [priceTo, setPriceTo] = useState("");

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

    // Price range: backend apiFeatures converts gte/lte -> $gte/$lte, so this
    // filters correctly. Category/brand use [$in][] so the backend passes the
    // operator straight through to Mongo (it only rewrites gte/gt/lte/lt).
    const onChangePriceFrom = (e) => setPriceFrom(e.target.value);
    const onChangePriceTo = (e) => setPriceTo(e.target.value);

    useEffect(()=>{
        // [$in][] => Mongo $in; [in][] (the old code) was NOT translated and matched nothing
        const newQuery = seleckedCategory.map(value => "category[$in][]="+value).join("&")
        localStorage.setItem("quertCategory",newQuery )
        const t = setTimeout(() => { getProduct(""); }, 100);
        return () => clearTimeout(t);
    },[seleckedCategory])

    useEffect(()=>{
        const newQuery = seleckedBrand.map(value => "brand[$in][]="+value).join("&")
        localStorage.setItem("quertBrand",newQuery )
        const t = setTimeout(() => { getProduct(""); }, 100);
        return () => clearTimeout(t);
    },[seleckedBrand])

    useEffect(()=>{
        const parts = [];
        if (priceFrom !== "") parts.push("price[gte]="+priceFrom);
        if (priceTo !== "") parts.push("price[lte]="+priceTo);
        localStorage.setItem("queryPrice", parts.join("&"));
        const t = setTimeout(() => { getProduct(""); }, 500);
        return () => clearTimeout(t);
    },[priceFrom, priceTo])

    console.log("seleckedCategory", seleckedCategory)
    console.log("seleckedBrand", seleckedBrand)

    return [allCategory, allBrand, clickCategory, clickBrand, priceFrom, priceTo, onChangePriceFrom, onChangePriceTo]
}