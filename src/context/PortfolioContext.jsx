import { createContext, useContext, useState, useEffect } from 'react'
import { getPortfolio } from '../api/api'

const PortfolioContext = createContext(null)

export function PortfolioProvider({ children }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getPortfolio()
      .then(r => setData(r.data))
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <PortfolioContext.Provider value={{ data, loading, error }}>
      {children}
    </PortfolioContext.Provider>
  )
}

export const usePortfolio = () => useContext(PortfolioContext)
