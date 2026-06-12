import * as React from 'react';
import { Container, Row, Spinner } from 'react-bootstrap';
import SubTitle from '../Utility/SubTitle';

//Component 
import CategoryCard from '../Category/CategoryCard';
import HomeCategoryHook from '../../Hook/Category/HomeCategoryHook';

export default function HomeCategory(){

    const [isLoading,allCategory ] = HomeCategoryHook()

    const colors = ["#FFD3E8","#F4DBA5","#55CFDF","#FF6262","#0034FF","#FFD3E8",]

    return(
        <Container>
            <SubTitle title="التصنيفات" btnTitle="المزيد" pathText="/allCategory"/>
            <Row className="my-2 d-flex justify-content-center align-items-center">
                {isLoading ? (
                    <Spinner animation="border" role="status">
                    </Spinner>
                ) : allCategory.length > 0 ? (
                    allCategory.map((category, index) => (
                        <CategoryCard
                            key={category._id} 
                            title={category.name}
                            img={category.image} 
                            background={colors[index % colors.length]} 
                            id={category._id}
                        />
                    ))
                ) : (
                    <p>No categories available</p>
                )}
            </Row>
        </Container>
    )
}