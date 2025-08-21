import React, { useState } from 'react';
import './App.css';
import ApplicationForm from './components/ApplicationForm';
import OutcomeCard from './components/OutcomeCard';

function App() {
  const [currentView, setCurrentView] = useState('form'); // 'form' | 'outcome'
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
      // Try port 5000 first, fallback to 5001
      let response;
      try {
        response = await fetch('http://localhost:5000/apply', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload)
        });
      } catch (portError) {
        // If port 5000 fails, try port 5001
        response = await fetch('http://localhost:5001/apply', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload)
        });
      }

      const data = await response.json();

      if (response.ok) {
        setOutcome(data.outcome);
        setCurrentView('outcome');
      } else {
        setError(data.error || 'An error occurred while processing your application');
      }
    } catch (err) {
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

  return (
    <div className="App">
      <header className="App-header">
        <h1>🏦 Alloy Bank Application</h1>
        <p>Complete your application to open your new account</p>
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
    </div>
  );
}

export default App;
