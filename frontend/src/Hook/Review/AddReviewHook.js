import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import notify from "../UseNotifaction"
import { featchAddReviewProduct } from "../../Redux/Reduser/ReviewsSliceReducer";


export default function AddReviewHook(id){
 
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [rateText, setRateText] = useState('')
    const [rateValue, setRateValue] = useState(2)

    const [loading, setLoading] = useState(true)// ✅ منع التشغيل التلقائي
    // const [isSubmitting, setIsSubmitting] = useState(false); // ✅ لتجنب الإرسال المتكرر

    const onChangeRateText = (e) => {
        setRateText(e.target.value)
    }
    const onChangeRateValue = (val) => {
        setRateValue(val)
    }
    var user = ""
    if (localStorage.getItem("user") != null){
        user = JSON.parse(localStorage.getItem("user"))
    }
    const submit = async (e) => {
        e.preventDefault();
        if (rateText === '') {
            notify("من فضلك ادخل النص", "warn");
            return;
        }
    
        // منع تنفيذ الـ dispatch بشكل متكرر
        // if (isSubmitting) return;
    
        // setIsSubmitting(true);
        setLoading(true);
    
        await dispatch(
            featchAddReviewProduct({
                id,
                body: {
                    review: rateText,
                    rating: rateValue,
                },
            })
        );
    
        setLoading(false);
        // setIsSubmitting(false);
    };
    
    const res = useSelector(state => state.Reviews.createReviews || null)
    const error =useSelector(state=>state.Reviews?.error || null)
    console.log("The res",res)
    console.log("THE ERROR !",error)
    useEffect(() => {
        // فقط إذا تم تحميل الـ response أو الخطأ
        if (!loading) {
            if (error) {
                    // التأكد من أن الخطأ فقط يتم إظهاره عند حدوثه
                    if (error.status === "fail") {
                        notify(error.message, "error");
                    } else {
                        notify(error.errors[0].msg, "error");
                    }
                }
                if (res && !error) {
                    notify("تم اضافة التقييم بنجاح", "success");
                    setTimeout(() => {
                        window.location.reload(false)
                    }, 1000);
                }
            }
        
    }, [loading, error, res]);
    

    return [rateText, rateValue, loading, onChangeRateText, onChangeRateValue, submit, user]
}