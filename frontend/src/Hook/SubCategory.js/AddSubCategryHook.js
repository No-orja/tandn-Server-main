import notify from "../../Hook/UseNotifaction"
import { useEffect, useState } from "react";

//REDUX
import { useDispatch, useSelector } from "react-redux";
import { featchAllCategory } from "../../Redux/Reduser/CategorySliceReducer";
import { featchAddSubCategory } from "../../Redux/Reduser/SubCategorySliceReducer";

// //REACT DECTECT OFFLINE
// import { Offline, Online } from "react-detect-offline";

export default function AddSubCategryHook(){
    
    const [name, setName] = useState("")
    const [id, setId] = useState("0")
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch();

    const allCategory = useSelector((state)=>{
        
        return state.allCategory.allCategory?.data ?? [];
    })

    const response = useSelector((state)=>{
        
        return state.allSubCategoy.allSubCategory
        
    })
    console.log("The res:")
    console.log(response)

    useEffect(() => {
        if(!navigator.onLine){
            notify("هناك مشكلة بالانترنت", "worn")
        }
        dispatch(featchAllCategory()); 
    }, []);

    const handelChange = async (event)=> {
        console.log(event.target.value)
        setId(event.target.value)
    }
    
    function handelChangenName(event){
        setName(event.target.value)
    }


    const handelSubmit = async (event)=> {
        event.preventDefault()
        if(!navigator.onLine){
            notify("هناك مشكلة بالانترنت", "worn")
        }
        if(name === ""){
            notify("اختر التصنيف الفرعي","warn")
            return
        }
        if(id === "0"){
            notify("اختر تصنيف رئيسي","warn")
            return
        }

        setLoading(true)
        await dispatch(featchAddSubCategory({
            "name": name,
            "category":id
        }))
        setLoading(false)
    }

    //When loading done
    useEffect(()=>{
        if(loading === false){
            setId("0")
            setName("")
            if(response.status === 201){
                notify("تمت عمبة الاضافة بنجاح","success")
            }else if(response === "Error Error: Request failed with status code 400"){
                notify("الاسم مكرر من فضلك ادخل اسم تصنيف فرعي اخر","error")
            }else{
                notify("هناك مشكلة في الادخال","error")
            }
            setLoading(true)
        }

    },[loading])

    return [name,allCategory ,handelChange, handelChangenName, handelSubmit]
}