import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';



export const DietPlan = () => {
  const [data, setData] = useState()
  const [foodType, setFoodTyoe] = useState()
  const [colories, setColories] = useState(1000)
  let api = `https://api.spoonacular.com/mealplanner/generate?timeFrame=day&targetCalories=${colories}&${foodType}&apiKey=588edb3247684ed7ae5bcd54ab0f18b8`


  useEffect(() => {
    axios.get(api).then(resp => {
      console.log("ddd", resp.data)
      setData(resp.data)

    })
  }, [foodType, colories])
  let navigate = useNavigate();
  const onPushButton = (index) => {
    let recipeID = {
      index: data.meals[index].id
    }
    console.log(recipeID)
    navigate('/DetailsRecipe', { state: recipeID })
  }


  return (
    <div className='bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100 dark:gradient-to-t dark:from-slate-800 dark:to-slate-900 w-full h-max-full'>
      <div className=' w-full'>
        <div className='pt-10 text-center text-xl sm:text-2xl  font-Lora font-black text-yellow-500 '>
          <h1><span className='font-Heebo text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-300 to-red-500 '>Plan your Breakfast Lunch and Dinner for a day  according to calories</span> <br></br>
            <span className='text-red-500 border-y-[1px] border-y-red-500 text-2xl'>how much you want <input className='bg-red-200  border-y-[1px] border-y-red-500 my-3 pl-3 dark:focus:bg-slate-300 text-gray-700  focus:text-gray-700 focus:bg-white focus:border-yellow-500  focus:outline-none border-y-solid hover:border-2 border-blue-700' value={colories}
              placeholder='200,300,1000,2000,2500' onChange={(e) => setColories(e.target.value)} type='text' /></span>  <br></br>
            <span className='border-y-[1px] border-y-red-500 text-2xl'> and type of food <input type='text' className='bg-red-200 pl-3 pr-3 my-3 text-gray-700 hover:border-2 dark:focus:bg-slate-300 border-blue-700 focus:text-gray-700 focus:bg-white focus:border-y-blue-600 focus:outline-none   border-y border-y-solid border-y-red-500 ' value={foodType}
              placeholder='Vegetarian,Vegan,Gluten Free..' onChange={(e) => setFoodTyoe(e.target.value)} /></span> </h1>
        </div>
        <div className='sm:mt-10 mt-5 flex    flex-wrap justify-center'>
        <h1 className=' dark:shadow-black shadow-yellow-500 dark:bg-slate-800 dark:border-gray-300  shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] border-4 border-white   bg-red-500 text-white  rounded-xl w-min-[150px] py-2 text-xl h-14 px-2 my-3  mx-10'>Carbohydrates:     {data?.nutrients.carbohydrates}</h1>
          <h1 className='dark:shadow-slate-800 shadow-yellow-500 dark:bg-slate-800  dark:border-gray-300  shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] border-4 border-white   bg-red-500 text-white  rounded-xl w-min-[150px] py-2 text-xl  px-2 h-14 my-3  mx-10'>Calories:   {data?.nutrients.calories}</h1>
          <h1 className='dark:shadow-slate-800 shadow-yellow-500 dark:bg-slate-800  dark:border-gray-300 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] border-4 border-white   bg-red-500 text-white  rounded-xl w-min-[150px] py-2 text-xl h-14 px-2 my-3 mx-10'>Protein:   {data?.nutrients.protein}</h1>
          <h1 className='dark:shadow-slate-800 shadow-yellow-500 dark:bg-slate-800 dark:border-gray-300  shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] border-4 border-white   bg-red-500 text-white  rounded-xl w-min-[150px] py-2 text-xl h-14 px-2  my-3 mx-10'>Fat:       {data?.nutrients.fat}</h1>
        </div>
      </div>
      <div className='sm:mt-16 mt-2 flex flex-wrap justify-around '>
        {
          data?.meals?.map((item, index) => (
            <div key={index} >
              <div className='mb-3 mt-8' >
                <div>
                  <img className='object-fit border-2 border-white w-80 h-60 ' src={`https://spoonacular.com/recipeImages/${item.id}-312x231.${item.imageType}`}></img>
                </div>
                <div className=' bg-slate-100 dark:text-white rounded-b-xl border-2 dark:bg-slate-900 dark:border-2 dark:border-white border-blue-100 pt-2 pb-1 mt-1  text-center  max-w-xs text-lg md:text-xl'>
                  <span className='border-b-[1px] border-red-500 px-2'>{ item.title}</span>
                  <div className='border-b-[1px] border-red-500'>
                  {<h1>Ready in <span className='text-red-500'>{item.readyInMinutes + ' mins'}</span> </h1>} 
                  </div>
                  <button onClick={() => onPushButton(index)} className="mt-2 bg-yellow-500  text-white hover:bg-yellow-400 font-normal md:font-semibold py-1 px-2 md:py-2 md:px-4   rounded-lg">
                    Recipe Detail
                  </button>
                </div>
              </div>

            </div>
          ))
        }
      </div>
    </div>
  )
}
