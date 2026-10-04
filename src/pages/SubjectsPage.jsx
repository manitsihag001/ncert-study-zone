import { useState } from 'react'
import books from '../data/books'
import PDFViewer from './PDFViewer'
import './SubjectsPage.css'

const subjectIcons = {
  Mathematics: '📐',
  Science: '🔬',
  'Social Science': '🌍',
  Hindi: '📖',
  English: '📕',
  Sanskrit: '📜',
  Music: '🎵',
  'Physical Education': '🏃'
}

const subjectColors = {
  Mathematics: '#4f46e5',
  Science: '#059669',
  'Social Science': '#d97706',
  Hindi: '#dc2626',
  English: '#7c3aed',
  Sanskrit: '#0891b2',
  Music: '#ec4899',
  'Physical Education': '#f59e0b'
}

const subjectNamesEn = {
  Mathematics: 'Mathematics',
  Science: 'Science',
  'Social Science': 'Social Science',
  Hindi: 'Hindi',
  English: 'English',
  Sanskrit: 'Sanskrit',
  Music: 'Music',
  'Physical Education': 'Physical Education'
}

const subjectNamesHi = {
  Mathematics: 'गणित',
  Science: 'विज्ञान',
  'Social Science': 'सामाजिक विज्ञान',
  Hindi: 'हिंदी',
  English: 'अंग्रेज़ी',
  Sanskrit: 'संस्कृत',
  Music: 'संगीत',
  'Physical Education': 'शारीरिक शिक्षा'
}

// Subjects for each class
const classSubjects = {
  6: ['Mathematics', 'Science', 'Social Science', 'Hindi', 'English', 'Sanskrit'],
  7: ['Mathematics', 'Science', 'Social Science', 'Hindi', 'English', 'Sanskrit'],
  8: ['Mathematics', 'Science', 'Social Science', 'Hindi', 'English', 'Sanskrit'],
  9: ['Mathematics', 'Science', 'Social Science', 'Hindi', 'English', 'Sanskrit'],
  10: ['Mathematics', 'Science', 'Social Science', 'Hindi', 'English', 'Sanskrit'],
  11: ['Mathematics', 'Science', 'Social Science', 'Hindi', 'English'],
  12: ['Mathematics', 'Science', 'Social Science', 'Hindi', 'English']
}

function SubjectsPage({ selectedClass = 10, onBack }) {
  const [selectedSubject, setSelectedSubject] = useState(null)
  const [selectedBook, setSelectedBook] = useState(null)
  const [language, setLanguage] = useState('english')

  const subjects = classSubjects[selectedClass] || classSubjects[10]

  const subjectBooks = selectedSubject
    ? books.filter(b => {
        if (b.subject !== selectedSubject) return false
        return b.class === String(selectedClass)
      })
    : []

  // Get book title based on language preference
  const getBookTitle = (book) => {
    if (language === 'english') {
      return book.title
    } else {
      if (book.subject === 'English') {
        return book.title
      }
      return book.titleHi || book.title
    }
  }

  // Get subject name based on language
  const getSubjectName = (subject) => {
    return language === 'english' ? subjectNamesEn[subject] : subjectNamesHi[subject]
  }

  return (
    <div className="subjects-page">
      {/* Language Toggle */}
      <div className="lang-toggle">
        <button
          className={`lang-btn ${language === 'english' ? 'active' : ''}`}
          onClick={() => setLanguage('english')}
        >
          🇮🇳 English
        </button>
        <button
          className={`lang-btn ${language === 'hindi' ? 'active' : ''}`}
          onClick={() => setLanguage('hindi')}
        >
          🇮🇳 हिंदी
        </button>
      </div>

      {/* Back Button - Only show when no subject is selected */}
      {!selectedSubject && (
        <button className="back-btn" onClick={onBack}>
          ← {language === 'english' ? 'Back' : 'वापस'}
        </button>
      )}

      <div className="subjects-header">
        <h2>📚 NCERT Books — Class {selectedClass}</h2>
        <p>
          {language === 'english'
            ? 'Choose a subject and open book PDFs'
            : 'विषय चुनें और किताबों की PDF खोलें'}
        </p>
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
                <div
                  key={book.id}
                  className="subject-book-item clickable"
                  onClick={() => setSelectedBook(book)}
                >
                  <div className="subject-book-info">
                    <h4>{getBookTitle(book)}</h4>
                    <span className="chapter-count">
                      📖 {book.chapters} {language === 'english' ? 'Chapters' : 'अध्याय'}
                    </span>
                  </div>
                  <div className="subject-book-actions">
                    <button
                      className="pdf-btn"
                      style={{ backgroundColor: subjectColors[selectedSubject] }}
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedBook(book)
                      }}
                    >
                      📄 {language === 'english' ? 'Open' : 'खोलें'}
                    </button>
                    <a
                      href={book.url}
                      download
                      className="view-btn"
                      onClick={(e) => e.stopPropagation()}
                    >
                      ⬇ {language === 'english' ? 'Download' : 'डाउनलोड'}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="coming-soon">
              <p>📚</p>
              <h4>
                {language === 'english'
                  ? `Class ${selectedClass} ki books jald aa rahi hain!`
                  : `कक्षा ${selectedClass} की किताबें जल्द आ रही हैं!`}
              </h4>
              <p>
                {language === 'english'
                  ? 'Please check back soon for updates.'
                  : 'कृपया जल्द ही अपडेट के लिए देखें।'}
              </p>
            </div>
          )}
        </>
      )}

      {/* PDF Viewer - Full Page */}
      {selectedBook && (
        <PDFViewer
          book={selectedBook}
          language={language}
          onClose={() => setSelectedBook(null)}
        />
      )}
    </div>
  )
}

export default SubjectsPage
