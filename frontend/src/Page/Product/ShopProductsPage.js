import { Col, Container, Row, Spinner } from "react-bootstrap";
import CategoryHeader from "../../Component/Category/CategoryHeader";
import SearchCountResult from "../../Component/Utility/SearchCountResult";
import SideFillter from "../../Component/Utility/SideFillter";
import CardProductContainer from "../../Component/Product/CardProductContainer";
import Pagination from "../../Component/Utility/Pagination";
import RiewSearchProductHook from "../../Hook/Product/RiewSearchProductHook";
import CartImpty from "../../Image/CartImpty.png";
export default function ShopProductsPage({onClick}){

    const[allProduct,item,pagination, onPress, getProduct, seartch, isLoading]  = RiewSearchProductHook()
    const itemsNumber = item?.length || 0;
    
    return(
        <div style={{minHeight:"670px"}}>
            {/* WELL DO */}
            <CategoryHeader/> 
            {/* //////// */}

            <Container>

                <SearchCountResult onClick={getProduct} title={`هناك ${itemsNumber} نتيجة بحث` }/>                                

                <Row className="d-flex flex-row">
                    <Col sm="2" xs="2" md="1" className="d-flex">
                        <SideFillter/> 
                    </Col>
                    <Col sm="10" xs="10" md="11" className="d-flex ">
                    {
                        isLoading ? (
                            <div style={{
                                display: "flex", 
                                justifyContent: "center", 
                                alignItems: "center", 
                                minHeight: "60vh", 
                                width: "100%"
                            }}>
                                <Spinner animation="border" role="status" style={{
                                    width: "3rem", 
                                    height: "3rem", 
                                    color: "#3F4F44",
                                    borderWidth: "0.4rem"
                                }} />
                            </div>
                        ) : (
                            item?.length > 0 ? (
                                <CardProductContainer title="" btnTitle="" products={item}/>
            
                            ) : (
                                <div style={{ 
                                    display: "flex", 
                                    flexDirection: "column", 
                                    alignItems: "center", 
                                    minHeight: "60vh", 
                                    width: "100%" // لضمان التوسيط الكامل
                                }}>
                                    <img src={CartImpty} alt="No Brand" style={{ 
                                        width: "300px", // تقليل الحجم ليكون مناسبًا
                                        height: "auto",
                                        marginBottom: "20px" // إضافة مسافة بين الصورة والنص
                                    }} />
                                    <p className="empty">لا يوجد منتجات</p>
                                </div> 
                            )
                        )
                    }
                                         
                    </Col>                
                </Row>

            </Container>
            {
                pagination > 1 ? (<Pagination pageCount={pagination} onPress={onPress}/>): null
            }
        </div>
    )
}