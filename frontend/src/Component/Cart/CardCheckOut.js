import { Row, Col, Modal, Button } from 'react-bootstrap'
import {  useNavigate } from 'react-router-dom'
import ApplyCopuonHook from '../../Hook/Cart/ApplyCopuonHook'
import { ToastContainer } from 'react-toastify'
import DeleteAllProductFromCartHook from '../../Hook/Cart/DeleteAllProductFromCart'
import { useEffect } from 'react'
import notify from '../../Hook/UseNotifaction'

export default function CardCheckOut({items,tatalPrice, couponNameUsed, totalAfterDiscount}){

    const navigate = useNavigate()

    //Delete all product from cart hook
    const [handelDeleteCart, showDelete,handleDeleteClose, handelShowDelete ] = DeleteAllProductFromCartHook()
    
    //Copuon hook
    const [couponName, handleChangeCopon,handleConfirme, isDisabled]
        = ApplyCopuonHook()

    console.log("The copone from Check:")
    console.log(couponNameUsed)
    console.log(totalAfterDiscount)

    useEffect(()=>{
        if(couponNameUsed){
            handleChangeCopon(couponNameUsed)
        }

    },[couponNameUsed, totalAfterDiscount, couponName, handleChangeCopon])
    
    const handelClickCart = ()=>{
        if(items.data){
            navigate("/order/paymethoud")
        }else{
            notify("من فضلك اضف منتجات", "warn")
        }
    }
    return(
        <Row className="my-1 d-flex justify-content-center cart-checkout pt-3">

            <Modal show={showDelete} onHide={handleDeleteClose}>
                <Modal.Body>هل انت متاكد من السلة؟</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleDeleteClose}>
                        اغلاق
                    </Button>
                    <Button variant="primary" onClick={handelDeleteCart}>
                        تاكيد
                    </Button>
                </Modal.Footer>
            </Modal>

            <Col xs="12" className="d-flex  flex-column  ">
                <div className="d-flex  ">
                    <input
                        value={couponName}
                        onChange={(e)=>{handleChangeCopon(e.target.value)}}
                        className="copon-input d-inline text-center "
                        placeholder="كود الخصم"
                    />
                    <button className="copon-btn d-inline" onClick={handleConfirme} disabled={isDisabled}>تطبيق</button>
                </div>

                <div className="product-price d-inline w-100 my-3  border">
    
                    {
                        items?.numOfCartItems === 0?(
                            0
                        ):(
                            totalAfterDiscount >= 1 ?
                            (
                                `${totalAfterDiscount} جبنيه ، بعد الخصم`
                            ):(
                                `${tatalPrice} جبنيه`
                            )
                        )

                    }
                </div>
                  
                <button 
                    className="product-cart-add d-inline w-100 my-2" 
                    onClick={handelShowDelete} disabled={items?.numOfCartItems === 0}
                    >
                     مسح العربة
                </button>
                                
                <button 
                    className="product-cart-add d-inline w-100 px-2" 
                    onClick={handelClickCart} disabled={items?.numOfCartItems === 0}
                    >
                     اتمام الشراء
                </button>
            
            </Col>
            <ToastContainer/>
        </Row>
    )
}