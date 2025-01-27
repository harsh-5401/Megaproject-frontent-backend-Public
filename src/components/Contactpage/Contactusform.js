import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {apiconnector} from "../../services/apiconnector"
import { contactusEndpoint } from '../../services/apis';
import countrycode from "../../data/countrycode.json"
import "../../components/Contactpage/contactform.css"
import { useDispatch } from 'react-redux';
import { submitAboutcontactform } from '../../services/operations/authAPI';



function Contactusform() {
    // this is not auth-slice wale loading that loading is used in authentication pages
    const [loading , setloading] = useState(false);

    const dispatch=useDispatch();

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitSuccessful}
    } = useForm();

        useEffect(()=> {
            if(isSubmitSuccessful) {
                reset({
                    
                    firstname:"",
                    lastname: "",
                    email:"",
                    phonenumber:"",
                    message:"",
                    
                })
            }
        } , [reset , isSubmitSuccessful])

        // async function submitcontactform(data) {

        //     // this is given to us by useform hook 
        //     console.log("logging data is=" , data);
        //     try{
        //         setloading(true);
        //         // const response=await apiconnector("POST" , contactusEndpoint.CONTACT_US_API , data);
        //         const response={status:"ok"}
        //         console.log("logging response= " , response);
        //         setloading(false);
        //     } catch(error){
        //         console.log("error : " , error.message);
        //         setloading(false);
        //     }
        // }

        function submitcontactform(data) {
            dispatch(submitAboutcontactform(data , setloading));
        }

  return (
    <form className='flex flex-col gap-7' onSubmit={handleSubmit(submitcontactform)}>

            <div className='flex flex-col gap-5 lg:flex-row'>
                {/* firstName */}
                <div className='flex flex-col gap-2 lg:w-[48%]'>
                    <label className='text-sm' htmlFor='firstname'>First Name</label>
                    <input  
                        type='text'
                        name='firstname'
                        id='firstname'
                        placeholder='Enter first name'
                        className='text-black form-style'
                        {...register("firstname", {required:true})}
                    />
                    {
                        errors.firstname && (
                            <span>
                                Please enter Your name
                            </span>
                        )
                    }
                </div>

                {/* lastName */}
                <div className='flex flex-col gap-2 lg:w-[48%]'>
                    <label className='text-sm' htmlFor='lastname'>Last Name</label>
                    <input  
                        type='text'
                        name='lastname'
                        id='lastname'
                        className='text-black form-style'
                        placeholder='Enter Last name'
                        {...register("lastname")}
                    />
                    
                </div>

            </div>


            {/* email */}
            <div className='flex flex-col gap-2'>
                <label className=' text-sm' htmlFor='email'>Email Address</label>
                <input 
                    type='email'
                    name='email'
                    id='email'
                    className='text-black form-style'
                    placeholder='Enter email Address'
                    {...register("email", {required:true})}
                />
                {
                    errors.email && (
                        <span>
                            Please enter your email address
                        </span>
                    )
                }
            </div>

            {/* phoneNo */}
            <div className='flex flex-col gap-2'>

                <label className='text-sm' htmlFor='phonenumber'>Phone Number</label>

                <div className='flex gap-5'>
                    {/* dropdown */}
                    <div className='flex w-[81px] flex-col gap-2'>
                        <select
                                name='dropdown'
                                id="dropdown"
                                className='form-style'
                                {...register("countrycode", {required:true})}
                            >
                            {
                                countrycode.map( (element , index) => {
                                    return (
                                        <option key={index} value={element.code}>
                                            {element.code} -{element.country}
                                        </option>
                                    )
                                } )
                            }
                        </select>
                    </div>
                        
                   <div className='flex w-[calc(100%-90px)] flex-col gap-2'>
                   <input
                            type='tel'
                            name='phonenumber'
                            id='phonenumber'
                            placeholder='12345 67890'
                            className='form-style'
                            {...register("phonenumber",  
                            {
                                required:{value:true, message:"Please enter Phone Number"},
                                maxLength: {value:10, message:"Invalid Phone Number"},
                                minLength:{value:8, message:"Invalid Phone Number"} })}
                        />
                   </div>     

                </div>
                {
                    errors.phonenumber && (
                        <span>
                            {errors.phonenumber.message}
                        </span>
                    )
                }

            </div>

            {/* message */}
            <div className='flex flex-col gap-2'>
                <label className='text-sm' htmlFor='message'>Message</label>
                <textarea 
                    name='message'
                    id='message'
                    cols="30"
                    className='form-style'
                    rows="7"
                    placeholder='Enter Your message here'
                    {...register("message", {required:true})}
                />
                {
                    errors.message && (
                        <span>
                            PLease enter your message.
                        </span>
                    )
                }
            </div>
                
            <button type='submit'
            className='rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
         transition-all duration-200 hover:scale-95 hover:shadow-none  disabled:bg-richblack-500 sm:text-[16px] '>
                    Send Message
            </button>
    </form>
  )
}

export default Contactusform








