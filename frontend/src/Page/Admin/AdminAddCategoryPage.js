import { Col, Container, Row } from "react-bootstrap";
import AdminSideBar from "../../Component/Admin/AdminSideBar";
import AdminAddCategory from "../../Component/Admin/AdminAddCategory"

export default function AdminAddCategoryPage(){
    return(
        <Container>
            <Row className='py-3'>
                <Col sm="3" xs="2" md="2">
                    <AdminSideBar/>
                </Col>

                <Col sm="9" xs="10" md="10">
                    <AdminAddCategory/>
                </Col>
            </Row>
        </Container>
    )
}