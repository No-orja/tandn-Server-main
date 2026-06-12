import baseURL from "../Api/baseURL";

const  useGetData = async (url, paramas)=>{

    const response = await baseURL.get(url, paramas)
    return response.data
    
}

const useGetDataToken = async (url, parmas) => {
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }
    const res = await baseURL.get(url, config);
    return res.data;
}
export {useGetData, useGetDataToken}