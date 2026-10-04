import { useState } from 'react'
import './HomePage.css'

const classes = [
  { class: 6, name: 'Class 6', nameHi: 'कक्षा 6', color: '#0891b2' },
  { class: 7, name: 'Class 7', nameHi: 'कक्षा 7', color: '#059669' },
  { class: 8, name: 'Class 8', nameHi: 'कक्षा 8', color: '#d97706' },
  { class: 9, name: 'Class 9', nameHi: 'कक्षा 9', color: '#dc2626' },
  { class: 10, name: 'Class 10', nameHi: 'कक्षा 10', color: '#7c3aed' },
  { class: 11, name: 'Class 11', nameHi: 'कक्षा 11', color: '#4f46e5' },
  { class: 12, name: 'Class 12', nameHi: 'कक्षा 12', color: '#1e293b' }
]

const subjects = [
  { name: 'Mathematics', nameHi: 'गणित', icon: '📐' },
  { name: 'Science', nameHi: 'विज्ञान', icon: '🔬' },
  { name: 'Social Science', nameHi: 'सामाजिक विज्ञान', icon: '🌍' },
  { name: 'Hindi', nameHi: 'हिंदी', icon: '📖' },
  { name: 'English', nameHi: 'अंग्रेज़ी', icon: '📕' },
  { name: 'Sanskrit', nameHi: 'संस्कृत', icon: '📜' }
]

function HomePage({ onSelectClass }) {
  const [language, setLanguage] = useState('english')

  return (
    <div className="home-page">
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

      <div className="home-header">
        <h2>📚 NCERT Books</h2>
        <p>
          {language === 'english'
            ? 'Select your class to view books'
            : 'किताबें देखने के लिए अपनी कक्षा चुनें'}
        </p>
      </div>

      <div className="classes-grid">
        {classes.map(cls => (
          <button
            key={cls.class}
            className="class-card"
            style={{ '--class-color': cls.color }}
            onClick={() => onSelectClass(cls.class)}
          >
            <span className="class-number">{cls.class}</span>
            <span className="class-name">
              {language === 'english' ? cls.name : cls.nameHi}
            </span>
            <span className="class-badge">
              {language === 'english' ? 'Available' : 'उपलब्ध'}
            </span>
          </button>
        ))}
      </div>

      {/* Subjects Preview */}
      <div className="subjects-preview">
        <h3>
          {language === 'english'
            ? 'Subjects Available'
            : 'उपलब्ध विषय'}
        </h3>
        <div className="subjects-tags">
          {subjects.map(subject => (
            <span key={subject.name} className="subject-tag">
              {subject.icon} {language === 'english' ? subject.name : subject.nameHi}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomePage
