import { Row } from "react-bootstrap";
import SideBarSearchHook from "../../Hook/Search/SideBarSearchHook";

export default function SideFillter(){
    const [allCategory, allBrand, clickCategory, clickBrand] = SideBarSearchHook()
    
    return(
        <div className="mt-3">
            <Row>
                {/* Category */}
                <div className="d-flex flex-column mt-2">
                    <div className="filter-title">الفئة</div>
                        <div className="d-flex mt-3">
                        <input type="checkbox" value="0" onChange={clickCategory}/>
                        <div className="filter-sub me-2" >الكل</div>
                    </div>
                    {
                        allCategory.map((item, index) => (
                            <div key={index} className="d-flex mt-2">
                                <input type="checkbox" value={item._id} onChange={clickCategory} />
                                <div className="filter-sub me-2 ">{item.name}</div>
                            </div>
                        ))
                    }
                </div>
                {/* Brand */}
                <div className="d-flex flex-column mt-2">
                    <div className="filter-title mt-3">الماركة</div>
                        <div className="d-flex mt-3">
                        <input type="checkbox" value="" />
                        <div className="filter-sub me-2 ">الكل</div>
                    </div>
                    {
                        allBrand.map((item, index) => (
                            <div key={index} className="d-flex mt-2">
                                <input type="checkbox" value={item._id} onChange={clickBrand} />
                                <div className="filter-sub me-2 ">{item.name}</div>
                            </div>
                        ))
                    }
                </div>
        

                {/* Price */}
                <div className="filter-title my-3">السعر</div>
                <div className="d-flex">
                    <p className="filter-sub my-2">من:</p>
                    <input
                    className="m-2 text-center"
                    type="number"
                    style={{ width: "50px", height: "25px" }}
                    />
                </div>

                <div className="d-flex">
                    <p className="filter-sub my-2">الي:</p>
                    <input
                    className="m-2 text-center"
                    type="number"
                    style={{ width: "50px", height: "25px" }}
                    />
                </div>
                
            </Row>
      </div>
    )
}