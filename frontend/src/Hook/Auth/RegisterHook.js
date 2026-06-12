import { useEffect, useState } from 'react';
import notify from "../UseNotifaction"
import { useDispatch, useSelector } from 'react-redux';
import { fetchCreateUserSlice } from '../../Redux/Reduser/AuthReducer';
import { useNavigate } from 'react-router-dom';


export default function RegisterHook() {
    const dispatch = useDispatch();
    const navigator = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState(''); 
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [loading, setLoading] = useState(false);

    //Handel error
    const [formErrors, setFormErrors] = useState({});

    const onUserNameChange = (e) => {
        setName(e.target.value);
        removeError("name");
    };
    const onEmailChange = (e) => {
        setEmail(e.target.value);
        removeError("email");
    };
    const onPhoneNumberChange = (e) => {
        setPhone(e.target.value);
        removeError("phone");
    };
    const onPasswordChange = (e) => {
        setPassword(e.target.value);
        removeError("password");
    };
    const onPasswordConfermChange = (e) => {
        setPasswordConfirm(e.target.value);
        removeError("passwordConfirm");
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

    const handleRegister = async () => {
        if(name === '' || email === '' || setPhone === '' || password === '' || passwordConfirm === ''){
            notify('الرجاء ملئ جميع الحقول', "warn")
            return;
        }else if(password.length < 6 || hasNumbers === false){  
            notify(' كلمه السر يجب ان تكون اكثر من 6 احرف وتحتوي على ارقام' , "warn")
            return
        }else if(setPhone.length >= 10){
            notify('رقم الهاتف يجب ان يكون 11 ارقام', "warn")
            return; 
        }else if(!email.includes('@')){
            notify('الرجاء ادخال ايميل صحيح', "warn")
            return;
        }else if(password !== passwordConfirm){
            notify('كلمه السر غير متطابقه', "warn")
            return;
        }
    };

    const response = useSelector(state => state.Auth.auth)
    console.log("response", response)
    const error = useSelector(state => state.Auth.error);
    console.log("The error:", error)

    const onSubmit = async ()=>{
        // handleRegister()
        setLoading(true)
        await dispatch(fetchCreateUserSlice({name, email, password, passwordConfirm, phone}))
        setLoading(false)
    }

    useEffect(() => {
        if (!loading) {
            // ✅ التأكد من عدم وجود `errors` قبل التعامل مع `response`
            //لانه في مشكلة بالريسبونس , لما يكون في خطأ بالباك اند يعطيني ريسبونس بنجاح ويعطيني خطأ بالايرور
            if (response?.data?.token && !error?.errors) {
                notify("تم انشاء الحساب بنجاح", "success");
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("user", JSON.stringify(response.data.data));
                setTimeout(() => {
                    navigator("/login");
                })
            }

            // if (error?.errors?.length > 0) {
            //     if (error.errors.some(err => err.param === "password")) {
            //         notify("كلمة المرور يجب أن تكون 6 أحرف على الأقل", "error");
            //     } else if (error.errors.some(err => err.msg === "E-mail already in use")) {
            //         notify("البريد الإلكتروني مستخدم بالفعل", "error");
            //     } else if(error.errors.some(err => err.param === "Incorrect email or password")){
            //         notify("البريد الإلكتروني أو كلمة المرور غير صحيحة", "error");
            //     }
            // }
            
        }
    }, [loading, response]);

    useEffect(() => {
        if (error?.errors?.length > 0) {
            const newErrors = {};
            error.errors.forEach(err => {
                newErrors[err.param] = err.msg; // 💡 `err.param` هو الحقل الذي يحتوي على الخطأ
            });
            setFormErrors(newErrors);
        }
    }, [error]);
    
    const isDisabled = name === '' || email === '' || phone === '' || password === '' || passwordConfirm === '' || loading;
    return [
        name,
        onUserNameChange,
        email,
        onEmailChange,
        phone,
        onPhoneNumberChange,
        password,
        onPasswordChange,
        passwordConfirm,
        onPasswordConfermChange,
        onSubmit,
        isDisabled,
        formErrors
    ];
}
