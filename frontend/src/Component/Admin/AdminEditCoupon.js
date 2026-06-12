import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { featchSpicificComponentProduct, featchUpdateCouponeProduct } from "../../Redux/Reduser/CoponeSliceReducer";
import { useParams } from "react-router-dom";

export default function AdminEditCoupon() {
    const isLodaing = useSelector(state => state.Copone.isLoading);
    console.log("isLodaing first reducer",isLodaing)
    const { id } = useParams();
    const dispatch = useDispatch();
    const [coupnName, setCoupnName] = useState("");
    const [couponDate, setCouponDate] = useState("");
    const [couponValue, setCouponValue] = useState("");
    const [loadingData, setLoadingData] = useState(true)

    //Get One Copone
    useEffect(() => {
        const get = async () => {
            setLoadingData(true);
            await dispatch(featchSpicificComponentProduct(id));  
            setLoadingData(false);
        }
        get();
    }, [dispatch]);

    const oneCoupon = useSelector(state => state.Copone.spicificCopone);
    const errorOneCopone = useSelector(state => state.Copone.error); 
    console.log("The oneCoupon",oneCoupon)

    const dateString = oneCoupon.data?.expire;
    
    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "numeric", day: "numeric" }
        return new Date(dateString).toLocaleDateString(undefined, options)
    }


    useEffect(() => {
        if (loadingData === false) {
            if(errorOneCopone){
                console.log("errorOneCopone",errorOneCopone)
            }
            if (oneCoupon?.data) {
                setCoupnName(oneCoupon.data.name)
                setCouponDate(formatDate(oneCoupon.data.expire))
                setCouponValue(oneCoupon.data.discount)
            }
        }
    }, [loadingData])
    

    //Update Copone
    const onChangeName = (e) => {
        setCoupnName(e.target.value);
    }

    const onChangeDate = (e) => {        
        setCouponDate(e.target.value);        
    }

    const onChangeValue = (e) => {
        setCouponValue(e.target.value);
    }

    const body = {
        name: "coupnName",
        expire: "couponDate",
        discount: "couponValue"
    }
    const onSubmit = async () => {
        console.log("id",id)
        console.log("body",body)
        console.log("before update")
        await dispatch(featchUpdateCouponeProduct({id, body}))
        console.log("after update")

    }

    const responseUpdate = useSelector(state => state.Copone.updateCopone);
    const errorUpdate = useSelector(state => state.Copone.error);
    
    useEffect(() => {
        if(!isLodaing){
            if(errorUpdate){
                console.log("errorUpdate",errorUpdate)
            }
            else if(responseUpdate){
                console.log("The updated res :", responseUpdate)
            }
        }
    },[isLodaing])
    
    return (
        <div>
            <Row className="justify-content-start ">
                <div className="admin-content-text pb-4">تعديل بيانات الكوبون</div>
                <Col sm="8">
                    <input
                        value={coupnName}
                        onChange={onChangeName}
                        type="text"
                        className="input-form d-block mt-3 px-3"
                        placeholder="اسم الكوبون"

                    />
                    <input
                        type="text"
                        className="input-form d-block mt-3 px-3"
                        placeholder="تاريخ الانتهاء"
                        onChange={onChangeDate}
                        value={formatDate(dateString)}
                    />
                    <input
                        value={couponValue}
                        onChange={onChangeValue}
                        type="number"
                        className="input-form d-block mt-3 px-3"
                        placeholder="نسبة خصم الكوبون"

                    />
                </Col>
            </Row>
            <Row>
                <Col sm="8" className="d-flex justify-content-end ">
                    <button onClick={onSubmit} className="btn-save d-inline mt-2 ">حفظ التعديل</button>
                </Col>
            </Row>


            <ToastContainer />
        </div>
    )
}