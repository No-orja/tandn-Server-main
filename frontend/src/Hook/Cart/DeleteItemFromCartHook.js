import { useDispatch, useSelector } from "react-redux";
import { featchDeleteSpecificCart, featchUpdateSpecificCart } from "../../Redux/Reduser/CartSliceReducer";
import { useEffect, useState } from "react";
import notify from "../../Hook/UseNotifaction";

export default function DeleteItemFromCartHook(item){
  //Hook
  const dispatch = useDispatch()

  const [show, setShow] = useState(false);
  
  const handleDeleteClose = () => setShow(false);
  const handleDeleteClicked = () => setShow(true);
  
  const isLoading = useSelector((state) => state.Cart.isLoading);
  const error = useSelector((state) => state.Cart.error);
  const deleteResponse = useSelector((state) => state.Cart.deleteSpecificCartItem);

  const handelDeleteItem =async () => {
    await dispatch(featchDeleteSpecificCart(item._id))
    setShow(false)
  }
  
  useEffect(() => {
    if (!isLoading) {
      if(error){
        notify(error?.message, "error")
      }else if(deleteResponse){
        console.log("deleteResponse",deleteResponse)
        if(deleteResponse.status === 200){
          notify("تم حذف المنتج بنجاح", "success")
          setTimeout(() => {
            window.location.reload();
          },1000)
        }
      }
    }
  }, [isLoading, error, deleteResponse]);

  //IPDATE
  const [itemCount, setItemCount] = useState(item?.count);
  const onChangeCount =(e)=>{
    setItemCount(e.target.value)
  }

  const handeleUpdateCart = async () =>{
    await dispatch(featchUpdateSpecificCart({id:item._id, body:{count:itemCount}}))
  }

    return [show, handleDeleteClose, handelDeleteItem, handleDeleteClicked ,itemCount , onChangeCount, handeleUpdateCart]
}
