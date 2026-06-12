
import { featchDeleteAllCart } from '../../Redux/Reduser/CartSliceReducer'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function DeleteAllProductFromCartHook() {

    const [showDelete, setShowDelete] = useState(false);

    const handleDeleteClose = () => setShowDelete(false);

    const handelShowDelete = () => setShowDelete(true);


    const dispatch = useDispatch()
    const handelDeleteCart = async () =>{
        await dispatch(featchDeleteAllCart())
    }
    
    const loading = useSelector(state=>state.Cart.isLoading)
    const error = useSelector(state=>state.Cart.error)
    const deleteAllItems = useSelector(state=>state.Cart.deleteAllCart)
    
    useEffect(() => {
        if(!loading){
            if(error){
                console.log("error",error)
            }
            else if(deleteAllItems){
                if(deleteAllItems.data === ""){
                    setTimeout(() => {
                        window.location.reload();
                    },1000)
                }
            }            
        }
    },[loading, error, deleteAllItems])

    return  [handelDeleteCart, showDelete,handleDeleteClose, handelShowDelete ]
}