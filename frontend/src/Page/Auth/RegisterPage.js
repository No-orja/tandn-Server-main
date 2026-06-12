import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import RegisterHook from '../../Hook/Auth/RegisterHook';
import { ToastContainer } from 'react-toastify';

export default function RegisterPage() {
    const  [name,onUserNameChange,email,onEmailChange,phone,onPhoneNumberChange,password,onPasswordChange,passwordConfirm,
            onPasswordConfermChange,onSubmit,isDisabled,formErrors] = RegisterHook();
    return (
        <Container style={{ minHeight: "680px" }}>
            <Row className="py-5 d-flex justify-content-center hieght-search">
                <Col sm="12" className="d-flex flex-column" style={{ alignItems: "center" }}>
                  <label className="mx-auto title-login">تسجيل حساب جديد</label>

                    {/* حقل اسم المستخدم */}
                    <input
                        value={name}
                        onChange={onUserNameChange}
                        placeholder="اسم المستخدم..."
                        type="text"
                        className={`user-input mt-3 text-center mx-auto`}
                        style={typeof formErrors.name == "string"? {border: "2px solid red"} : {}}
                    />
                    {formErrors.name && <span className="text-red-500 text-sm" style={{ color: "red"}}>{formErrors.name}</span>}

                    {/* حقل البريد الإلكتروني */}
                    <input
                      type="text"
                      value={email}
                      onChange={onEmailChange}
                      placeholder="الايميل..."
                      className={`user-input mt-3 text-center mx-auto`}
                      style={typeof formErrors.email == "string"? {border: "2px solid red"} : {}}
                    />
                  {formErrors.email && <span className="text-red-500 text-sm block "style={{ color: "red"}}>{formErrors.email}</span>}

                    {/* حقل رقم الهاتف */}
                    <input
                        value={phone}
                        onChange={onPhoneNumberChange}
                        placeholder="رقم الهاتف.."
                        type="number"
                        className={`user-input mt-3 text-center mx-auto`}
                        style={typeof formErrors.phone == "string"? {border: "2px solid red"} : {}}
                    />
                    {formErrors.phone && <span className="text-red-500 text-sm" style={{ color: "red"}}>{formErrors.phone}</span>}

                    {/* حقل كلمة السر */}
                    <input
                        value={password}
                        onChange={onPasswordChange}
                        placeholder="كلمه السر..."
                        type="password"
                        className={`user-input text-center mt-3 mx-auto`}
                        style={typeof formErrors.password == "string"? {border: "2px solid red"} : {}}
                    />
                    {formErrors.password && <span className="text-red-500 text-sm" style={{ color: "red"}}>{formErrors.password}</span>}

                    {/* حقل تأكيد كلمة السر */}
                    <input
                        value={passwordConfirm}
                        onChange={onPasswordConfermChange}
                        placeholder="تأكيد كلمه السر..."
                        type="password"
                        className={`user-input text-center mt-3 mx-auto`}
                        style={typeof formErrors.passwordConfirm == "string"? {border: "2px solid red"} : {}}
                    />
                    {formErrors.passwordConfirm && <span className="text-red-500 text-sm" style={{ color: "red"}}>{formErrors.passwordConfirm}</span>}

                    {/* زر تسجيل الحساب */}
                    <button className="btn-login mx-auto mt-4" onClick={onSubmit} disabled={isDisabled}>
                        تسجيل الحساب
                    </button>

                    <label className="mx-auto my-4">
                        لديك حساب بالفعل؟{" "}
                        <Link to="/login" style={{ textDecoration: "none" }}>
                            <span style={{ cursor: "pointer" }} className="text-danger">اضغط هنا</span>
                        </Link>
                    </label>
                </Col>
            </Row>
            <ToastContainer />
        </Container>
    );
}
