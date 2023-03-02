import React, { useState, useContext, useEffect } from 'react'

import axios from 'axios'
const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s='
const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php'

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const [meals, setMeals] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  const fetchMeals = async (url) => {
    setLoading(true)
    try {
      const { data } = await axios.get(url)
      if(data.meals) {
          setMeals(data.meals)
      }else {
        setMeals([])
      }
    }
    catch (e) {
      console.log(e.response)
    }
    setLoading(false)
  }

  useEffect( ()=> {
    fetchMeals(allMealsUrl)
  }, [])
  
  useEffect(() => {
    if(!searchTerm) return
    fetchMeals(`${allMealsUrl}${searchTerm}`)
  }, [searchTerm])

  const fetchRandomMeal = () => {
    fetchMeals(randomMealUrl)
  }

  return (
    <AppContext.Provider value={{ loading, meals, setSearchTerm, fetchRandomMeal }}>
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppContext, AppProvider }