import { useNavigate } from "react-router-dom";
import {updateUserPasswordSlice} from "../../Redux/Reduser/LoggedUserSliceReducer"
import notify from "../UseNotifaction";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
export default function UpdateUserPassHook(){

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('');

    const onChangePassword = (e) => {
        setOldPassword(e.target.value);
    }
    const onChangeNewPassword = (e) => {    
        setNewPassword(e.target.value);
    }
    const onChangeNewPasswordConfirm = (e) => {
        setNewPasswordConfirm(e.target.value);
    }

    const body = {
        currentPassword:oldPassword,
        password: newPassword,
        passwordConfirm: newPasswordConfirm
    }
    const handleSavePassword = async()=>{
        if (newPassword !== newPasswordConfirm) {
            notify("كلمة المرور غير متطابقة", "error");
            return;
        }
        if(newPassword === "" || newPasswordConfirm === "" || oldPassword === "" ){
            notify("من فضلك ادخل كلمة المرور", "error");
            return;
        }
        await  dispatch(updateUserPasswordSlice(body));
        

    }

    const error = useSelector(state => state.userData.error);
    const isLoading = useSelector(state => state.userData.isLoading);
    const response = useSelector(state => state.userData.updatePassword);

    useEffect(() => {
        if(!isLoading){
            if(error){
                if(error?.errors[0]){
                    notify(error?.errors[0]?.msg, "error");
                }
            }
            else if(response && !error){
                if(response.status === 200){
                    console.log("The res after update password",response)

                    setTimeout(() => {
                        localStorage.removeItem("token")
                        navigate("/login")
                    },1500)
                }
            }
        }
    },[isLoading, response, error] )

 
    return[oldPassword,newPassword, newPasswordConfirm,onChangePassword, 
        onChangeNewPassword , onChangeNewPasswordConfirm , handleSavePassword]
}