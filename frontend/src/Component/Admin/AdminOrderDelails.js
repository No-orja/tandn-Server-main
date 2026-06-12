import { Col, Row } from "react-bootstrap"
import { ToastContainer } from "react-toastify"
import GetOrderDetailesHook from "../../Hook/Admin/GetOrderDetailesHook"
import { useParams } from "react-router-dom"
import UserAllOrderCard from "../User/UserAllOrderCard"
import notify from "../../Hook/UseNotifaction"
 
export default function AdminOrderDetails(){

    const {id} = useParams()
    const [onChangeDeliver, onChangePaid, oneOrderRespose, changeDeliverPaid] = GetOrderDetailesHook(id)
    console.log("The one order",oneOrderRespose)
    const userData = oneOrderRespose?.data?.user 
    const productData = oneOrderRespose?.data?.cartItems
    console.log("The product data",productData)


    return(
        <div>

            <Row>
                <div className="py-2 order-title">طلب رقم #{oneOrderRespose?.data?.id || ""}</div>
            </Row>
            {
                productData?.map((item, index) => (
                    <UserAllOrderCard key={index} item={item} />
                ))
            }
            <Row className="d-flex justify-content-between">
                <Col xs="6" className="d-flex">
                    <div>
                        <div className="d-inline"> التوصيل</div>
                        <div className="d-inline mx-2 stat">{oneOrderRespose?.data?.isDelivered === true ? 'تم التوصيل' : 'لم يتم '}</div>
                    </div>
                    <div>
                        <div className="d-inline"> الدفع</div>
                        <div className="d-inline mx-2 stat">{oneOrderRespose?.data?.isPaid === true ? 'تم الدفع' : 'لم يتم '}</div>
                    </div>

                    <div>
                        <div className="d-inline">طرقة الدفع</div>
                        <div className="d-inline mx-2 stat">{oneOrderRespose?.data?.paymentMethodType === 'cash' ? 'كاش' : 'بطاقة ائتمانية'}</div>
                    </div>
                </Col>
                <Col xs="6" className="d-flex justify-content-end">
                    <div>
                        <div className="barnd-text">{oneOrderRespose?.data?.totalOrderPrice || 0} جنية</div>
                    </div>
                </Col>
            </Row>
            
            <Row className="justify-content-center mt-4 user-data">
                <Col xs="12" className=" d-flex">
                    <div className="admin-content-text py-2">تفاصيل العميل</div>
                </Col>
                <Col xs="12" className="d-flex">
                    <div
                        style={{
                            color: "#555550",
                            fontFamily: "Almarai",
                            fontSize: "16px",
                        }}>
                        الاسم: {userData?.name || ''}
                    </div>
                </Col>

                <Col xs="12" className="d-flex">
                    <div
                        style={{
                            color: "#555550",
                            fontFamily: "Almarai",
                            fontSize: "16px",
                        }}>
                        رقم الهاتف:{userData?.phone || ''}
                    </div>

                </Col>
                <Col xs="12" className="d-flex">
                    <div
                        style={{
                            color: "#555550",
                            fontFamily: "Almarai",
                            fontSize: "16px",
                        }}>
                        الايميل:{userData?.email || ''}
                    </div>

                </Col>
                <div className="d-flex mt-2 justify-content-center">
                    <div>
                        <select
                            name="pay"
                            id="paid"
                            onChange={onChangePaid}
                            className="select input-form-area mt-1  text-center w-100">
                            <option value="0">الدفع</option>
                            <option value="true">تم</option>
                            <option value="false">لم يتم</option>
                        </select>
                    </div>
                    <div>
                        <select
                            onChange={onChangeDeliver}
                            name="deliver"
                            id="deliver"
                            className="select input-form-area mt-1  text-center  w-100">
                            <option value="0">التوصيل</option>
                            <option value="true">تم</option>
                            <option value="false">لم يتم</option>
                        </select>
                    </div>
                    <button onClick={changeDeliverPaid} className="btn-a px-2 d-inline mx-1 ">حفظ </button>

                </div>
            </Row>
            <ToastContainer />
        </div>
    )
}