import { Col, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import UserAddressCard from "./UserAddressCard";
import UserALLAddessHook from "../../Hook/Address/UserALLAddessHook";
import addressIcon from "../../Image/AdressIcon.jpg"

export default function UserAllAdress(){
    const [allAddress, isLoading] = UserALLAddessHook()
    
    return(
        <div>
            <div className="admin-content-text pb-4">دفتر العنوانين</div>
            
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
                    allAddress[0]?.data?.length > 0 ?(
                        <> 
                            {
                                allAddress[0]?.data?.map((item,index)=><UserAddressCard key={index} address={item} />)                          
                            }
                        </>
                    ):(
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                            <img src={addressIcon} alt="No Category" style={{ width: "300px", height: "auto"}} />
                            <p  className="empty">لا يوجد طلبات'</p>
                        </div>  
                    )
                )
            }

            <Row className="justify-content-center">
                <Col sm="5" className="d-flex justify-content-center">
                    <Link to="/user/add-address" style={{ textDecoration: "none" }}>
                        <button className="btn-add-address">اضافه عنوان جديد</button>
                    </Link>
                </Col>
            </Row>
        </div>
    )
}