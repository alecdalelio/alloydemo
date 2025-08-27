import React, { useState, useEffect } from 'react';
import './PresentationMode.css';
import ApplicationForm from './ApplicationForm';

const PresentationMode = ({ onExit }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [demoOutcome, setDemoOutcome] = useState(null);
  const [demoError, setDemoError] = useState(null);

  // Presentation slides data
  const slides = [
    {
      id: 0,
      title: "Alloy Integration Demo",
      subtitle: "Reference Implementation",
      content: "A complete example of integrating Alloy's identity verification API to minimize fraudulent applications and reduce manual compliance reviews.",
      type: "title",
      background: "gradient-1"
    },
    {
      id: 1,
      title: "Integration Overview",
      content: "This demo showcases how to integrate Alloy's API into your application to prevent fraudulent applications from getting approved and reduce manual reviews from the compliance team.",
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
      title: "Interactive Demo",
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

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    setDemoError(null);
    setDemoOutcome(null);

    // Transform flat form data to nested address structure
    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      address: {
        line1: formData.address1,
        line2: formData.address2,
        city: formData.city,
        state: formData.state,
        zip: formData.zip,
        country: formData.country
      },
      ssn: formData.ssn,
      email: formData.email,
      phone: formData.phone,
      birth_date: formData.birth_date
    };

    try {
      // Try port 5001 first (since 5000 is used by macOS), fallback to 5000
      let response;
      try {
        response = await fetch('http://localhost:5001/apply', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload)
        });
      } catch (portError) {
        // If port 5001 fails, try port 5000
        response = await fetch('http://localhost:5000/apply', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload)
        });
      }

      const data = await response.json();

      if (response.ok) {
        console.log(`✅ Application processed: ${data.outcome}`);
        setDemoOutcome(data.outcome);
      } else {
        console.error('❌ Application failed:', data.error);
        setDemoError(data.error || 'An error occurred while processing your application');
      }
    } catch (err) {
      console.error('❌ Connection failed:', err.message);
      setDemoError('Failed to connect to server. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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
      
      case 'code':
        return (
          <div className="slide-code">
            <h2>{slide.title}</h2>
            <p className="code-description">{slide.content}</p>
            <div className="code-container">
              <pre className="code-snippet">
                <code>{slide.codeSnippet}</code>
              </pre>
            </div>
          </div>
        );
      
      case 'live-demo':
        return (
          <div className="slide-live-demo">
            <h2>{slide.title}</h2>
            {slide.subtitle && <h3>{slide.subtitle}</h3>}
            <p>{slide.content}</p>
            <div className="demo-container">
              <div className="demo-header">
                <span className="demo-label">Interactive Application Form</span>
                <div className="demo-controls">
                  <button 
                    className="demo-btn"
                    onClick={() => {
                      setDemoOutcome(null);
                      setDemoError(null);
                    }}
                  >
                    Reset Demo
                  </button>
                </div>
              </div>
              <div className="demo-content">
                {demoError && (
                  <div className="demo-error">
                    <strong>Error:</strong> {demoError}
                  </div>
                )}
                
                {demoOutcome ? (
                  <div className="demo-outcome">
                    <h3>Application Result</h3>
                    <div className={`outcome-display outcome-${demoOutcome.toLowerCase()}`}>
                      <div className="outcome-icon">
                        {demoOutcome === 'Approved' ? '✅' : 
                         demoOutcome === 'Manual Review' ? '🔍' : '❌'}
                      </div>
                      <h4>
                        {demoOutcome === 'Approved' ? 'Application Approved!' :
                         demoOutcome === 'Manual Review' ? 'Under Review' :
                         'Application Not Approved'}
                      </h4>
                      <p>
                        {demoOutcome === 'Approved' ? 'Success! Customer has successfully created an account' :
                         demoOutcome === 'Manual Review' ? 'Thanks for submitting your application, we\'ll be in touch shortly' :
                         'Sorry, your application was not successful'}
                      </p>
                    </div>
                    <button 
                      className="demo-btn"
                      onClick={() => {
                        setDemoOutcome(null);
                        setDemoError(null);
                      }}
                    >
                      Try Another Application
                    </button>
                  </div>
                ) : (
                  <ApplicationForm 
                    onSubmit={handleFormSubmit}
                    isSubmitting={isSubmitting}
                  />
                )}
              </div>
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
