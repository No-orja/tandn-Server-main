import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import notify from "../UseNotifaction"

import { fetcResetPasswordSlice } from "../../Redux/Reduser/AuthReducer";

export default function ResetPasswordPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const OnChangePassword = (e) => {
        setPassword(e.target.value);
    }
    const OnChangeConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    }
    const onSubmit = async (e) => {
        if(password !== confirmPassword){
            notify("كلمة السر غير متطابقة", "warn")
            return
        }
        setLoading(true);
        console.log("EMAIL: ", localStorage.getItem("email"));
        console.log("PASSWORD: ", password);                                                                                                                     
        await dispatch(fetcResetPasswordSlice({ email: localStorage.getItem("email"), newPassword: password }));
        setLoading(false);
    }
    const response = useSelector(state => state.Auth.resetPassword);
    console.log("The response now",response)
    const error = useSelector(state => state.Auth.error);
    console.log("The error data",error)

    useEffect(() => {
        if(!loading){
            if(response){

                if(error){
                    if(error?.status ==="fail"){
                        notify("من فضلك اطلب كود جديد", "error")
                    }
                }else if(response.data?.token){
                    console.log("success resss") 
                    notify("تم تغيير كلمة السر", "success")
                    setTimeout(() => {
                        navigate("/login");
                    }, 1000);
                }
            }
        }
    },[loading, response, error])
    const isDisabled = password === ""|| confirmPassword === "" || loading;

    return [password, OnChangePassword, onSubmit, confirmPassword, OnChangeConfirmPassword, isDisabled] 
}