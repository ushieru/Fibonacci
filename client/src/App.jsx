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
    <ul>
      {seenIndexes.map(index => <li key={index.number}>{index.number}</li>)}
    </ul>
    <h3>Calculated values</h3>
    <ul>
      {
        Object.entries(values)
          .map(([key, value]) => <li key={key}>
            For index {key} I calculated {value}
          </li>)
      }
    </ul>
  </>
}

export default App
