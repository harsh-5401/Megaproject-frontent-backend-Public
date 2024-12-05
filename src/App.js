import './App.css';
import { Route , Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/common/Navbar';
import Login from "../src/pages/Login"
import Signup from "../src/pages//Signup"
import Forgetpassword from './pages/Forgetpassword';
import OpenRoute from './components/core/auth/OpenRoute';
import Updatepassword from './pages/Updatepassword';
import Verifyemail from "./pages/Verifyemail"
import About from './pages/About';
import Myprofile from './components/Dashboard/Myprofile';
import Dashboard from "./pages/Dashboard"
import PrivateRoute from './components/core/auth/PrivateRoute';
import Error from "./pages/Error"
import Settings from './components/Dashboard/Settiings/Settings';
import Enrolledcourses from './components/Dashboard/Enrolledcourses';
import Cart from './components/Dashboard/Cart/Cart';
import { ACCOUNT_TYPE } from './utils/constants';
import { useSelector } from 'react-redux';
import Addcourse from './components/Addcourse/Addcourse';
import { useEffect } from 'react';
import Mycourses from './components/Mycourses/Mycourses';
import EditCourse from './components/EditCourse/EditCourse';
import Catalog from './components/Catalog/Catalog';
import Coursedetails from './components/CourseDetails.js/Coursedetails';
import Viewcourse from './components/Viewcourse/Viewcourse';
import VideoDetails from './components/Viewcourse/VideoDetails';
import InstructorDashboard from './components/InstructorDashboard/InstructorDashboard';
import ContactPage from './pages/ContactPage';



function App() {

  const {user} = useSelector((state)=>state.profile);
  const {course} = useSelector((state)=>state.course);
  const {cart} = useSelector((state)=>state.cart);

  // useEffect(()=> {
  //   console.log("current course is " , course);
  // }, [course])

  // useEffect(()=> {
  //   console.log("current CART is " , cart);
  // }, [cart])
  
  return (
    <div className='w-screen min-h-screen bg-richblack-900 flex flex-col font-inter'> 
      <Navbar></Navbar>

      <Routes>
        
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/login' element={<OpenRoute><Login></Login></OpenRoute>}></Route>
        <Route path='/signup' element={<OpenRoute><Signup></Signup></OpenRoute>}></Route>
        <Route path='/forgot-password' element={<OpenRoute><Forgetpassword></Forgetpassword></OpenRoute>}></Route>
        <Route path='/update-password/:id' element={<OpenRoute><Updatepassword></Updatepassword></OpenRoute>}></Route>
        <Route path='/verify-email' element={<OpenRoute><Verifyemail></Verifyemail></OpenRoute>}></Route>
        <Route path='/about' element={<About></About>}></Route>
        <Route path='/contact' element={<ContactPage></ContactPage>}></Route>
        
        <Route path='/catalog/:catalogname' element={<Catalog></Catalog>}></Route>
        <Route path='/courses/:courseid' element={<Coursedetails></Coursedetails>}></Route>


        
        
        {/* dashboard Routes ............................................... */}

        <Route element={<PrivateRoute><Dashboard></Dashboard></PrivateRoute>}>

          <Route path='/dashboard/my-profile' element={<Myprofile></Myprofile>}></Route>
          <Route path='/dashboard/settings' element={<Settings></Settings>}></Route>


          {
              user?.accounttype === ACCOUNT_TYPE.STUDENT && (
                <>
                  <Route path='/dashboard/enrolled-courses' element={<Enrolledcourses></Enrolledcourses>}></Route>
                  <Route path='/dashboard/cart' element={<Cart></Cart>}></Route>
                </>
              )
          }


          {
            user?.accounttype===ACCOUNT_TYPE.INSTRUCTOR && (
              <>
                <Route path='/dashboard/instructor' element={<InstructorDashboard></InstructorDashboard>}></Route>
                <Route path='/dashboard/add-course' element={<Addcourse></Addcourse>}></Route>
                <Route path='/dashboard/my-courses' element={<Mycourses></Mycourses>}></Route>
                <Route path='/dashboard/edit-course/:courseid' element={<EditCourse></EditCourse>}></Route>
              </>
              

            )
          }

        </Route>


          {/* route for playing video .................... */}

        <Route element={<PrivateRoute><Viewcourse></Viewcourse></PrivateRoute>}>

          <Route path='/view-course/:courseid/section/:sectionid/sub-section/:subsectionid' element={<VideoDetails></VideoDetails>}></Route>

        </Route>

        


        <Route path='*' element={<Error></Error>}></Route>




      </Routes>

    </div>
  );
}

export default App;
