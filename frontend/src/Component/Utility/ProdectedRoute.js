import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({auth,children}) {
    if (auth === undefined) {
        return null; // لا نعرض أي شيء حتى يتم تحميل القيم
    }
    if(!auth){
        return <Navigate to="/" replace/>
    }
    return children? children : <Outlet/>
}