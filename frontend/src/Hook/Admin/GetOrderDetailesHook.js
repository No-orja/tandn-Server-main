import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { featchOneOrser, updateToDelivered, updateToPaid } from "../../Redux/Reduser/CheckOutSliceReducer";
import notify from "../UseNotifaction";

export default function GetOrderDetailesHook(id){
    const [pay, setPay] = useState(0);
    const [deliver, setDeliver] = useState(0);

    const dispach = useDispatch()
    useEffect(() => {
        const get=async()=>{
            await dispach(featchOneOrser(id))
        }
        get()
    },[])

    const oneOrderRespose = useSelector((state) => state.userOreder.oneUserOrder);


    const onChangeDeliver = (e) => {
        console.log(e.target.value)
        setDeliver(e.target.value)

    }

    const onChangePaid=(e)=>{
        console.log(e.target.value)
        setPay(e.target.value)
    }  
    // const changeDeliverOrder = () => {
    //     if(deliver === "true"){
    //         console.log("Done")
    //         // await dispach(updateToPaid(id))
    //     }
    //     else if(deliver === 0){
    //         console.log("من فضلك اختر قيمة")
    //     }
    // }
  
    // const changePayOrder = () => {
    //     if(pay === "true"){
    //         console.log("Done")
    //         // await dispach(updateToPaid(id))
    //     }
    //     else if(pay === 0){
    //         console.log("من فضلك اختر قيمة")   
    //     }
    // }

    const getPaid = async () => {
        await dispach(updateToPaid(id))
    }
    const getDeliver = async () => {
        await dispach(updateToDelivered(id))
        
    }
    const paidData = useSelector((state) => state.userOreder.updateToPaid);
    const deliverData = useSelector((state) => state.userOreder.updateToDelivered);
    const isLoading = useSelector((state) => state.userOreder.isLoading);
    const error = useSelector((state) => state.userOreder.error);
    const changeDeliverPaid = () => {

        if(pay !== 0  && deliver !== 0){
            if(paidData !== null && deliverData !== null){
                if(pay === "true" && deliver === "true"){
                    getPaid()
                    getDeliver()
                    notify("تم التحديث بنجاح", "success")

                }else if(pay === "true" && deliver === "false"){
                    getPaid()
                    notify("تم التحديث بنجاح", "success")
                }else if(pay === "false" && deliver === "true"){
                    getDeliver()
                    notify("تم التحديث بنجاح", "success")
                }
            }
        }
        else if(pay === 0 || deliver === 0){
            notify("من فضلك اختر قيمة", "warn")   
        }
    }

    useEffect(() => {
        if(!isLoading){
            if(error){
                console.log("the error", error)
            }
            else if(paidData){
                console.log("the paid data res", paidData)
            }else if(deliverData){
                console.log("the deliver data res", deliverData)
            }
        }
    },[])

    return [onChangeDeliver,  onChangePaid, oneOrderRespose, changeDeliverPaid]

}