import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { featchAddToCart } from "../../Redux/Reduser/CartSliceReducer";
import notify from "../UseNotifaction";
export default function AddToCartHook(productId, products){

    //ارسلت البرودكت كامل عشان لما ما يكون في الوان متاحة ما يسبب خلل
    console.log("The product", products)
    const dispatch = useDispatch();

    const [indexColor, setIndexColor] = useState();
    const [color, setColor] = useState('');

    function colorClick(index, color){
        setIndexColor(index);
        setColor(color);
        console.log("Index and color", index, color)   
    }
    const loading = useSelector(state => state.Cart.isLoading);

    const handelAddCliced = async () => {
        console.log("The color", color)
        if(products.availableColors.length >= 1){
            if(color === ''){
                notify("يرجى اختيار اللون", "error");
                return
            }
        }else{
            setColor('');
        }
        await dispatch(featchAddToCart({
            productId,
            color
        }));
    }

    const response = useSelector(state => state.Cart.createCart);
    console.log("The response before solve",response)
    const error = useSelector(state => state.Cart.error);

    useEffect(() => {
        if(!loading){
            if(error){
                console.log("ERROR ON TOKEN")
            }else if(response){
                if(response?.data?.status === "success"){
                    notify(response?.data?.message, "success")
                }
            }
        }

    },[loading, error, response])

    
    return [indexColor, colorClick, handelAddCliced]

}