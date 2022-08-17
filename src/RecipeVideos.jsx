import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react'
import { FiSearch } from "react-icons/fi";

export const RecipeVideos = () => {
  const [videoValue, setVideoValue] = useState("pasta")

  let recipeVideos = `https://api.spoonacular.com/food/videos/search?query=${videoValue}&number=200&apiKey=588edb3247684ed7ae5bcd54ab0f18b8`


  useEffect(() => {
    const timer = setTimeout(async () => {
      if (videoValue?.length === 0) {
        setVideoValue()
      } else if (videoValue?.length >= 3) {
        await axios.get(recipeVideos).then(resp => {
          setVideoValue(resp.data)
        }, 500);
        return () => {
          clearTimeout(timer);
        }
      }
    })
  }, [recipeVideos]);


  return (
    <div>
      <div className='flex flex-wrap justify-center py-12'>
        <div className='realtive flex items-center text-xl focus-within:text-blue-600'>
      <i className='absolute pl-4'> < FiSearch/></i>
      <input type='search' placeholder='Search recipes videos' onChange={(e) => setVideoValue(e.target.value)} className='sm:px-12 px-11 text-gray-700 bg-slate-100 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none w-72 h-12 sm:w-96 sm:h-12 rounded-full dark:bg-slate-700 dark:text-gray-300 border border-solid border-gray-300 '>
        </input><br /><br />
      </div>
      </div>
      <div className='flex flex-wrap justify-around '>
        {
          videoValue?.videos?.map((item, index) =>
            <div key={index} className ="xl:px-8">
              <iframe  className="  shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] rounded-t-xl"
                loading='lazy'
                id="ytplayer"
                type="video"
                allowfullscreen="true"
                width="100%"
                height="250"
                src={`https://www.youtube.com/embed/${item?.youTubeId}?modestbranding=1`}
                
              ></iframe>
              <h1 className='bg-slate-100 rounded-b-xl border-2 border-blue-100 pt-2 pb-1 mt-1  text-center  max-w-xs text-xl'>{item.title}</h1>
              <br /><br />
            </div>)
        }
      </div>
    </div>
  )
}
