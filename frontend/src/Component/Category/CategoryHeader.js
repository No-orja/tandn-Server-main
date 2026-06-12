import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import AllCategoryPageHook from "../../Hook/Category/AllCategoryPageHook";

export default function CategoryHeader(){
    const [pageCount, getPage, allCategory, isLoading, getAll]  = AllCategoryPageHook() 
    
    return(
        <div className="cat-header">
            {
                isLoading?(
                    null
                ):(
                    <Container>
                        <Row>
                            <Col className="d-flex justify-content-start py-2 flex-wrap">
                            <div className="cat-text-header"onClick={getAll}>الكل</div>
                            {
                                allCategory?.slice(0,9).map((item) => {
                                    return(
                                        <Link to={`/products/category/${item._id}`} style={{textDecoration:"none"}}>
                                            <div className="cat-text-header mx-2">{item.name}</div>
                                        </Link>
                                    )
                                })
                            }
                            <Link to="/allCategory" style={{textDecoration:"none"}}>
                                <div className="cat-text-header">المزيد</div>            
                            </Link>
                            </Col>
                        </Row>
                    </Container>                      
                )
            }
        </div>
    )
}