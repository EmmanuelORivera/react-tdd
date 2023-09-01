import React, { useEffect, useState } from 'react'

const foodList = ['Hamburger', 'Pizza', 'Tacos']

const fakeApiCall = () =>
  new Promise((resolve) => setTimeout(resolve(foodList), 2000))

const AsyncList = () => {
  const [foodData, setFoodData] = useState([])

  useEffect(() => {
    const fetchFood = async () => {
      const response = await fakeApiCall()
      setFoodData(response)
    }
    fetchFood()
  }, [])

  return (
    <div>
      {foodData.map((name) => (
        <p key={name}>{name}</p>
      ))}
    </div>
  )
}

export default AsyncList
