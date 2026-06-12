import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { featchApplyCoupon } from "../../Redux/Reduser/CartSliceReducer"
import notify from "../UseNotifaction"
export default function ApplyCopuonHook(){
    const dispatch = useDispatch()
    const [couponName, setCopuonName] = useState("")

    const handleChangeCopon = (e) => {
        setCopuonName(e)
    }

    const handleConfirme =async () =>{
        await dispatch(featchApplyCoupon({couponName}))
    }
    const isLoading = useSelector((state) => state.Cart.isLoading);
    const error = useSelector((state) => state.Cart.error);
    const applyCouponResponse = useSelector((state) => state.Cart.applyCoupon);
    useEffect(() => {
        if(!isLoading){
            if(error){
                if(error.status === "fail"){
                    console.log("The erorr :",error)
                }
            }else if(applyCouponResponse){
                if(applyCouponResponse.status === 200){
                    notify("تمت العملية بنجاخا", "success")
                    setTimeout(()=>{
                        window.location.reload(false)
                    },2000)
                }
            }
        }

    },[isLoading, applyCouponResponse, error])

    const isDisabled = couponName === ""


    return [couponName, handleChangeCopon,handleConfirme, isDisabled]
}