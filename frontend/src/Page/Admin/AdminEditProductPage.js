import { Col, Container, Row } from "react-bootstrap";
import AdminSideBar from "../../Component/Admin/AdminSideBar";
import AdminEditProducts from "../../Component/Admin/AdmitEditProduct";

export default function AdminAddProductsPage(){
    return(
        <Container>
            <Row className='py-3'>
                <Col sm="3" xs="2" md="2">
                    <AdminSideBar/>
                </Col>

                <Col sm="9" xs="10" md="10">
                    <AdminEditProducts/>
                </Col>
            </Row>
        </Container>
    )
}