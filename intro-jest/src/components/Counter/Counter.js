import React, { useState } from 'react'

const Counter = () => {
  const [counter, setCounter] = useState(0)
  return (
    <div>
      <button onClick={() => setCounter(counter + 1)}>Click</button>
      <p>Clicked times: {counter}</p>
    </div>
  )
}

export default Counter
