import { Col, Row } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import AddBrandHook from "../../Hook/Brand/AddBrandHook"

export default function AdminAddBrand(){
    const [image, onImageChange, name, onNameChange, handelSubmit]  = AddBrandHook()
    return(
        <div>
            <Row className="justify-content-start ">
                <div className="admin-content-text pb-4">اضف ماركه جديده</div>
                <Col sm="8">
                    <div className="text-form pb-2">صوره الماركه</div>
                    <div>
                        <label for="upload-photo">
                            <img src={image} alt="" height="100px" width="120px" style={{ cursor: "pointer" }}/>
                            <input
                                type="file"
                                name="photo"
                                onChange={onImageChange}
                                id="upload-photo"
                                accept="image/*"
                            />
                        </label>
                    </div>
                    
                    <input
                        type="text"
                        onChange={onNameChange}
                        value={name}
                        className="input-form d-block mt-3 px-3"
                        placeholder="اسم الماركه"
                    />
                </Col>
            </Row>
            <Row>
                <Col sm="8" className="d-flex justify-content-end ">
                    <button className="btn-save d-inline mt-2 " onClick={handelSubmit}>حفظ التعديلات</button>
                </Col>
            </Row>
            {/* {
                isPress? loading? (<h4>جاري التحميل </h4>) :(<h4>تم الانهتاء</h4>): null
            } */}
            {/* {loading && (
                <Row className="mt-3">
                    <Col sm="8">
                        <ProgressBar now={progress} label={`${progress}%`} animated striped />
                    </Col>
                </Row>
            )} */}
            <ToastContainer />
        </div>
    )
}