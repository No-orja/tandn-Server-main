import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { featchAllCart } from "../../Redux/Reduser/CartSliceReducer";

export default function GetAllUserHook() {

    const [couponNameUsed, setCopuonNameUsed] = useState("")
    const [totalAfterDiscount, setTotalAfterDiscount] = useState(0)
    const [nymberOfItems, setNumberOfItems] = useState(0)

    const  dispatch = useDispatch();

    const loading = useSelector(state => state.Cart.isLoading);
    const getItem = useSelector(state => state.Cart.cartItems);
    const error = useSelector(state => state.Cart.error); 

    useEffect(() => { 
        const get= async()=>{
            await dispatch(featchAllCart())
        }
        get()
    },[dispatch])
    

    useEffect(() => { 
        if(!loading){
             if(getItem){
                console.log("The get item", getItem.numOfCartItems)
                setNumberOfItems(getItem.numOfCartItems)
                if(getItem.data?.coupon ){
                    setCopuonNameUsed(getItem.data?.coupon)
                    console.log("THE COUPONE INFO", getItem.data.coupon)
                }
                if(getItem.data?.totalAfterDiscount){
                    setTotalAfterDiscount(getItem.data?.totalAfterDiscount)
                    console.log("The total after discount", getItem.data.totalAfterDiscount)
                }
            }            
        }

    },[loading, getItem])

    return [loading, getItem,couponNameUsed,totalAfterDiscount, nymberOfItems]
}