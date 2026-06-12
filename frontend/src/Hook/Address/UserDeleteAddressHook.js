import { useDispatch, useSelector } from "react-redux";
import { deleteUserAddress, updateUserAddress } from "../../Redux/Reduser/UserAdressSliceReducer";
import { useEffect } from "react";
import notify from "../UseNotifaction";

export default function UserDeleteAddressHook(id) {
    const dispatch = useDispatch();
    console.log(id)

    const onDelete = async () => {
        await dispatch(deleteUserAddress(id))

    }
    
    const deletedAddress = useSelector((state) => state.userAddress.deleteAddress);
    const isLoading = useSelector((state) => state.userAddress.isLoading);
    const error = useSelector((state) => state.userAddress.error);
    
    useEffect(() => {
        if(!isLoading){
            if(error){
                notify("حدث خطاء في الحذف", "error");
            }else if(deletedAddress[0]?.data){
                console.log("the delete address", deletedAddress[0])
                if(deletedAddress[0]?.data?.status === "success"){

                    console.log("the delete address 28", deletedAddress[0])
                    notify("تم حذف العنوان بنجاح", "success");  
                    setTimeout(() => {
                        window.location.reload();
                        
                    }, 1000)  
                }
            }
        }
    },[isLoading])

    return [onDelete]
}