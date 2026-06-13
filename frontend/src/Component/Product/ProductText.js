import { Col, Row } from "react-bootstrap";

//Redux
import { featchSpicificCategory } from "../../Redux/Reduser/CategorySliceReducer";
import { featchSpicificBrand } from "../../Redux/Reduser/BrandSliceReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import AddToCartHook from "../../Hook/Cart/AddToCartHook";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function ProductText({products}){
    const {id} = useParams()

    console.log("Products from product text", products)
    const dispatch = useDispatch()

    useEffect(()=>{
      if(products){
        dispatch(featchSpicificCategory(products.category))
        dispatch(featchSpicificBrand(products.brand))
      }
    },[dispatch, products.category, products.brand])
  
    const specificCategory = useSelector((state) => state.allCategory.spicificCategory.data);
    console.log("specificCategory", specificCategory)
    const specificBrand = useSelector((state) => state.allBrand.spicificBrand.data); 
    console.log("specificBrand", specificBrand)

    const  [indexColor, colorClick, handelAddCliced] = AddToCartHook(id, products)

    return(
        <div>
        <Row className="mt-2">
          <div className="cat-text">
            {specificCategory? 
              (specificCategory.name):(null)
            }
          </div>
        </Row>
        <Row>
          <Col md="8">
            <div className="cat-title d-inline">
              {products.title}
              <div className="cat-rate d-inline mx-3">{products.ratingsQuantity}</div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md="8" className="mt-4">
            <div className="cat-text d-inline">الماركة :</div>
            {specificBrand?
              (specificBrand.name):(null)
            }
          </Col>
        </Row>
        <Row>
          <Col md="8" className="mt-1 d-flex">

            {products.availableColors ? 
              products.availableColors.map((color, index) => (
                <div 
                  key={index} 
                  onClick={() => {colorClick(index, color)}}
                  className="color ms-2"
                  style={{ backgroundColor: color, width: "30px", height: "30px", borderRadius: "50%", border: indexColor===index ? "3px solid #272727" :"none" }}
                ></div>
              ))
              : null
            }
            
          </Col>
        </Row>
  
        <Row className="mt-4">
          <div className="cat-text">المواصفات :</div>
        </Row>
        <Row className="mt-2">
          <Col md="10">
            <div className="product-description d-inline">
                {products.description}
            </div>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col md="12">
            <div className="product-price d-inline px-3 py-3 border">{products.price} ₪</div>
            <div className="product-cart-add px-3 py-3 d-inline mx-3" onClick={handelAddCliced}>اضف للعربة</div>
          </Col>
        </Row>
        <ToastContainer/>
      </div>
    )
}