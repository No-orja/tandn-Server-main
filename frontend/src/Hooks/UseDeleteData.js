import baseURL from "../Api/baseURL";

const  useDeleteData = async (url, paramas)=>{
    const config = {
        headers: { 
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    }
    const response = await baseURL.delete(url, paramas, config)
    return response
    
}
const useDeleteDataToken = async (url) => {
    const config = {
        headers: { 
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    }
    const response = await baseURL.delete(url, config); 
    return response;
}

export {useDeleteData, useDeleteDataToken}
