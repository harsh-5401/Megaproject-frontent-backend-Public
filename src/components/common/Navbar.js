import React, { useState , useEffect } from 'react'
import { NavbarLinks } from '../../data/navbar-links'
import { Link, matchPath } from 'react-router-dom'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import Profiledropdown from '../core/auth/Profiledropdown'
// import {categories} from "../../services/apis"
// import {CATEGORIES_API} from "../../services/apis"
import {categories} from "../../services/apis"
import { apiconnector } from '../../services/apiconnector'
import { IoIosArrowDown } from 'react-icons/io'
import { RxHamburgerMenu } from 'react-icons/rx'


// const sublinks = [
//     {
//         title: "Python",
//         link:"/catalog/python"
//     },
//     {
//         title: "Web Dev",
//         link:"/catalog/web-development"
//     },
// ];


function Navbar() {

  

    // fetching data
    const {token} = useSelector((state)=> state.auth);
    const {user} = useSelector((state)=> state.profile);
    const {totalitems} = useSelector((state)=> state.cart);
    const [sublinks , setsublinks] =useState([]);
    const{course} = useSelector((state)=>state.course)


    const location=useLocation();
    function matchroute(route){
        return matchPath({path:route} , location.pathname);
    }

    

    

    // api call to fetch all categories from backend to display it in category 
    // section of navbar 

    async function fetchsublinks() {

        try{
            const result=await apiconnector("GET" , categories.CATEGORIES_API)
            // console.log("printing sublinks result = " , result.data.allcategories);
            setsublinks(result.data.allcategories);
            // console.log("sublinks data is" , sublinks)
            
        } catch(error){
            console.log("could not fetch the category list"); 
        }

    } 

    // async function printsublinks() {
    //     console.log("sublinks data is" , sublinks)
    // }

    useEffect(()=> {
        // console.log("token is" , token)
        fetchsublinks();
        // printsublinks();   
    } , [])

    // useEffect(()=> {
    //     console.log("token is" , token)
    //     fetchsublinks();
    //     // printsublinks();
       
    // } , [course])


  return (
    <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 '>

        <div className='flex justify-between flex-row w-11/12 max-w-maxContent'>
            {/* logo  */}
            <Link to="/" className='flex items-center'>
                <img src={logo} alt='logo' width={160} height={42} loading='lazy'></img>
            </Link>

            {/* navbar links  */}
            <nav className='flex items-center'>
                <ul className='flex flex-row gap-6'>

                    {
                        NavbarLinks.map( (link , index) => {
                           return <li key={index}>
                                {
                                    link.title==="Catalog" ? (
                                        <div className='relative flex items-center gap-2 group'>

                                            <p className='text-richblack-25 -mr-2'>{link.title}</p>
                                            <IoIosArrowDown></IoIosArrowDown>

                                            

                                            <div className={`invisible absolute left-[50%] 
                                                translate-x-[-49%] ${sublinks.length ? "translate-y-[15%]" : "translate-y-[40%]"}
                                                top-[50%] z-50 
                                                flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900
                                                opacity-0 transition-all duration-200 group-hover:visible
                                                group-hover:opacity-100 lg:w-[300px]`}>
                                        

                                                <div className='absolute left-[50%] top-0 -z-10
                                                translate-x-[80%]
                                                translate-y-[-45%] h-6 w-6 rotate-45 rounded bg-richblack-5'>
                                                </div>

                                                
 
                                                {
                                                    
                                                        sublinks.length ? (
                                                            <div >
                                                                {
                                                                    sublinks?.filter((sublink)=>sublink?.courses?.length >0 ).map((sublink , i)=> {
                                                                      return <Link to={`/catalog/${sublink.name.split(" ").join("-").toLowerCase()}`} className='rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50' key={i}>
                                                                            <p className='rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50'>{sublink.name}</p>
                                                                        </Link>
                                                                    })
                                                                }
                                                            </div>
                                                        ) : (
                                                            <p>No Courses Found</p>
                                                        )
                                                    
                                                }

                                                

                                             </div>



                                        </div>
                                    ) : (
                                        <Link to={link?.path}>
                                            <p className={` ${ matchroute( link?.path ) ? 'text-yellow-25' : 'text-richblack-25'}`}>{link.title}</p>
                                        </Link>
                                    )
                                } 
                            </li> 
                        })
                    }

                </ul>
            </nav>

            {/* login/singup/dashboard  */}

            <div className='flex gap-4 items-center flex-row'>
                {
                    user && user?.accounttype !== 'Instructor' && (
                        <Link to='/dashboard/cart' className='relative'>
                            <AiOutlineShoppingCart></AiOutlineShoppingCart>
                            {
                                totalitems>0 && (
                                    <span>
                                        {totalitems}
                                    </span>
                                )
                            }

                        </Link>
                    )
                }

                {
                    token===null && (
                        <Link to='/login'>
                            <button className='border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                                Log in
                            </button>
                        </Link>
                    )
                }

                {
                    token===null && (
                        <Link to='/signup'>
                            <button className='border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                                Sign up
                            </button>
                        </Link>
                    )
                }

                {
                    token!==null && <Profiledropdown></Profiledropdown>
                }

            </div> 

            <div className='mr-4 md:hidden text-[#AFB2BF] scale-150'>
                <RxHamburgerMenu />  
            </div> 



 
        </div>
      
    </div>
  )
}

export default Navbar
