//Have to create modual fro delete and update
//create update slice and sedding new data

import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {featchDeletingProduct} from "../../Redux/Reduser/ProductSliceReducer"
import { useState } from "react";

//Modal
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function AdminAllProductsCard({product}){

    const [show, setShow] = useState(false);

    const handleDeleteClose = () => setShow(false);

    const handleDeleteConfime = async (productId) =>{

        setIsDeleted(false);
        await dispatch(featchDeletingProduct(productId));
        setIsDeleted(true)
    } 

    const [isDeleted, setIsDeleted] = useState(false)

    const dispatch = useDispatch()
    
    const handleDeleteClicked = () => {
        setShow(true);
    };
    
    if(isDeleted){
        return null
    }

    
    return(
        
        <Col xs="12" sm="6" md="5" lg="4" className="d-flex">


            <Modal show={show} onHide={handleDeleteClose}>
                
                {/* <Modal.Title>Modal heading</Modal.Title> */}
               
                <Modal.Body>هل انت متاكد من حذف المنح؟</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleDeleteClose}>
                    اغلاق
                </Button>
                <Button variant="primary" onClick={()=>handleDeleteConfime(product._id)}>
                    تاكيد
                </Button>
                </Modal.Footer>
            </Modal>
            <Card
            className="my-2 shadow-sm border-0 rounded-4 custom-card"
            style={{
                width: "100%",
                height: "350px",
                backgroundColor: "#fff",
                transition: "transform 0.2s ease-in-out",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
            <Row className="justify-content-end px-3 pt-2">
                <Col xs="auto">
                <div
                    className="btn btn-sm btn-danger me-2"
                    style={{ fontSize: "0.85rem" }}
                    onClick={handleDeleteClicked}
                >
                    إزالة
                </div>
                <Link to={`/admin/editproduct/${product._id}`}>
                    <div className="btn btn-sm btn-outline-primary" style={{ fontSize: "0.85rem" }}>
                    تعديل
                    </div>
                </Link>
                </Col>
            </Row>
            <Link to={`/products/${product._id}`} style={{ textDecoration: "none", color: "inherit" }}>
                <Card.Img
                style={{
                    height: "180px",
                    width: "100%",
                    objectFit: "contain",
                    padding: "10px",
                }}
                src={product.imageCover}
                />
                <Card.Body className="text-center px-3">
                <Card.Title className="fw-semibold fs-6">{product.title}</Card.Title>
                <Card.Text>
                    <div className="d-flex justify-content-between align-items-center">
                    <span className="badge bg-warning text-dark">{product.ratingsQuantity} تقييم</span>
                    <span className="text-success fw-bold">
                        ₪ {product.price}
                    </span>
                    </div>
                </Card.Text>
                </Card.Body>
            </Link>
            </Card>

    </Col>
    )
}