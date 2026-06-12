import { Col, Row } from "react-bootstrap";
import PostGellery from "./ProductGellery"
import ProductText from "./ProductText";
import RateContainer from "../Rate/RateContainer";
import CardProductContainer from "../Product/CardProductContainer"

//To get id from url
import { useParams } from "react-router-dom";

//Redux
import { featchGittingSpecificProduct, featchGittingProductLike } from "../../Redux/Reduser/ProductSliceReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Box, Skeleton } from "@mui/material";

export default function ProductDetailes(){
    
    const {id} = useParams()
    console.log(id)

    const dispatch = useDispatch()

    
    const getSpecificProduct = useSelector((state) => state.allProduct.selectedProduct);
    console.log("THE SPECIFIC PRODUCT", getSpecificProduct)

    const item = getSpecificProduct?.data || {};

    useEffect(()=>{
        dispatch(featchGittingSpecificProduct(id))
    },[id,  dispatch])

    // نجلب المنتجات المشابهة بعد وصول بيانات المنتج (لان التصنيف غير معروف قبلها)
    useEffect(()=>{
        if(item.category){
            dispatch(featchGittingProductLike(item.category))
        }
    },[item.category, dispatch])
    useEffect(() => {
        // عند تغيير الـ ID، سيتم التمرير إلى أعلى الصفحة
        window.scrollTo(0, 0); // التمرير إلى أعلى الصفحة
      }, [id]); // تفعيل التأثير عند تغيير الـ ID

    const productsLike =  useSelector((state)=> state.allProduct.productsByCategory?.data)
    
    return(
        <div>
            <Row className="py-3">
            {
                getSpecificProduct?.data ? (
                    <Col lg="4">
                    <PostGellery products={item} />
                    </Col>
                ) : (
                    <Col lg="4">
                        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
                            <Skeleton
                            variant="rectangular"
                            width={item?.imageCover ? "100%" : 300} 
                            height={item?.imageCover ? "auto" : 300}
                            sx={{
                                aspectRatio: item?.imageCover ? "16/9" : "1",
                                borderRadius: "10px",
                            }}
                            />
                        </Box>
                    </Col>
                )
                }

                {
                    getSpecificProduct?.data ? (
                        <Col lg="8">
                        <ProductText products={item} />
                        </Col>
                    ) : (
                        <Col lg="8">
                        <Box sx={{ width: "100%", p: 2 }}>
                            <Skeleton variant="text" width="60%" height={30} animation="wave" />
                            <Skeleton variant="text" width="80%" height={20} animation="wave" sx={{ mt: 1 }} />
                            <Skeleton variant="text" width="70%" height={20} animation="wave" sx={{ mt: 1 }} />
                            <Skeleton variant="rectangular" width={180} height={50} animation="wave" sx={{ mt: 2, borderRadius: "8px" }} />
                        </Box>
                        </Col>
                    )
                }

                <RateContainer id={id} products={item}/>
            </Row>

            <CardProductContainer title="منتجات قد تعجبك" btnTitle="" pathText="" products={productsLike}/>
        </div>
    )
}
// products={} after dipatching 