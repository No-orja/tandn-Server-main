import { useParams } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { Col, Row } from "react-bootstrap"
import add from '../../Image/add.png';
import ImageUploading from 'react-images-uploading';
import Multiselect from 'multiselect-react-dropdown';
import { CompactPicker } from "react-color"
import EditProductHook from "../../Hook/Product/EditProductHook"


export default function AdminEditProducts(){

    const {id} = useParams()
    console.log(id) 
    
        const [images, onImageChange,prodName, setProdName, prodDescription, setProdDescription,
                priceBefore, setPriceBefore,qty, setQty, onSelectCategory , allCategory, options, onSelectBrand,
                allBrand, colors, handleRemoveClick, setShowColor, showColor, handleChangeComplete, handleSubmit, loading ,CategoryID,BrandID,item
            ] = EditProductHook(id)
    return (
        <>
            <div>
                <Row className="justify-content-start">
                    <div className="admin-content-text pb-4">تعديل المنتج {item?.data?.title}</div>
                    <Col sm="8">
                        <ImageUploading multiple value={images} onChange={onImageChange} maxNumber={5} dataURLKey="data_url">
                            {({ imageList, onImageUpload, onImageRemove }) => (
                                <div>
                                    <button onClick={onImageUpload}>رفع صور</button>
                                    <div className="image-preview">
                                        {imageList.map((image, index) => (
                                            <div key={index} className="image-item">
                                                <img src={image.data_url} alt="" width="100" />
                                                <button onClick={() => onImageRemove(index)}>حذف</button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </ImageUploading>

                        <input type="text" className="input-form d-block mt-3 px-3" placeholder="اسم المنتج" value={prodName} onChange={(e) => setProdName(e.target.value)} />
                        <textarea className="input-form-area p-2 mt-3" rows="4" cols="50" placeholder="وصف المنتج" value={prodDescription} onChange={(e) => setProdDescription(e.target.value)} />
                        <input type="number" className="input-form d-block mt-3 px-3" placeholder="السعر قبل الخصم" value={priceBefore} onChange={(e) => setPriceBefore(e.target.value)} />
                        <input type="number" className="input-form d-block mt-3 px-3" placeholder="الكمية المتاحة" value={qty} onChange={(e) => setQty(e.target.value)} />

                        {/* Select Category */}
                        <select name="mainCategory" onChange={onSelectCategory} className="select input-form-area mt-3 px-2" value={CategoryID}>
                            <option value="val">التصنيف الرئيسي</option>
                            {allCategory.map((category) => (
                                <option key={category._id} value={category._id}>{category.name}</option>
                            ))}
                        </select>

                        <Multiselect className="mt-2 text-end"  placeholder="التصنيف الفرعي" options={options} displayValue="name" style={{ color: "red" }} />

                        {/* Select Brand */}
                        <select name="brand" onChange={onSelectBrand} className="select input-form-area mt-3 px-2" value={BrandID}>
                            <option value="val">الماركة</option>
                            {allBrand.map((brand) => (
                                <option key={brand._id} value={brand._id}>{brand.name}</option>
                            ))}
                        </select>

                        {/* Select Color */}
                        <div className="text-form mt-3">الألوان المتاحة</div>
                        <div className="mt-1 d-flex">
                            {colors.map((color, index) => (
                                <div key={index} className="color ms-2 border mt-1" style={{ backgroundColor: color }} onClick={() => handleRemoveClick(color)}></div>
                            ))}
                            <img src={add} alt="" width="30px" height="35px" style={{ cursor: "pointer" }} onClick={() => setShowColor(!showColor)} />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col sm="6">
                        {showColor && <CompactPicker onChangeComplete={handleChangeComplete} />}
                    </Col>
                    <Col sm="6">
                        <button className="btn-save mt-2" onClick={handleSubmit} disabled={loading}>حفظ المنتج</button>
                    </Col>
                </Row>
                <ToastContainer />
            </div>
        </>
        
    )
}