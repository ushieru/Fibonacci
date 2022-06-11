import { useState, useEffect } from "react"

const useFib = () => {
    const [seenIndexes, setSeenIndexes] = useState([])
    const [values, setValues] = useState({})

    const fetchValues = async () => {
        const response = await fetch(`/api/values/current`)
        const values = await response.json()
        setValues(values)
    }

    const fetchIndex = async () => {
        const response = await fetch(`/api/values/all`)
        const values = await response.json()
        setSeenIndexes(values)
    }

    const postIndex = async (index) => {
        await fetch('/api/values', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ index: parseInt(index) })
        })
        refresh()
    }

    const refresh = () => {
        fetchIndex()
        fetchValues()
    }

    useEffect(refresh, [])

    return { seenIndexes, values, postIndex }
}

export default useFib