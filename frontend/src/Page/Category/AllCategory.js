import { Spinner } from "react-bootstrap";
import CategoryContainer from "../../Component/Category/CategoryContainer";
import Pagination from "../../Component/Utility/Pagination";
import AllCategoryPageHook from "../../Hook/Category/AllCategoryPageHook";
import CartImpty from "../../Image/CartImpty.png";

export default function AllCategory(){

    const [pageCount, getPage, allCategory, isLoading] = AllCategoryPageHook()
    return(
        <div style={{minHeight:"670px"}}>
            {
                isLoading ? (
                    <div style={{
                            display: "flex", 
                            justifyContent: "center", 
                            alignItems: "center", 
                            minHeight: "100vh"
                        }}>
                        <Spinner animation="border" role="status" style={{
                            width: "3rem", 
                            height: "3rem", 
                            color: "#3F4F44",
                            borderWidth: "0.4rem"
                        }} />
                    </div>
                ):( 
                    allCategory?.length > 0 ?(
                        <>
                            <CategoryContainer allCategory={allCategory} />
                            {
                                pageCount > 1 ? (<Pagination pageCount={pageCount} onPress={getPage}/>) : null  
                            }
                        </>
                    ):(
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                            <img src={CartImpty} alt="No Category" style={{ width: "600px", height: "auto"}} />
                            <p  className="empty">لا يوجد تصنيفات</p>
                        </div>  
                    )
                )
            }
            
        </div>
    )
}