import { Container,Row } from "react-bootstrap"
import SubTitle from "../Utility/SubTitle"
import ProductCard from "./ProductCard"
import {  useState } from "react"

export default function CardProductContainer({title, btnTitle, pathText, products}){
    
    const [favProd, setFavProd] = useState([])

    // const res = useSelector(state => state.WishList.allWishList)
    // const isLoading = useSelector(state => state.WishList.isLoading)
    
    // useEffect(() => {
    //     const get = async () => {
    //         await dispatch(featchAllWishListProduct())
    //     }
    //     get();
    // }, [])


    // useEffect(() => {

    //     if (isLoading === false) {
    //         if (res.data?.length >= 1) {
    //             setFavProd(res.data.map(item => item._id))
    //         } else setFavProd([])
    //     }

    // }, [isLoading])

    return(
       <Container>
            <SubTitle title={title} btnTitle={btnTitle} pathText={pathText}/>
            <Row className="my-2 me-3 d-flex justify-content-start">
                {
                    
                    products?.map((item, index)=>(
                        <ProductCard favProd={favProd} key={index} item={item}/>
                    ))
                }
                
            </Row>
        </Container>
    )
}