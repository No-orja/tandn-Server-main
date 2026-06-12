import { use, useEffect, useState } from "react"

export default function ProtectedRoutHook(){
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("user")));
    const [isUser, setIsUser] = useState();
    const [isAdmin, setIsAdmin] = useState();

    useEffect(() => {
        if(userData != null){
            if(userData.data.role === "user"){
                setIsUser(true);
                setIsAdmin(false);
            }
            //  if(userData.data.user) {
            //     setIsUser(true);
            //     setIsAdmin(false);
            // }
            else{
                setIsUser(false);
                setIsAdmin(true);
            }

        }else{
            setIsUser(false);
            setIsAdmin(false);
        }
    },[userData])
    return[isUser, isAdmin, userData]
}