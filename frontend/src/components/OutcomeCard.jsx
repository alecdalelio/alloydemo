import React from 'react';

const OutcomeCard = ({ outcome, apiResponse, showTechnicalDetails, onToggleTechnicalDetails }) => {
  const getOutcomeConfig = (outcome) => {
    switch (outcome) {
      case 'Approved':
        return {
          icon: '✅',
          title: 'Application Approved!',
          message: 'Success! Customer has successfully created an account',
          color: 'success',
          bgColor: 'rgba(56, 161, 105, 0.05)',
          borderColor: 'rgba(56, 161, 105, 0.3)'
        };
      case 'Manual Review':
        return {
          icon: '🔍',
          title: 'Under Review',
          message: 'Thanks for submitting your application, we\'ll be in touch shortly',
          color: 'warning',
          bgColor: 'rgba(214, 158, 46, 0.05)',
          borderColor: 'rgba(214, 158, 46, 0.3)'
        };
      case 'Deny':
        return {
          icon: '❌',
          title: 'Application Not Approved',
          message: 'Sorry, your application was not successful',
          color: 'error',
          bgColor: 'rgba(229, 62, 62, 0.05)',
          borderColor: 'rgba(229, 62, 62, 0.3)'
        };
      default:
        return {
          icon: '❓',
          title: 'Unknown Outcome',
          message: 'The application status could not be determined',
          color: 'gray',
          bgColor: 'rgba(113, 128, 150, 0.05)',
          borderColor: 'rgba(113, 128, 150, 0.3)'
        };
    }
  };

  const config = getOutcomeConfig(outcome);

  return (
    <div className="outcome-card">
      <div 
        className={`outcome-display outcome-${config.color}`}
        style={{
          backgroundColor: config.bgColor,
          borderColor: config.borderColor
        }}
      >
        <div className="outcome-icon">
          {config.icon}
        </div>
        <h4>{config.title}</h4>
        <p>{config.message}</p>
        
        {/* Technical Summary */}
        {apiResponse && (
          <div className="outcome-technical-summary">
            <div className="tech-summary-grid">
              <div className="tech-summary-item">
                <span className="tech-summary-label">API Response Time:</span>
                <span className="tech-summary-value">
                  {apiResponse.timestamp ? 
                    `${new Date(apiResponse.timestamp).toLocaleTimeString()}` : 
                    'N/A'
                  }
                </span>
              </div>
              <div className="tech-summary-item">
                <span className="tech-summary-label">Status Code:</span>
                <span className={`tech-summary-value status-${apiResponse.status >= 200 && apiResponse.status < 300 ? 'success' : 'error'}`}>
                  {apiResponse.status}
                </span>
              </div>
              <div className="tech-summary-item">
                <span className="tech-summary-label">Alloy Outcome:</span>
                <span className="tech-summary-value">{outcome}</span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="outcome-actions">
        <button 
          className="demo-btn"
          onClick={() => {
            // Reset function will be handled by parent
            window.location.reload();
          }}
        >
          Try Another Application
        </button>
        {apiResponse && (
          <button 
            className="demo-btn secondary"
            onClick={onToggleTechnicalDetails}
          >
            {showTechnicalDetails ? 'Hide' : 'View'} Technical Details
          </button>
        )}
      </div>
    </div>
  );
};

export default OutcomeCard;
