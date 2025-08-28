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
 * - Technical showcase and landing page transition
 * 
 * @author Alec Dalelio
 * @version 4.0.0
 * @since 2024-01-01
 * 
 * @component
 * @param {Function} onExit - Callback function to exit presentation mode
 */

import React, { useState, useEffect } from 'react';
import './PresentationMode.css';
import CodeHighlight from './CodeHighlight';

// Professional SVG Icons Component
const ProfessionalIcon = ({ type, className = "" }) => {
  const icons = {
    target: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
      </svg>
    ),
    architecture: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5zM12 20c-4.41 0-8-3.59-8-8V8.5l8-4 8 4V12c0 4.41-3.59 8-8 8z"/>
        <path d="M12 6l-6 3v3c0 3.31 2.69 6 6 6s6-2.69 6-6V9l-6-3z"/>
      </svg>
    ),
    lightning: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M7 2v11h3v9l7-12h-4l4-8z"/>
      </svg>
    ),
    shield: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 1L3 5v6c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V5l-9-4z"/>
      </svg>
    ),
    chart: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z"/>
      </svg>
    ),
    test: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
      </svg>
    ),
    react: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    ),
    express: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
      </svg>
    ),
    state: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
      </svg>
    ),
    api: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    ),
    security: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 1L3 5v6c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V5l-9-4z"/>
      </svg>
    ),
    responsive: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/>
      </svg>
    ),
    lock: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6z"/>
      </svg>
    ),
    validation: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
      </svg>
    ),
    transform: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
      </svg>
    ),
    error: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
      </svg>
    ),
    normalize: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
      </svg>
    ),
    testing: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
      </svg>
    ),
    documentation: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM16 18H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
      </svg>
    ),
    performance: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M13 2.05v3.03c3.39.49 6 3.39 6 6.92 0 .9-.18 1.75-.5 2.54l2.6 1.53c.56-1.24.9-2.62.9-4.07 0-5.18-3.95-9.45-9-9.95zM12 19c-3.87 0-7-3.13-7-7 0-3.53 2.61-6.43 6-6.92V2.05c-5.06.5-9 4.76-9 9.95 0 5.52 4.47 10 9.99 10 3.31 0 6.24-1.61 8.06-4.09l-2.6-1.53C16.17 17.98 14.21 19 12 19z"/>
      </svg>
    ),
    accessibility: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z"/>
      </svg>
    ),
    modular: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
      </svg>
    ),
    monitoring: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-8 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/>
      </svg>
    ),
    compliance: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
      </svg>
    ),
    scalability: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M7 14l5-5 5 5z"/>
      </svg>
    ),
    e2e: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
      </svg>
    ),
    unit: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-8 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/>
      </svg>
    ),
    integration: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
      </svg>
    ),
    coverage: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-8 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/>
      </svg>
    ),
    load: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M13 2.05v3.03c3.39.49 6 3.39 6 6.92 0 .9-.18 1.75-.5 2.54l2.6 1.53c.56-1.24.9-2.62.9-4.07 0-5.18-3.95-9.45-9-9.95zM12 19c-3.87 0-7-3.13-7-7 0-3.53 2.61-6.43 6-6.92V2.05c-5.06.5-9 4.76-9 9.95 0 5.52 4.47 10 9.99 10 3.31 0 6.24-1.61 8.06-4.09l-2.6-1.53C16.17 17.98 14.21 19 12 19z"/>
      </svg>
    ),
    cicd: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
      </svg>
    ),
    arrow: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
      </svg>
    ),
    gear: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/>
      </svg>
    ),
    database: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    ),
    alert: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
      </svg>
    ),
    settings: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/>
      </svg>
    ),
    microscope: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-8 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/>
      </svg>
    ),
    connection: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
      </svg>
    ),
    pipeline: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
      </svg>
    )
  };

  return icons[type] || null;
};

const PresentationMode = ({ onExit }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [slideDirection, setSlideDirection] = useState('next');

  /**
   * Enhanced technical presentation slides data
   * Each slide demonstrates different aspects of the technical implementation
   */
  const slides = [
    {
      id: 0,
      title: "Alloy Integration Demo",
      subtitle: "Technical Implementation & Business Value",
      content: "API integration with comprehensive validation, testing, and production-ready deployment. Demonstrates modern development practices and technical implementation.",
      type: "title",
      background: "gradient-1"
    },
    {
      id: 1,
      title: "Technical Architecture & Standards",
      subtitle: "Design Decisions & Implementation Approach",
      content: [
        { icon: "architecture", text: "React.js component architecture with modular design patterns and maintainable code structure" },
        { icon: "lightning", text: "Express.js API gateway with middleware ecosystem, rate limiting, and comprehensive error handling" },
        { icon: "shield", text: "Security-first approach with CORS protection, input validation, and environment-based credential management" },
        { icon: "test", text: "End-to-end testing strategy with Playwright for complete user journey coverage and regression testing" }
      ],
      type: "list",
      background: "gradient-2"
    },
    {
      id: 2,
      title: "Implementation Challenges",
      subtitle: "Problem Solving & Technical Solutions",
      content: [
        { icon: "lock", text: "Secure API credential management with environment variables and production-ready authentication" },
        { icon: "validation", text: "Real-time form validation with immediate user feedback and comprehensive error resolution" },
        { icon: "transform", text: "Data transformation pipeline between frontend and Alloy API formats with validation and sanitization" },
        { icon: "normalize", text: "Outcome normalization and consistent user experience across all API response states" }
      ],
      type: "list",
      background: "gradient-3"
    },
    {
      id: 3,
      title: "Frontend Implementation",
      content: "Built a React application with comprehensive form validation, accessibility features, and professional error handling. Implemented modern development practices, performance optimization, and user experience with real-time validation feedback.",
      type: "code",
      background: "gradient-4",
      codeSnippet: `// ApplicationForm.jsx - Real-time Validation & State Management
const validateField = (name, value) => {
  switch (name) {
    case 'ssn':
      if (!value.trim()) return 'SSN is required';
      const cleanSsn = value.replace(/[-\s]/g, '');
      if (!patterns.ssn.test(cleanSsn)) 
        return 'SSN must be 9 digits (no dashes)';
      if (cleanSsn === '000000000' || cleanSsn === '111111111') 
        return 'SSN cannot be all zeros or ones';
      return '';
    
    case 'birth_date':
      if (!value.trim()) return 'Date of birth is required';
      if (!patterns.birth_date.test(value)) 
        return 'Date must be YYYY-MM-DD format';
      const date = new Date(value);
      const today = new Date();
      if (isNaN(date.getTime())) return 'Invalid date';
      if (date >= today) return 'Birth date must be in the past';
      if (date.getFullYear() < 1900) return 'Invalid birth year';
      if (date.getFullYear() > today.getFullYear() - 13) 
        return 'Applicant must be at least 13 years old';
      return '';
  }
};

const handleInputChange = (e) => {
  let { name, value } = e.target;
  
  // Auto-uppercase state, format SSN/phone
  if (name === 'state') value = value.toUpperCase();
  if (name === 'ssn') value = value.replace(/\\D/g, '');
  if (name === 'phone') value = value.replace(/\\D/g, '');
  
  setFormData(prev => ({ ...prev, [name]: value }));
  
  // Real-time validation feedback
  if (touched[name]) {
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
    setValidationStatus(prev => ({
      ...prev, [name]: error ? 'error' : 'success'
    }));
  }
};`
    },
    {
      id: 4,
      title: "Backend Implementation",
      content: "Created a Node.js/Express server with production-ready error handling, rate limiting, and comprehensive logging. Implemented secure API integration, monitoring capabilities, and reliable data transformation.",
      type: "code",
      background: "gradient-5",
      codeSnippet: `// Backend API - Alloy Integration & Error Handling
function toAlloyPayload(applicant = {}) {
  const addr = applicant.address || {};
  const address_line_1 = addr.line1 ?? applicant.address1 ?? "";
  const address_line_2 = addr.line2 ?? applicant.address2 ?? "";
  const address_city = addr.city ?? applicant.city ?? "";
  const address_state = addr.state ?? applicant.state ?? "";
  const address_postal_code = addr.zip ?? applicant.zip ?? "";
  const address_country_code = addr.country ?? applicant.country ?? "US";

  const birth_date = applicant.birth_date ?? applicant.dob ?? "";
  const formattedSsn = applicant.ssn ? applicant.ssn.replace(/[-\s]/g, '') : "";

  return {
    name_first: applicant.firstName,
    name_last: applicant.lastName,
    address_line_1,
    address_line_2,
    address_city,
    address_state,
    address_postal_code,
    address_country_code,
    social_security_number: formattedSsn,
    email: applicant.email,
    phone_number: applicant.phone || applicant.phoneNumber || "",
    birth_date,
  };
}

app.post("/apply", async (req, res) => {
  const applicant = req.body;
  const payload = toAlloyPayload(applicant);

  const url = "https://sandbox.alloy.co/v1/evaluations";
  const auth = {
    username: process.env.ALLOY_WORKFLOW_TOKEN || "",
    password: process.env.ALLOY_WORKFLOW_SECRET || "",
  };

  try {
    const { data } = await axios.post(url, payload, {
      auth,
      timeout: 15000, // 15s network timeout
      headers: { "Content-Type": "application/json" },
    });

    const rawOutcome = data?.summary?.outcome;
    const normalizedOutcome = normalizeOutcome(rawOutcome);
    
    res.json({
      outcome: normalizedOutcome,
      full: data,
    });
  } catch (err) {
    const status = err?.response?.status || 500;
    const msg = err?.message || "Unknown error";
    
    res.status(status).json({
      error: "Failed to evaluate with Alloy",
      details: err?.response?.data || msg,
    });
  }
});`
    },
    {
      id: 5,
      title: "Production Readiness",
      subtitle: "Deployment & Quality Assurance",
      content: [
        { icon: "security", text: "Security: Input validation, CORS protection, environment variable management, and data sanitization" },
        { icon: "monitoring", text: "Monitoring: Error logging, server status endpoints, and comprehensive debugging capabilities" },
        { icon: "documentation", text: "Compliance: SSN validation, age verification, and regulatory data handling requirements" },
        { icon: "testing", text: "Testing: Playwright E2E testing, unit testing, and comprehensive coverage of critical user paths" }
      ],
      type: "list",
      background: "gradient-6"
    },
    {
      id: 6,
      title: "Try the Demo",
      subtitle: "Interactive API Integration",
      content: "",
      type: "demo-redirect",
      background: "gradient-7"
    }
  ];

  /**
   * Enhanced navigation functions with direction tracking
   */
  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setSlideDirection('next');
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setSlideDirection('prev');
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToSlide = (slideIndex) => {
    setSlideDirection(slideIndex > currentSlide ? 'next' : 'prev');
    setCurrentSlide(slideIndex);
  };

  /**
   * Smooth transition to landing page demo
   */
  const handleRedirectToDemo = () => {
    // Exit presentation mode and redirect to landing page
    onExit();
    // Optionally scroll to demo section if needed
    setTimeout(() => {
      const demoSection = document.getElementById('demo-section');
      if (demoSection) {
        demoSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
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
                <li key={index}>
                  <div className="list-item-content">
                    <div className="list-item-icon">
                      <ProfessionalIcon type={item.icon} className="professional-icon" />
                    </div>
                    <span className="list-item-text">{item.text}</span>
                  </div>
                </li>
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
                  <div className="tech-item-content">
                    <div className="tech-item-icon">
                      <ProfessionalIcon type={tech.icon} className="professional-icon" />
                    </div>
                    <span className="tech-item-text">{tech.text}</span>
                  </div>
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
            <CodeHighlight 
              code={slide.codeSnippet}
              language="javascript"
            />
          </div>
        );
      
      case 'demo-redirect':
        return (
          <div className="slide-demo-redirect">
            <h2>{slide.title}</h2>
            {slide.subtitle && <h3>{slide.subtitle}</h3>}
            <p>{slide.content}</p>
            
            <div className="demo-redirect-container">
              <div className="tech-showcase">
                <div className="tech-showcase-header">
                  <span className="showcase-label">Key Features</span>
                </div>
                
                <div className="tech-showcase-grid">
                  <div className="tech-showcase-item">
                    <div className="tech-icon">
                      <ProfessionalIcon type="api" className="professional-icon" />
                    </div>
                    <h4>API Integration</h4>
                    <p>Secure authentication and data handling</p>
                  </div>
                  
                  <div className="tech-showcase-item">
                    <div className="tech-icon">
                      <ProfessionalIcon type="shield" className="professional-icon" />
                    </div>
                    <h4>Form Validation</h4>
                    <p>Real-time input validation and error feedback</p>
                  </div>
                  
                  <div className="tech-showcase-item">
                    <div className="tech-icon">
                      <ProfessionalIcon type="error" className="professional-icon" />
                    </div>
                    <h4>Error Handling</h4>
                    <p>Comprehensive error management and user feedback</p>
                  </div>
                  
                  <div className="tech-showcase-item">
                    <div className="tech-icon">
                      <ProfessionalIcon type="microscope" className="professional-icon" />
                    </div>
                    <h4>Testing</h4>
                    <p>End-to-end testing with Playwright</p>
                  </div>
                </div>
              </div>
              
              <div className="redirect-section">
                <div className="redirect-content">
                  <h4>Ready to try it?</h4>
                  
                  <button 
                    className="redirect-btn"
                    onClick={handleRedirectToDemo}
                  >
                    <span className="btn-icon">
                      <ProfessionalIcon type="arrow" className="professional-icon" />
                    </span>
                    <span className="btn-text">Go to Demo</span>
                  </button>
                </div>
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


    </div>
  );
};

export default PresentationMode;
