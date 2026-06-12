import { Col, Row } from "react-bootstrap";
import UserAllOrderCard from "./UserAllOrderCard";

export default function UserAllOrderItem({order}){
    return(
        <div className="user-order mt-2">
            <Row>
                <div className="py-2 order-title">طلب رقم #{order?.id || ""}</div>
            </Row>
            {
                order?.cartItems ? (
                    order?.cartItems.map((item, index) => (
                        <UserAllOrderCard key={index} item={item} />
                    ))
                ):(
                    null
                ) 
            }
            
            <Row className="d-flex justify-content-between">
                <Col xs="6" className="d-flex">
                    <div>
                        <div className="d-inline"> التوصيل</div>
                        <div className="d-inline mx-2 stat">{order?.isDelivered === true ? 'تم التوصيل' : 'لم يتم '}</div>
                    </div>
                    <div>
                        <div className="d-inline"> الدفع</div>
                        <div className="d-inline mx-2 stat">{order?.isPaid === true ? 'تم الدفع' : 'لم يتم '}</div>
                    </div>

                    <div>
                        <div className="d-inline">طرقة الدفع</div>
                        <div className="d-inline mx-2 stat">{order?.paymentMethodType === 'cash' ? 'كاش' : 'بطاقة ائتمانية'}</div>
                    </div>
                </Col>
                <Col xs="6" className="d-flex justify-content-end">
                    <div>
                        <div className="barnd-text">{order?.totalOrderPrice || 0} جنية</div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}