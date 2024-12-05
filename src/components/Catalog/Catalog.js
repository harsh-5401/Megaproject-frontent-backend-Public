import React, { useEffect, useState } from 'react'
import { getCatalogaPageData } from '../../services/operations/pageAndComponentData'
import Footer from '../common/Footer'
import { useParams } from 'react-router-dom'
import { categories } from '../../services/apis';
import CourseSlider from './CourseSlider';
import { apiconnector } from '../../services/apiconnector';
import CourseCard from './CourseCard';



function Catalog() {

    const {catalogname} = useParams();
    console.log("catalog name=" , catalogname);
    const[catalogpagedata , setcatalogpagedata] = useState(null)
    const [categoryid , setcategoryid] = useState(null);
    const [loading, setLoading] = useState(false)
    const [active, setActive] = useState(1)



    async function getcatgories () {
        const result= await apiconnector("GET" , categories.CATEGORIES_API);
        // console.log("result is " , result)
        const category_id = result?.data?.allcategories?.filter((ct)=>ct.name.split(" ").join("-").toLowerCase()===catalogname)[0]._id;
        // console.log("category id =" , category_id)
        setcategoryid(category_id);
    }


    async function getcatgoryDetails(categoryid) {
        setLoading(true)
        try {
          const res=await getCatalogaPageData(categoryid);
          console.log("res is " , res);
          if (res.success) {
            setcatalogpagedata(res);
        }
        else{
            setcatalogpagedata(null)
        }
        console.log("catalogpagedata=" , catalogpagedata)
        setLoading(false)

        } catch(error) {
            console.log(error);
            console.log("unable to get catalog data for particular category")
        }
    }


    // fetch all categories when catalog name value changes whether it is Ai /C++ / web dev

    useEffect(()=> {
        getcatgories();
    },[catalogname])

    useEffect(()=> {
        if(categoryid) {
            getcatgoryDetails(categoryid);
        }
    } , [categoryid])


  return (

    // <div className='text-white'>
    //     <div>
    //         <p>{`Home /Catalog/`}
    //             <span>{catalogpagedata?.name}</span>
    //         </p>
    //         <p>{catalogpagedata?.name}</p>
    //         <p>{catalogpagedata?.description}</p>
    //     </div>

    
    //     <div>
           
    //          {/* section 1 */}
    //         <div>
    //             <div className='flex gap-x-3'>
    //                 <p>Most Popular</p>
    //                 <p>New</p>
    //             </div>
    //             <CourseSlider courses={catalogpagedata?.selectedCourses?.courses}></CourseSlider>
    //         </div>

    //         {/* section 2 */}
    //         <div>
    //             <p>Top Courses in {catalogpagedata?.name}</p>
    //             <div>
    //                 <CourseSlider courses={catalogpagedata?.differentCourses?.courses}></CourseSlider>
    //             </div>
    //         </div>

    //         {/* course 3 */}
    //         <div>
    //             <p>Frequently Bought</p>
    //             <div className='py-8'>
    //                 <div className='grid grid-cols-1 lg:grid-cols-2'>

    //                     {
    //                         catalogpagedata?.mostSellingCourses?.map((course)=> {
    //                            return <CourseCard key={course._id} course={course} height={"h-[400px]"}></CourseCard>
    //                         })
    //                     }

    //                 </div>
    //             </div>
    //         </div>

    //     </div>

    //     <Footer></Footer>

    // </div>


    <>
        {
            (!catalogpagedata) ? 
            (<div className=' text-center text-xl text-richblack-300 my-8'> No Courses for the category </div>) 
            :(
                <>    
    <div className=" box-content bg-richblack-800 px-4">
        <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
        <p className="text-sm text-richblack-300">{`Home / Catalog / `}
        <span className="text-yellow-25">
            {catalogpagedata?.name}
        </span></p>
        <p className="text-3xl text-richblack-5"> {catalogpagedata?.name} </p>
        <p className="max-w-[870px] text-richblack-200"> {catalogpagedata?.description}</p>
        </div>
    </div>

    <div >
        {/* section1 */}
        <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="section_heading">Courses to get you started</div>
            <div className="my-4 flex border-b border-b-richblack-600 text-sm">
            <p
            className={`px-4 py-2 ${
            active === 1
                ? "border-b border-b-yellow-25 text-yellow-25"
                : "text-richblack-50"
            } cursor-pointer`}
            onClick={() => setActive(1)}
        >
            Most Populer
        </p>
        <p
            className={`px-4 py-2 ${
            active === 2
                ? "border-b border-b-yellow-25 text-yellow-25"
                : "text-richblack-50"
            } cursor-pointer`}
            onClick={() => setActive(2)}
        >
            New 
        </p>
            </div>
            <div>
                <CourseSlider courses={catalogpagedata?.selectedCourses.courses} />
            </div>
        </div>  

        {/* section2 */}
        <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="section_heading">Checkout {catalogpagedata?.differentCourses.name} Courses Also</div>
            <div className="py-8">

                <CourseSlider courses={catalogpagedata?.differentCourses.courses}/>
                
            </div>
        </div>

        {/* section3 */}
        <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
            <div className="section_heading">Most Selling Courses</div>
            <div className='py-8'>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

                    {
                        catalogpagedata?.mostSellingCourses.length === 0 ? (<p className=' text-xl text-white'>No Most selling courses</p>) : (catalogpagedata?.mostSellingCourses?.slice(0,4)
                        .map((course, index) => (
                            <CourseCard course={course} key={index} Height={"h-[400px]"}/>
                        )))
                    }

                </div>

            </div>
        </div>

    </div>
    <Footer />
    </>
            )
        }
</>

  )
}

export default Catalog
