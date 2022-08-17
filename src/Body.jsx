import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InfiniteScroll from "react-infinite-scroll-component";
import { MetroSpinner } from "react-spinners-kit";
import Navbar from './Navbar';
export default function Body({ data, fetchMoreData, value, setValue, search, setSearch }) {
    const [loading, setLoading] = useState(true)

    let navigate = useNavigate();
    const onPushScreen = (index) => {
        let recipeID = {
            index: data[index].id
        }
        navigate('/DetailsRecipe', { state: recipeID })
    }


    return (

        <div className=''>
            <Navbar value={value} setValue={setValue} search={search} setSearch={setSearch} />
   
            <InfiniteScroll
                dataLength={data.length}
                next={fetchMoreData}
                hasMore={true}
                loader={<div className=' absolute py-5  left-1/2 ' style={{ overflow: "hidden" }}><MetroSpinner
                    size={40} color="#808080"
                   loading={loading} /></div>}
                scrollableTarget="scrollableDiv"
            >
               
                <div className='flex   flex-wrap justify-around'>
                    {data?.map((item, index) => (
                        <div key={index} className='xl:mx-8 text-center mt-20 hover:border-[1px] dark:bg-slate-800 dark:border-[1px] dark:border-slate-600 dark:hover:bg-slate-700  border-red-500 w-72 shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]   rounded-3xl '>
                            <div className='h-44 relative ml-12'>
                                <img className='object-cover hover:scale-150  transition ease-in-out delay-150 duration-300  shadow-[rgba(8,_112,_184,_0.7)_0px_30px_90px] shadow-yellow-500 dark:shadow-black -top-10 absolute h-48 w-48 rounded-full' src={item.image?item.image:'https://media.istockphoto.com/photos/no-image-available-picture-id531302789'} onError={(e) => (e.target.onerror = null, e.target.src = 'https://media.istockphoto.com/photos/no-image-available-picture-id531302789')}></img>
                            </div>
                            <div className=' '>
                                <div className=' mb-4 font-semibold  dark:text-white'>
                                    <h1>{item.title}</h1>
                                </div>
                                <div className='mb-6 '>
                                    <button onClick={() => onPushScreen(index)} className="dark:bg-transparent dark:text-yellow-500 dark:hover:text-white dark:hover:bg-yellow-500    py-2 px-4 border border-yellow-500  bg-yellow-500 hover:bg-yellow-400 hover:border-transparent rounded-lg">
                                        Recipe Detail
                                    </button>
                                </div>
                            </div>
                        </div>))
                    } </div>

            </InfiniteScroll>
           
        </div>

    )
}
