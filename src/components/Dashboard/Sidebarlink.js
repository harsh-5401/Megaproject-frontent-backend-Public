import React from 'react'
// import * as icons from "react-icons/vsc"
import * as Icons from "react-icons/vsc"

import { useDispatch } from 'react-redux';
import { matchPath, NavLink, useLocation } from 'react-router-dom'
// import { matchRoutes } from 'react-router-dom';

function Sidebarlink({link , iconName}) {
    
    const Icon =Icons[iconName]
    const location=useLocation();
    const dispatch=useDispatch();

    const matchRoute = (route) => {
      return matchPath({ path: route }, location.pathname)
    }
  return (
    <NavLink to={link.path} className={`relative px-8 py-2 text-sm font-medium ${
      matchRoute(link.path)
        ? "bg-yellow-800 text-yellow-50"
        : "bg-opacity-0 text-richblack-300"
    } transition-all duration-200`}>

        <span className={`absolute left-0 top-0 h-full w-[0.15rem] bg-yellow-50 ${
        matchRoute(link.path) ? "opacity-100" : "opacity-0"
      }`}>

        </span>

        <div className='flex items-center gap-x-2'>
            <Icon className="text-lg"> </Icon>
            <span>{link.name}</span>
        </div>
        
    </NavLink>
  )
}

export default Sidebarlink
