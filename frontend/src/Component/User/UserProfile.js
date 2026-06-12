import { Button, Col, Row } from "react-bootstrap";
import editicon from "../../Image/edit.png";
import Modal from 'react-bootstrap/Modal';
import { ToastContainer } from "react-toastify";
import UpdateUserDataHook from "../../Hook/User/UpdateUserDataHook";
import UpdateUserPassHook from "../../Hook/User/UpdateUserPassHook";

export default function UserSidePage() {
     
    const [show,handleUpdateClose, handleUpdateConfime, handleUpdateShow,  onChangeNewName, 
        onChangeEmail , name, email, phone, onChangeNewPhone]
        = UpdateUserDataHook()

    const [oldPassword,newPassword, newPasswordConfirm,onChangePassword, 
        onChangeNewPassword , onChangeNewPasswordConfirm , handleSavePassword]
        = UpdateUserPassHook()
    return (
        
        <div>
            <Modal show={show} onHide={handleUpdateClose}>               
                <Modal.Header >
                    <Modal.Title> <div className='font'>تعديل المعلومات الشخصية </div></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input
                        onChange={onChangeNewName}
                        value={name}
                        placeholder=" الاسم"
                        type="text"
                        className='font w-100'
                        style={{ border: 'none' }}
                    />
                    <input
                        onChange={onChangeEmail}
                        value={email}
                        placeholder=" الايميل"
                        type="text"
                        className='font w-100'
                        style={{ border: 'none' }}
                    />
                    <input
                        onChange={onChangeNewPhone}
                        value={phone}
                        placeholder="الرقم"
                        type="text"
                        className='font w-100'
                        style={{ border: 'none' }}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleUpdateClose}>
                        اغلاق
                    </Button>
                    <Button variant="primary" onClick={()=>handleUpdateConfime()}>
                        تاكيد
                    </Button>
                </Modal.Footer>
            </Modal>
            
            <div className="admin-content-text">الصفحه الشخصية</div>
            <div className="user-address-card my-3 px-2">
                <Row className="d-flex justify-content-between pt-2">
                    <Col xs="6" className="d-flex">
                        <div className="p-2">الاسم:</div>
                        <div className="p-1 item-delete-edit">{name}</div>
                    </Col>
                    <Col xs="6" className="d-flex justify-content-end">
                        <div className="d-flex mx-2">
                            <img
                                alt=""
                                className="ms-1 mt-2"
                                src={editicon}
                                height="17px"
                                width="15px"
                            />
                            <span className="item-delete-edit" onClick={handleUpdateShow}> تعديل</span>
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col xs="12" className="d-flex">
                        <div className="p-2">رقم الهاتف:</div>
                        <div className="p-1 item-delete-edit">{phone}</div>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" className="d-flex">
                        <div className="p-2">الايميل:</div>
                        <div className="p-1 item-delete-edit">{email}</div>
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col xs="10" sm="8" md="6">
                        <div className="admin-content-text">تغير كملة المرور</div>
                        <input
                            type="password"
                            value={oldPassword}
                            onChange={onChangePassword}
                            className="input-form d-block mt-1 px-3"
                            placeholder="ادخل كلمة المرور القديمة"
                        />
                        <input
                            value={newPassword}
                            onChange={onChangeNewPassword}
                            type="password"
                            className="input-form d-block mt-3 px-3"
                            placeholder="ادخل كلمة المرور الجديده"
                        />
                        <input
                            value={newPasswordConfirm}
                            onChange={onChangeNewPasswordConfirm}
                            type="password"
                            className="input-form d-block mt-3 px-3"
                            placeholder="تاكثد كلمة المرور"
                        />
                    </Col>
                </Row>

                <Row>
                    <Col xs="10" sm="8" md="6" className="d-flex justify-content-end">
                        <button className="btn-save d-inline mt-2" onClick={handleSavePassword}>حفظ كلمة السر</button>
                    </Col>
                </Row>
            </div>
            <ToastContainer/>
        </div>
    );
}
