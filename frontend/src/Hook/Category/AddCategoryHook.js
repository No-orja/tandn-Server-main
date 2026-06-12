import { useEffect, useState } from "react"
import notify from "../UseNotifaction"
import { featchAddCategory } from "../../Redux/Reduser/CategorySliceReducer"
import { useDispatch, useSelector } from "react-redux"
import avatar from "../../Image/avatar.png"

export default function AddCategoryHook(){
    
    const dispatch = useDispatch()
    
    const [image, setImg] = useState(avatar)
    const [name, setName] = useState("")
    const [selectedFiLe, setSelectedFiLe] = useState(null)                  
    const [loading, setLoading] = useState(true)
    const [isPress, setIsPress] = useState(false);
    
    const onImageChange = (e) => {
        if(e.target.files && e.target.files[0])
        setImg(URL.createObjectURL(e.target.files[0]))
        //To get the src of image selected
        setSelectedFiLe(e.target.files[0])
    }

    const onNameChange = (e)=>{
        setName(e.target.value)
    }


    const res = useSelector( state => state.allCategory.allCategory)
    
    //SAVE DATA IN DATABASE
    const handelSubmit = async (event) =>{
        event.preventDefault()

        if(name ==="" || selectedFiLe === null){
            notify("من فضلك اكمل البيانات", "warn")
            return   
        }

        //sending data
        const formData = new FormData()
        formData.append("name",  name)
        formData.append("image", selectedFiLe)

        
        setLoading(true)
        setIsPress(true)
        await dispatch(featchAddCategory(formData))
        setLoading(false)
    }

    useEffect(()=>{
        if(!loading){
            console.log("تم الانتهاء ")
            setName("")
            setImg(avatar)
            setSelectedFiLe(null);
            setLoading(true)
            setTimeout(()=>{
                 setIsPress(false)
            },1000)
            if(res.status === 201){
                notify("تمت الاضافة بجاح", "success")                
            }    
            else{
                notify("مشكلة في عملية الاضافة","error")                
            }
        }
    },[loading])
    return [image, name, onImageChange, onNameChange, handelSubmit, isPress , loading ] 
}