import React, { useEffect, useState } from 'react'
import { Navbar, Container, FormControl, Nav, NavDropdown } from 'react-bootstrap'
import logo from '../../Image/logo.png'
import login from '../../Image/login.png'
import cart from '../../Image/cart.png'
import NavBarSearchHook from '../../Hook/Search/NavBarSearchHook'
import GetAllUserHook from '../../Hook/Cart/GetAllUserHook'

const NavBarLogin = () => {

    const [onSearchWord, searchWord, onSearchSubmit] = NavBarSearchHook()
    const [user, setUser] = useState('')


    let userData = null;
    try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            userData = JSON.parse(storedUser);
        }
    } catch (error) {
        console.error("Error parsing user data:", error);
    }
        
    useEffect(() => {   
        if (userData) {
            setUser(userData);
        }
    }, []);
    

    const logOut = () => { 
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setUser('')
    }
    const[loading, getItem,couponNameUsed,totalAfterDiscount, nymberOfItems]= GetAllUserHook()
    return (
        <Navbar className="sticky-top" bg="dark" variant="dark" expand="sm">
            <Container>
                <Navbar.Brand>
                    <a href='/'>
                        <img src={logo} className='logo' alt="TandinShop" />
                    </a>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <FormControl
                        value={searchWord}
                        onChange={onSearchWord}
                        onKeyDown={onSearchSubmit}
                        type="search"
                        placeholder="ابحث..."
                        className="me-2 w-100 text-center"
                        aria-label="Search"
                    />
                    
                    <Nav className="me-auto">
                        {
                            user !== '' ? (
                                <NavDropdown title={user.name} id="basic-nav-dropdown">

                                    {
                                        user.role === "admin" ? (<NavDropdown.Item href="/admin/allproducts">لوحة التحكم</NavDropdown.Item>) : (<NavDropdown.Item href="/user/profile">الصفحه الشخصية</NavDropdown.Item>)
                                    }
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={logOut} href="/">تسجيل خروج</NavDropdown.Item>

                                </NavDropdown>
                            ) :
                                (<Nav.Link href='/login'
                                    className="nav-text d-flex mt-3 justify-content-center">
                                    <img src={login} className="login-img" alt="sfvs" />
                                    <p style={{ color: "white" }}>دخول</p>
                                </Nav.Link>)
                        }

                        <Nav.Link href='/cart' 
                            className="nav-text d-flex mt-3 justify-content-center position-relative"
                            style={{ color: "white" }}>

                            <img src={cart} className="login-img" alt="sfvs" />
                            <p style={{ color: "white" }}>العربه</p>
                            <span className="position-absolute top-10 start-100 translate-middle badge rounded-pill bg-danger fs-9">
                               {
                                   nymberOfItems? nymberOfItems : 0
                               }
                            </span>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBarLogin