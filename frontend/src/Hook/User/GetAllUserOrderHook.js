import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getAllUserOrder } from "../../Redux/Reduser/CheckOutSliceReducer";

export default function GetAllUserOrderHook() {
    const dispatch = useDispatch();
    const user =JSON.parse(localStorage.getItem("user"))
    console.log("The user",user)
    let userName = ""
    if(user != null){
        userName = user.name
    }
    // فلترة الطلبات حسب الحالة: all / paid / notPaid / delivered / notDelivered
    const [filterStatus, setFilterStatus] = useState("all")

    // بناء الاستعلام من الفلتر المختار ورقم الصفحة
    const buildQuery = (status, page) => {
        let query = `page=${page}`
        if (status === "paid") query += "&isPaid=true"
        else if (status === "notPaid") query += "&isPaid=false"
        else if (status === "delivered") query += "&isDelivered=true"
        else if (status === "notDelivered") query += "&isDelivered=false"
        return query
    }

    useEffect(() => {
        const  get = async () => {
            await dispatch(getAllUserOrder())
        }
        get()
    },[])
    const isLoading = useSelector(state=>state.userOreder.isLoading)
    const resAllOrder = useSelector(state=>state.userOreder.getAllUserOrder)

    const allOrders = resAllOrder?.data || [];
    const pageCount = resAllOrder?.pagination?.totalPages || 1;

    const getPage = (page) => {
        dispatch(getAllUserOrder(buildQuery(filterStatus, page)))
    }

    // عند تغيير الفلتر نعيد الجلب ونرجع للصفحة الاولى
    const onFilterChange = (status) => {
        setFilterStatus(status)
        dispatch(getAllUserOrder(buildQuery(status, 1)))
    }
    return [userName, isLoading, allOrders, pageCount, getPage, filterStatus, onFilterChange]
}