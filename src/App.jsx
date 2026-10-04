import { useState } from 'react'
import HomePage from './pages/HomePage'
import SubjectsPage from './pages/SubjectsPage'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [selectedClass, setSelectedClass] = useState(null)

  const handleSelectClass = (classNum) => {
    setSelectedClass(classNum)
    setCurrentPage('subjects')
  }

  const handleBack = () => {
    setCurrentPage('home')
    setSelectedClass(null)
  }

  if (currentPage === 'subjects') {
    return <SubjectsPage selectedClass={selectedClass} onBack={handleBack} />
  }

  return <HomePage onSelectClass={handleSelectClass} />
}

export default App
