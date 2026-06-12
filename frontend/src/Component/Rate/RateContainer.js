import { Col, Container, Row } from "react-bootstrap";
import rate from "../../Image/rate.png"
import RateItem from "./RateItem";
import RatePost from "./RatePost";
import {featchAllReviewProduct} from "../../Redux/Reduser/ReviewsSliceReducer"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Pagination from "../Utility/Pagination"

export default function RateContainer({ id, products}){

    const dispatch = useDispatch()
    const limit = 5;

    useEffect(()=>{
        
        dispatch(featchAllReviewProduct({ id, limit }))
    },[id,  dispatch])

    const response = useSelector((state)=>state.Reviews.allReviewProduct)
    console.log("The res from rate  container",response)
    const error = useSelector((state)=>state.Reviews.error)
    console.log("Error show all reviews",error)

    const pagination =  response?.paginationResult

    //Pagenation 
    let pageCount = 0 
    if (pagination) {
        pageCount = pagination.numberOfPages;
    }
        
    console.log(pageCount)
    const getPage=(page)=>{
        dispatch(featchAllReviewProduct({ id, limit, page}))
        console.log(page)
    } 
    const allReviewProduct = useSelector((state)=>state.Reviews.allReviewProduct)

    return(
        <Container className="rate-container"> 
            <Row>
                <Col className="d-flex">
                    <div className="sub-tile d-inline p-1 ">التقيمات</div>
                    <img className="mt-2" src={rate} alt="" height="16px" width="16px" />
                    <div className="cat-rate  d-inline  p-1 pt-2">{products?.ratingsAverage}</div>
                    <div className="rate-count d-inline p-1 pt-2">({products?.ratingsQuantity} تقييم)</div>
                </Col>
            </Row>
            <RatePost />

            {/* COMMENTES(RATING) */}

            {
                allReviewProduct?.data? (
                    allReviewProduct?.data.map((review, index) => {
                        return(<RateItem review={review} key={index}/>)
                    })
                ):(
                    <p>لا يوجد تقييمات</p>
                )
            }

            {/* pagenation */}
            {
                pageCount > 1 ? (<Pagination pageCount={pageCount} onPress={getPage}/>): null
            }

        </Container>
    )
}