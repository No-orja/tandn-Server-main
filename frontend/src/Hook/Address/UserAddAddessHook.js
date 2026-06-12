import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUserAddress } from "../../Redux/Reduser/UserAdressSliceReducer";
import { useNavigate } from "react-router-dom";
import notify from "../UseNotifaction";

export default function useUserAddress() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [alias, setAlias] = useState("");
    const [details, setDetails] = useState("");
    const [phone, setPhone] = useState("");

    const { isLoading, error } = useSelector((state) => state.userAddress);

    const handleChange = (setter) => (event) => {
        setter(event.target.value);
    };

    const onSubmit = async () => {
        if (!alias || !details || !phone) {
            notify("من فضلك اكمل البيانات", "warn");
            return;
        }

        try {
            await dispatch(
                addUserAddress({
                    alias,
                    details,
                    phone,
                    city: "",
                    postalCode: "",
                })
            ).unwrap();

            notify("تمت إضافة العنوان بنجاح", "success");
            setTimeout(() => {
                navigate("/user/addresses")
                window.location.reload();
            }, 2000);
        } catch (error) {
            notify(error || "هناك مشكلة في عملية الإضافة", "error");
        }
    };

    return {
        alias,
        details,
        phone,
        isLoading,
        error,
        handleChangeAlias: handleChange(setAlias),
        handleChangeDetails: handleChange(setDetails),
        handleChangePhone: handleChange(setPhone),
        onSubmit,
    };
}
