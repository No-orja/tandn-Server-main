import { Col, Row } from "react-bootstrap";
import UserUpdateAddressHook from "../../Hook/Address/UserUpdateAddressHook";
import { ToastContainer } from "react-toastify";

export default function UserEditAdress(){

    const [onUpdate, alias, detalis, phone, onChangeAlias, onChangeDetalis, onChangePhone] = UserUpdateAddressHook();

    return(
        <div>
            <Row className="justify-content-start ">
                <div className="admin-content-text pb-2">تعديل العنوان </div>
                <Col sm="8">
                    <input
                        value={alias}
                        onChange={onChangeAlias}
                        type="text"
                        className="input-form d-block mt-3 px-3"
                        placeholder="تسمية العنوان مثلا(المنزل - العمل)"
                    />
                    <textarea
                        value={detalis}
                        onChange={onChangeDetalis}
                        className="input-form-area p-2 mt-3"
                        rows="4"
                        cols="50"
                    
                        placeholder="العنوان بالتفصيل"
                    />
                    <input
                        value={phone}
                        onChange={onChangePhone}
                        type="text"
                        className="input-form d-block mt-3 px-3"
                        placeholder="رقم الهاتف"
                    />
                </Col>
            </Row>
            <Row>
                <Col sm="8" className="d-flex justify-content-end ">
                    <button className="btn-save d-inline mt-2 " onClick={onUpdate}>حفظ تعديل العنوان</button>
                </Col>
            </Row>
            <ToastContainer/>
        </div>
    )
}