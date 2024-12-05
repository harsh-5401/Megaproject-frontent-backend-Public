import React, { useState } from 'react' 
import { sidebarLinks } from '../../data/dashboard-links'
import {logout} from "../../services/operations/authAPI"
import { useDispatch, useSelector } from 'react-redux'
import Sidebarlink from './Sidebarlink'
// import { VscSettingsGear } from 'react-icons/vsc'
import { useNavigate } from 'react-router-dom'
import { VscSignOut } from 'react-icons/vsc'
import ConfirmationModal from '../common/ConfirmationModal'

function Sidebar() {

  const {user , loading: profileloading}= useSelector((state)=>state.profile)
  const {loading : authloading} = useSelector((state)=>state.auth)
  const dispatch=useDispatch();
  const navigate=useNavigate()


  // managing state of modal 
  const[confirmationModal , setconfirmationModal]=useState(null)

  return (
    <div className='text-white'>

      <div className='flex min-w-[222px] flex-col border-r-[1px] border-r-richblack-700 h-[calc(100vh-3.5rem)] bg-richblack-800 py-10'>
        
        <div className='flex flex-col text-white'>
          {
            sidebarLinks.map((link , index)=>{
              if(link.type && user?.accounttype !== link.type){
                return null
              }
              /// else case
              return <Sidebarlink link={link} iconName={link.icon} key={link.id}></Sidebarlink>
            })
          }

        </div>

          {/* to make small line  */}
        <div className='mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-600'></div>

          {/* settings and logout button  */}
        <div className='flex flex-col gap-y-3' >

          <Sidebarlink link={{name:"Settings" , path:"dashboard/settings"}} iconName={"VscSettingsGear"}>

          </Sidebarlink>

          {/* to make confiromation modal visible and invisible */}

          <button onClick={()=> setconfirmationModal({
            text1:"Are you sure ?",
            text2:"You will be logged out of your account",
            btn1text:"Logout",
            btn2text:"Cancel",
            btn1Handler:()=>dispatch(logout(navigate)),
            btn2Handler:()=>setconfirmationModal(null)

          })} className='text-sm font-medium text-richblack-300'>

            <div className='flex flex-row items-center gap-x-2 ml-8'>
              <VscSignOut className='text-lg '></VscSignOut>
              <span>Logout</span>
            </div>

          </button>


        </div>

      </div>

          {/* to make confiromation modal visible and invisible */}
      {
        confirmationModal && <ConfirmationModal modaldata={confirmationModal} ></ConfirmationModal>
      }

    </div>
  )
}

export default Sidebar
