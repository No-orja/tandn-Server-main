import notify from "../../Hook/UseNotifaction";
import { featchDeleteSpecificReview } from "../../Redux/Reduser/ReviewsSliceReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function DeleteReviewHook(review){
    const cerrentUser = JSON.parse(localStorage.getItem("user"))
    console.log("cerrentUser",cerrentUser)
    console.log("The review",review)
    useEffect(() => {
        if (cerrentUser && cerrentUser._id === review.user._id) {
            setIsUser(true);
        }
    },[])
    const [showDelete, setShowDelete] = useState(false);
    const [isUser, setIsUser] = useState(false);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    //Delete Hook
    const handleClose = () =>{
        setShowDelete(false);
    } 

    const handelDelete = async () => {
        setLoading(true);
        console.log("Token being sent:", localStorage.getItem("token"));

        await dispatch(featchDeleteSpecificReview(review._id));
        setLoading(false);
        handleClose();
    }    

    const response = useSelector(state=>state.Reviews.deleteSpecificReview);
    const error = useSelector(state=> state.Reviews.error);
    
    useEffect(() => {
        if(loading){
            if(error){
                // notify(error?.message, "error")
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

    const handleShow = () =>{
        setShowDelete(true);
    }


    return [isUser, showDelete,handelDelete, handleShow, handleClose]
}