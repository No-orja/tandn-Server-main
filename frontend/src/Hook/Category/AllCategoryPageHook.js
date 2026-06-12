import { useDispatch, useSelector } from "react-redux";
import { featchAllCategoryPage } from "../../Redux/Reduser/CategorySliceReducer";
import { useEffect } from "react";

export default function AllCategoryPageHook() {
    const dispatch = useDispatch();
    const limit = 24;

    useEffect(() => {
        dispatch(featchAllCategoryPage({page: 1, limit}));
    }, [dispatch]);

    const getPage = (page) => {
        dispatch(featchAllCategoryPage({page, limit}));
    };

    const categoryPage = useSelector((state) => state.allCategory.allCategoryPage); 
    const isLoading = useSelector((state) => state.allCategory.isLoading);
    const error = useSelector((state) => state.allCategory.error);

    let pageCount = 0;
    if (categoryPage?.paginationResult) {
        pageCount = categoryPage.paginationResult.numberOfPages;
    }

    useEffect(() => {
        if (!isLoading) {
            if (error) {
                console.log("❌ خطأ في جلب البيانات:", error);
            } else {
                console.log("✅ بيانات التصنيفات:", categoryPage);
            }
        }
    }, [isLoading, error, categoryPage]);

    let allCategory = [];
    if (categoryPage) {
        allCategory = categoryPage.data;
    }

    const getAll = () => {
        dispatch(featchAllCategoryPage({page: 1, limit}));
    };
    return [pageCount, getPage, allCategory, isLoading, getAll];
}
