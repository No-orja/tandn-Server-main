import { Col, Container, Row, Spinner } from "react-bootstrap"
import { useParams } from "react-router-dom"
import Pagination from "../../Component/Utility/Pagination"
import ViewProductsByCatHook from "../../Hook/Product/ViewProductsByCatHook"
import CardProductContainer from "../../Component/Product/CardProductContainer"
import CategoryHeader from "../../Component/Category/CategoryHeader"
import CartImpty from "../../Image/CartImpty.png"
import SearchCountResult from "../../Component/Utility/SearchCountResult"
export default function ProductsByCategory() {

    const { id } = useParams()
    const [response, isLaoding, pageCount,getPage, pagination]= ViewProductsByCatHook({id})
    const allProductByCat = response?.data

    // const[allProduct,item,pagination, onPress, getProduct, seartch, isLoading]  = RiewSearchProductHook()
    // const itemsNumber = allProduct?.results|| 0;

    return (
        <div style={{ minHeight: '670px' }}>

            <Container>
                <CategoryHeader/>
                {/* <SearchCountResult onClick={getProduct} title={`هناك ${itemsNumber} نتيجة بحث` }/>                                 */}

                <Row className='d-flex flex-row'>

                    <Col sm="12" >
                        {
                            isLaoding ? (
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
                                allProductByCat?.length >= 1?(
                                    <CardProductContainer products={allProductByCat} title="" btntitle="" />
                                ):(
                                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                                        <img src={CartImpty} alt="No Brand" style={{ width: "600px", height: "auto"}} />
                                        <p  className="empty">لا يوجد منتجات</p>
                                    </div>   
                                )
                            )
                        }
                    </Col>
                </Row>
                {
                    pagination?.numberOfPages > 1 ? (
                        <Pagination pageCount={pageCount} onPress={getPage} />
                    ):null
                }
            </Container>
        </div>
    )
}