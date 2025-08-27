import React, { useState, useEffect } from 'react';
import './PresentationMode.css';

const PresentationMode = ({ onExit }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);

  // Presentation slides data
  const slides = [
    {
      id: 0,
      title: "Alloy Technical Account Manager",
      subtitle: "Assignment Presentation",
      content: "Building a fraud prevention integration with Alloy's API to minimize fraudulent applications and reduce manual compliance reviews.",
      type: "title",
      background: "gradient-1"
    },
    {
      id: 1,
      title: "Assignment Overview",
      content: "As a tech lead at a bank, I was tasked with building an integration with Alloy's API to prevent fraudulent applications from getting approved and reduce manual reviews from the compliance team.",
      type: "content",
      background: "gradient-2"
    },
    {
      id: 2,
      title: "Key Requirements",
      content: [
        "📝 Application form with comprehensive validation",
        "🔗 Alloy API integration for fraud detection",
        "⚡ Real-time evaluation processing",
        "📊 Outcome display (Approve/Deny/Manual Review)"
      ],
      type: "list",
      background: "gradient-3"
    },
    {
      id: 3,
      title: "Frontend Implementation",
      content: "React.js form with real-time validation and modern UX",
      type: "code",
      background: "gradient-4",
      codeSnippet: `// ApplicationForm.jsx - Key validation logic
const validateField = (name, value) => {
  switch (name) {
    case 'ssn':
      if (!value.trim()) return 'SSN is required';
      return !patterns.ssn.test(value) ? 
        'SSN must be 9 digits (no dashes)' : '';
    
    case 'state':
      if (!value.trim()) return 'State is required';
      return !patterns.state.test(value) ? 
        'State must be 2 letters (e.g. NY, CA)' : '';
    
    case 'birth_date':
      if (!value.trim()) return 'Date of birth is required';
      if (!patterns.birth_date.test(value)) 
        return 'Date must be YYYY-MM-DD format';
      // Additional date validation...
      return '';
  }
};`
    },
    {
      id: 4,
      title: "Backend Integration",
      content: "Node.js/Express server with Alloy API integration",
      type: "code",
      background: "gradient-5",
      codeSnippet: `// Backend API endpoint
app.post('/apply', async (req, res) => {
  try {
    const payload = {
      name_first: req.body.firstName,
      name_last: req.body.lastName,
      address_line_1: req.body.address.line1,
      address_city: req.body.address.city,
      address_state: req.body.address.state,
      address_postal_code: req.body.address.zip,
      address_country: req.body.address.country,
      social_security_number: req.body.ssn,
      email: req.body.email,
      phone_number: req.body.phone,
      birth_date: req.body.birth_date
    };

    const response = await fetch('https://sandbox.alloy.co/v1/evaluations/', {
      method: 'POST',
      headers: {
        'Authorization': \`Basic \${Buffer.from(\`\${token}:\${secret}\`).toString('base64')}\`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    res.json({ outcome: data.summary.outcome });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});`
    },
    {
      id: 5,
      title: "Live Demo",
      subtitle: "Interactive Application Process",
      content: "Experience the complete application flow with real-time Alloy API integration and outcome handling.",
      type: "live-demo",
      background: "gradient-6"
    }
  ];

  // Navigation functions
  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToSlide = (slideIndex) => {
    setCurrentSlide(slideIndex);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      switch (e.key) {
        case 'ArrowRight':
        case ' ':
          e.preventDefault();
          nextSlide();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          prevSlide();
          break;
        case 'Escape':
          e.preventDefault();
          onExit();
          break;
        case 'F11':
          e.preventDefault();
          setIsFullscreen(!isFullscreen);
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [currentSlide, isFullscreen, onExit]);

  // Auto-hide controls
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowControls(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [currentSlide]);

  const handleMouseMove = () => {
    setShowControls(true);
  };

  const renderSlideContent = (slide) => {
    switch (slide.type) {
      case 'title':
        return (
          <div className="slide-title">
            <h1>{slide.title}</h1>
            {slide.subtitle && <h2>{slide.subtitle}</h2>}
            <p>{slide.content}</p>
          </div>
        );
      
      case 'content':
        return (
          <div className="slide-content">
            <h2>{slide.title}</h2>
            <p>{slide.content}</p>
          </div>
        );
      
      case 'list':
        return (
          <div className="slide-list">
            <h2>{slide.title}</h2>
            <ul>
              {slide.content.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        );
      
      case 'tech':
        return (
          <div className="slide-tech">
            <h2>{slide.title}</h2>
            <div className="tech-grid">
              {slide.content.map((tech, index) => (
                <div key={index} className="tech-item">
                  <span>{tech}</span>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'demo':
        return (
          <div className="slide-demo">
            <h2>{slide.title}</h2>
            {slide.subtitle && <h3>{slide.subtitle}</h3>}
            <p>{slide.content}</p>
            <div className="demo-placeholder">
              <div className="demo-icon">🎯</div>
              <p>Interactive Demo Available</p>
            </div>
          </div>
        );
      
      default:
        return <div>Slide content not found</div>;
    }
  };

  return (
    <div 
      className={`presentation-mode ${isFullscreen ? 'fullscreen' : ''} ${slides[currentSlide].background}`}
      onMouseMove={handleMouseMove}
    >
      {/* Slide Content */}
      <div className="slide-container">
        {renderSlideContent(slides[currentSlide])}
      </div>

      {/* Navigation Controls */}
      {showControls && (
        <>
          {/* Top Controls */}
          <div className="top-controls">
            <button className="control-btn" onClick={onExit}>
              ✕ Exit
            </button>
            <button className="control-btn" onClick={() => setIsFullscreen(!isFullscreen)}>
              {isFullscreen ? '⤓' : '⤢'} Fullscreen
            </button>
          </div>

          {/* Side Navigation */}
          <div className="side-controls">
            <button 
              className="nav-btn prev" 
              onClick={prevSlide}
              disabled={currentSlide === 0}
            >
              ‹
            </button>
            <button 
              className="nav-btn next" 
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
            >
              ›
            </button>
          </div>

          {/* Bottom Progress */}
          <div className="bottom-controls">
            <div className="slide-progress">
              <span className="slide-counter">
                {currentSlide + 1} / {slides.length}
              </span>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div className="slide-dots">
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>
          </div>
        </>
      )}

      {/* Keyboard Shortcuts Help */}
      <div className="keyboard-help">
        <span>← → Navigate</span>
        <span>Space Next</span>
        <span>ESC Exit</span>
        <span>F11 Fullscreen</span>
      </div>
    </div>
  );
};

export default PresentationMode;
