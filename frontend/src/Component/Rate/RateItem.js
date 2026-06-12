import { Button, Col, Modal, Row } from "react-bootstrap";
import rate from "../../Image/rate.png"
import deleteicon from "../../Image/delete.png"
import edit from "../../Image/edit.png"

import { ToastContainer } from "react-toastify";
import DeleteReviewHook from "../../Hook/Review/DeleteReviewHook";
import UpdateReviewHook from "../../Hook/Review/UpdateReviewHook";
import ReactStars from 'react-rating-stars-component'

export default function RateItem({review}){

    const [isUser, showDelete,handelDelete, handleShow, handleClose] 
        = DeleteReviewHook(review)
        
    const  [showEdit,handleCloseEdit, handelEdit, handeleShowEdit,
        onChangeRateText, newRateText,OnChangeRateValue, newRateValue] 
        = UpdateReviewHook(review)

    const setting = {
        size: 20,
        count: 5,
        color: "#979797",
        activeColor: "#ffc107",
        value: newRateValue,
        a11y: true,
        isHalf: true,
        emptyIcon: <i className="far fa-star" />,
        halfIcon: <i className="fa fa-star-half-alt" />,
        filledIcon: <i className="fa fa-star" />,
        onChange: newValue => {
            OnChangeRateValue(newValue);
        }
    };

    return(
        <>
            <Modal show={showDelete} onHide={handleClose}>
                <Modal.Header >
                    <Modal.Title> <div className='font'>تاكيد الحذف</div></Modal.Title>
                </Modal.Header>
                <Modal.Body><div className='font'>هل انتا متاكد من حذف التقييم</div></Modal.Body>
                <Modal.Footer>
                    <Button className='font' variant="success" onClick={handleClose}>
                        تراجع
                    </Button>
                    <Button className='font' variant="dark" onClick={handelDelete}>
                        حذف
                    </Button>
                </Modal.Footer>
            </Modal>


            <Modal show={showEdit} onHide={handleCloseEdit}>
                <Modal.Header >
                    <Modal.Title> <div className='font'>تعديل التقييم</div></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ReactStars {...setting} />
                    <input
                        onChange={onChangeRateText}
                        value={newRateText}
                        type="text"
                        className='font w-100'
                        style={{ border: 'none' }}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button className='font' variant="success" onClick={handleCloseEdit}>
                        تراجع
                    </Button>
                    <Button className='font' variant="dark" onClick={handelEdit}>
                        تعديل
                    </Button>
                </Modal.Footer>
            </Modal>

            
            <div>
                <Row className="mt-3">
                    <Col className="d-flex me-5">
                        <div className="rate-name d-inline ms-2">{review.user.name}</div>
                        <img className="" src={rate} alt="" height="16px" width="16px" />
                        <div className="cat-rate d-inline ">{review.rating}</div>
                    </Col>
                </Row>
                
                <Row className="border-bottom mx-2">
                    <Col className="d-flex me-4 pb-2">
                        <div className="rate-description d-inline ms-2">
                            {review.review}
                        </div>

                        <div className='d-inline d-flex justify-content-end'>
                            {
                                isUser === true ? (<div className='d-inline d-flex justify-content-end'>
                                    <img src={deleteicon} onClick={handleShow} width="20px" height="20px" style={{ cursor: "pointer" }} alt="delete" />

                                    <img src={edit} onClick={handeleShowEdit} width="20px" height="20px" style={{ cursor: "pointer" }} alt="delete" />

                                </div>) : null
                            }
                        </div>
                    </Col>
                </Row>
            </div>
            <ToastContainer/>
        </>
    )
}