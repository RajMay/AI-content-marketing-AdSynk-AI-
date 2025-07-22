import React from 'react'
import { useState } from 'react'

const practise = () => {

    const [counter, setCounter] = useState(0);
    const [input, setInput] = useState("");

    function increaseCounter() {
        setCounter(counter + 1);
    }




  return (
    <div>
        <input type ="text" onChange={e=>setInput(e.target.value)} />
      <h1> {input} has Clicked :{counter } times</h1>
      <button onClick={increaseCounter} >Click Me</button>
    </div>
  )
}

export default practise
