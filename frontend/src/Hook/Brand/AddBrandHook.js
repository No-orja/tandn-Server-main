import avatar from "../../Image/avatar.png"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { featchAddBrand } from "../../Redux/Reduser/BrandSliceReducer";

import notify from "../../Hook/UseNotifaction"

export default function AddCategoryHook(){
    const [image, setImage] = useState(avatar)
    const [selectedFile, setSelectedFile] = useState(null)
    const [name, setName] = useState("")
    const [loading, setLoading] = useState(true)
    const [isPress, setIsPress] = useState(false)

    const dispatch = useDispatch()

    function onImageChange(event){
        if(event.target.files && event.target.files[0]){
            setImage(URL.createObjectURL(event.target.files[0]))
            setSelectedFile(event.target.files[0])
        }
    }

    function onNameChange(event){
        setName(event.target.value)
    }

    const response = useSelector(state => state.allBrand.alBrand)
    
    const handelSubmit = async (event)=>{
        event.preventDefault()

        if(name==="" || selectedFile === null){
            return
        }

        //Sending data
        const formData = new FormData()
        formData.append("name", name)
        formData.append("image", selectedFile)

        setLoading(true)
        setIsPress(true)
        await dispatch(featchAddBrand(formData))
        setLoading(false)
    }

    useEffect(()=>{
        if(!loading){
            console.log("تم الانتهاء")
            setImage(avatar)
            setName("")
            setSelectedFile(null)
            setLoading(true)
            setTimeout(()=>{
                setIsPress(true)
            },1000)
            if(response.status === 201){
                notify("تمت الاضافة بجاح","success")
            }else{
                notify("مشكلة في عملية الاضافة","error")
            }
        }
    },[loading])

    return [image, onImageChange, name, onNameChange, handelSubmit]
}