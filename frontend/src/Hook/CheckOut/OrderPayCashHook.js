import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { featchOneAddress } from "../../Redux/Reduser/UserAdressSliceReducer";
import notify from "../UseNotifaction";
import { addCashOrder } from "../../Redux/Reduser/CheckOutSliceReducer";
import { useNavigate } from "react-router-dom";

export default function OrderPayCashHook() {
    const dispatch = useDispatch();
    const navigator = useNavigate();
    const [choosedId, setChoosedId] = useState(null);
    const [details, setDetails] = useState("");
    const [phone, setPhone] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [cartId, setCartId] = useState("");

    const handelChooseAddress = (e) => {
        console.log(e.target.value)
        setChoosedId(e.target.value)
        get(e.target.value)
    }

    const oneAddress = useSelector((state) => state.userAddress.getSpecificUserAddress);

    const get=async(id)=>{
       await dispatch(featchOneAddress(id));
    }

    useEffect(() => {    
        if(oneAddress){
            setDetails(oneAddress.data?.details)
            setCity(oneAddress.data?.city)
            setPostalCode(oneAddress.data?.postalCode)
            setPhone(oneAddress.data?.phone)
        }else{
            setDetails("")
            setCity("")
            setPostalCode("")
            setPhone("")
        }
    }, [oneAddress])

    const getItem = useSelector(state => state.Cart.cartItems);
    useEffect(() => {
        if(getItem){
            setCartId(getItem?.data?._id)
        }        
    },[getItem])

    const createOrederCash = async () =>{
        if(!choosedId){
            notify("من فضلك اختر عنوان", "warn");
            return
        }
        await dispatch(addCashOrder({id:cartId,shippingAddress:{details,city,postalCode,phone}}))
    }
    const isLoading = useSelector((state) => state.userOreder.isLoading);
    const error = useSelector((state) => state.userOreder.error);
    const addCashOrderRes = useSelector((state) => state.userOreder.addCashOrder);

    useEffect(() => {
        if(!isLoading){
            if(error){
                notify("لا توجد منجات ", "error")
            }else if(addCashOrderRes && addCashOrderRes.status === 201){
                notify("تمت العملية بنجاخا", "success")
                setTimeout(()=>{
                    navigator("/user/allorders")
                },2000)
            }
        }
    }, [isLoading, error])

    return [handelChooseAddress, createOrederCash]
}