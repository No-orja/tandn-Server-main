import { useEffect, useState } from 'react';
import notify from "../UseNotifaction"
import { useDispatch, useSelector } from 'react-redux';
import {fetchLoginSlice } from '../../Redux/Reduser/AuthReducer';
import { useNavigate } from 'react-router-dom';


export default function RegisterHook() {

    const dispatch = useDispatch();
    const navigator = useNavigate();
    
    const [email, setEmail] = useState('admin@gmail.com');
    const [password, setPassword] = useState('pass123');

    //Handel error
    const [formErrors, setFormErrors] = useState({});

    const onEmailChange = (e) => {
        setEmail(e.target.value);
        removeError("email");
    };

    const onPasswordChange = (e) => {
        setPassword(e.target.value);
        removeError("password");
    };

    const removeError = (field) => {
        setFormErrors((prevErrors) => {
            const updatedError = { ...prevErrors };
            delete updatedError[field];
            return updatedError;
        })
    }

    //Check if the string contains numbers
    // let str = "Hello, I am 25 years old.";
    // let hasNumbers = /\d/.test(str);
    // console.log(hasNumbers); Outputs: true

    let passwordCheck = password;
    let hasNumbers = /\d/.test(passwordCheck);
    console.log(hasNumbers); // Outputs: true

    const onSubmit = async ()=>{
        await dispatch(fetchLoginSlice({ email, password}))
    }

    const response = useSelector(state => state.Auth.login)
    const error = useSelector(state => state.Auth.error);
    const isLoading = useSelector(state => state.Auth.isLoading);

    useEffect(() => {    
        if (!isLoading) {
            if (response?.data?.token && !error) {

                console.log("Login Response:", response);
                // حفظ بيانات المستخدم والتوكن
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("user", JSON.stringify(response.data.data));
                notify("تم تسجيل الدخول بنجاح", "success");
    
                setTimeout(() => {  
                    window.location.href = "/"; 
                    //هي في داحل الراوت ولكن رغم انها في داخله لو استخدمت النافيجيت واسوي تسجيل دخول ما بسوي ريفريش للنافبار
                    //  لهيك تم استخدام هاي الخاصية عشان يسوي ريفريش لكل الصفحة                    
                }, 1000);
            }
    
            // ✅ لا تحذف `user` في حال عدم وجود `response` إلا إذا كان هناك خطأ فعلي
            if (error && error.message) {
                console.log("Login Error:", error.message);
                if (error.message === "Incorrect email or password") {
                    notify("البريد الإلكتروني أو كلمة المرور غير صحيحة", "error");
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                }
            }
        }
    }, [isLoading, response, error]);

    useEffect(() => {
        if (error?.errors?.length > 0) {
            const newErrors = {};
            error.errors.forEach(err => {
                newErrors[err.param] = err.msg; // 💡 `err.param` هو الحقل الذي يحتوي على الخطأ
            });
            setFormErrors(newErrors);
        }
    }, [error]);
    
    const isDisabled = email === '' || password === '' || isLoading;


    return [
        email,
        onEmailChange,
        password,
        onPasswordChange,
        onSubmit,
        isDisabled,
        isLoading,
        formErrors
    ];
}
