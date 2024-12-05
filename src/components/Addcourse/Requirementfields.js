import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

function Requirementfields({name , errors , register , setValue , getValues , label}) {

    const [requirements , setrequirements] = useState("")
    const [requirementlist , setrequirementlist] = useState([])
    const {course , editCourse} = useSelector((state)=> state.course)

    function handleAddRequirement() {
        if(requirements) {
            setrequirementlist([...requirementlist , requirements]);
            setrequirements("");
        }
    }

    function handleRemoveRequirement (index) {
        const updatedrequirementlist= [...requirementlist];
        // remove element at index 1
        updatedrequirementlist.splice(index , 1);
        setrequirementlist(updatedrequirementlist)
    }

    // add fiedlds to useform hook on first render 

    useEffect(()=> {
        if(editCourse){
            // console.log("In requirements field, 1st render, editCourse=true course is",course)
            setrequirementlist(JSON.parse(course?.instructions));
            // console.log("course instruction parse = " , JSON.parse(course?.instructions))
          }
        
        register(name , {
            required:true
        })
    },[])

    // after each time requirement list changes make sure it is set 
    //ensuring that the form managed by react-hook-form stays up-to-date with the current state of the requirementlist

    useEffect(()=> {
        setValue(name , requirementlist)
    } , [requirementlist])


    //  useEffect(()=> {
    //     console.log("updated req list is " , requirementlist)
    // } , [requirementlist])



  return (
    

    <div className="flex flex-col space-y-2">
      <label className="text-sm text-richblack-5" htmlFor={name}>
        {label} <sup className="text-pink-200">*</sup>
      </label>
      <div className="flex flex-col items-start space-y-2">
        <input
          type="text"
          id={name}
          name={name}
          value={requirements}
          onChange={(e) => setrequirements(e.target.value)}
          className="form-style w-full"
        />
        <button
          type="button"
          onClick={handleAddRequirement}
          className="font-semibold text-yellow-50"
        >
          Add
        </button>
      </div>
      
      
      {requirementlist.length > 0 && (
        <ul className="mt-2 list-inside list-disc">
          {requirementlist.map((requirement, index) => (
            <li key={index} className="flex items-center text-richblack-5">
              <span>{requirement}</span>
              <button
                type="button"
                className="ml-2 text-xs text-pure-greys-300 "
                onClick={() => handleRemoveRequirement(index)}
              >
                clear
              </button>
            </li>
          ))}
        </ul>
      )}
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>

  )
}

export default Requirementfields
