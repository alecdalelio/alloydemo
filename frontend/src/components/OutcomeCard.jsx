import React from 'react';

const OutcomeCard = ({ outcome, onStartNew }) => {
  const getOutcomeConfig = () => {
    switch (outcome) {
      case 'Approved':
        return {
          title: '🎉 Application Approved!',
          message: 'Success! Customer has successfully created an account',
          className: 'outcome-success',
          icon: '✅'
        };
      case 'Manual Review':
        return {
          title: '📋 Under Review',
          message: 'Thanks for submitting your application, we\'ll be in touch shortly',
          className: 'outcome-review',
          icon: '🔍'
        };
      case 'Deny':
        return {
          title: '❌ Application Not Approved',
          message: 'Sorry, your application was not successful',
          className: 'outcome-deny',
          icon: '⚠️'
        };
      default:
        return {
          title: '⚠️ Unexpected Result',
          message: 'An unexpected response was received. Please try again.',
          className: 'outcome-error',
          icon: '❓'
        };
    }
  };

  const config = getOutcomeConfig();

  return (
    <div className={`outcome-card ${config.className}`}>
      <div className="outcome-icon">
        {config.icon}
      </div>
      <h2 className="outcome-title">{config.title}</h2>
      <p className="outcome-message">{config.message}</p>
      <button 
        onClick={onStartNew}
        className="btn btn-secondary outcome-button"
      >
        Start a new application
      </button>
    </div>
  );
};

export default OutcomeCard;
