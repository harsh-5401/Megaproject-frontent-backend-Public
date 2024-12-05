import React from 'react'
import { useSelector , useDispatch } from 'react-redux';
import { useState } from 'react';
import { RxDropdownMenu } from "react-icons/rx";
import { MdOutlineEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import {AiOutlinePlus} from "react-icons/ai"
import SubsectionModal from './SubsectionModal';
import { deleteSection, deleteSubSection } from '../../services/operations/courseDetailsAPI';
import { setcourse } from '../../slices/courseSlice';
import ConfirmationModal from "../common/ConfirmationModal"
import { RiDeleteBin6Line } from 'react-icons/ri';
import { AiFillCaretDown } from 'react-icons/ai';
import { MdEdit } from 'react-icons/md';
import { FaPlus } from 'react-icons/fa';


function Nestedview({handleChangeEditSectionName}) {
    
    const {course} = useSelector((state)=>state.course);
    const {token} = useSelector((state)=>state.auth);

    const dispatch= useDispatch();

    const [addsubsection , setaddsubsection] = useState(null)
    const [viewsubsection , setviewsubsection] = useState(null)
    const [editsubsection , seteditsubsection] = useState(null)
    const[confirmationModal , setconfirmationModal]=useState(null)

    async function handleDeleteSection(sectionid){
        const result=await deleteSection({
            sectionid,
            courseid:course._id,
            token
        })

        console.log("result after deleting section" , result);
        
        if(result){
            dispatch(setcourse(result))
        }

        setconfirmationModal(null)
    }

    async function handleDeleteSubSection(subsectionid , sectionid){
        const result=await deleteSubSection({
            subsectionid , sectionid , token, courseid:course._id
        });

        console.log("result after deleting sub-section" , result);

        if(result){
            // kuch extra socho
            dispatch(setcourse(result))
        }
        setconfirmationModal(null)
    }

    function printsction(section){
        console.log("section is" , section)
    }

  return (
    
    <>
        <div
        className="rounded-lg bg-richblack-700 p-6 px-8"
        id="nestedViewContainer">
            {course?.coursecontent?.map((section) => (
                //Section DropDown
                <details key={section._id} open>
                {/* Section Dropdown Content */}
                <summary className="flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2">
                <div className="flex items-center gap-x-3">
                    <RxDropdownMenu className="text-2xl text-richblack-50" />
                    <p className="font-semibold text-richblack-50">
                    {section.sectionname}
                    </p>
                </div>
                <div className="flex items-center gap-x-3">
                    <button
                    onClick={() =>
                        handleChangeEditSectionName(
                        section._id,
                        section.sectionname
                        )
                    }
                    >
                    <MdOutlineEdit className="text-xl text-richblack-300" />
                    </button>
                    <button
                    onClick={() =>
                        setconfirmationModal({
                        text1: "Delete this Section?",
                        text2: "All the lectures in this section will be deleted",
                        btn1text: "Delete",
                        btn2text: "Cancel",
                        btn1Handler: () => handleDeleteSection(section._id),
                        btn2Handler: () => setconfirmationModal(null),
                        })
                    }
                    >
                    <RiDeleteBin6Line className="text-xl text-richblack-300" />
                    </button>
                    <span className="font-medium text-richblack-300">|</span>
                    <AiFillCaretDown className={`text-xl text-richblack-300`} />
                    </div>
                    </summary>
                    <div className="px-6 pb-4">
                    {/* Render All Sub Sections Within a Section */}
                    {section.subsection.map((data) => (
                        <div
                        key={data?._id}
                        onClick={() => setviewsubsection(data)}
                        className="flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 py-2"
                        >
                        <div className="flex items-center gap-x-3 py-2 ">
                            <RxDropdownMenu className="text-2xl text-richblack-50" />
                            <p className="font-semibold text-richblack-50">
                            {data.title}
                            </p>
                        </div>
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-x-3"
                        >
                            <button
                            onClick={() =>
                                seteditsubsection({ ...data, sectionId: section._id })
                            }
                            >
                            <MdEdit className="text-xl text-richblack-300" />
                            </button>
                            <button
                            onClick={() =>
                                setconfirmationModal({
                                text1: "Delete this Sub-Section?",
                                text2: "This lecture will be deleted",
                                btn1text: "Delete",
                                btn2text: "Cancel",
                                btn1Handler: () =>
                                    handleDeleteSubSection(data._id, section._id),
                                btn2Handler: () => setconfirmationModal(null),
                                })
                            }
                            >
                            <RiDeleteBin6Line className="text-xl text-richblack-300" />
                            </button>
                        </div>
                        </div>
                    ))}
                    {/* Add New Lecture to Section */}
                    <button
                        onClick={() => setaddsubsection(section._id)}
                        className="mt-3 flex items-center gap-x-1 text-yellow-50"
                    >
                        <FaPlus className="text-lg" />
                        <p>Add Lecture</p>
                    </button>
                    </div>
                </details>
            ))}
        </div>

        {/* Modal Display */}

        {
        addsubsection ? (<SubsectionModal modaldata={addsubsection} setmodaldata={setaddsubsection} add={true}></SubsectionModal>) 
        : viewsubsection? (<SubsectionModal modaldata={viewsubsection} setmodaldata={setviewsubsection} view={true}></SubsectionModal>) 
        : editsubsection? (<SubsectionModal modaldata={editsubsection} setmodaldata={seteditsubsection} edit={true}></SubsectionModal>) 
        : (<div></div>)
       }

        {/* Confirmation Modal */}

        {confirmationModal ? (
            <ConfirmationModal modalData={confirmationModal}/>
        ): (<></>)}
        
    </>

  )
}

export default Nestedview
