//Redux
import { useDispatch, useSelector } from "react-redux";
import { featchAllCategory } from "../../Redux/Reduser/CategorySliceReducer";
import { featchAllSubCategory, featchOneSubCategory } from "../../Redux/Reduser/SubCategorySliceReducer";
import { featchAllBrand } from "../../Redux/Reduser/BrandSliceReducer";
import { featchAddProduct } from "../../Redux/Reduser/ProductSliceReducer";

// Hooks & Notifications
import notify from "../../Hook/UseNotifaction";
import { useEffect, useState } from "react";

export default function AddProductHook(){
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(featchAllBrand());
        dispatch(featchAllCategory());
        dispatch(featchAllSubCategory());
    }, []);

    const allCategory = useSelector((state) => state.allCategory.allCategory?.data ?? []);
    const oneSubCategory = useSelector((state) => state.allSubCategoy.allSubCategory?.data ?? []);
    const allBrand = useSelector((state) => state.allBrand.alBrand?.data ?? []);

    // State Management
    const [images, setImages] = useState([]);
    const [prodName, setProdName] = useState('');
    const [prodDescription, setProdDescription] = useState('');
    const [priceBefore, setPriceBefore] = useState("");
    const [qty, setQty] = useState("");
    const [CategoryID, setCategoryID] = useState('');
    const [BrandID, setBrandId] = useState('');
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showColor, setShowColor] = useState(false);
    const [colors, setColors] = useState([]);

    // Methods (Logic)
    const onImageChange = (imageList) => setImages(imageList);
    const onSelectCategory = async (e) => {
        if (e.target.value !== 0) {
            await dispatch(featchOneSubCategory(e.target.value));
        }
        setCategoryID(e.target.value);
    };
    useEffect(() => { if (CategoryID !== 0) setOptions(oneSubCategory); }, [CategoryID]);
    const onSelectBrand = (e) => setBrandId(e.target.value);
    const handleChangeComplete = (color) => setColors([...colors, color.hex]);
    const handleRemoveClick = (color) => setColors(colors.filter((e) => e !== color));

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!prodName || !prodDescription || !qty || !priceBefore || !CategoryID|| !BrandID || images.length === 0) {
            notify("يرجى ملء جميع الحقول المطلوبة", "warn");
            return;
        }

        // Create FormData Object
        const formData = new FormData();
        formData.append("title", prodName);
        formData.append("description", prodDescription);
        formData.append("quantity", Number(qty));
        formData.append("price", Number(priceBefore));
        formData.append("category", CategoryID);
        formData.append("imageCover", images[0].file);
        formData.append("brand", BrandID);

        colors.forEach((color) => formData.append("availableColors", color));
        // only valid subcategory ids — never send "undefined"
        options.forEach((item) => { if (item?._id) formData.append("subcategory", item._id); });
        // first image is the cover (sent above); only the REST go to images
        images.slice(1).forEach((img) => { if (img.file) formData.append("images", img.file); });
        // The server's product model defaults ratingsAverage to 0 but also enforces
        // min:1, so a create with no/0 rating is rejected ("Rating must be above or
        // equal 1.0"). Send the minimum valid value so creation succeeds. We do NOT
        // send ratingsQuantity (it defaults to 0 fine).
        formData.append("ratingsAverage", 1);

        console.log("🟢 Data being sent:", [...formData.entries()]);

        setLoading(true);
        try {
            const response = await dispatch(featchAddProduct(formData)).unwrap();
            console.log("✅ Product added successfully:", response);
            notify("تمت إضافة المنتج بنجاح", "success");
        } catch (error) {
            // error is now the server's response.data (see featchAddProduct rejectWithValue)
            console.error("❌ Error in submission (server said):", error);
            const serverMsg = error?.errors?.[0]?.msg || error?.message || "حدث خطأ أثناء الإضافة";
            notify(serverMsg, "error");
        }
        setLoading(false);
    };
    return [images, onImageChange,prodName, setProdName, prodDescription, setProdDescription,
            priceBefore, setPriceBefore,qty, setQty, onSelectCategory , allCategory, options, onSelectBrand,
            allBrand, colors, handleRemoveClick, setShowColor, showColor, handleChangeComplete, handleSubmit, loading 
    ]
}