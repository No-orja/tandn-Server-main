import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserAddress } from "../../Redux/Reduser/UserAdressSliceReducer";

export default function UserALLAddessHook(){
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllUserAddress())
    }, [dispatch]);

    const allAddress = useSelector((state) => state.userAddress.allAddresses);

    return[allAddress]
}