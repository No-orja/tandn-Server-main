import notify from "../../Hook/UseNotifaction";
import { featchUpdateSpecificReview } from "../../Redux/Reduser/ReviewsSliceReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function DeleteReviewHook(review){
    const cerrentUser = JSON.parse(localStorage.getItem("user"))
    console.log("cerrentUser",cerrentUser)
    console.log("The review",review)

    const dispatch = useDispatch();

    const [showEdit, setShowEdit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [newRateText, setNewRateText] = useState(review.review);
    const [newRateValue, setNewRateValue] = useState(review.rating);

    const handleCloseEdit = () => {
        setShowEdit(false);
    }

    const handeleShowEdit = () => {
        setShowEdit(true);
    }

    const onChangeRateText = (e) => {
        setNewRateText(e.target.value)
    }
    const OnChangeRateValue = (val) => {
        setNewRateValue(val)
    }


    const handelEdit=async ()=>{
        setLoading(true);
        await dispatch(featchUpdateSpecificReview({ id: review._id,
            body:{
                "review": newRateText,
                "rating": newRateValue               
            }

        }));
        setShowEdit(false);
        handleCloseEdit();
    }

    const response = useSelector(state=>state.Reviews.updateSpecificReview);
    const error = useSelector(state=> state.Reviews.error);
    
    useEffect(() => {
        if(loading){
            if(error){
                // notify(error?.message, "error")
            }
            else if(response &&!error){
                console.log("The update response",response)
                notify("تم التعديل بنجاح", "success")
                setTimeout(() => {
                    window.location.reload(false)
                }, 1000);
            }
        }
    },[loading])

    
    return [showEdit,handleCloseEdit, handelEdit, handeleShowEdit, onChangeRateText, newRateText,OnChangeRateValue, newRateValue]
}