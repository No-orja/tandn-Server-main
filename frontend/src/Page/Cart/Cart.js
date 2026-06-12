import { Col, Container, Row, Spinner } from "react-bootstrap";
import CartItem from "../../Component/Cart/CartItem"
import CardCheckOut from "../../Component/Cart/CardCheckOut";
import GetAllUserHook from "../../Hook/Cart/GetAllUserHook";
import CartImpty from "../../Image/CartImpty.png"

export default function Cart(){
    const  [loading, getItem,couponNameUsed,totalAfterDiscount] = GetAllUserHook();

    return(
        <Container style={{minHeight:"670px"}}>
            
            <Row>
                <div className="cart-title mt-4">
                    عربة التسوق
                </div>
            </Row>
    
            <Row className="d-flex justify-content-center">
                <Col xs="12" sm="9">
                {
                    loading?(
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
                        getItem.numOfCartItems > 0?
                        (
                            getItem?.data?.products?.map((item,index)=><CartItem key={index} item={item} />)
                        ):(
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                                <img src={CartImpty} alt="No Brand" style={{ width: "400px", height: "auto"}} />
                                <p  className="empty">لا يوجد منتجات</p>
                            </div>  
                        )                        
                    )
                }
                </Col>
                <Col xs="6" sm="3"> 
                    <CardCheckOut items={getItem} tatalPrice={getItem?.data?.totalCartPrice} couponNameUsed={couponNameUsed} totalAfterDiscount={totalAfterDiscount}/>
                </Col>
            </Row>
        </Container>
    )
}