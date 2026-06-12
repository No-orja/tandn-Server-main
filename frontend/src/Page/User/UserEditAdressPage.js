import { Col, Container, Row } from "react-bootstrap";
import UserSideBar from "../../Component/User/UserSideBar"
import UserEditAdress from "../../Component/User/UserEditAdress";
export default function UserEditAdressPage(){
    
    return(
        <Container>
            <Row className='py-3'>
                <Col sm="3" xs="2" md="2">
                    <UserSideBar />
                </Col>

                <Col sm="9" xs="10" md="10">
                    <UserEditAdress />
                </Col>
            </Row>
        </Container>
    )
}