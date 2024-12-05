import React from 'react'
import { useSelector } from 'react-redux'
import Rendercartcourses from './Rendercartcourses'
import Rendertotalamount from './Rendertotalamount'


function Cart() {

    const {total , totalitems} = useSelector((state)=>state.cart)
  return (
    // <div className='text-white'>
    //   <h1>Your Cart</h1>
    //   <p>{totalitems} courses in Cart</p>

    //   {
    //     total > 0 ? (
    //         <div>
    //             <Rendercartcourses></Rendercartcourses>
    //             <Rendertotalamount></Rendertotalamount>
    //         </div>
    //     ) : (<p>Your cart is empty</p>)
    //   }
    // </div>


    <div>
    <h1 className="mb-14 text-3xl font-medium text-richblack-5">Cart</h1>
    <p className="border-b border-b-richblack-400 pb-2 font-semibold text-richblack-400">
      {totalitems} Courses in Cart
    </p>
    {total > 0 ? (
      <div className="mt-8 flex flex-col-reverse items-start gap-x-10 gap-y-6 lg:flex-row">
        <Rendercartcourses />
        <Rendertotalamount />
      </div>
    ) : (
      <p className="mt-14 text-center text-3xl text-richblack-100">
        Your cart is empty
      </p>
    )}
  </div>

  )
}

export default Cart
