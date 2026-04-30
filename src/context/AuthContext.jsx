import { createContext, useContext, useState, useEffect } from 'react'
import { login as apiLogin, getMe } from '../api/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (token) {
      getMe().then(r => setAdmin(r.data)).catch(() => localStorage.removeItem('admin_token')).finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (username, password) => {
    const { data } = await apiLogin(username, password)
    localStorage.setItem('admin_token', data.access_token)
    const me = await getMe()
    setAdmin(me.data)
  }

  const logout = () => {
    localStorage.removeItem('admin_token')
    setAdmin(null)
  }

  return <AuthContext.Provider value={{ admin, login, logout, loading }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
