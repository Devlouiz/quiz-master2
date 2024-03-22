import React from 'react'
import { Link } from 'react-router-dom'
import Quizpage from './Quizpage'
const Landingpage = () => {
  return (
    /*<div className='flex flex-col place-items-center h-full 
    w-full justify-center gap-10  absolute inset-0
    bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),
        linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]'>
        <h2>Generate Your Question for today</h2>
        <Link to="/Quizpage" className=''>Quizpage</Link>
    </div>*/
    <div className="absolute inset-0 h-full w-full 
    bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]
    flex flex-col place-items-center justify-center gap-10 text-center">
        <h2 className='font-sans font-semibold text-3xl'>Generate Your Questions for today</h2>
        <Link to="/Quizpage" className='p-5 border-black'>Quizpage</Link>
    </div>
  )
}

export default Landingpage