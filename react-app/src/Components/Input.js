import React, { useState } from 'react'

export function Input({addFunction}) {

  let [input, setInput] = useState('')

  const handleChange = (e) => {
    setInput(e.target.value);
  }

  return (
    <div>
      <p>Input</p>
      <input type='text' onChange={handleChange} value={input}></input>
      <button onClick={() => {
        addFunction(input);
        setInput('');
      }}>Add</button>
    </div>
  )
}
