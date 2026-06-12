import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import loginHook from '../../Hook/Auth/LoginHook'
import { ToastContainer } from 'react-toastify';

export default function LoginPage(){

    const [ email, onEmailChange, password, onPasswordChange, onSubmit, isDisabled, isLoading, formErrors] = loginHook();

    return(
        <div style={{minHeight:"670px"}}>
            <Container style={{ minHeight: "680px" }}>       
                <Row className="py-5 d-flex justify-content-center ">
                    <Col sm="12" className="d-flex flex-column justify-content-center ">
                        <label className="mx-auto title-login">تسجيل الدخول</label>
                        <input
                            value={email}
                            onChange={onEmailChange}
                            placeholder="الايميل..."
                            type="text"
                            className="user-input my-3 text-center mx-auto"
                        />
                        <input
                            value={password}
                            onChange={onPasswordChange}
                            placeholder="كلمه السر..."
                            type="password"
                            className="user-input text-center mx-auto"
                        />
                        <button className="btn-login mx-auto mt-4" onClick={onSubmit} disabled={isDisabled} >تسجيل الدخول</button>
                        <label className="mx-auto">
                            ليس لديك حساب ؟{" "}
                            <Link to="/register" style={{textDecoration:'none'}}>
                                <span style={{ cursor: "pointer" }} className="text-danger">
                                    اضغط هنا
                                </span>
                            </Link>
                        </label>
                        <label className="mx-auto ">

                            <Link to="/user/forgot-password" style={{textDecoration:'none'}}>
                                <span style={{ cursor: "pointer", color: "red" }} className="text-danger">
                                    نسيت كلمه السر 
                                </span>
                            </Link>
                        </label>
                    </Col>
                </Row>                       
                
            </Container>
            <ToastContainer />
        </div>                

    )
}