import { Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

export default function CategoryCard({ img, title, id }) {
  return (
    <Col xs="6" sm="6" md="4" lg="2" className="my-4 d-flex justify-content-around">
      <Card
        style={{
          width: '12rem',
          height: "190px",
          borderRadius: "40px",
          border: "none",
          boxShadow: "0px 0px 5px 0px rgba(180, 176, 176, 0.61)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link to={`/products/category/${id}`} style={{ textDecoration: "none", color: "inherit" }}>
          <Card.Img
            variant="top"
            src={img}
            style={{
              width: "100%",
              height: "150px",
              objectFit: "cover",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
            }}
          />
          <Card.Body style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            flexGrow: 1, // يسمح للعنصر بالتمدد دون دفع العنوان للخارج
          }}>
            <Card.Title style={{ textAlign: "center", fontSize: "14px", fontWeight: "bold" }}>{title}</Card.Title>
          </Card.Body>
        </Link>
      </Card>
    </Col>
  );
}
