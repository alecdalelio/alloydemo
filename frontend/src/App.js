import React, { useState } from 'react';
import './App.css';
import ApplicationForm from './components/ApplicationForm';
import OutcomeCard from './components/OutcomeCard';
import PresentationMode from './components/PresentationMode';

function App() {
  const [currentView, setCurrentView] = useState('form'); // 'form' | 'outcome' | 'presentation'
  const [outcome, setOutcome] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    setError(null);

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
        response = await fetch('https://alloydemo.onrender.com/apply', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload)
        });
      } catch (portError) {
        // If port 5001 fails, try port 5000
        response = await fetch('https://alloydemo.onrender.com/apply', {
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
        setOutcome(data.outcome);
        setCurrentView('outcome');
      } else {
        console.error('❌ Application failed:', data.error);
        setError(data.error || 'An error occurred while processing your application');
      }
    } catch (err) {
      console.error('❌ Connection failed:', err.message);
      setError('Failed to connect to server. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStartNew = () => {
    setCurrentView('form');
    setOutcome(null);
    setError(null);
  };

  const handleEnterPresentation = () => {
    setCurrentView('presentation');
  };

  const handleExitPresentation = () => {
    setCurrentView('form');
  };

  return (
    <div className="App">
      {currentView === 'presentation' ? (
        <PresentationMode onExit={handleExitPresentation} />
      ) : (
        <>
          <header className="App-header">
            <h1>🏦 Alloy Integration Demo</h1>
            <p>Complete your application to see Alloy's API in action</p>
            <div className="header-actions">
              <button 
                className="btn btn-presentation"
                onClick={handleEnterPresentation}
              >
                🎯 View Demo
              </button>
            </div>
          </header>
          <main className="App-main">
            <div className="container">
              {error && (
                <div className="error-banner">
                  <strong>Error:</strong> {error}
                  <button 
                    className="error-dismiss"
                    onClick={() => setError(null)}
                  >
                    ×
                  </button>
                </div>
              )}
              
              {currentView === 'form' && (
                <ApplicationForm 
                  onSubmit={handleFormSubmit}
                  isSubmitting={isSubmitting}
                />
              )}
              
              {currentView === 'outcome' && (
                <OutcomeCard 
                  outcome={outcome}
                  onStartNew={handleStartNew}
                />
              )}
            </div>
          </main>
        </>
      )}
    </div>
  );
}

export default App;
