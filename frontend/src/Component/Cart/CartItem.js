import { Col, Row, ToastContainer } from "react-bootstrap";
import mobile from "../../Image/mobile.png"
import deleteicon from "../../Image/delete.png"

//Modal
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DeleteItemFromCartHook from "../../Hook/Cart/DeleteItemFromCartHook";

export default function CardIem({item}){

  const [show, handleDeleteClose, handelDeleteItem, handleDeleteClicked,itemCount , onChangeCount, handeleUpdateCart ] = DeleteItemFromCartHook(item)
  const imageUrl = (imageCover)=>{
    if(!imageCover) return mobile;
    return imageCover.startsWith('http') ? imageCover : `https://tandinshop-server-eight.vercel.app/products/${imageCover}`;
}

  return(
    <Col xs="12" className="cart-item-body my-2 d-flex px-2">

      <Modal show={show} onHide={handleDeleteClose}>
      {/*<Modal.Title>Modal heading</Modal.Title> */}
        <Modal.Body>هل انت متاكد من حذف المنح؟</Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={handleDeleteClose}>
            اغلاق
        </Button>
        <Button variant="primary" onClick={handelDeleteItem}>
            تاكيد
        </Button>
        </Modal.Footer>
      </Modal>
      
      <img
        width="160px"
        height="197px"
        src={imageUrl(item?.product?.imageCover)}
        alt=""
        style={{ objectFit: "contain", backgroundColor: "#fff", padding: "4px", borderRadius: "8px" }}
      />
      <div className="w-100">
        <Row className="justify-content-between">
          <Col sm="12" className=" d-flex flex-row justify-content-between">
            <div className="d-inline pt-2 cat-text">{item?.product?.category?.name}</div>
            <div className="d-flex pt-2 " style={{ cursor: "pointer" }}>
              <img src={deleteicon} alt="" width="20px" height="24px" onClick={handleDeleteClicked} />
            </div>
          </Col>
        </Row>
        <Row className="justify-content-center mt-2">
          <Col sm="12" className=" d-flex flex-row justify-content-start">
            <div className="d-inline pt-2 cat-title">
              {item?.product?.title || ""}
            </div>
            <div className="d-inline pt-2 cat-rate me-2">{item?.product?.ratingsAverage}</div>
          </Col>
        </Row>
        <Row>
          <Col sm="12" className="mt-1">
            <div className="cat-text d-inline">الماركة :</div>
            <div className="barnd-text d-inline mx-1">{ item?.product?.brand?.name} </div>
          </Col>
        </Row>
        <Row>
          <Col sm="12" className="mt-1 d-flex">
          {
            item?.color === "" ? null : (
              <div
                className="color ms-2 border"
                style={{ backgroundColor: item?.color}}>
              </div>                
            )
          }
          </Col>
        </Row>

        <Row className="justify-content-between">
          <Col sm="12" className=" d-flex flex-row justify-content-between">
            <div className="d-inline pt-2 d-flex">
              <div className="cat-text mt-2  d-inline">الكميه</div>
              <input
                value={itemCount}
                onChange={onChangeCount}
                className="mx-2 text-center"
                type="number"
                style={{ width: "60px", height: "40px" }}
              />
              <Button onClick={handeleUpdateCart} className='btn btn-dark' >تطبيق</Button>
            </div>
            <div className="d-inline pt-2 barnd-text">{item?.price} ₪</div>
          </Col>
        </Row>
      </div>
      <ToastContainer/>
    </Col>
  )
}