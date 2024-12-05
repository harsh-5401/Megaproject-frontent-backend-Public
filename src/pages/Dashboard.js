import React from 'react'
import { useSelector } from 'react-redux'
import Sidebar from '../components/Dashboard/Sidebar'
// import Outlet from '../components/Dashboard/Outlet';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';

// we use "outlet" componnent when we dont know which page to render in nested routes 

function Dashboard() {
    const {loading: authloading} = useSelector((state)=>state.auth);
    const {loading: profileloading} = useSelector((state)=> state.profile)


    if(profileloading || authloading) {
        return (
            <div className='mt-10'>
                Loading...
            </div>
        )
    }

  return (

    <div className='relative flex min-h-[calc(100vh-3.5rem)]'>
        <Sidebar></Sidebar>
        <div className='h-[calc(100vh-3.5rem)] flex-1 overflow-auto' >
            <div className='mx-auto w-11/12 max-w-[1000px] py-10'>
                <Outlet></Outlet>
            </div>
        </div>
    </div>
  )
}

export default Dashboard
