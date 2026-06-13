import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    featchAllCategory,
    featchDeleteCategory,
    featchUpdateCategory,
} from "../../Redux/Reduser/CategorySliceReducer";
import notify from "../UseNotifaction";

// Feature hook for the admin Categories-management page.
// Returns a positional array (project convention) the component destructures.
export default function AdminAllCategoryHook() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(featchAllCategory());
    }, []);

    const res = useSelector((state) => state.allCategory.allCategory);
    const isLoading = useSelector((state) => state.allCategory.isLoading);

    let categories = [];
    if (res && res.data) categories = res.data;

    // delete modal state
    const [showDelete, setShowDelete] = useState(false);
    const [selected, setSelected] = useState(null);

    // edit modal state
    const [showEdit, setShowEdit] = useState(false);
    const [editName, setEditName] = useState("");
    const [editImageFile, setEditImageFile] = useState(null);

    const onEditImageChange = (e) => {
        if (e.target.files && e.target.files[0]) setEditImageFile(e.target.files[0]);
    };

    const openDelete = (item) => { setSelected(item); setShowDelete(true); };
    const closeDelete = () => setShowDelete(false);

    const openEdit = (item) => { setSelected(item); setEditName(item?.name || ""); setEditImageFile(null); setShowEdit(true); };
    const closeEdit = () => setShowEdit(false);

    const confirmDelete = async () => {
        if (!selected) return;
        const action = await dispatch(featchDeleteCategory(selected._id));
        setShowDelete(false);
        if (action.payload?.status === 200) {
            notify("تم حذف التصنيف بنجاح", "success");
            dispatch(featchAllCategory());
        } else {
            notify("حدث خطأ أثناء الحذف", "error");
        }
    };

    const confirmEdit = async () => {
        if (!selected) return;
        if (editName.trim() === "") { notify("من فضلك ادخل الاسم", "warn"); return; }
        // multipart: always send name; only send image if a new file was chosen
        // (otherwise the existing image is left untouched). Field key "image"
        // matches the add-category page.
        const formData = new FormData();
        formData.append("name", editName);
        if (editImageFile) formData.append("image", editImageFile);
        const action = await dispatch(featchUpdateCategory({ id: selected._id, formData }));
        setShowEdit(false);
        // useUpdateDataWithImage returns the body ({ data: {...} }) on success
        if (action.payload?.data?._id) {
            notify("تم تعديل التصنيف بنجاح", "success");
            dispatch(featchAllCategory());
        } else {
            notify("حدث خطأ أثناء التعديل", "error");
        }
    };

    return [
        categories, isLoading,
        showDelete, openDelete, closeDelete, confirmDelete,
        showEdit, openEdit, closeEdit, editName, setEditName, confirmEdit,
        selected, onEditImageChange,
    ];
}
