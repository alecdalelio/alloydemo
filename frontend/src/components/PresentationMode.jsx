/**
 * PresentationMode Component
 * 
 * A comprehensive technical presentation component that demonstrates the completion
 * of the Alloy Senior TAM assignment. This component showcases technical implementation,
 * problem-solving skills, and engineering excellence through an interactive slide deck.
 * 
 * The presentation covers:
 * - Technical requirements analysis and approach
 * - Architecture decisions and design rationale
 * - Implementation challenges and solutions
 * - Code quality and best practices
 * - Production readiness and testing strategy
 * - Live technical demonstration
 * 
 * @author Alec Dalelio
 * @version 2.0.0
 * @since 2024-01-01
 * 
 * @component
 * @param {Function} onExit - Callback function to exit presentation mode
 */

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

  /**
   * Technical presentation slides data
   * Each slide demonstrates different aspects of the technical implementation
   */
  const slides = [
    {
      id: 0,
      title: "Alloy Integration Demo",
      subtitle: "Technical Implementation Review",
      content: "A demonstration of the Alloy API integration assignment, showing how I approached the technical challenges and built a production-ready solution.",
      type: "title",
      background: "gradient-1"
    },
    {
      id: 1,
      title: "Understanding the Requirements",
      subtitle: "How I approached the assignment",
      content: [
        "🔍 Studied Alloy's evaluation API and sandbox environment",
        "📋 Built a complete frontend form with validation",
        "🎯 Created a backend API gateway to Alloy",
        "⚡ Implemented real-time form validation and error display",
        "🛡️ Added input sanitization and basic security measures",
        "📊 Built outcome cards for approved/denied/review scenarios"
      ],
      type: "list",
      background: "gradient-2"
    },
    {
      id: 2,
      title: "Technical Architecture",
      subtitle: "Design decisions and rationale",
      content: [
        "⚛️ React.js: Component-based architecture for maintainability",
        "🚀 Express.js: Lightweight, performant API gateway",
        "🎯 State Management: Local state with React hooks for simplicity",
        "🔌 API Design: RESTful patterns with comprehensive error handling",
        "🛡️ Security: Rate limiting, CORS, input validation",
        "📱 Responsive Design: Mobile-first approach with accessibility"
      ],
      type: "list",
      background: "gradient-3"
    },
    {
      id: 3,
      title: "Key Technical Challenges",
      subtitle: "Problems I solved along the way",
      content: [
        "🔐 Secure API credential management and authentication",
        "⚡ Real-time form validation with user feedback",
        "🔄 Data transformation between frontend and Alloy API formats",
        "🚨 Comprehensive error handling for production scenarios",
        "📊 Outcome normalization and consistent user experience",
        "🧪 Testing strategy with Playwright for end-to-end coverage"
      ],
      type: "list",
      background: "gradient-4"
    },
    {
      id: 4,
      title: "Frontend Implementation",
      content: "Built a React application with enterprise-grade form validation, accessibility features, and professional error handling. Focused on modern development practices and user experience.",
      type: "code",
      background: "gradient-5",
      codeSnippet: `// ApplicationForm.jsx - Form validation logic
const validateField = (name, value) => {
  switch (name) {
    case 'ssn':
      if (!value.trim()) return 'SSN is required';
      const cleanSsn = value.replace(/[-\s]/g, '');
      if (!patterns.ssn.test(cleanSsn)) 
        return 'SSN must be 9 digits (no dashes)';
      // Additional validation checks
      if (cleanSsn === '000000000' || cleanSsn === '111111111') 
        return 'SSN cannot be all zeros or ones';
      return '';
    
    case 'birth_date':
      if (!value.trim()) return 'Date of birth is required';
      if (!patterns.birth_date.test(value)) 
        return 'Date must be YYYY-MM-DD format';
      const date = new Date(value);
      const today = new Date();
      if (date >= today) return 'Birth date must be in the past';
      if (date.getFullYear() > today.getFullYear() - 13) 
        return 'Applicant must be at least 13 years old';
      return '';
  }
};`
    },
    {
      id: 5,
      title: "Backend Implementation",
      content: "Created a Node.js/Express server with production-ready error handling, rate limiting, and comprehensive logging. Focused on secure API integration and monitoring capabilities.",
      type: "code",
      background: "gradient-6",
      codeSnippet: `// Backend API with error handling
app.post('/apply', async (req, res) => {
  // Validate request data
  const validation = validateApplication(applicant);
  if (!validation.isValid) {
    return res.status(400).json({
      error: "Invalid application data",
      details: validation.errors,
      code: "VALIDATION_ERROR"
    });
  }

  try {
    const { data } = await axios.post(url, payload, {
      auth,
      timeout: 15000, // 15s network timeout
      headers: { "Content-Type": "application/json" },
    });

    const normalizedOutcome = normalizeOutcome(data?.summary?.outcome);
    res.json({ outcome: normalizedOutcome, full: data });
  } catch (err) {
    const errorResponse = handleAlloyError(err);
    res.status(errorResponse.status).json({
      error: errorResponse.error,
      message: errorResponse.message,
      code: errorResponse.code
    });
  }
});`
    },
    {
      id: 6,
      title: "Code Quality & Best Practices",
      subtitle: "Engineering standards and maintainability",
      content: [
        "📝 Comprehensive JSDoc documentation for all major functions",
        "🧪 End-to-end testing with Playwright for complete coverage",
        "🔒 Security-first development with input validation",
        "⚡ Performance optimization and error handling",
        "📱 Accessibility features and responsive design",
        "🔄 Modular architecture with separation of concerns"
      ],
      type: "list",
      background: "gradient-7"
    },
    {
      id: 7,
      title: "Production Readiness",
      subtitle: "Enterprise deployment considerations",
      content: [
        "🔐 Security: Authentication, data encryption, API key management, audit logging",
        "📊 Monitoring: Error tracking, performance monitoring, alert systems, health checks",
        "📋 Compliance: SOC 2, PCI DSS, data retention policies, audit trails",
        "⚡ Scalability: Load balancing, rate limiting, caching strategies, database optimization"
      ],
      type: "list",
      background: "gradient-8"
    },
    {
      id: 8,
      title: "Testing Strategy",
      subtitle: "Quality assurance approach",
      content: [
        "🧪 Playwright E2E Testing: Complete user journey validation",
        "🔍 Unit Testing: Individual component and function testing",
        "🔗 Integration Testing: API endpoint and data flow testing",
        "📊 Test Coverage: Comprehensive coverage of critical user paths",
        "🚀 Performance Testing: Load and stress testing scenarios",
        "🔄 CI/CD Integration: Automated testing in deployment pipeline"
      ],
      type: "list",
      background: "gradient-9"
    },
    {
      id: 9,
      title: "Live Demo",
      content: "Interactive demonstration of the complete implementation, showing real-time API integration, error handling, and user experience.",
      type: "live-demo",
      background: "gradient-10"
    }
  ];

  /**
   * Navigation functions for slide progression
   */
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

  /**
   * Enhanced keyboard navigation with additional shortcuts
   */
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
        case 'Home':
          e.preventDefault();
          goToSlide(0);
          break;
        case 'End':
          e.preventDefault();
          goToSlide(slides.length - 1);
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [currentSlide, isFullscreen, onExit]);

  /**
   * Auto-hide controls for cleaner presentation experience
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowControls(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [currentSlide]);

  const handleMouseMove = () => {
    setShowControls(true);
  };

  /**
   * Enhanced form submission with comprehensive error handling
   * Demonstrates production-ready error scenarios and user feedback
   */
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
        
        // Enhanced error handling with user-friendly messages
        let errorMessage = 'An error occurred while processing your application';
        
        if (data.code === 'AUTHENTICATION_ERROR') {
          errorMessage = 'Authentication failed. Please check your API credentials.';
        } else if (data.code === 'RATE_LIMIT_EXCEEDED') {
          errorMessage = 'Too many requests. Please wait a moment and try again.';
        } else if (data.code === 'VALIDATION_ERROR') {
          errorMessage = 'Please check your information and try again.';
        } else if (data.code === 'SERVICE_UNAVAILABLE') {
          errorMessage = 'Service temporarily unavailable. Please try again later.';
        } else if (data.message) {
          errorMessage = data.message;
        }
        
        setDemoError(errorMessage);
      }
    } catch (err) {
      console.error('❌ Connection failed:', err.message);
      
      // Enhanced network error handling
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        setDemoError('Unable to connect to the server. Please check your connection and try again.');
      } else if (err.name === 'AbortError') {
        setDemoError('Request timed out. Please try again.');
      } else {
        setDemoError('Network error occurred. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Renders slide content based on slide type
   * 
   * @param {Object} slide - Slide configuration object
   * @returns {JSX.Element} Rendered slide content
   */
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
            {slide.subtitle && <h3>{slide.subtitle}</h3>}
            <p>{slide.content}</p>
          </div>
        );
      
      case 'list':
        return (
          <div className="slide-list">
            <h2>{slide.title}</h2>
            {slide.subtitle && <h3>{slide.subtitle}</h3>}
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
            {slide.subtitle && <h3>{slide.subtitle}</h3>}
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
                <span className="demo-label">Interactive Technical Demo</span>
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

      {/* Enhanced Keyboard Shortcuts Help */}
      <div className="keyboard-help">
        <span>← → Navigate</span>
        <span>Space Next</span>
        <span>Home/End Jump</span>
        <span>ESC Exit</span>
        <span>F11 Fullscreen</span>
      </div>
    </div>
  );
};

export default PresentationMode;
