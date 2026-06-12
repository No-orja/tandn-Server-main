import React from 'react'
import { Row, Spinner } from 'react-bootstrap'
import UserAllOrderItem from './UserAllOrderItem'
import GetAllUserOrderHook from '../../Hook/User/GetAllUserOrderHook'
import Pagination from '../Utility/Pagination'
import CartImpty from '../../Image/CartImpty.png'
export default function UserAllOrder(){
    const [userName, isLoading, allOrders, pageCount, getPage] = GetAllUserOrderHook()
    return(
        <div>
            <div className="admin-content-text pb-4">هلا ...{userName}</div>
            <Row className='justify-content-between'>

            {
                isLoading ? (
                    <div style={{
                            display: "flex", 
                            justifyContent: "center", 
                            alignItems: "center", 
                            minHeight: "100vh"
                        }}>
                        <Spinner animation="border" role="status" style={{
                            width: "3rem", 
                            height: "3rem", 
                            color: "#3F4F44",
                            borderWidth: "0.4rem"
                        }} />
                    </div>
                ):( 
                    allOrders?.length > 0 ?(
                       
                        <> 
                            {
                                allOrders.map((order, index) => (
                                    <UserAllOrderItem key={index} order={order} />
                                ))                            
                            }
                                                                     
                            {
                                pageCount > 1 ? (<Pagination pageCount={pageCount} onPress={getPage}/>) : null
                            }
                        </>
                    ):(
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                            <img src={CartImpty} alt="No Category" style={{ width: "600px", height: "auto"}} />
                            <p  className="empty">لا يوجد طلبات'</p>
                        </div>  
                    )
                )
            }

            </Row>
        </div>        
    )

}