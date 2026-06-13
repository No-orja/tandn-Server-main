import { Col, Container, Row } from "react-bootstrap";
import AdminSideBar from "../../Component/Admin/AdminSideBar";
import AdminAllBrand from "../../Component/Admin/AdminAllBrand";

export default function AdminAllBrandPage() {
    return (
        <Container>
            <Row className="py-3">
                <Col sm="3" xs="2" md="2">
                    <AdminSideBar />
                </Col>

                <Col sm="9" xs="10" md="10">
                    <AdminAllBrand />
                </Col>
            </Row>
        </Container>
    );
}
