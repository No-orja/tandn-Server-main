import baseURL from "../Api/baseURL";

const useUpdateDataWithImage = async (url, formData) => {
    try {
        const config = {
            headers: { 
                "Content-Type": "multipart/form-data" ,  //We used it to send image
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }

        const response = await baseURL.put(url, formData, config);
        return response.data;
    } catch (error) {
        console.error("❌ خطأ في إرسال البيانات:", error);
        throw error;
    }
};

const useUpdateData = async (url, formData) => {
    try {
        const config={
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }
        const response = await baseURL.put(url, formData, config);
        console.log("The res form update",response);
        return response;
    } catch (error) {
        console.error("❌ خطأ في إرسال البيانات:", error);
        throw error;
    }
};
export {useUpdateDataWithImage, useUpdateData};
