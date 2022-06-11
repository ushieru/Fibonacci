import React, { useState } from "react"
import useFib from "./hooks/fib"

function App() {
  const [index, setIndex] = useState('')
  const { seenIndexes, values, postIndex } = useFib()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await postIndex(index)
    setIndex('')
  }

  return <>
    <form onSubmit={handleSubmit}>
      <label htmlFor="">Enter your index:</label>
      <input value={index} onChange={(e) => setIndex(e.target.value)} type="text" />
      <button>Submit</button>
    </form>

    <h3>Indexes I have seen</h3>
    {seenIndexes.map(index => <p key={index.number}>{index.number}</p>)}
    <h3>Calculated values</h3>
    {
      Object.entries(values)
        .map(([key, value]) => <div key={key}>
          For index {key} I calculated {value}
        </div>)
    }
  </>
}

export default App
