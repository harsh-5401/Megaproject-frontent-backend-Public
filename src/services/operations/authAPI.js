import toast from "react-hot-toast";
import { setloading , settoken , setSignupData } from "../../slices/authslice"
import { apiconnector } from "../apiconnector";
import { endpoints } from "../apis";
import { contactusEndpoint } from "../apis";
import {setuser} from "../../slices/profileslice"
import { resetcart } from "../../slices/cartslice";

const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    RESETPASSTOKEN_API,
    RESETPASSWORD_API,
  } = endpoints



  // Functions to make async backend calls with data from UI or store and then to update UI or control the navigation after receiving response.



export function getpasswordresetToken(email , setemailsend) {
    return async(dispatch)=> {
        // to see loader
        dispatch(setloading(true));
        try{
            const response=await apiconnector("POST" , endpoints.RESETPASSTOKEN_API , {email})
            console.log("reset password token response = " , response);
            if(!response.data.success) {
                throw new Error(response.data.message)
            }
            // if success response 
            toast.success("Reset email sent");
            setemailsend(true);

        } catch(error) {
            console.log("reset password token error");
            toast.error("Failed to send email for reset password")

        }
        dispatch(setloading(false));
    }
}

export function resetpassword(password , confirmpassword , token , navigate) {
    
    return async(dispatch)=> {
        dispatch(setloading(true));
        try{
            const response=await apiconnector("POST" , endpoints.RESETPASSWORD_API , {password , confirmpassword , token})
            
            console.log("reset password response=" , response);

            console.log(response.data.success);
            
            if(!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("Password has been reset succesfully");

            navigate("/login");
        } catch(error) {
            console.log("RESET PASSWORD TOKEN Error " , error);
            toast.error("Unable to reset password")
            
        }

        dispatch(setloading(false))
    }
}


export function sendOtp(email, navigate){
    return async (dispatch) => {
       const toastId = toast.loading("Loading...")
       dispatch(setloading(true));
  
       try {
        const response = await apiconnector("POST", SENDOTP_API, {
          email,
          checkUserPresent: true,
        })
  
        console.log("SENDOTP API RESPONSE............", response)
  
        console.log(response.data.success)
  
        if(!response.data.success){
          throw new Error(response.data.message)
        }
  
        toast.success("OTP Sent Successfully")
        navigate("/verify-email")
       } catch (error) {
        console.log("SENDOTP API ERROR............", error)
        toast.error("Could Not Send OTP")
       }
       dispatch(setloading(false));
       toast.dismiss(toastId);
    }
  }

  
export function signUp(
    accounttype,
    firstname,
    lastname,
    password,
    confirmpassword,
    otp,
    email,
    navigate
  ){
    console.log("otp is =" , otp)
    return async (dispatch) => {
       const toastId = toast.loading("Loading...")
       dispatch(setloading(true));
  
       try {
        
        const response = await apiconnector("POST", SIGNUP_API, {
          firstname,
          lastname,
          accounttype,
          password,
          confirmpassword,
          email,
          otp
        })
  
        console.log("SIGNUP_API RESPONSE............", response)
  
        console.log(response.data.success)
  
        if(!response.data.success){
          throw new Error(response.data.message)
        }
  
        toast.success("Signup successful")
        navigate("/login")
       } catch (error) {
        console.log("SIGNUP_API ERROR............", error)
        toast.error("Could Not Sign up user")
       }
       dispatch(setloading(false));
       toast.dismiss(toastId);
    }
  }


export function submitAboutcontactform(data , setloading) {
  console.log("submit about form data is " , data);
  return async (dispatch , setloading) => {
   setloading(true)
    try{
      const response=await apiconnector("POST" , contactusEndpoint.CONTACT_US_API , data);
      console.log("logging response= " , response);

    } catch(error) {
      console.log("Submit about page contact form error............", error)
      toast.error("Could not submit user data")
    }

    setloading(false)
  }
}


export function logout(navigate) {
  return (dispatch)=>{
    dispatch(settoken(null));
    dispatch(setuser(null));
    dispatch(resetcart());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged Out")
    navigate("/")
  }
}


export function login(email, password, navigate){
  return async (dispatch) => {
     const toastId = toast.loading("Loading...")
     dispatch(setloading(true));

     try {
      const response = await apiconnector("POST", LOGIN_API, {
        email,
        password,
      })

      console.log("LOGIN API RESPONSE............", response)

      console.log(response.data.success)

      if(!response.data.success){
        throw new Error(response.data.message)
      }

      toast.success("Login Successfully")
      dispatch(settoken(response.data.token));
      const userImage = response.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstname} ${response.data.user.lastname}`
      dispatch(setuser({ ...response.data.user, image: userImage }))
      localStorage.setItem("token", JSON.stringify(response.data.token))
      localStorage.setItem("user", JSON.stringify(response.data.user))
      navigate("/dashboard/my-profile")
     } catch (error) {
      console.log("LOGIN API ERROR............", error)
      toast.error("Could Not LOGIN")
     }
     dispatch(setloading(false));
     toast.dismiss(toastId);
  }
}