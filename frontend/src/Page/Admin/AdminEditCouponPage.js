import { Col, Container, Row } from "react-bootstrap";
import AdminSideBar from "../../Component/Admin/AdminSideBar";
import AdminEditCoupon from "../../Component/Admin/AdminEditCoupon";

export default function AdminEditCouponPage(){
    return(
        <Container>
            <Row className='py-3'>
                <Col sm="3" xs="2" md="2">
                    <AdminSideBar />
                </Col>

                <Col sm="9" xs="10" md="10">
                    <AdminEditCoupon/>
                </Col>
            </Row>
        </Container>
    )
}