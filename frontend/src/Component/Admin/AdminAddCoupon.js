import { Col, Row, Spinner } from "react-bootstrap"
import { ToastContainer } from "react-toastify"
import AdminCoupnCard from "./AdminCoupnCard";
import AddCoponeHook from "../../Hook/Copone/AddCoponeHook"

export default function AdminAddCoupon() {

    const [coupnName, couponDate, couponValue, dateRef, onChangeName, onChangeDate, onChangeValue, onSubmit, loading, copons] = AddCoponeHook()

    return (
        <div>
            <Row className="justify-content-start ">
                <div className="admin-content-text pb-4">اضف كوبون جديد</div>
                <Col sm="8">
                    <input
                        value={coupnName}
                        onChange={onChangeName}
                        type="text"
                        className="input-form d-block mt-3 px-3"
                        placeholder="اسم الكوبون"

                    />
                    <input
                        ref={dateRef}
                        type="text"
                        className="input-form d-block mt-3 px-3"
                        placeholder="تاريخ الانتهاء"
                        onChange={onChangeDate}
                        value={couponDate}
                        onFocus={() => dateRef.current.type = "date"}
                        onBlur={() => dateRef.current.type = "text"}
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
                    <button onClick={onSubmit} className="btn-save d-inline mt-2 ">حفظ الكوبون</button>
                </Col>
            </Row>

            <Row>
                <Col sm="8" className="">

                    {
                        copons? 
                        (
                            copons.map((item, index) => {
                                return <AdminCoupnCard key={index} coupon={item} />
                            })
                        ):(
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        )
                    }
                </Col>
            </Row>

            <ToastContainer />
        </div>
    )
}