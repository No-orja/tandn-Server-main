//Redux
import { useDispatch, useSelector } from "react-redux";
import { featchAllCategory } from "../../Redux/Reduser/CategorySliceReducer";
import { featchAllSubCategory, featchOneSubCategory } from "../../Redux/Reduser/SubCategorySliceReducer";
import { featchAllBrand } from "../../Redux/Reduser/BrandSliceReducer";
import {featchGittingSpecificProduct, featchUpdatingProduct } from "../../Redux/Reduser/ProductSliceReducer";

// Hooks & Notifications
import notify from "../../Hook/UseNotifaction";
import { useEffect, useState } from "react";

export default function EditProductHook(id){

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(featchAllBrand());
        dispatch(featchAllCategory());
        dispatch(featchAllSubCategory());
        dispatch(featchGittingSpecificProduct(id))
    }, []);

    const item =  useSelector((state) => state.allProduct.selectedProduct);
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
    const [subCatID, setSubCatID] = useState([])
    const [BrandID, setBrandID] = useState('');
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showColor, setShowColor] = useState(false);
    const [colors, setColors] = useState([]);


    
    useEffect(() => {
        if (!item || !item.data) {
            dispatch(featchGittingSpecificProduct(id));
            return; // ✅ إذا لم يكن المنتج محملًا، لا تقم بتعيين الصور الآن
        }
        if (item.data) {

            let updatedImages = [];

            // ✅ إضافة `images` إذا كانت موجودة
            if (item.data.images && item.data.images.length > 0) {
                updatedImages = item.data.images.map((imgUrl) => ({ data_url: imgUrl, file: null }));
            }
        
            // ✅ إضافة `imageCover` إلى `images` ليكون دائمًا الصورة الأولى
            if (item.data.imageCover) {
                updatedImages.unshift({ data_url: item.data.imageCover, file: null });
            }
        
            setImages(updatedImages); // ✅ تحديث الصور مع `imageCover`
            console.log("📸 الصور بعد التحديث:", updatedImages);

            setProdName(item.data.title)
            setProdDescription(item.data.description)
            setPriceBefore(item.data.price)
            setQty(item.data.quantity)
            setCategoryID(item.data.category)
            setBrandID(item.data.brand)
            setColors(item.data.availableColors)
            setOptions(item.data.subcategory);
        }
    }, [item])
    
    
    
    // Methods (Logic)
    const onImageChange = (imageList) => {
        setImages(imageList); // ✅ تحديث الصور الجديدة فقط وعدم حذف القديمة عند التحميل الأولي
    };
    
    


    const onSelectCategory = async (e) => {
        
        setCategoryID(e.target.value);
    };

    useEffect(() => { 
        if(CategoryID !== 0 ){

            const run = async()=>{
                await dispatch(featchOneSubCategory(CategoryID));
            }
            run()
        
        }
    }, [CategoryID]);

    useEffect(()=>{
        if(oneSubCategory){
            setOptions(oneSubCategory)
        }

    },[oneSubCategory])
    

    const onSelectBrand = (e) => setBrandID(e.target.value);
    const handleChangeComplete = (color) => setColors([...colors, color.hex]);
    const handleRemoveClick = (color) => setColors(colors.filter((e) => e !== color));

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (!prodName || !prodDescription || !qty || !priceBefore || !CategoryID || !BrandID) {
            notify("يرجى ملء جميع الحقول المطلوبة", "warn");
            return;
        }
    
        // ✅ التحقق من الصور قبل الإرسال
        if (!images.length) {
            notify("يرجى إضافة صورة الغلاف على الأقل", "error");
            return;
        }
        
    
        const formData = new FormData();
        formData.append("title", prodName);
        formData.append("description", prodDescription);
        formData.append("quantity", Number(qty));
        formData.append("price", Number(priceBefore));
        formData.append("category", CategoryID);
        formData.append("brand", BrandID);
    
        // ✅ التأكد من عدم إرسال `null`
        if (images[0]?.file) {
            formData.append("imageCover", images[0].file);
        } else if (images[0]?.data_url && !images[0]?.file) {
            formData.append("imageCover", images[0].data_url); // ✅ إرسال رابط الصورة فقط إذا لم يتم رفع صورة جديدة
        }
    
        colors.forEach((color) => formData.append("availableColors", color));
        options.forEach((item) => formData.append("subcategory", item._id));
    
        images.slice(1).forEach((img) => {
            if (img.file) {
                formData.append("images", img.file);
            } else if (img.data_url && !img.file) {
                formData.append("images", img.data_url); // ✅ الاحتفاظ برابط الصورة فقط إذا لم يتم رفع صورة جديدة
            }
        });
    
        console.log("🟢 البيانات المرسلة بعد الإصلاح:", [...formData.entries()]);
    
        setLoading(true);
        try {
            const response = await dispatch(featchUpdatingProduct({ id, formData })).unwrap();
            console.log("✅ المنتج تم تحديثه بنجاح:", response);
            notify("تم تحديث المنتج بنجاح", "success");
        } catch (error) {
            console.error("❌ خطأ أثناء الإرسال:", error);
            notify("حدث خطأ أثناء التحديث", "error");
        }
        setLoading(false);
    };
    
    return [images, onImageChange,prodName, setProdName, prodDescription, setProdDescription,
            priceBefore, setPriceBefore,qty, setQty, onSelectCategory , allCategory, options, onSelectBrand,
            allBrand, colors, handleRemoveClick, setShowColor, showColor, handleChangeComplete, handleSubmit, loading , CategoryID,BrandID,item
    ]
}