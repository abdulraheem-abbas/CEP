import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './contexts/LanguageContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Courses from './pages/Courses'
import Opportunities from './pages/Opportunities'
import VerifyOpportunity from './pages/VerifyOpportunity'
import TeacherResources from './pages/TeacherResources'
import Chatbot from './pages/Chatbot'
import Admin from './pages/Admin'
import About from './pages/About'
import CurriculumHub from './pages/CurriculumHub'
import SkillsHub from './pages/SkillsHub'
import FirstCurriculum from './pages/FirstCurriculum'

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-[#f0f6ff]">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/curriculum" element={<CurriculumHub />} />
              <Route path="/skills" element={<SkillsHub />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/opportunities" element={<Opportunities />} />
              <Route path="/verify" element={<VerifyOpportunity />} />
              <Route path="/teachers" element={<TeacherResources />} />
              <Route path="/first-curriculum" element={<FirstCurriculum />} />
              <Route path="/rafiq" element={<Chatbot />} />
              {/* Legacy chatbot URL still works */}
              <Route path="/chatbot" element={<Chatbot />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  )
}

export default App
