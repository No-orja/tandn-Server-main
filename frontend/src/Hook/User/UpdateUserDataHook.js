
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import notify from "../UseNotifaction"
import { updateUserDataSlice } from "../../Redux/Reduser/LoggedUserSliceReducer";

export default function UpdateUserDataHook(){
    const dispatch = useDispatch()
    //تم استخدام السلايس لجلب المعلومات عشان لما اسوي تحديث للاسم فرضًا ،
    //  ما يتحدث باللوكال ستوريج بشكل تلقائي الا لما اسوي خروج
    //---------------------------------------------------------------------
    //تم حل المشكلة عن طريق انه بعد ما يتم الريكويست نسند القيم للكوال
        
    const [show, setShow] = useState(false);
    const handleUpdateClose = () => setShow(false);
    const handleUpdateShow = () => setShow(true);

    let user = []
    if (localStorage.getItem("user") !== null)
        user = JSON.parse(localStorage.getItem("user"))
    console.log("The user",user)
    const [name, setName] = useState(user?.name)
    const [email, setEmail] = useState(user?.email)
    const [phone, setPhone] = useState(user?.phone)

    const onChangeNewName = (e) => {
        setName(e.target.value);
    }

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    }
    const onChangeNewPhone = (e) => {
        setPhone(e.target.value);
    }
    const handleUpdateConfime = async () => {
        await dispatch(updateUserDataSlice({
            name,
            email,
            phone
        }))
        setShow(false);
    }
    const isLoading = useSelector((state) => state.userData.isLoading);
    const error = useSelector((state) => state.userData.error);
    const response = useSelector((state) => state.userData.userInfo);

    useEffect(() => {
        if (!isLoading) {
            if (error) {
                console.log("The error of update",error);
                notify("حدث خطأ في التحديث", "error");
            }
            if(response){
                if(response.status === 200){
                    localStorage.setItem("user",JSON.stringify(response?.data?.data?.user));
                    console.log("The response of update",response);
                    notify("تم التحديث بنجاح 🎉", "success");
                    // setTimeout(() => {
                    //    window.location.reload(); 
                    // },1000)
                }               
            }

        }
    }, [isLoading, response, error]);
    
    return [show,handleUpdateClose, handleUpdateConfime, handleUpdateShow,  onChangeNewName, 
    onChangeEmail , name, email, phone, onChangeNewPhone]
}