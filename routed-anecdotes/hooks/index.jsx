import { useState, useEffect } from "react"

export const useField = (name) => {
  const [value, setValue] = useState("")

  const onChange = (e) => {
    setValue(e.target.value)
  }

  const reset = () => {
    setValue("")
  }

  return {
    name,
    value,
    onChange,
    reset,
  }
}

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  const [isError, setIsError] = useState(false)

  const url = "https://studies.cs.helsinki.fi/restcountries/api/name"

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(`${url}/${name}`)
        const data = await res.json()
        if(res.ok) {
          setCountry(data)
          setIsError(false)
        } else {
          throw new Error(data.status)
        }
      } catch (error) {
        setIsError(true)
        setCountry(null)
      }
    }

    if (name) {
      getData()
    }
  }, [name])

  return {country, isError}
}
