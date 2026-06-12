import HomeCategory from "../../Component/Home/HomeCategory";
import SliderBootStrap from "../../Component/Home/SliderBootStap";
import CardProductContainer from "../../Component/Product/CardProductContainer";
import DiscountSection from "../../Component/Home/DiscountSection";
import BrandCardFeatch from "../../Component/Brand/BrandCardFeatch"

//Redux
import { featchAllProduct } from "../../Redux/Reduser/ProductSliceReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export default function HomePage(){
    
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(featchAllProduct())
    },[])
    
    const allProduct = useSelector((state)=>state.allProduct.allProduct)

    let item = []
    if(allProduct.data){
        item = allProduct.data.slice(0,4)
    }else{
        item = []
    }

    return(
        <div style={{minHeight:"670px"}}>

            <SliderBootStrap/>
            <HomeCategory/>     
            <CardProductContainer products={item} title="الاكثر مبيعا" btnTitle="المزيد" pathText="/products"/>   
            <DiscountSection/>
            <CardProductContainer products={item} title="الاكثر تقيما" btnTitle="المزيد" pathText="/products"/>  
            <BrandCardFeatch title="الماركت الاكثر شهرة" btnTitle="المزيد" pathText="/allBrand"/>
       
        </div>
    )
}