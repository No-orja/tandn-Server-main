import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { featchAddComponentProduct, featchAllComponentProduct } from "../../Redux/Reduser/CoponeSliceReducer";
import notify from "../../Hook/UseNotifaction";

export default function AdminEditCoupon() {

    const dispatch = useDispatch()
    const dateRef = useRef();
    const [coupnName, setCoupnName] = useState("");
    const [couponDate, setCouponDate] = useState("");
    const [couponValue, setCouponValue] = useState("");
    const [loading, setLoading] = useState(true)

    const onChangeName = (e) => {
        setCoupnName(e.target.value);
    }

    const onChangeDate = (e) => {
        setCouponDate(e.target.value);
    }

    const onChangeValue = (e) => {        
        setCouponValue(e.target.value);        
    }
    const onSubmit = async(e) => {
        if(!coupnName || !couponDate || !couponValue){
            notify("من فضلك اكمل البيانات", "warn")
            return
        }
        setLoading(true)
        await dispatch(featchAddComponentProduct(
            {
                "name": coupnName,
                "expire": couponDate,
                "discount": couponValue
            }
        ))
        setLoading(false)
    }

    const response = useSelector(state => state.Copone.createCopone);
    const  error = useSelector(state => state.Copone.error);

    useEffect(() => {
        if(!loading){
            if(error){
                notify(error?.message, "error")
            }            
            else if(response && !error){
                console.log("the response", response)
                notify("تم اضافة الكوبون بنجاح", "success")
                setTimeout(() => {
                    window.location.reload(false)
                }, 1000);
            }

        }
    },[loading])


    //All Coupons
    useEffect(() => {
        const get = async () => {
            setLoading(true)
            await dispatch(featchAllComponentProduct())
            setLoading(false)
        }
        get();
    }, [dispatch])
    const responseAll = useSelector(state => state.Copone.allCopone);
    const errorAll = useSelector(state => state.Copone.error);    
    const copons = responseAll?.data

    useEffect(() => {
        if(!loading){
            if(errorAll){
                console.log(errorAll)
            }
            else if(responseAll)
            {
                console.log("The res",response)
            }
        }    
    },[loading])


    return [coupnName, couponDate, couponValue, dateRef, onChangeName, onChangeDate, onChangeValue, onSubmit, loading, copons]
}