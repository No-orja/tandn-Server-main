import { Container,Row, Spinner } from "react-bootstrap"
import SubTitle from "../Utility/SubTitle"

//COMPONENT
import BrandCard from "./BrandCard"
import BrandCardFeatchHook from "../../Hook/Brand/BrandCardFeatchHook"

export default function BrandCardComponent({title, btnTitle, pathText}){

    const  [isLoading, allBrand] = BrandCardFeatchHook()

    const colors =  ["#FFD3E8","#F4DBA5","#55CFDF","#FF6262","#0034FF","#FFD3E8"]

    return(
        <Container>
            <SubTitle title={title} btnTitle={btnTitle} pathText={pathText}/>
            <Row className="my-2 d-flex justify-content-center align-items-center">
            {isLoading ? (
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                ) : allBrand.length > 0 ? (
                    allBrand.map((brand, index) => (
                        <BrandCard
                            key={brand._id} 
                            title={brand.name}
                            img={brand.image} 
                            background={colors[index % colors.length]} 
                            id={brand._id}
                        />
                    ))
                ) : (
                    <p>No Brand available</p>
                )}
            </Row>
        </Container>
    )
}