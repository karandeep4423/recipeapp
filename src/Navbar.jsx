import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FiSearch } from "react-icons/fi";
import Toggle from './ThemeToggle';


const options = {
  'Find By Ingredients': "ingredients",
  'Find Menu Items': "menuItems",
  'Search Recipe': "recipe"
};

export default function Navbar({ value, search, setValue, setSearch }) {
  const [option, setOption] = useState(Object.keys(options)[0]);

  let navigate = useNavigate();
  const NavigateVideos = () => {
    navigate('/RecipeVideos')
  }
  const DietPlan = () => {
    navigate('/DietPlan')
  }
  return (
    <div className="flex justify-around items-center shadow-[rgba(230,180,44)_0px_9px_30px] dark:shadow-slate-700 font-mono lg:flex-row flex-col ">
      <h2 className="underline decoration-red-500 decoration-double dark:text-white py-4 text-4xl lg:text-xl">Recipe App</h2>

    <div className="search-section ">
      <div className="search-section h-12 flex items-center font-bold font-mono text-xl focus-within:text-blue-700 gap-0 bg-yellow-500  dark:bg-slate-500 focus-within:border-2 border-red-500 rounded-full">
            

          <div className="dropdown group focus:outline-none focus:border-y-2 focus:border-sky-700 ">
           <div className=" relative  sm:w-[250px] flex items-center focus-within:text-blue-600 text-xl p-4 bg-transparent rounded-l-full">
           {option}</div> 
          
           {/* dropdown hidden */}
           <div className="relative rounded-bl-md rounded-br-md gap-2 flex-col hidden group-hover:flex shadow-[rgba(230, 180, 44)_0px_9px_30px] z-10  ml-5">
             <div className=" absolute w-[180px] sm:w-[250px] bg-yellow-500 dark:bg-slate-700  rounded-md pt-4 ">
               {Object.keys(options).map((opt, i) => <h2  key={i} className=" w-full hover:bg-yellow-200 dark:hover:bg-slate-600 p-1 sm:p-2" onClick={() => { setOption(Object.keys(options)[i]); setValue(Object.values(options)[i]) }}>{opt}</h2>)}
             </div>
           </div>
         </div>

          <div className="flex item-center justify-center">
         <i className='pt-[19px] pr-1 '><FiSearch/></i>
        <input 
         name="" id="" 
         className="w-[70px] sm:w-[200px] pl-[1px] sm:pl[10px] dark:placeholder:text-gray-400 dark:text-gray-200 dark:shadow-slate-500 rounded-tr-full bg-transparent h-[60px] border-none outline-none rounded-r-full placeholder:text-black text-black-500 pr-1 sm:pr-6" 
         placeholder="search here"
         value={search}
         onChange={(e) => setSearch(e.target.value)} 
         />
         </div>
      </div>
         </div>

      <div className="menu gap-4 text-md flex py-4">
        <button onClick={() => NavigateVideos()} className="bg-transparent hover:bg-red-500 text-red-500 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded-lg">
          Recipe Videos
        </button>
        <button onClick={() => DietPlan()} className="bg-transparent hover:bg-red-500 text-red-500 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded-lg">
        Diet Plan
        </button>
        <div className='mt-2'>
        <Toggle/>
        </div>
        
      </div>
      </div>
    



  )
}