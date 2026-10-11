import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import books from '../data/books'
import './SubjectsPage.css'

const subjectIcons = {
  Mathematics: '📐',
  Science: '🔬',
  'Social Science': '🌍',
  Hindi: '📖',
  English: '📕',
  Sanskrit: '📜'
}

const subjectColors = {
  Mathematics: '#4f46e5',
  Science: '#059669',
  'Social Science': '#d97706',
  Hindi: '#dc2626',
  English: '#7c3aed',
  Sanskrit: '#0891b2'
}

const subjectNamesEn = {
  Mathematics: 'Mathematics',
  Science: 'Science',
  'Social Science': 'Social Science',
  Hindi: 'Hindi',
  English: 'English',
  Sanskrit: 'Sanskrit'
}

const subjectNamesHi = {
  Mathematics: 'गणित',
  Science: 'विज्ञान',
  'Social Science': 'सामाजिक विज्ञान',
  Hindi: 'हिंदी',
  English: 'अंग्रेज़ी',
  Sanskrit: 'संस्कृत'
}

const classSubjects = {
  6: ['English', 'Hindi', 'Mathematics', 'Science', 'Social Science', 'Sanskrit'],
  7: ['English', 'Hindi', 'Mathematics', 'Science', 'Social Science', 'Sanskrit'],
  8: ['English', 'Hindi', 'Mathematics', 'Science', 'Social Science', 'Sanskrit'],
  9: ['English', 'Hindi', 'Mathematics', 'Science', 'Social Science', 'Sanskrit'],
  10: ['English', 'Hindi', 'Mathematics', 'Science', 'Social Science', 'Sanskrit'],
  11: ['English', 'Hindi', 'Mathematics', 'Science', 'Social Science'],
  12: ['English', 'Hindi', 'Mathematics', 'Science', 'Social Science']
}

function SubjectsPage() {
  const { classNum } = useParams()
  const selectedClass = parseInt(classNum) || 10
  const [selectedSubject, setSelectedSubject] = useState(null)
  const { language, setLanguage } = useLanguage()
  const navigate = useNavigate()

  const subjects = classSubjects[selectedClass] || classSubjects[10]

  const subjectBooks = selectedSubject
    ? books.filter(b => {
        if (b.subject !== selectedSubject) return false
        return b.class === String(selectedClass)
      })
    : []

  const getBookTitle = (book) => {
    if (language === 'english') return book.title
    if (book.subject === 'English') return book.title
    return book.titleHi || book.title
  }

  const getSubjectName = (subject) => {
    return language === 'english' ? subjectNamesEn[subject] : subjectNamesHi[subject]
  }

  const downloadBook = async (book) => {
    const chapterPdfs = book.chapterPdfs || []
    for (let i = 0; i < chapterPdfs.length; i++) {
      const link = document.createElement('a')
      link.href = chapterPdfs[i]
      link.download = `${book.title} - Chapter ${i + 1}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      await new Promise(resolve => setTimeout(resolve, 500))
    }
  }

  return (
    <div className="subjects-page">
      <div className="lang-toggle">
        <button className={`lang-btn ${language === 'english' ? 'active' : ''}`} onClick={() => setLanguage('english')}>
          🇮🇳 English
        </button>
        <button className={`lang-btn ${language === 'hindi' ? 'active' : ''}`} onClick={() => setLanguage('hindi')}>
          🇮🇳 हिंदी
        </button>
      </div>

      {!selectedSubject && (
        <button className="back-btn" onClick={() => navigate('/')}>
          ← {language === 'english' ? 'Back' : 'वापस'}
        </button>
      )}

      <div className="subjects-header">
        <h2>📚 NCERT Books — Class {selectedClass}</h2>
        <p>{language === 'english' ? 'Choose a subject and open book PDFs' : 'विषय चुनें और किताबों की PDF खोलें'}</p>
      </div>

      {!selectedSubject ? (
        <div className="subjects-grid">
          {subjects.map(subject => (
            <button
              key={subject}
              className="subject-card"
              style={{ '--subject-color': subjectColors[subject] }}
              onClick={() => setSelectedSubject(subject)}
            >
              <span className="subject-icon">{subjectIcons[subject]}</span>
              <span className="subject-name">{getSubjectName(subject)}</span>
              <span className="subject-count">
                {books.filter(b => b.subject === subject && b.class === String(selectedClass)).length} books
              </span>
            </button>
          ))}
        </div>
      ) : (
        <>
          <button className="back-btn" onClick={() => setSelectedSubject(null)}>
            ← {language === 'english' ? 'Back' : 'वापस'}
          </button>
          <h3 className="selected-subject-title" style={{ color: subjectColors[selectedSubject] }}>
            {subjectIcons[selectedSubject]} {getSubjectName(selectedSubject)}
          </h3>

          {subjectBooks.length > 0 ? (
            <div className="subject-books-list">
              {subjectBooks.map(book => (
                <div key={book.id} className="subject-book-item">
                  <div className="subject-book-info">
                    <h4>{getBookTitle(book)}</h4>
                    <span className="chapter-count">📖 {book.chapters} {language === 'english' ? 'Chapters' : 'अध्याय'}</span>
                  </div>
                  <div className="subject-book-actions">
                    <button className="open-btn" onClick={() => navigate(`/book/${book.id}`)}>
                      📄 {language === 'english' ? 'Open' : 'खोलें'}
                    </button>
                    <button className="download-btn-inline" onClick={() => downloadBook(book)}>
                      ⬇ {language === 'english' ? 'Download' : 'डाउनलोड'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="coming-soon">
              <p>📚</p>
              <h4>{language === 'english' ? `Class ${selectedClass} ki books jald aa rahi hain!` : `कक्षा ${selectedClass} की किताबें जल्द आ रही हैं!`}</h4>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default SubjectsPage
