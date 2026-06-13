import { Button, Modal, Spinner, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AdminAllBrandHook from "../../Hook/Brand/AdminAllBrandHook";
import avatar from "../../Image/avatar.png";

export default function AdminAllBrand() {
    const [
        brands, isLoading,
        showDelete, openDelete, closeDelete, confirmDelete,
        showEdit, openEdit, closeEdit, editName, setEditName, confirmEdit,
        selected, onEditImageChange,
    ] = AdminAllBrandHook();

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center">
                <div className="admin-conent-text">ادارة كل الماركات</div>
                <Link to="/admin/addbrand">
                    <div className="btn btn-dark btn-sm">اضف ماركة</div>
                </Link>
            </div>

            {/* Delete confirm modal */}
            <Modal show={showDelete} onHide={closeDelete}>
                <Modal.Header><Modal.Title>تاكيد الحذف</Modal.Title></Modal.Header>
                <Modal.Body>هل انت متاكد من حذف الماركة "{selected?.name}"؟</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeDelete}>تراجع</Button>
                    <Button variant="danger" onClick={confirmDelete}>حذف</Button>
                </Modal.Footer>
            </Modal>

            {/* Edit modal */}
            <Modal show={showEdit} onHide={closeEdit}>
                <Modal.Header><Modal.Title>تعديل الماركة</Modal.Title></Modal.Header>
                <Modal.Body>
                    <input
                        className="input-form d-block px-3 w-100"
                        placeholder="اسم الماركة"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                    />
                    <label className="d-block mt-3 mb-1">صورة الماركة (اختياري)</label>
                    <input
                        type="file"
                        accept="image/*"
                        className="d-block w-100"
                        onChange={onEditImageChange}
                    />
                    {selected?.image && (
                        <img
                            src={selected.image}
                            alt={selected?.name}
                            className="img-contain mt-2"
                            style={{ width: "80px", height: "80px", borderRadius: "8px" }}
                        />
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeEdit}>تراجع</Button>
                    <Button variant="dark" onClick={confirmEdit}>حفظ</Button>
                </Modal.Footer>
            </Modal>

            {isLoading ? (
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
                    <Spinner animation="border" role="status" style={{ width: "3rem", height: "3rem", color: "#3F4F44", borderWidth: "0.4rem" }} />
                </div>
            ) : (
                <Table responsive hover className="mt-3 text-center align-middle">
                    <thead>
                        <tr>
                            <th>الصورة</th>
                            <th>الاسم</th>
                            <th>تعديل</th>
                            <th>حذف</th>
                        </tr>
                    </thead>
                    <tbody>
                        {brands?.length >= 1 ? (
                            brands.map((item) => (
                                <tr key={item._id}>
                                    <td>
                                        <img
                                            src={item.image || avatar}
                                            alt={item.name}
                                            style={{ width: "60px", height: "60px", objectFit: "contain", backgroundColor: "#fff", borderRadius: "8px" }}
                                        />
                                    </td>
                                    <td>{item.name}</td>
                                    <td>
                                        <div className="btn btn-sm btn-outline-primary" onClick={() => openEdit(item)}>تعديل</div>
                                    </td>
                                    <td>
                                        <div className="btn btn-sm btn-danger" onClick={() => openDelete(item)}>حذف</div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="4"><p className="empty">لا يوجد ماركات</p></td></tr>
                        )}
                    </tbody>
                </Table>
            )}
            <ToastContainer />
        </div>
    );
}
