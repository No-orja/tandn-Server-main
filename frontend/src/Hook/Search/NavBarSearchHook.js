import { useEffect, useState } from "react"
import RiewSearchProductHook from "../Product/RiewSearchProductHook"
import { debounce } from "lodash";

export default function NavBarSearchHook(){

    const [allProduct,item,pagination, onPress, getProduct, seartch, isLoading] = RiewSearchProductHook()

    // نقرأ كلمة البحث من الرابط حتى لا تضيع بعد اعادة تحميل الصفحة
    const [searchWord, setSearchWord] = useState(
        new URLSearchParams(window.location.search).get("keyword") || ''
    )

    //Method to get the search word from the user
    const onSearchWord = (e) => {
        setSearchWord(e.target.value)
    }

    // عند الضغط على Enter ننتقل لصفحة المنتجات مع كلمة البحث في الرابط,
    // we don't use useNavigate because navBar is not a route(outside the BrowserRouter)
    const onSearchSubmit = (e) => {
        if (e.key !== "Enter") return
        e.preventDefault()
        const word = searchWord.trim()
        if (window.location.pathname !== '/products') {
            window.location.href = word ? `/products?keyword=${encodeURIComponent(word)}` : "/products"
        } else {
            getProduct(word)
        }
    }
    // دالة البحث مع تأخير التنفيذ حتى يتوقف المستخدم عن الكتابة لمدة 500ms
    // البحث المباشر يعمل فقط داخل صفحة المنتجات (نفس الـ store)
    const debouncedSearch = debounce(() => {
        if (window.location.pathname === '/products') {
            getProduct(searchWord.trim());
        }
    }, 500);

    useEffect(() => {
        debouncedSearch(); // تشغيل البحث بعد التأخير
        return () => debouncedSearch.cancel(); // تنظيف عند إلغاء التأثير
    }, [searchWord]);

    return [onSearchWord, searchWord, onSearchSubmit]
}
