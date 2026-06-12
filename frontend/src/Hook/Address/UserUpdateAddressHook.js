import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateUserAddress } from "../../Redux/Reduser/UserAdressSliceReducer";
import {  useEffect, useState } from "react";
import notify from "../UseNotifaction";

export default function UserUpdateAddressHook(){

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();

    const [alias, setAlias] = useState('')
    const [detalis, setDetalis] = useState('')
    const [phone, setPhone] = useState('')

    const onChangeAlias = (event) => {
        event.persist();
        setAlias(event.target.value)
    }

    const onChangeDetalis = (event) => {
        event.persist();
        setDetalis(event.target.value)

    }

    const onChangePhone = (event) => {
        event.persist();
        setPhone(event.target.value)

    }

    const body = {
        alias: alias,
        details: detalis,
        phone : phone
    }
    
    const onUpdate = async () => {
        await dispatch(updateUserAddress({ id, body }))
    }

    const updateAddress = useSelector((state) => state.userAddress.updateAddress);
    const isLoading = useSelector((state) => state.userAddress.isLoading);
    const error = useSelector((state) => state.userAddress.error);

    useEffect(() => {
        if(!isLoading){
            if(error){
                console.log("error inside if statment",error)
                notify("حدث خطاء في التحديث", "error");
            }
            if(updateAddress){
                if(updateAddress[0]?.data?.status === "success"){
                    notify(updateAddress[0]?.data?.message,"success")
                    setTimeout(() => {
                        navigate("/user/addresses")
                    },1500)
                }
            }
        }
    },[isLoading, updateAddress, error, navigate])

    return [onUpdate, alias, detalis, phone, onChangeAlias, onChangeDetalis, onChangePhone]
}