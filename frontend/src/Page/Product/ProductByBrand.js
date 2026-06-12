import { Col, Container, Row, Spinner } from "react-bootstrap"
import { useParams } from "react-router-dom"
import CardProductContainer from "../../Component/Product/CardProductContainer"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { featchProductsByBrandPage } from "../../Redux/Reduser/ProductSliceReducer"
import BrandHeader from "../../Component/Brand/BrandHeader"
import { featchAllBrand } from "../../Redux/Reduser/BrandSliceReducer"
import { Box, Skeleton } from "@mui/material"
import CartImpty from "../../Image/CartImpty.png"
export default function ProductsByBrand() {

    const { id } = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        const get = async () =>{
            await dispatch(featchProductsByBrandPage(id)) 
            dispatch(featchAllBrand())
        }
        get()
    },[dispatch, id])

    const allBrand = useSelector(state=>state.allBrand.alBrand)
    const responseProductByBarnd = useSelector(state=>state.allProduct.productByBrandPage)
    const isLoading = useSelector(state=>state.allProduct.isLoading)
    const error = useSelector(state=>state.allProduct.error)

    useEffect(() => {
        if(!isLoading){
            if(error){
                console.log("error",error)
            }
            else if(responseProductByBarnd){
                console.log("The res from productsByBrand", responseProductByBarnd)
            }else if(allBrand){
                console.log("The res from allBrand", allBrand)
            }
        }
    },[isLoading, error, responseProductByBarnd, allBrand])

    let allProductByBrand = []
    if(responseProductByBarnd){
        allProductByBrand = responseProductByBarnd?.data
    }
    // const [responseProductByBarnd, isLaoding] = ViewProductsByBrandHook(id)

    // console.log("The res from productsCat", response)
    // const allProductByCat = response?.data

    return (
        <div style={{ minHeight: '670px' }}>
            <Container>
                <BrandHeader allBrand={allBrand} isLoading = {isLoading}/>
                <Row className='d-flex flex-column'>
                    <Col sm="12">
                        {
                            isLoading ? (
                                // استخدام map مع flex-column لترتيب العناصر تحت بعض
                                // [...Array(6)].map((_, i) => (
                                    <Box sx={{ width: 210, marginRight: 0.5, my: 5 }}>
                                        <Skeleton variant="rectangular" width={230} height={260} />      
                                        <Box sx={{ pt: 0.5 }}>
                                            <Skeleton />
                                            <Skeleton width="60%" />
                                        </Box> 
                                    </Box>
                                // ))
                            ) : (
                                allProductByBrand?.length === 0?(
                                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                                        <img src={CartImpty} alt="No Brand" style={{ width: "400px", height: "auto"}} />
                                        <p  className="empty">لا يوجد منتجات</p>
                                    </div>  
                                ):(
                                    <CardProductContainer products={allProductByBrand} title="" btntitle="" />
                                )
                
                            )
                        }
                        <CardProductContainer title="" btntitle="" />
                    </Col>
                </Row>

                {
                    // pagination?.numberOfPages > 1 ? (
                    //     <Pagination pageCount={pageCount} onPress={getPage} />
                    // ):null
                }
            </Container>
        </div>
    )
}