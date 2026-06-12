import { Spinner } from "react-bootstrap";
import BrandContainer from "../../Component/Brand/BrandContainer";
import Pagination from "../../Component/Utility/Pagination";
import AllBrandPageHook from "../../Hook/Brand/AllBrandPageHook"
import CartImpty from "../../Image/CartImpty.png"
export default function AllBrand(){
    const [pageCount, getPage, allBrand, isLoading] = AllBrandPageHook()
    
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
                    allBrand?.liength > 0 ?(
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                            <img src={CartImpty} alt="No Brand" style={{ width: "600px", height: "auto"}} />
                            <p  className="empty">لا يوجد براندات</p>
                        </div>                        
                    ):(
                        <BrandContainer allBrand={allBrand}/>
                    )
                )
            }
            {
                pageCount > 1 ? (<Pagination pageCount={pageCount} onPress={getPage}/>): null
            }

        </div>
    )
}