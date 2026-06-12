import baseURL from "../Api/baseURL";

//send any data with image
const  useInsertDataWithImage = async (url, paramas)=>{
    
    const config = {
        headers: { 
            "Content-Type": "multipart/form-data" ,  //We used it to send image
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    }
    
    const response = await baseURL.post(url, paramas, config)
    return response
    
}

//any data without image
const  useInsertData = async (url, paramas)=>{

    const config = {
        headers: { 
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    }
    
    const response = await baseURL.post(url, paramas , config)
    return response
    
}
export {useInsertData , useInsertDataWithImage} 