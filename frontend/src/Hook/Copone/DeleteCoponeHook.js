import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { featchDeleteComponentProduct } from "../../Redux/Reduser/CoponeSliceReducer";
import notify from "../../Hook/UseNotifaction";

export default function DeleteCoponeHook(coupon) {

    const dispatch = useDispatch();
    const [loading , setLoading] = useState(false);
    const dateString = coupon.expire;
    
    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "numeric", day: "numeric" }
        return new Date(dateString).toLocaleDateString(undefined, options)
    }
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handelDelete = async() =>{
        setLoading(true);
        await dispatch(featchDeleteComponentProduct(coupon._id));
        setLoading(false);
        setShow(false);
    } 
    const response = useSelector(state => state.Copone.allCopone);
    const error = useSelector(state => state.Copone.error);

    useEffect(() => {
        if(loading){
            if(error){
                notify(error?.message, "error")
            }
            else if(response &&!error){
                console.log("The delete response",response)
                notify("تم حذف التقييم بنجاح", "success")
                setTimeout(() => {
                    window.location.reload(false)
                }, 1000);
            }
        }
    },[loading])

    return [show,dateString, formatDate, handleShow, handleClose, handelDelete]
}