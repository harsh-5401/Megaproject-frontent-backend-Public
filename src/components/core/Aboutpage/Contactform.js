import React from 'react'
import Contactusform from "../../Contactpage/Contactusform"

function Contactform() {
  return (
    <div className='mx-auto'>
    <h1 className='text-center text-4xl font-semibold'>
      Get in Touch
    </h1>
    <p className='text-center text-richblack-300 mt-3'>
      We'd love to here for you, Please fill out this form.
    </p>
    <div className='mt-12 mx-auto'>
      <Contactusform />
    </div> 
  </div>
  )
}

export default Contactform
