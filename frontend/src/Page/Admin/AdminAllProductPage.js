import { Col, Container, Row} from "react-bootstrap";
import AdminSideBar from '../../Component/Admin/AdminSideBar'
import AdminAllProducts from '../../Component/Admin/AdminAllProducts'

export default function  AdminAllProductPage(){
    return(
        <Container>
            <Row className='py-3'>
                <Col sm="3" xs="2" md="2">
                    <AdminSideBar />
                </Col>

                <Col sm="9" xs="10" md="10" >
                    <AdminAllProducts/>
                </Col>
            </Row>
        </Container>
    )
}