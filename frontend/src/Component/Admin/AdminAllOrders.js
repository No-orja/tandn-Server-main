import { Row, Spinner } from "react-bootstrap";
import AdminAllOrdersItem from "./AdminAllOrdersItem";
import GetAllUserOrderHook from "../../Hook/User/GetAllUserOrderHook";
import Pagination from "../Utility/Pagination";
import CartImpty from "../../Image/CartImpty.png"
export default function AdminAllOrders(){

    const [userName, isLoading, allOrders, pagination, getPage, filterStatus, onFilterChange] = GetAllUserOrderHook()

    return(
        <div>
            <div className='admin-content-text'>ادارة جميع الطلبات</div>
            <div className="d-flex mt-2">
                <select
                    name="orderFilter"
                    id="orderFilter"
                    value={filterStatus}
                    onChange={(e) => onFilterChange(e.target.value)}
                    className="select input-form-area mt-1 text-center">
                    <option value="all">كل الطلبات</option>
                    <option value="paid">تم الدفع</option>
                    <option value="notPaid">لم يتم الدفع</option>
                    <option value="delivered">تم التوصيل</option>
                    <option value="notDelivered">لم يتم التوصيل</option>
                </select>
            </div>
            <Row className='justify-content-start'>
                {
                    isLoading ? (
                        <div style={{
                            display: "flex", 
                            justifyContent: "center", 
                            alignItems: "center", 
                            minHeight: "80vh"
                        }}>
                            <Spinner animation="border" role="status" style={{
                                width: "3rem", 
                                height: "3rem", 
                                color: "#3F4F44",
                                borderWidth: "0.4rem"
                            }} />
                        </div>
                    ) :(
                        allOrders.length >= 1 ? (
                            allOrders.map((item, index) => {
                                return <AdminAllOrdersItem key={index} item={item} />
                            })   
                        ) :  (
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                                <img src={CartImpty} alt="No Brand" style={{ width: "400px", height: "auto"}} />
                                <p  className="empty">لا يوجد طلبات</p>
                            </div>

                        )
                    )
                }
            </Row>
            {
                pagination > 1 ? (<Pagination key={filterStatus} pageCount={pagination} onPress={getPage}/>) : null
            }
        </div>
    )
}