import { useState, useEffect } from "react";
import notify from "../UseNotifaction"
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchVerifyResetCodeSlice } from "../../Redux/Reduser/AuthReducer";

export default function VerifyResetCodeHook(){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    
    const OnChangeCode = (e) => {
        setCode(e.target.value);
    }

    const onSubmit = async () => {
        if(code === ""){
            notify("من فضلك ادخل الكود", "warn")
            return
        }
        setLoading(true);
        await dispatch(fetchVerifyResetCodeSlice({"resetCode":code}))
        setLoading(false);
    }

    const response = useSelector(state => state.Auth.verifyCode);
    const error = useSelector(state => state.Auth.error);
    console.log("The error data",error)
    console.log("The response now",response)

    useEffect(()=>{
        if(!loading){
            if(response){
                if(error){
                    if(error?.status ==="fail"){
                        notify(error?.message, "error")
                    }
                }else if(response?.data?.status === "Success"){
                    notify("تم التحقق من الكود", "success")
                    setTimeout(() => {
                        navigate("/user/reset-password")
                    }, 1000);
                }
            }
        }
    },[loading, response, error])

    const isDisabled = code === "" || loading;

    return [code, OnChangeCode, onSubmit, isDisabled]
}