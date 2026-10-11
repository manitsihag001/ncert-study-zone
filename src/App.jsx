import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext'
import HomePage from './pages/HomePage'
import SubjectsPage from './pages/SubjectsPage'
import BookPage from './pages/BookPage'
import PDFViewerPage from './pages/PDFViewerPage'
import './App.css'

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/class/:classNum" element={<SubjectsPage />} />
          <Route path="/book/:bookId" element={<BookPage />} />
          <Route path="/book/:bookId/:chapterIndex" element={<PDFViewerPage />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  )
}

export default App
