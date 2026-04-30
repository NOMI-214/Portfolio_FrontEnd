import axios from 'axios'

const BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const api = axios.create({ baseURL: BASE })

api.interceptors.request.use(cfg => {
  const token = localStorage.getItem('admin_token')
  if (token) cfg.headers.Authorization = `Bearer ${token}`
  return cfg
})

export const getPortfolio  = () => api.get('/api/portfolio')
export const getStats      = () => api.get('/api/portfolio/stats')

export const login         = (username, password) => {
  const form = new URLSearchParams()
  form.append('username', username)
  form.append('password', password)
  return api.post('/api/auth/login', form, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
}
export const getMe         = () => api.get('/api/auth/me')

export const getProjects   = () => api.get('/api/projects')
export const createProject = d => api.post('/api/projects', d)
export const updateProject = (id, d) => api.put(`/api/projects/${id}`, d)
export const deleteProject = id => api.delete(`/api/projects/${id}`)

export const getSkills     = () => api.get('/api/skills')
export const createSkill   = d => api.post('/api/skills', d)
export const updateSkill   = (id, d) => api.put(`/api/skills/${id}`, d)
export const deleteSkill   = id => api.delete(`/api/skills/${id}`)

export const getExperience = () => api.get('/api/experience')
export const createExp     = d => api.post('/api/experience', d)
export const updateExp     = (id, d) => api.put(`/api/experience/${id}`, d)
export const deleteExp     = id => api.delete(`/api/experience/${id}`)

export const getCertificates  = () => api.get('/api/certificates')
export const createCert       = d => api.post('/api/certificates', d)
export const updateCert       = (id, d) => api.put(`/api/certificates/${id}`, d)
export const deleteCert       = id => api.delete(`/api/certificates/${id}`)

export const getAbout      = () => api.get('/api/about')
export const updateAbout   = d => api.put('/api/about', d)

export const getContact    = () => api.get('/api/contact')
export const updateContact = d => api.put('/api/contact', d)

export const submitMessage = d => api.post('/api/messages', d)
export const getMessages   = () => api.get('/api/messages')
export const markRead      = id => api.patch(`/api/messages/${id}/read`)
export const deleteMessage = id => api.delete(`/api/messages/${id}`)

export default api
