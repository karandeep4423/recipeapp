import React, { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Body from './Body';
import axios from 'axios'
import DetailsRecipe from './DetailsRecipe';
import { RecipeVideos } from './RecipeVideos';
import { DietPlan } from './DietPlan';
import ScrollToTop from './ScrollTop';


export default function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('pasta');
  const [value, setValue] = useState();
  const [page, setPage] = useState(6);
  const [menuItemsPage, setMenuItemsPage] = useState(6);
  const [ingredientsPage, setIngredientsPage] = useState(6)


  const fetchMoreData = () => {
    let Api = `https://api.spoonacular.com/`
    let searchRecipe = Api + `recipes/complexSearch?query=${search}&number=${page}&apiKey=588edb3247684ed7ae5bcd54ab0f18b8`
    let searchMenuItems = Api + `food/menuItems/search?query=${search}&number=${menuItemsPage}&apiKey=588edb3247684ed7ae5bcd54ab0f18b8`
    let findByIngredients = Api + `recipes/findByIngredients?ingredients=${search}&number=${ingredientsPage}&apiKey=588edb3247684ed7ae5bcd54ab0f18b8`


    if (value === "recipe") {
      axios.get(searchRecipe).then(resp => {
        setData(resp.data.results)
        setPage(page + 4)
      });
    } else if (value === 'menuItems') {
      axios.get(searchMenuItems).then(resp => {
        setData(resp.data?.menuItems)
        setMenuItemsPage(menuItemsPage + 4)

      });
    } else {
      axios.get(findByIngredients).then(resp => {
        setData(resp.data)
        setIngredientsPage(ingredientsPage + 4)

      });
    }
  }


  useEffect(() => {
    const timer = setTimeout(async () => {
      if (search.length === 0) {
        setData([]);
        setPage(4)
        setMenuItemsPage(4)
        setIngredientsPage(4)


      }
      if (search.length >= 1) {
        await fetchMoreData()
      }
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [search, value]);


  return (
    <div>

      {
        <Router>
           <ScrollToTop />
          <Routes>
            <Route path='/' element={<Body data={data} fetchMoreData={fetchMoreData}  {...{value,setValue,search,setSearch} }/>}></Route>
            <Route path='/DetailsRecipe' element={<DetailsRecipe />}   ></Route>
            <Route path='/RecipeVideos' element={<RecipeVideos />} />
            <Route path='/DietPlan' element={<DietPlan/>} />

          </Routes>
        </Router>
      }
    </div>

  )

}


