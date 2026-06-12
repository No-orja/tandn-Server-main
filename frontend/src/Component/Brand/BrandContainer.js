import { Container,Row } from "react-bootstrap"
import BrandCard from "./BrandCard"

export default function BrandContainer({allBrand}){

    return(
        <Container style={{minHeight:"670px"}}>
            <div className="admin-conect-text mt-2" > كل الماركات الشهيرة</div>
            <Row className="my-1 d-flex justify-content-start">
                { 
                    allBrand?
                    (
                        allBrand.map((allBrand, index)=>(
                            <BrandCard key={allBrand._id} img={allBrand.image} id={allBrand._id} />
                        ))
                    ):(
                        (<p>No Brand available</p>) 
                    )
                }
            </Row>
        </Container>
    )
}