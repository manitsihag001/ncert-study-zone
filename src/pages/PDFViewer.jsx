import { useState } from 'react'
import './PDFViewer.css'

function PDFViewer({ book, language, onClose }) {
  const [currentPage, setCurrentPage] = useState(1)

  const chapterNames = book.chapterNames || []
  const totalChapters = book.chapters || 0

  // Generate chapter names if not available
  const getChapterName = (index) => {
    if (chapterNames[index]) return chapterNames[index]
    return language === 'english' ? `Chapter ${index + 1}` : `अध्याय ${index + 1}`
  }

  // Open chapter PDF in a viewer with back button and fullscreen
  const openChapter = (chapterIndex) => {
    const pdfUrl = book.chapterPdfs?.[chapterIndex] || `${book.url}#page=${chapterIndex + 1}`
    const chapterName = getChapterName(chapterIndex)
    
    // Create a blob URL for the HTML content
    const html = `<!DOCTYPE html>
<html>
<head>
  <title>${chapterName} - ${book.title}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', sans-serif; background: #f8fafc; }
    .header {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      background: white;
      border-bottom: 1px solid #e2e8f0;
      position: sticky;
      top: 0;
      z-index: 100;
    }
    .back-btn {
      background: #2563eb;
      color: white;
      border: none;
      padding: 0.75rem 1.25rem;
      border-radius: 8px;
      cursor: pointer;
      font-size: 1rem;
      font-weight: 600;
    }
    .back-btn:hover { background: #1d4ed8; }
    .fullscreen-btn {
      background: #7c3aed;
      color: white;
      border: none;
      padding: 0.75rem 1.25rem;
      border-radius: 8px;
      cursor: pointer;
      font-size: 1rem;
      font-weight: 600;
    }
    .fullscreen-btn:hover { background: #6d28d9; }
    .title { font-size: 1.2rem; color: #1e293b; flex: 1; }
    .pdf-frame { width: 100%; height: calc(100vh - 70px); border: none; }
  </style>
</head>
<body>
  <div class="header">
    <button class="back-btn" onclick="window.close()">← ${language === 'english' ? 'Back' : 'वापस'}</button>
    <span class="title">${chapterName} - ${book.title}</span>
    <button class="fullscreen-btn" onclick="document.querySelector('iframe').requestFullscreen()">⛶ ${language === 'english' ? 'Fullscreen' : 'फुलस्क्रीन'}</button>
  </div>
  <iframe class="pdf-frame" src="${pdfUrl}"></iframe>
</body>
</html>`
    
    const newWindow = window.open('', '_blank')
    if (newWindow) {
      newWindow.document.open()
      newWindow.document.write(html)
      newWindow.document.close()
    }
  }

  // Open answer key in a viewer with back button
  const openAnswerKey = () => {
    if (!book.answerKey) return
    
    const html = `<!DOCTYPE html>
<html>
<head>
  <title>Answer Key - ${book.title}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', sans-serif; background: #f8fafc; }
    .header {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      background: white;
      border-bottom: 1px solid #e2e8f0;
      position: sticky;
      top: 0;
      z-index: 100;
    }
    .back-btn {
      background: #2563eb;
      color: white;
      border: none;
      padding: 0.75rem 1.25rem;
      border-radius: 8px;
      cursor: pointer;
      font-size: 1rem;
      font-weight: 600;
    }
    .back-btn:hover { background: #1d4ed8; }
    .fullscreen-btn {
      background: #7c3aed;
      color: white;
      border: none;
      padding: 0.75rem 1.25rem;
      border-radius: 8px;
      cursor: pointer;
      font-size: 1rem;
      font-weight: 600;
    }
    .fullscreen-btn:hover { background: #6d28d9; }
    .title { font-size: 1.2rem; color: #1e293b; flex: 1; }
    .pdf-frame { width: 100%; height: calc(100vh - 70px); border: none; }
  </style>
</head>
<body>
  <div class="header">
    <button class="back-btn" onclick="window.close()">← ${language === 'english' ? 'Back' : 'वापस'}</button>
    <span class="title">Answer Key - ${book.title}</span>
    <button class="fullscreen-btn" onclick="document.querySelector('iframe').requestFullscreen()">⛶ ${language === 'english' ? 'Fullscreen' : 'फुलस्क्रीन'}</button>
  </div>
  <iframe class="pdf-frame" src="${book.answerKey}"></iframe>
</body>
</html>`
    
    const newWindow = window.open('', '_blank')
    if (newWindow) {
      newWindow.document.open()
      newWindow.document.write(html)
      newWindow.document.close()
    }
  }

  // Open answer key 2 in a viewer with back button
  const openAnswerKey2 = () => {
    if (!book.answerKey2) return
    
    const html = `<!DOCTYPE html>
<html>
<head>
  <title>Answer Key (Part 2) - ${book.title}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', sans-serif; background: #f8fafc; }
    .header {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      background: white;
      border-bottom: 1px solid #e2e8f0;
      position: sticky;
      top: 0;
      z-index: 100;
    }
    .back-btn {
      background: #2563eb;
      color: white;
      border: none;
      padding: 0.75rem 1.25rem;
      border-radius: 8px;
      cursor: pointer;
      font-size: 1rem;
      font-weight: 600;
    }
    .back-btn:hover { background: #1d4ed8; }
    .fullscreen-btn {
      background: #7c3aed;
      color: white;
      border: none;
      padding: 0.75rem 1.25rem;
      border-radius: 8px;
      cursor: pointer;
      font-size: 1rem;
      font-weight: 600;
    }
    .fullscreen-btn:hover { background: #6d28d9; }
    .title { font-size: 1.2rem; color: #1e293b; flex: 1; }
    .pdf-frame { width: 100%; height: calc(100vh - 70px); border: none; }
  </style>
</head>
<body>
  <div class="header">
    <button class="back-btn" onclick="window.close()">← ${language === 'english' ? 'Back' : 'वापस'}</button>
    <span class="title">Answer Key (Part 2) - ${book.title}</span>
    <button class="fullscreen-btn" onclick="document.querySelector('iframe').requestFullscreen()">⛶ ${language === 'english' ? 'Fullscreen' : 'फुलस्क्रीन'}</button>
  </div>
  <iframe class="pdf-frame" src="${book.answerKey2}"></iframe>
</body>
</html>`
    
    const newWindow = window.open('', '_blank')
    if (newWindow) {
      newWindow.document.open()
      newWindow.document.write(html)
      newWindow.document.close()
    }
  }

  // Download PDF properly
  const downloadPDF = () => {
    const link = document.createElement('a')
    link.href = book.url
    link.download = `${book.title}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="pdf-viewer">
      <div className="pdf-viewer-header">
        <button className="back-btn" onClick={onClose}>
          ← {language === 'english' ? 'Back' : 'वापस'}
        </button>
        <h3>{book.title}</h3>
        <div className="pdf-viewer-actions">
          <a
            href={book.url}
            target="_blank"
            rel="noopener noreferrer"
            className="pdf-btn"
            style={{ backgroundColor: book.color }}
          >
            📄 {language === 'english' ? 'Open PDF' : 'PDF खोलें'}
          </a>
          <button
            className="view-btn"
            onClick={downloadPDF}
          >
            ⬇ {language === 'english' ? 'Download' : 'डाउनलोड'}
          </button>
        </div>
      </div>

      <div className="pdf-viewer-content">
        {/* Chapter Sidebar */}
        <div className="chapter-sidebar">
          <h4>
            {language === 'english' ? 'Chapters' : 'अध्याय'}
          </h4>
          <div className="chapter-list">
            {Array.from({ length: totalChapters }, (_, i) => (
              <button
                key={i}
                className="chapter-item"
                onClick={() => openChapter(i)}
              >
                <span className="chapter-number">{i + 1}</span>
                <span className="chapter-name">{getChapterName(i)}</span>
              </button>
            ))}
          </div>
          
          {/* Answer Key - Below all chapters */}
          {book.answerKey && (
            <div className="answer-key-section">
              <h4>{language === 'english' ? 'Answer Key' : 'उत्तर कुंजी'}</h4>
              <button
                className="chapter-item answer-key-btn"
                onClick={openAnswerKey}
              >
                <span className="chapter-number">✅</span>
                <span className="chapter-name">{language === 'english' ? 'Answer Key (Part 1)' : 'उत्तर कुंजी (भाग 1)'}</span>
              </button>
              {book.answerKey2 && (
                <button
                  className="chapter-item answer-key-btn"
                  onClick={openAnswerKey2}
                >
                  <span className="chapter-number">✅</span>
                  <span className="chapter-name">{language === 'english' ? 'Answer Key (Part 2)' : 'उत्तर कुंजी (भाग 2)'}</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* PDF Preview */}
        <div className="pdf-preview">
          <iframe
            src={book.url}
            title={book.title}
            className="pdf-iframe"
          />
        </div>
      </div>
    </div>
  )
}

export default PDFViewer
