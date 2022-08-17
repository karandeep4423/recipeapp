import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import ProgressBar from "./ProgressBar";
import { MetroSpinner } from "react-spinners-kit";
import axios from 'axios';
import ProgressTaste from "./ProgressTaste";
import Card from "./Card";

const DetailsRecipe = function DetailsRecipe() {
  let location = useLocation();
  const [detailData, setDetailData] = useState();
  const [nutritionList, setNutritionList] = useState();
  const [loading, setLoading] = useState(true)
  const [taste, setTaste] = useState();
  const [keys, setKeys] = useState();
  const [recipes, setRecipes] = useState();
  const [apiValue, setApiValue] = useState(location.state.index)


  let instructions = `https://api.spoonacular.com/recipes/${apiValue}/information?includeNutrition=false&apiKey=588edb3247684ed7ae5bcd54ab0f18b8`
  let nutrition = `https://api.spoonacular.com/recipes/${apiValue}/nutritionWidget.json?&apiKey=588edb3247684ed7ae5bcd54ab0f18b8`
  let tasteData = `https://api.spoonacular.com/recipes/${apiValue}/tasteWidget.json?&apiKey=588edb3247684ed7ae5bcd54ab0f18b8`
  let similarRecipes = `https://api.spoonacular.com/recipes/${apiValue}/similar?&apiKey=588edb3247684ed7ae5bcd54ab0f18b8`


  useEffect(() => {
    setLoading(true)
    axios.get(instructions).then(resp => {
      setDetailData(resp.data);
      setLoading(false)
    });
    axios.get(nutrition).then(resp => {
      setNutritionList(resp.data);
      setLoading(false)
    });
    axios.get(similarRecipes).then(resp => {
      setRecipes(resp.data)
    });
    const data = async () => {
      await axios.get(tasteData).then(resp => {
        const propertyValues = Object.values(resp.data);
        const propertyKeys = Object.keys(resp.data);
        setTaste(propertyValues)
        setKeys(propertyKeys)
      })
    };
    data();

  }, [apiValue])

  const onPushButton = (index) => {
    let indexRecipe = recipes[index].id
    setApiValue(indexRecipe);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  const toTitleCase = (phrase) => {
    return phrase
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="">
      <div className="fixed top-1/2 left-1/2" style={{ overflow: "hidden" }}>
        <MetroSpinner size={40} loading={loading} color="#808080" />
      </div>
      <h1 className="text-center dark:text-white text-black py-5 underline decoration-4 decoration-red-700 text-2xl sm:text-4xl font-Lora font-extrabold  ">{detailData?.title}</h1>
      <div className="flex flex-wrap justify-center">
      <div className="flex  flex-wrap justify-around shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] bg-gradient-to-r from-rose-100 to-yellow-100  dark:bg-transparent dark:gradient-to-t dark:from-slate-800 dark:to-slate-800  w-11/12   p-10 rounded-3xl">
        <img className="  object-cover border-[10px] border-white dark:border-gray-300  shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] md:h-96 h-min-96  rounded-3xl w-96" src={detailData?.image}></img>
        <div className="sm:mt-10 largesc:w-2/5 largesc:h-[270px]  dark:bg-slate-800 dark:text-gray-300 shadow-[inset_-12px_-8px_40px_#46464620] border-2 border-white  text-black font-Inter  rounded-2xl pl-4 pt-5  scrollbar  h-60 w-96 md:h-96 mt-10 lap:mt-0  overflow-hidden  hover:overflow-y-scroll">
          <div className="" dangerouslySetInnerHTML={{ __html: detailData?.summary }} ></div>
        </div>
        </div>
      </div>
      <div className="bg-gradient-to-br from-yellow-500 via-yellow-200 to-yellow-500 dark:gradient-to-t dark:from-slate-800 dark:to-slate-800    w-full h-max-[650px] ">
        <h1 className="text-center font-Lora font-extrabold  mt-16 pt-6 text-white underline decoration-4 decoration-red-500 text-2xl md:text-4xl">Follow Steps to prepare {detailData?.title}</h1>
        <div className=" flex flex-wrap justify-around">
          {detailData?.analyzedInstructions[0]?.steps?.map((item, index) => (
            <div key={index} className="bg-white dark:text-gray-700 font-Inter  border-2 border-red-500 shadow-[5px_5px_rgba(0,_0,_0,_0.25),_10px_10px_rgba(0,_0,_0,_0.2),_15px_15px_rgba(0,_0,_0,_0.2),_20px_20px_rgba(0,_0,_0,_0.1),_25px_25px_rgba(0,_0,_0,_0.05)]   mb-8  xl:mx-8     h-60 w-72 rounded-3xl scrollbar   mt-8 p-4 overflow-hidden hover:overflow-y-scroll " >
              <h1>{item.number + ".  " + item.step}</h1>
              <div className="flex flex-wrap w-72 ">
                {item.equipment.map((item, index) => (<div key={index}><img src={`https://spoonacular.com/cdn/equipment_100x100/${item.image}`}></img><p>{item.name}</p></div>))}
                {item.ingredients.map((item, index) => (<div key={index}><img src={`https://spoonacular.com/cdn/ingredients_100x100/${item.image}`}></img><p>{item.name}</p></div>))}
              </div>
            </div>))}
        </div>
      </div><br />
      <div className="bg-red-500  dark:bg-slate-800 w-full h-max-[600px] rounded-3xl">
        <h1 className="text-center font-Lora font-extrabold text-white underline decoration-4 decoration-yellow-500 text-2xl sm:text-4xl mt-5 pt-6">Ingredients Quantity</h1>
        <h2 className="mt-2 text-center text-white underline text-xl decoration-yellow-500 font-medium ">For Servings {detailData?.servings}</h2>
        <div className="flex flex-wrap justify-around ">
          {detailData?.extendedIngredients.map((item, index) => (<div>
            <Card item={item} detailData={detailData} index={index} key={`card-${index}`} />
          </div>
          ))}
        </div>
      </div><br /><br />
      <div className="flex justify-around flex-wrap">
        <div className="bg-red-500 dark:shadow-black dark:bg-slate-800 text-white w-96 max-h-[520px] shadow-yellow-500 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] border-4 border-white dark:border-gray-300 rounded-2xl ">
          <h1 className="text-center underline decoration-4 decoration-yellow-500 text-xl sm:text-2xl font-medium text-white mt-5 font-Lora">Nutrition in {detailData?.title}</h1>
          {nutritionList?.bad.map((item, indx) => (
            <ProgressBar key={indx} title={item.title} completed={item.percentOfDailyNeeds} />
          ))}
        </div>
        <div className=" rounded-2xl dark:bg-slate-800 dark:shadow-black bg-yellow-500 border-4 dark:border-gray-300 border-white  shadow-red-500 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] text-white h-96 w-96 mt-12 md:mt-0 ">
          <div className="">
            <h1 className="text-center underline decoration-4 decoration-red-500 text-xl sm:text-2xl font-medium text-white mt-5 font-Lora ">Taste of Dish</h1>
            <div className="flex  flex-wrap flex-col  ">
              <div className="ml-10 ">
                {keys?.map((item,index) => <h1 key={index} className="font-Roboto  text-base font-normal mt-[19px] border-b-[1px] border-white dark:border-gray-300">{toTitleCase(item)}</h1>)}
              </div>
              <div className="pl-44 absolute pb-2  flex flex-col flex-wrap">
              {taste?.map((item,index) => (<ProgressTaste item={item} key={index} />))}

              </div>

          </div>
          </div>
          </div>
      </div> <br /><br /> 
       
   
      <div className="text-center underline decoration-4 decoration-red-700 text-3xl sm:text-5xl font-medium text-yellow-500 mt-5 font-Lora">
        <h1>Similar Recipes</h1>
      </div>

      <div className='flex   flex-wrap justify-around  '>
        {recipes?.map((item, index) => (
          <div key={index} className='xl:mx-8  text-center mt-20 hover:border-[1px] dark:border-[1px] dark:border-slate-600 dark:hover:bg-slate-700 dark:bg-slate-800 border-red-500 w-72 shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]   rounded-3xl '>
            <div className='h-44 relative ml-12'>
              <img className='object-cover  hover:scale-150  transition ease-in-out delay-150 duration-300 shadow-[rgba(8,_112,_184,_0.7)_0px_30px_90px] shadow-yellow-500  dark:shadow-black  -top-10 absolute h-48 w-48 rounded-full' src={`https://spoonacular.com/recipeImages/${item.id}-556x370.${item.imageType}`}  onError={(e) => (e.target.onerror = null, e.target.src = 'logo192.png')}></img>
            </div>
            <div className=' '>
              <div className=' mb-4 dark:text-white '>
                <h1>{item.title}</h1>
              </div>
              <div className='mb-6 '>
                <button onClick={() => onPushButton(index)} className="bg-transparent hover:bg-yellow-500 text-yellow-500 font-semibold hover:text-white py-2 px-4 border border-yellow-500 hover:border-transparent rounded-lg">
                  Recipe Detail
                </button>
              </div>
            </div>
          </div>))
        } </div>
    </div>
  )
}
export default DetailsRecipe;
