import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchForgetPasswordSlice } from "../../Redux/Reduser/AuthReducer";
import notify from "../UseNotifaction"
import { useNavigate } from "react-router-dom";

export default function ForgetPasswordHook() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    }
    const onSubmit = async () => {
        setLoading(true);
        localStorage.setItem("email", email);
        await dispatch(fetchForgetPasswordSlice({ email }));
        setLoading(false);
    }
    const response = useSelector(state => state.Auth.forgetPassword);
    console.log("The response before solve",response)
    console.log(response.data)
    const error = useSelector(state => state.Auth.error);
    console.log("The error data",error)

    useEffect(() => {
        if(!loading){
            console.log("!loading")
            if(error){
                console.log("error inside if statment",error)
                if(error?.status ==="fail"){ 
                    notify(error?.message, "error")
                }   
            }
            else if(response){
                console.log("response inside if statment",response)
                
                if(response?.data?.status === "Success"){                   
                    notify(response.data.message, "success")
                    setTimeout(() => {
                        navigate("/user/verify-code")
                    }, 2000);
                }
            }
        }
    }, [loading]);

    const isDisabled = email === '' || loading;
    return [email, onChangeEmail, onSubmit, isDisabled]
}