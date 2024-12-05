import React, { useEffect } from 'react'
import { FaCheck } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import Publishcourse from './Publishcourse'
import Courseinformationform from './Courseinformationform'
import Coursebuilderform from './Coursebuilderform'

function Rendersteps() {

    const {step} = useSelector((state)=>state.course)

    const steps = [ 
        {
            id:1,
            title: "Course Information"
        
        },

        {
            id: 2,
            title: "Course Builder",
        },

        {
            id: 3,
            title: "Publish",
        }
    ]

    useEffect(()=> {
        console.log("value of step is" , step)
    } , [step])

  return (
    <div>

        
        {/* for display course step count  */}
        

        {/* <div>
            {
                steps.map((item) => {
                return <div key={item.id}>

                            <div className={` ${step===item.id ? "bg-yellow-900 border-yellow-50 text-yellow-50" : "border-richblack-700 bg-richblack-800 text-richblack-300"}`}>

                                {
                                    step > item.id ? (<FaCheck></FaCheck>) : (item.id)
                                }

                            </div>

                            
                            add code for dashes between label 
                    
                    </div>
                })
            }
            
        </div> */}


        <div className="relative mb-2 flex w-full justify-center">
            {steps.map((item)=> (
                <>  
                {/* Step Circle */}
                    <div className="flex flex-col items-center " key={item.id}>
                        <button
                        className={`cursor-default aspect-square w-[34px]
                         place-items-center rounded-full border-[1px] 
                         ${step === item.id ? ' border-yellow-50 bg-yellow-900 text-yellow-50' 
                         : ' border-richblack-700 bg-richblack-800 text-richblack-300'}
                         ${step > item.id ? ' bg-yellow-50' :'text-yellow-50'}`}
                         >
                            {step > item.id ? (
                                <FaCheck className='font-bold text-richblack-900'/>
                            ) : 
                            (item.id)}
                        </button>
                    </div>
                {/* Dotted Line */}
                    {item.id !== steps.length && (
                        <>
                            <div key={item.id}
                            className={`h-[calc(34px/2)] w-[33%]  border-dashed border-b-2 
                            ${step > item.id  ? "border-yellow-50" : "border-richblack-500"}`}
                            ></div>
                        </>
                    )}
                </>
            ))}
        </div>

            {/* displaying items title */}

        {/* <div>
            {
                steps.map((item)=> {
                    return <div key={item.id}>
                                <div>
                                    <p>{item.title}</p>
                                </div>
                          </div>
                })
            }
        </div> */}

        <div className="relative mb-16 flex w-full select-none justify-between">
            {steps.map((item) => (
            <>
                <div
                className="flex min-w-[130px] flex-col items-center gap-y-2"
                key={item.id}
                >
                
                <p
                    className={`text-sm ${
                    step >= item.id ? "text-richblack-5" : "text-richblack-500"
                    }`}
                >
                    {item.title}
                </p>
                </div>
                
            </>
            ))}
        </div>

        {
            step===1 && (<Courseinformationform></Courseinformationform>)
        }

        {
            step===2 && (<Coursebuilderform></Coursebuilderform>)
        }

        {
            step===3 && (<Publishcourse></Publishcourse>)
        }
    </div>
  )
}

export default Rendersteps
