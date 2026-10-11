import { useParams, useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { PDFDocument } from 'pdf-lib'
import books from '../data/books'
import './BookPage.css'

function BookPage() {
  const { bookId } = useParams()
  const navigate = useNavigate()
  const { language, setLanguage } = useLanguage()
  const book = books.find(b => b.id === parseInt(bookId))

  if (!book) {
    return <div className="book-page"><h2>Book not found</h2></div>
  }

  const chapterPdfs = book.chapterPdfs || []
  const chapterNames = book.chapterNames || []
  const totalChapters = book.chapters || 0

  const openChapter = (chapterIndex) => {
    navigate(`/book/${book.id}/${chapterIndex}`)
  }

  // Download all chapters as a single merged PDF
  const downloadFullBook = async () => {
    try {
      const mergedPdf = await PDFDocument.create()

      for (let i = 0; i < chapterPdfs.length; i++) {
        const chapterUrl = chapterPdfs[i]
        const response = await fetch(chapterUrl)
        const arrayBuffer = await response.arrayBuffer()
        const pdfDoc = await PDFDocument.load(arrayBuffer)
        const pages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices())
        pages.forEach(page => mergedPdf.addPage(page))
      }

      const mergedPdfBytes = await mergedPdf.save()
      const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${book.title}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error merging PDFs:', error)
      alert('Download failed. Please try again.')
    }
  }

  return (
    <div className="book-page">
      <div className="lang-toggle">
        <button className={`lang-btn ${language === 'english' ? 'active' : ''}`} onClick={() => setLanguage('english')}>
          🇮🇳 English
        </button>
        <button className={`lang-btn ${language === 'hindi' ? 'active' : ''}`} onClick={() => setLanguage('hindi')}>
          🇮🇳 हिंदी
        </button>
      </div>

      <div className="book-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← {language === 'english' ? 'Back' : 'वापस'}
        </button>
        <h2>{language === 'english' ? book.title : (book.titleHi || book.title)}</h2>
        <button className="download-btn" onClick={downloadFullBook}>
          ⬇ {language === 'english' ? 'Download Full Book' : 'पूरी किताब डाउनलोड करें'}
        </button>
      </div>

      <div className="book-info">
        <p>📖 {totalChapters} {language === 'english' ? 'Chapters' : 'अध्याय'}</p>
        <p>📄 PDF</p>
      </div>

      <div className="chapters-list">
        <h3>{language === 'english' ? 'Chapters' : 'अध्याय'}</h3>
        {chapterPdfs.length > 0 ? (
          <div className="chapters-vertical">
            {chapterPdfs.map((pdf, idx) => (
              <button key={idx} className="chapter-item" onClick={() => openChapter(idx)}>
                <span className="chapter-number">{idx + 1}</span>
                <span className="chapter-name">{chapterNames[idx] || `Chapter ${idx + 1}`}</span>
                <span className="chapter-arrow">→</span>
              </button>
            ))}
          </div>
        ) : (
          <p className="no-pdf">{language === 'english' ? 'No PDF available' : 'कोई PDF उपलब्ध नहीं'}</p>
        )}
      </div>
    </div>
  )
}

export default BookPage
