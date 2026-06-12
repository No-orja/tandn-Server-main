import { Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { featchAllWishListProduct } from "../../Redux/Reduser/WishSliceReducer";
import { useEffect, useState } from "react";
import CardProductContainer from "../Product/CardProductContainer";
import CartImpty from "../../Image/CartImpty.png";
export default function UserFavoriteProduct(){

    const [items, setItems] = useState([])
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(featchAllWishListProduct());
    }, [dispatch]);

    const response = useSelector(state => state.WishList.allWishList);
    const error = useSelector(state => state.WishList.error);
    const isLoading = useSelector(state => state.WishList.isLoading);

    useEffect(() => {
        if (!isLoading) {
            if (error) {
                console.log("Error:", error);
            }
            if (response && response.data) {
                console.log("The res for all wishList", response);
                setItems(response.data);  
            }
        }
    }, [isLoading, response, error]);

    return (
        <div>
            <div className="admin-content-text pb-4">قائمة المفضلة</div>
            <Row className="justify-content-start">
                {
                    isLoading ? ( 
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
                    ) : (
                        items.length > 0 ? ( 
                            <>
                                <CardProductContainer title="" btnTitle="" pathText="" products={items}/> 
                            </>

                        ) : (
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                                <img src={CartImpty} alt="No Brand" style={{ width: "500px", height: "auto"}} />
                                <p  className="empty">لا يوجد منتجات مفضلة</p>
                            </div>  
                        )
                    )
                }
            </Row>
        </div>
    );
}
