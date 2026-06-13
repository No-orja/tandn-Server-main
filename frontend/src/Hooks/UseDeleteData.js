import baseURL from "../Api/baseURL";

const  useDeleteData = async (url)=>{
    // axios signature is delete(url, config) — the auth header must be the
    // SECOND argument, otherwise it is dropped and the request 401s.
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    }
    const response = await baseURL.delete(url, config)
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
