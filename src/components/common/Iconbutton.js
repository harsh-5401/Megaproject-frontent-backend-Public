import React from 'react'

// function Iconbutton({text , onclick , children , disabled , outline=false , customclasses , type}) {
//   return (
//     <button disabled={disabled} onClick={onclick}>
//         {
//             children ? (
//             <div>
//                 <span>{text}</span>
//                 {children}
//             </div>
            
//         ) : (
//             <div>{text}</div>
//         )
//         }
//     </button>
//   )
// }

function Iconbutton({text , onclick , children , disabled , outline=false , customclasses , type}) {
  return (
    <button
        disabled={disabled}
        onClick={onclick}
        className={`flex items-center ${
          outline ? "border border-yellow-50 bg-transparent" : "bg-yellow-50"
        } cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 ${customclasses}`}
        type={type}
      >
        {children ? (
          <>
            <span className={`${outline && "text-yellow-50"}`}>{text}</span>
            {children}
          </>
        ) : (
          text
        )}
      </button>
  )
}

export default Iconbutton
