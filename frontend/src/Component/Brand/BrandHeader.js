import { Skeleton, Typography } from "@mui/material";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function BrandHeader({allBrand, isLoading}){
    
    return(
        <div className="cat-header">
            <Container>
                <Row>
                    <Col className="d-flex justify-content-start py-2 flex-wrap">
                    {
                        isLoading?(
                            <Skeleton width="100%">
                                <Typography>.</Typography>
                            </Skeleton>
                        ):(
                            <>
                                <div className="cat-text-header ">الكل</div>
                                {
                                    allBrand?.data?.map((item) => {
                                        return(
                                            <Link to={`/products/brand/${item._id}`} style={{textDecoration:"none"}}>
                                                <div className="cat-text-header mx-2">{item.name}</div>
                                            </Link>
                                        )
                                        
                                    })
                                }
                               <Link to="/allBrand" style={{textDecoration:"none"}}>
                                    <div className="cat-text-header">المزيد</div>            
                                </Link>
                            </>
                        )
                    }
                    </Col>
                </Row>
            </Container>
        </div>
    )
}