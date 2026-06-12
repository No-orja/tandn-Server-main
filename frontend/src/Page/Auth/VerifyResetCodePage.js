import { Col, Container, Row } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import VerifyResetCodeHook from "../../Hook/Auth/VerifyResetCodeHook";

export default function VerifyResetCodePage() {
    const [code, OnChangeCode, onSubmit, isDisabled] = VerifyResetCodeHook();
    
    return(
        <Container style={{ minHeight: "690px" }}>
            <Row className="py-5 d-flex justify-content-center ">
                <Col sm="12" className="d-flex flex-column ">
                    <label className="mx-auto title-login">ادخل الكود المرسل فى الايميل</label>
                    <input
                        value={code}
                        onChange={OnChangeCode}
                        placeholder="ادخل الكود..."
                        type="email"
                        className="user-input my-3 text-center mx-auto"
                    />

                    <button onClick={onSubmit} disabled={isDisabled} className="btn-login mx-auto mt-2">تاكيد</button>

                </Col>

            </Row>
            <ToastContainer />
        </Container>
    )
}