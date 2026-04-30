import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { PortfolioProvider } from './context/PortfolioContext'
import { AuthProvider } from './context/AuthContext'
import { useScrollReveal } from './hooks/useScrollReveal'

import Cursor from './components/Cursor'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Certificates from './components/Certificates'
import Contact from './components/Contact'
import Footer from './components/Footer'

import AdminLogin from './admin/AdminLogin'
import AdminLayout from './admin/AdminLayout'
import Dashboard from './admin/Dashboard'
import ProjectsAdmin from './admin/ProjectsAdmin'
import SkillsAdmin from './admin/SkillsAdmin'
import ExperienceAdmin from './admin/ExperienceAdmin'
import CertificatesAdmin from './admin/CertificatesAdmin'
import AboutAdmin from './admin/AboutAdmin'
import ContactAdmin from './admin/ContactAdmin'
import MessagesAdmin from './admin/MessagesAdmin'

function Portfolio() {
  useScrollReveal()
  return (
    <>
      <div className="blob-container">
        <div className="blob blob-1" /><div className="blob blob-2" /><div className="blob blob-3" />
      </div>
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Certificates />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PortfolioProvider>
          <Cursor />
          <Loader />
          <Routes>
            <Route path="/" element={<Portfolio />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="projects" element={<ProjectsAdmin />} />
              <Route path="skills" element={<SkillsAdmin />} />
              <Route path="experience" element={<ExperienceAdmin />} />
              <Route path="certificates" element={<CertificatesAdmin />} />
              <Route path="about" element={<AboutAdmin />} />
              <Route path="contact" element={<ContactAdmin />} />
              <Route path="messages" element={<MessagesAdmin />} />
            </Route>
          </Routes>
        </PortfolioProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
