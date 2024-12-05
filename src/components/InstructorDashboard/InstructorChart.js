import React, { useState } from 'react'
import { Chart , registerables } from 'chart.js';
import { PieController , ArcElement } from 'chart.js';
import { Pie } from 'react-chartjs-2';
// import { Chart } from 'react-chartjs-2';




Chart.register(...registerables);


function InstructorChart({courses}) {
  console.log("COURSES ARE" , courses)
    const [currentchart , setcurrentchart] = useState("students");

    const generateRandomColors = (numColors) => {
      const colors = []
      for (let i = 0; i < numColors; i++) {
        const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
          Math.random() * 256
        )}, ${Math.floor(Math.random() * 256)})`
        colors.push(color)
      }
      return colors
    }

    // creat data for chaart dispaying student info

    const chartdataforStudents= {
      labels:courses.map((course)=>course?.coursename),
      datasets:[
        {
          data: courses.map((course)=>course?.totalstudentEnrolled),
          backgroundColor: generateRandomColors(courses?.length)
        }
      ]
    }



    // creat data for chaart dispaying income info

    const chartdataforincome= {
      labels:courses.map((course)=>course?.coursename),
      datasets:[
        {
          data: courses.map((course)=>course?.totalamountGenerated),
          backgroundColor: generateRandomColors(courses?.length)
        }
      ]
    }



    // create options

    const options={
      maintainAspectRatio: false,
    }

  return (
    // <div className='text-white'>
    //   <p>Visulaize</p>

    //   <div>
    //     <button onClick={()=> setcurrentchart("students")}>
    //       student
    //     </button>

    //     <button onClick={()=> setcurrentchart("income")}>
    //       Income
    //     </button>

    //   </div>

    //   <div>
    //     <Pie data={currentchart==="students" ? chartdataforStudents : chartdataforincome} options={options}>

    //     </Pie>
    //   </div>

    // </div>

    <div className="flex flex-1 flex-col gap-y-4 rounded-md bg-richblack-800 p-6">
      <p className="text-lg font-bold text-richblack-5">Visualize</p>
      <div className="space-x-4 font-semibold">
        {/* Button to switch to the "students" chart */}
        <button
          onClick={() => setcurrentchart("students")}
          className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currentchart === "students"
              ? "bg-richblack-700 text-yellow-50"
              : "text-yellow-400"
          }`}
        >
          Students
        </button>
        {/* Button to switch to the "income" chart */}
        <button
          onClick={() => setcurrentchart("income")}
          className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currentchart === "income"
              ? "bg-richblack-700 text-yellow-50"
              : "text-yellow-400"
          }`}
        >
          Income
        </button>
      </div>
      <div className="relative mx-auto aspect-square h-[320px] w-full">
        {/* Render the Pie chart based on the selected chart */}
        <Pie
          data={currentchart === "students" ? chartdataforStudents : chartdataforincome}
          options={options}
        />
      </div>
    </div>
  )
}

export default InstructorChart
