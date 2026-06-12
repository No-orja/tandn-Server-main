import './App.css';
import HomePage from './Page/Home/HomePage';
import LoginPage from './Page/Auth/LoginPage'
import { BrowserRouter,Route, Routes} from 'react-router-dom';
import NavBarLogin from './Component/Utility/NavBarLogin';
import Footer from './Component/Utility/Footer';
import RegisterPage from './Page/Auth/RegisterPage';
import AllCategory from './Page/Category/AllCategory';
import AllBrand from "./Page/Brand/AllBrand"
import ShopProductsPage from './Page/Product/ShopProductsPage';
import ProductDetalisPage from "./Page/Product/ProductDetailesPage";
import Cart from './Page/Cart/Cart';
import ChoosePayPage from './Page/Checkout/ChoosePayPage';
import AdminAllProductPage from './Page/Admin/AdminAllProductPage';
import UserProfilePage from './Page/User/UserProfilePage';
import AdminAllOrderPage from './Page/Admin/AdminAllOrderPage';
import AdminOrderDetailsPage from './Page/Admin/AdminOrderDetailsPage';
import AdminAddCouponPage from './Page/Admin/AdminAddCoponePage';
import AdminAddCategoryPage from "./Page/Admin/AdminAddCategoryPage"
import AdminAddSubCategoryPage from './Page/Admin/AdminAddSubCategoryPage';
import AdminAddProductsPage from './Page/Admin/AdminAddProductsPage';
import UserAllOrderPage from './Page/User/UserAllOrderPage';
import UserFavotiteProductPage from './Page/User/UserFavoriteProductPage';
import UserAllAderssPage from './Page/User/UserAllAderssPage';
import UserEditAdressPage from './Page/User/UserEditAdressPage';
import UserAddAddressPage from './Page/User/UserAddAddressPage';
import AdminEditProductPage from "./Page/Admin/AdminEditProductPage"
import ForgetPasswordPage from './Page/Auth/ForgetPasswordPage';
import VerifyResetCodePage from './Page/Auth/VerifyResetCodePage';
import ResetPasswordPage from './Page/Auth/ResetPasswordPage';
// import ProtectedRoutHook from './Hook/Auth/ProtectedRoutHook';
import ProtectedRoute from './Component/Utility/ProdectedRoute';
import ProductsByCategory from './Page/Product/ProductsByCategory';
import AdminEditCouponPage from './Page/Admin/AdminEditCouponPage';
import AdminAddBrandPage from './Page/Admin/AdminAddBrandPage';
import ProductsByBrand from './Page/Product/ProductByBrand';
import AdminAllOrderDetailsPage from './Page/Admin/AdminOrderDetailsPage';

function App() {

  // const [isUser, isAdmin, userData] =  ProtectedRoutHook()
  // console.log("User Data",userData)
  // console.log("Is user",isUser)
  // console.log("Is Admin",isAdmin) 
  
  return (
    <div>
      <NavBarLogin/>
      <BrowserRouter>
      <Routes>
        <Route index element={<HomePage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/allCategory' element={<AllCategory/>}/>
        <Route path='/allBrand' element={<AllBrand/>}/>
        <Route path='/products' element={<ShopProductsPage/>}/>
        <Route path='/products/:id' element={<ProductDetalisPage/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/products/category/:id' element={<ProductsByCategory/>}/>
        <Route path='/products/brand/:id' element={<ProductsByBrand/>}/>


        {/* <Route element={<ProtectedRoute auth={isAdmin}/>}> */}
          {/* Admin */}
          <Route path='/admin/allproducts' element={<AdminAllProductPage/>}/>
          <Route path='/admin/allorders' element={<AdminAllOrderPage/>}/>
          <Route path='/admin/orders/23' element={<AdminOrderDetailsPage/>}/>
          <Route path='/admin/addbrand' element={<AdminAddBrandPage/>}/>
          <Route path='/admin/addcategory' element={<AdminAddCategoryPage/>}/>
          <Route path='/admin/addsubcategory' element={<AdminAddSubCategoryPage/>}/>
          <Route path='/admin/addproduct' element={<AdminAddProductsPage/>}/>
          <Route path='/admin/editproduct/:id' element={<AdminEditProductPage/>}/>
          <Route path='/admin/addcomponent' element={<AdminAddCouponPage/>}/>
          <Route path='/admin/editcoupon/:id' element={<AdminEditCouponPage/>}/>
          <Route path='/admin/orders/:id' element={<AdminAllOrderDetailsPage/>}/>
        {/* </Route> */}

        {/* <Route element={<ProtectedRoute auth={isUser}/>}> */}
          {/* USER */}
          <Route path='/user/allorders' element={<UserAllOrderPage/>}/>
          <Route path='/user/favoriteproducts' element={<UserFavotiteProductPage/>}/>
          <Route path='/user/addresses' element={<UserAllAderssPage/>}/>
          <Route path='/order/paymethoud' element={<ChoosePayPage/>}/>
          <Route path='/user/edit-address/:id' element={<UserEditAdressPage/>}/>
          <Route path='/user/add-address' element={<UserAddAddressPage/>}/>
          <Route path='/user/profile' element={<UserProfilePage/>}/>
          <Route path='/user/forgot-password' element={<ForgetPasswordPage/>}/>
          <Route path='/user/verify-code' element={<VerifyResetCodePage/>}/>
          <Route path='/user/reset-password' element={<ResetPasswordPage/>}/>
        {/* </Route> */}

      </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}
export default App;
