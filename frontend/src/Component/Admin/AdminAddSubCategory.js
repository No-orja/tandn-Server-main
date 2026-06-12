import { Col, Row } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
//Hook
import AddSubCategryHook from "../../Hook/SubCategory.js/AddSubCategryHook";
//Rep the name category!!!!

export default function AdminAddSubCategory(){
    
    const [name,allCategory,handelChange, handelChangenName, handelSubmit] = AddSubCategryHook()
    console.log(allCategory, "in the AdminAddSubCategory)")

    return(
        <div>
            <Row className="justify-content-start ">
                <div className="admin-content-text pb-4">اضافه تصنيف فرعي جديد</div>
                <Col sm="8">
                    <input
                        value={name}
                        onChange={handelChangenName}
                        type="text"
                        className="input-form d-block mt-3 px-3"
                        placeholder="اسم التصنيف الفرعي"
                    />
                    <select name="Category" id="cart" className="select mt-3 px-2 " onChange={handelChange}>
                        <option value="0">اختر التصنيف الرئيسي</option>
                        {allCategory?
                            (
                                allCategory.map((category, index)=>(

                                    <option key={category._id} value={category._id}>
                                        {category.name}
                                    </option>
                                ))
                            ):(
                                <p>No option available</p>
                            )
                        }  
                    </select>
                </Col>
            </Row>
            <Row>
                <Col sm="8" className="d-flex justify-content-end ">
                    <button className="btn-save d-inline mt-2 " onClick={handelSubmit}>حفظ التعديلات</button>
                </Col>
            </Row>
            <ToastContainer/>
        </div>
    )
}