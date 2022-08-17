import React, { useState } from 'react'
import ReactCardFlip from "react-card-flip";
import axios from 'axios';


export default function Card({ item, detailData, index }) {
    const [isFlipped, setIsFlipped] = useState(false);
    const [cardBack, setCardBack] = useState();
    const onPushScreen = (index) => {
        let indexIngredient = detailData?.extendedIngredients[index].id
        let substitute = `https://api.spoonacular.com/food/ingredients/${indexIngredient}/substitutes?&apiKey=588edb3247684ed7ae5bcd54ab0f18b8`
        console.log(index)
        axios.get(substitute).then(resp => {
            setCardBack(resp.data)
        })
    }

    const toTitleCase = (phrase) => {
        return phrase
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    return (
        <div>
            <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
                <div className="xl:mx-8  flex mt-10 flex-wrap mb-10  flex-col  items-center justify-around	h-56  w-56  rounded-2xl border-2   border-yellow-500 shadow-[5px_5px_rgba(0,_98,_90,_0.4),_10px_10px_rgba(0,_98,_90,_0.3),_15px_15px_rgba(0,_98,_90,_0.2),_20px_20px_rgba(0,_98,_90,_0.1),_25px_25px_rgba(0,_98,_90,_0.05)] " >
                  <div  className=''>
                    <img className="max-w-[100px] max-h-[100px]  " src={`https://spoonacular.com/cdn/ingredients_100x100/${item.image}`}></img>
                    </div>
                    <div className="text-white dark:text-gray-300">
                        <p>{toTitleCase(item.name)}</p>
                        <p>{item.measures.metric.amount + "  " + item.measures.metric.unitShort}</p>
                    </div>
                    <div>
                    <button onClick={() => { onPushScreen(index); setIsFlipped((prev) => !prev) }} className="bg-transparent mt-1 hover:bg-yellow-400 text-yellow-500 font-semibold hover:text-white py-2 px-6 border border-yellow-500 hover:border-transparent rounded-lg">
                        Substitute
                    </button>
                    </div>
                </div>
                <div className="h-56 w-56 dark:text-gray-200 flex mt-10 flex-wrap  flex-col  items-center justify-around  rounded-2xl overflow-x-auto  shadow-[inset_-12px_-8px_40px_#46464620]  shadow-yellow-400" >
                    <h1>{cardBack?.ingredient}</h1>
                    <p className='text-center'>{cardBack?.message}</p>
                    <ul className='text-center'><li>{cardBack?.substitutes}</li></ul><br />
                    <button onClick={() => { onPushScreen(index); setIsFlipped((prev) => !prev) }} className="mb-2 mt-1 bg-yellow-400 hover:bg-yellow-500 font-semibold text-white py-2 px-6  rounded-lg">
                        Go back
                    </button>
                </div>
            </ReactCardFlip>
        </div>
    )
}
