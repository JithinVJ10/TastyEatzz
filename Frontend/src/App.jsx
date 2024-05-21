import './App.css'
import { Routes,Route } from 'react-router-dom'
import * as RoutePaths from './RoutePaths/RoutePaths'

// User
import Home from './Pages/User/Home'
import Login from './Pages/User/Login'
import UserOTPLogin from './Pages/User/OTPLogin/UserOTPLogin'
import SignUp from './Pages/User/Signup'
import HomeAfterLogin from './Pages/User/HomeAfterLogin'
import ErrorPage from './Pages/User/ErrorPage'
import Private from './Components/User/Private'
import Taat from './Pages/User/ggsgs'
import UserProfile from './Pages/User/UserProfile'
import UserAddress from './Pages/User/Profile/userAddress'
import UserOrder from './Pages/User/Profile/UserOrder'
import EditProfile from './Pages/User/Profile/EditProfile'
import CartPage from './Pages/User/Cart/CartPage'
import SingleFoodPage from './Pages/User/SingleFoodItem/SingleFoodPage'
import CheckoutPage from './Pages/User/Checkout/CheckoutPage'
import CheckoutAddressPage from './Pages/User/Address/checkoutAddressPage'
import UserEnterOTP from './Pages/User/OTPLogin/UserEnterOTP'

//Admin
import AdminLogin from './Pages/Admin/AdminLogin'
import AdminDashboard from './Pages/Admin/AdminDashboard'
import AdminPrivate from './Components/Admin/AdminPrivate'
import AdminUser from './Pages/Admin/AdminUser'
import AdminRider from './Pages/Admin/AdminRider'
import AdminFood from './Pages/Admin/AdminFood'
import AdminHotel from './Pages/Admin/AdminHotel'



// Rider
import RiderLogin from './Pages/Rider/RiderLogin'
import RiderProfileSetup from './Pages/Rider/RiderProfileSetup'
import RiderSignup from './Pages/Rider/RiderSignup'
import RiderPrivate from './Components/Rider/RiderPrivate'
import RiderProfileSetup2 from './Pages/Rider/RiderProfileSetup2'
import RiderDashBoard from './Pages/Rider/RiderDashBoard'
import RiderProfile from './Pages/Rider/RiderProfile'
import EditRiderProfile from './Pages/Rider/RiderProfile/EditRiderProfile'
import VehicleProfile from './Pages/Rider/RiderProfile/VehicleProfile'
import BankDetailsProfile from './Pages/Rider/RiderProfile/BankDetailsProfile'

// Hotel
import HotelLogin from './Pages/Hotel/HotelLogin'
import HotelSignUp from './Pages/Hotel/HotelSignUp'
import HotelDashboard from './Pages/Hotel/HotelDashboard'
import HotelFood from './Pages/Hotel/HotelFood'
import HotelPrivate from './Pages/Hotel/HotelPrivate'
import AddFood from './Pages/Hotel/AddFood'
import HotelCategory from './Pages/Hotel/HotelCategory'
import AddCategory from './Pages/Hotel/AddCategory'
import HotelCusine from './Pages/Hotel/HotelCusine'
import AddCusine from './Pages/Hotel/AddCusine'
import OrderPlaced from './Pages/User/Order/OrderPlaced'
import HotelOrders from './Pages/Hotel/HotelOrders'
import LocationTracker from './Pages/Tracker/LocationTracker'





function App() {

  return (
    <>

     <Routes> 
      {/* error page */}
      <Route path='*' element={<ErrorPage/> } />

      <Route path={RoutePaths.TRACKER} element={<LocationTracker/> } />
      
      {/* user */}
      <Route path={RoutePaths.HOME} element={<Home />} />
      <Route path={RoutePaths.USER_LOGIN} element={<Login />} />
      <Route path={RoutePaths.USER_SIGNUP} element={<SignUp />} />
      <Route path={RoutePaths.USER_OTP_LOGIN} element={<UserOTPLogin />} />
      <Route path={RoutePaths.USER_ENTER_OTP} element={<UserEnterOTP />} />
      <Route element={<Private />}>
        <Route path={RoutePaths.LOGGED_IN_HOME} element={<HomeAfterLogin />} />
        <Route path={RoutePaths.USER_PROFILE} element={<UserProfile />} />
        <Route path={RoutePaths.USER_ADDRESS} element={<UserAddress />} />
        <Route path={RoutePaths.USER_ORDER} element={<UserOrder />} />
        <Route path={RoutePaths.USER_EDIT_PROFILE} element={<EditProfile />} />
        <Route path={RoutePaths.SHOPPING_CART} element={<CartPage />} />
        <Route path={RoutePaths.SINGLE_FOOD} element={<SingleFoodPage />} />
        <Route path={RoutePaths.CHECKOUT_ADDRESS} element={<CheckoutAddressPage />} />
        <Route path={RoutePaths.CHECKOUT_PAGE} element={<CheckoutPage />} />
        <Route path={RoutePaths.ORDER_PLACED} element={<OrderPlaced />} />
      </Route>
      <Route path='/Taat' element={<Taat/>} />

      {/* admin */}
      <Route path={RoutePaths.ADMIN_LOGIN} element={<AdminLogin />} />
      <Route element={<AdminPrivate />}>
        <Route path={RoutePaths.ADMIN_DASHBOARD} element={<AdminDashboard />} />
        <Route path={RoutePaths.ADMIN_USER} element={<AdminUser />} />
        <Route path={RoutePaths.ADMIN_RIDER} element={<AdminRider />} />
        <Route path={RoutePaths.ADMIN_FOOD} element={<AdminFood />} />
        <Route path={RoutePaths.ADMIN_HOTEL} element={<AdminHotel />} />
      </Route>

      {/* Rider */}
      <Route path={RoutePaths.RIDER_LOGIN} element={<RiderLogin />} />
      <Route path={RoutePaths.RIDER_SIGNUP} element={<RiderSignup />} />
      <Route element={<RiderPrivate />}>
        <Route path={RoutePaths.RIDER_PROFILE_SETUP} element={<RiderProfileSetup />} />
        <Route path={RoutePaths.RIDER_PROFILE_SETUP2} element={<RiderProfileSetup2 />} />
        <Route path={RoutePaths.RIDER_DASHBOARD} element={<RiderDashBoard />} />
        <Route path={RoutePaths.RIDER_PROFILE} element={<RiderProfile />} />
        <Route path={RoutePaths.EDIT_RIDER_PROFILE} element={<EditRiderProfile />} />
        <Route path={RoutePaths.VEHICLE_PROFILE} element={<VehicleProfile />} />
        <Route path={RoutePaths.BANK_DETAILS_PROFILE} element={<BankDetailsProfile />} />
      </Route>

      {/* Hotel */}

      <Route path={RoutePaths.HOTEL_LOGIN} element={<HotelLogin/>}/>
      <Route path={RoutePaths.HOTEL_SIGNUP} element={<HotelSignUp/>} />
      <Route element={<HotelPrivate/>}>
        <Route path={RoutePaths.HOTEL_DASHBOARD} element={<HotelDashboard/>} />
        <Route path={RoutePaths.HOTEL_FOOD} element={<HotelFood/>} />
        <Route path={RoutePaths.HOTEL_ADD_FOOD} element={<AddFood/>} />
        <Route path={RoutePaths.HOTEL_CATEGORY} element={<HotelCategory/>} />
        <Route path={RoutePaths.HOTEL_ADD_CATEGORY} element={<AddCategory/>} />
        <Route path={RoutePaths.HOTEL_CUSINE} element={<HotelCusine/>} />
        <Route path={RoutePaths.HOTEL_ADD_CUSINE} element={<AddCusine/>} />
        <Route path={RoutePaths.HOTEL_ORDER} element={<HotelOrders/>} />

      </Route>



     </Routes>
    </>
  )
}

export default App
