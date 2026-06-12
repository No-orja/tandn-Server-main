import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from '../Redux/Reduser/CategorySliceReducer';
import brandReducer from "../Redux/Reduser/BrandSliceReducer"
import subCategoryReducer from "../Redux/Reduser/SubCategorySliceReducer"
import productReducer from "../Redux/Reduser/ProductSliceReducer"
import authReducer from "../Redux/Reduser/AuthReducer"
import ReviewsSliceReducer from "../Redux/Reduser/ReviewsSliceReducer"
import WishSliceSlice from "../Redux/Reduser/WishSliceReducer"
import allCoponeApiSlice from "../Redux/Reduser/CoponeSliceReducer"
import userAddressSlice from "../Redux/Reduser/UserAdressSliceReducer"
import userDataSlice from "../Redux/Reduser/LoggedUserSliceReducer"
import CartSlice from "../Redux/Reduser/CartSliceReducer"
import orderSlice from "../Redux/Reduser/CheckOutSliceReducer"

const store = configureStore({
  reducer: {
    allCategory: categoryReducer,
    allBrand: brandReducer,
    allSubCategoy: subCategoryReducer,
    allProduct: productReducer,
    Auth: authReducer,
    Reviews: ReviewsSliceReducer,
    WishList: WishSliceSlice,
    Copone: allCoponeApiSlice,
    userAddress: userAddressSlice,
    userData: userDataSlice, 
    Cart: CartSlice,
    userOreder: orderSlice
  },
});

export default store;
