import { Container, Row } from "react-bootstrap";
import CategoryCard from "./CategoryCard";

export default function CategoryContainer({allCategory}){

    
    return(
        <Container>
            <div className="admin-conect-text mt-2" >كل التصنيفات</div>
            <Row className="my-2 d-flex justify-content-center align-items-center" style={{ minHeight: "300px" }}>
                { 
                    allCategory?
                    (
                        allCategory.map((category, index)=>(
                            <CategoryCard key={category._id} title={category.name} img={category.image}  id={category._id} />
                        ))
                    ):(
                        (<p>No Brand available</p>) 
                    )
                }
            </Row>

        </Container>
    )
}