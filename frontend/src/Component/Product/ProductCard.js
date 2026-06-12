import React, { useEffect, useState } from 'react'
import { Card, Col } from 'react-bootstrap'
import favoff from "../../Image/fav-off.png";
import favon from "../../Image/fav-on2.png";
import rate from "../../Image/rate.png";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { featchAddWishListProduct, featchDeleteWishListProduct } from '../../Redux/Reduser/WishSliceReducer';

//REVEION THE CODE!!!
//Tommorows work
export default function ProductCard({favProd, item}) {

    const dispatch = useDispatch();
    const [favImg, setFavImg] = useState(favoff)
    let Fav = favProd.some(item => item === item._id);
    const [loadingAdd, setLoadingAdd] = useState(true)
    const [loadingRemove, setLoadingRemove] = useState(true)
    const [isFav, setIsFav] = useState(Fav)


    // useEffect(() => {
    //     setIsFav(favProduct.some(fitem => fitem === item._id))
    // }, [favProduct])

    const handelFav = () => {
        if (isFav) {
            removeToWishListData();
        } else {
            addToWishListData()
        }
    }

    useEffect(() => {

        if (isFav === true) {
            setFavImg(favon)
        }
        else {
            setFavImg(favoff)
        }

    }, [isFav])

    // const resAdd = useSelector(state => state.addToWishListReducer.addWishList)
    // const resRemove = useSelector(state => state.addToWishListReducer.removeWishList)

    const addToWishListData = async () => {
        
        setIsFav(true)
        setFavImg(favon)
        setLoadingAdd(true)
        await dispatch(featchAddWishListProduct({
            productId: item._id,
        }))
        setLoadingAdd(false)
    }

    const removeToWishListData = async () => {
        setIsFav(false)
        setFavImg(favoff)
        setLoadingRemove(true)
        await dispatch(featchDeleteWishListProduct(item._id))
        setLoadingRemove(false)

    }

    const imageUrl = (imageCover)=>{
        return imageCover.startsWith('http') ? item?.imageCover : `http://127.0.0.1:8000/products/${item.imageCover}`;
    }
    return (
        <Col xs="6" sm="6" md="4" lg="3" className="d-flex">
            <Card
                className="my-2"
                style={{
                    width: "100%",
                    height: "345px",
                    borderRadius: "8px",
                    border: "none",
                    backgroundColor: "#FFFFFF",
                    boxShadow: "2px 2px 2px 2px rgba(151,151,151,0.5)",
                }}>

                <Link to={`/products/${item?._id}`} style={{ textDecoration: "none" }}>
                    <Card.Img  style={{ height: "180px", width: "100%", objectFit: "contain" }} src={imageUrl(item?.imageCover)} />
                </Link>
                    
                <div className="d-flex justify-content-end mx-2">
                    <img
                        src={favImg}
                        onClick={handelFav} // عند النقر، يتم تغيير حالة المفضلة
                        alt="favorite icon"
                        className="text-center"
                        style={{
                            height: "24px",
                            width: "26px",
                            cursor: "pointer",
                        }}
                    />
                </div>
                <Card.Body>
                    <Card.Title>
                        <div className="card-title" >
                            {item?.title}
                        </div>
                    </Card.Title>
                    <Card.Text>
                        <span className="d-flex justify-content-between">
                            <span className="d-flex">
                                <img src={rate} alt="" height="16px" width="16px" />
                                <span className="card-rate mx-2">{item?.ratingsQuantity}</span>
                            </span>
                            <span className="d-flex">
                                <span className="card-price">{item?.price}</span>
                                <span className="card-currency mx-1">₪</span>
                            </span>
                        </span>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    )
}
