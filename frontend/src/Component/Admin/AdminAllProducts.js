import { Row, Spinner } from "react-bootstrap";
import AdminAllProductsCard from "./AdminAllProductsCard";
import CartImpty from "../../Image/CartImpty.png"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { featchAllProduct,featchAllProductPage } from "../../Redux/Reduser/ProductSliceReducer";

export default function AdminAllProducts(){

        const dispatch = useDispatch()
        useEffect(()=>{
            dispatch(featchAllProduct())
        },[])
        const onPress = (page) =>{
            dispatch(featchAllProductPage(page))
            console.log(page)
        }   
        const allProduct = useSelector((state)=>state.allProduct.allProduct)
        const isLoaing = useSelector((state)=>state.allProduct.isLoading)
    
    
        let products = []
    
        try{
            if(allProduct.data){
                products = allProduct.data
            }else{
                products = []
            }
        }catch(e){
    
        }
    
    
        const pageCount = allProduct?.paginationResult?.numberOfPages || 1;
    

    return(
        <div>
            <div className="admin-conent-text">ادارة كل المنتجات</div>
            <Row className="justify-content-start">
                {
                    isLoaing ?
                    (
                        <div style={{
                            display: "flex", 
                            justifyContent: "center", 
                            alignItems: "center", 
                            minHeight: "80vh"
                        }}>
                            <Spinner animation="border" role="status" style={{
                                width: "3rem", 
                                height: "3rem", 
                                color: "#3F4F44",
                                borderWidth: "0.4rem"
                            }} />
                        </div>
                    ):(
                        products?.length >= 1 ?
                        (
                            products?.map((product)=>(
                                <AdminAllProductsCard key={product._id} product={product}/>
                            ))

                        ):(
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                                <img src={CartImpty} alt="No Brand" style={{ width: "400px", height: "auto"}} />
                                <p  className="empty">لا يوجد منتجات</p>
                            </div>  
                        )
                    )
                }

            </Row>
            <ToastContainer />
        </div>
    )
}