import { useParams, useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import books from '../data/books'
import './PDFViewerPage.css'

function PDFViewerPage() {
  const { bookId, chapterIndex } = useParams()
  const navigate = useNavigate()
  const { language, setLanguage } = useLanguage()
  
  const book = books.find(b => b.id === parseInt(bookId))
  const chapter = parseInt(chapterIndex)
  
  if (!book) {
    return <div className="pdf-viewer-page"><h2>Book not found</h2></div>
  }
  
  const pdfUrl = book.chapterPdfs?.[chapter] || `${book.url}#page=${chapter + 1}`
  const chapterName = book.chapterNames?.[chapter] || `Chapter ${chapter + 1}`
  const totalChapters = book.chapters || 0

  return (
    <div className="pdf-viewer-page">
      <div className="lang-toggle">
        <button className={`lang-btn ${language === 'english' ? 'active' : ''}`} onClick={() => setLanguage('english')}>
          🇮🇳 English
        </button>
        <button className={`lang-btn ${language === 'hindi' ? 'active' : ''}`} onClick={() => setLanguage('hindi')}>
          🇮🇳 हिंदी
        </button>
      </div>

      <div className="pdf-viewer-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← {language === 'english' ? 'Back' : 'वापस'}
        </button>
        <h2>{chapterName} - {book.title}</h2>
        <span className="chapter-count">{language === 'english' ? 'Chapter' : 'अध्याय'} {chapter + 1} / {totalChapters}</span>
      </div>
      <div className="pdf-viewer-content">
        <iframe
          src={pdfUrl}
          title={chapterName}
          className="pdf-iframe"
        />
      </div>
    </div>
  )
}

export default PDFViewerPage
