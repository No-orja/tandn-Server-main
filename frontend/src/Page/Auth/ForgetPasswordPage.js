import { Col, Container, Row } from "react-bootstrap";
import ForgetPasswordHook from "../../Hook/Auth/ForgetPasswordHook";
import { ToastContainer } from "react-toastify";

export default function ForgetPasswordPage() {
    const [email, onChangeEmail, onSubmit, isDisabled] = ForgetPasswordHook();
    return(
        <Container style={{ minHeight: "690px" }}>
        <Row className="py-5 d-flex justify-content-center ">
            <Col sm="12" className="d-flex flex-column ">
                <label className="mx-auto title-login">نسيت كلمة السر</label>
                <input
                    value={email}
                    onChange={onChangeEmail}
                    placeholder="ادخل الايميل..."
                    type="email"
                    className="user-input my-3 text-center mx-auto"
                />

                <button onClick={onSubmit} disabled={isDisabled} className="btn-login mx-auto mt-2">ارسال الكود</button>
                
            </Col>
        </Row>
        <ToastContainer />
    </Container>
    )
}