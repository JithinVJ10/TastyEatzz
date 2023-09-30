import './App.css'
import { Routes,Route } from 'react-router-dom'

// User
import Home from './Pages/User/Home'
import Login from './Pages/User/Login'
import SignUp from './Pages/User/Signup'
import HomeAfterLogin from './Pages/User/HomeAfterLogin'
import ErrorPage from './Pages/User/ErrorPage'
import Private from './Components/User/Private'
import Taat from './Pages/User/ggsgs'
import UserProfile from './Pages/User/UserProfile'
import UserAddress from './Pages/User/Profile/userAddress'
import UserOrder from './Pages/User/Profile/UserOrder'
import EditProfile from './Pages/User/Profile/EditProfile'

//Admin
import AdminLogin from './Pages/Admin/AdminLogin'
import AdminDashboard from './Pages/Admin/AdminDashboard'
import AdminPrivate from './Components/Admin/AdminPrivate'
import AdminUser from './Pages/Admin/AdminUser'
import AdminRider from './Pages/Admin/AdminRider'
import AdminFood from './Pages/Admin/AdminFood'



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


function App() {

  return (
    <>

     <Routes> 
      {/* error page */}
      <Route path='*' element={<ErrorPage/> } />
      
      {/* user */}
      <Route path='/' element={<Home/>} ></Route>
      <Route path='/userLogin' element={<Login/>} />
      <Route path='/userSignup' element={<SignUp/>} />
      <Route element={<Private/>}>
        <Route path='/LoggedInHome' element={<HomeAfterLogin/>} />
        <Route path='/UserProfile' element={<UserProfile/>} />
        <Route path='/UserAddress' element={<UserAddress/>} />
        <Route path='/UserOrder' element={<UserOrder/>} />
        <Route path='/EditProfile' element={<EditProfile/>} />
      </Route>
      <Route path='/Taat' element={<Taat/>} />

      {/* admin */}
      <Route path='/AdminLogin' element={<AdminLogin/>}/>
      <Route element={<AdminPrivate/>}>
        <Route path='/AdminDashboard' element={<AdminDashboard/>}/>
        <Route path='/adminUser' element={<AdminUser/>}/>
        <Route path='/adminRider' element={<AdminRider/>}/>
        <Route path='/adminFood' element={<AdminFood/>}/>
      </Route>

      {/* Rider */}
      <Route path='/RiderLogin' element={<RiderLogin/>} />
      <Route path='/RiderSignup' element={<RiderSignup/>} />
      <Route element={<RiderPrivate/>}>
        <Route path='/RiderProfileSetup' element={<RiderProfileSetup/>} />
        <Route path='/RiderProfileSetup2' element={<RiderProfileSetup2/>} />
        <Route path='/RiderDashBoard' element={<RiderDashBoard/>} />
        <Route path='/RiderProfile' element={<RiderProfile/>} />
        <Route path='/EditRiderProfile' element={<EditRiderProfile/>} />
        <Route path='/VehicleProfile' element={<VehicleProfile/>} />
        <Route path='/BankDetailsProfile' element={<BankDetailsProfile/>} />
      </Route>


     </Routes>
    </>
  )
}

export default App
