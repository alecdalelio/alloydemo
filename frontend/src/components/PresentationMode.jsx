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
    // Slide 1 – Intro & Goal
    {
      id: 0,
      title: "Alloy Integration Demo",
      subtitle: "Demo: integrating Alloy to streamline onboarding, minimize fraud, and reduce manual reviews",
      content: [
        { icon: "target", text: "Collect → validate → proxy to Alloy → render outcome" },
        { icon: "architecture", text: "Outcomes: Approved, Deny, Manual Review" },
        { icon: "alert", text: "Covers gotchas, error handling, and production considerations" }
      ],
      hook: "Assignment goal: build a working integration that validates, submits, and displays results.",
      type: "list",
      background: "gradient-1"
    },
    // Slide 2 – Architecture
    {
      id: 1,
      title: "Architecture",
      subtitle: "React → Express proxy → Alloy",
      content: [
        { icon: "lock", text: "Proxy hides secrets (Basic Auth) and transforms schema" },
        { icon: "validation", text: "Frontend validation reduces bad requests" },
        { icon: "test", text: "Sandbox personas trigger deterministic outcomes" }
      ],
      hook: "Simple, secure architecture: client collects, proxy transforms, Alloy decides.",
      type: "list",
      background: "gradient-2"
    },
    // Slide 3 – Frontend: Validation & UX (trimmed code)
    {
      id: 2,
      title: "Frontend: Validation & UX",
      subtitle: "Prevent invalid submissions",
      content: "",
      type: "code",
      background: "gradient-4",
      codeSnippet: `// Critical: SSN 9 digits, no dashes; block common invalids
// Critical: DOB ISO YYYY-MM-DD; past date; age >= 13
const validateField = (name, value) => {
  switch (name) {
    case 'ssn': {
      const clean = (value || '').replace(/\D/g, '');
      if (!clean) return 'SSN is required';
      if (!/^\d{9}$/.test(clean)) return 'SSN must be 9 digits (no dashes)';
      if (clean === '000000000' || clean === '111111111') return 'Invalid SSN';
      return '';
    }
    case 'birth_date': {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(value || '')) return 'Date must be YYYY-MM-DD';
      const d = new Date(value);
      const today = new Date();
      if (isNaN(d)) return 'Invalid date';
      if (d >= today) return 'Birth date must be in the past';
      if (d.getFullYear() > today.getFullYear() - 13) return 'Must be 13+';
      return '';
    }
    // …
  }
};`
      ,
      content: "SSN 9 digits only; DOB ISO past 13+; uppercase states; inline errors.",
      hook: "Input validation avoids unnecessary Alloy rejections and manual reviews."
    },
    // Slide 4 – Backend: Data Transformation (trimmed code)
    {
      id: 3,
      title: "Backend: Data Transformation",
      subtitle: "Match Alloy’s schema",
      content: "",
      type: "code",
      background: "gradient-6",
      codeSnippet: `function toAlloyPayload(a = {}) {
  // Critical: field renames + normalization.
  const addr = a.address || {};
  return {
    name_first: a.firstName,
    name_last: a.lastName,
    social_security_number: (a.ssn || '').replace(/\D/g, ''),
    phone_number: a.phone,
    email: a.email,
    birth_date: a.birth_date,
    address_line_1: addr.line1 || a.address1,
    address_line_2: addr.line2 || a.address2,
    address_city: addr.city || a.city,
    address_state: addr.state || a.state,
    address_postal_code: addr.zip || a.zip,
    address_country_code: addr.country || a.country,
  };
}`
      ,
      hook: "Transform once at the edge to keep clients consistent and safe."
    },
    // Slide 5 – API Integration & Error Handling (trimmed code)
    {
      id: 4,
      title: "API Integration",
      subtitle: "Authentication, timeouts, errors",
      content: "",
      type: "code",
      background: "gradient-7",
      codeSnippet: `app.post('/apply', async (req, res) => {
  const payload = toAlloyPayload(req.body);
  const auth = {
    username: process.env.ALLOY_WORKFLOW_TOKEN,
    password: process.env.ALLOY_WORKFLOW_SECRET,
  }; // Basic Auth (env only)
  try {
    const { data } = await axios.post(url, payload, {
      auth,
      timeout: 15000, // 15s timeout
      headers: { 'Content-Type': 'application/json' },
    });
    res.json({ outcome: normalizeOutcome(data?.summary?.outcome) });
  } catch (err) {
    const status = err?.response?.status || 500;
    res.status(status).json({
      error: 'Failed to evaluate with Alloy',
      details: 'Please try again later', // sanitized; never log PII
    });
  }
});`
      ,
      hook: "Critical integration point: handle auth, timeouts, and safe errors."
    },
    // Slide 6 – Outcome Normalization (trimmed code)
    {
      id: 5,
      title: "Outcome Normalization",
      subtitle: "Consistent UI states",
      content: "",
      type: "code",
      background: "gradient-8",
      codeSnippet: `function normalizeOutcome(o) {
  if (!o) return 'Unknown';
  switch ((o || '').toLowerCase()) {
    case 'approved': return 'Approved';
    case 'deny':
    case 'denied': return 'Deny';
    case 'manual review':
    case 'manual_review': return 'Manual Review';
    default: return o;
  }
}`
      ,
      hook: "Normalize Alloy responses to three clear outcomes."
    },
    // Slide 7 – Demo Plan
    {
      id: 6,
      title: "Live Demo Plan",
      subtitle: "Three personas + error case",
      content: [
        { icon: "chart", text: "Jessica Approve → green success (account opened)", style: { borderColor: 'var(--alloy-accent)' } },
        { icon: "error", text: "Jessica Deny → red decline (compliance-safe message)", style: { borderColor: 'var(--alloy-error)' } },
        { icon: "normalize", text: "Jessica Review → amber pending (under manual review)", style: { borderColor: 'var(--alloy-warning)' } },
        { icon: "alert", text: "Invalid token → error fallback, safe logs", style: { borderColor: 'var(--alloy-primary-light)' } }
      ],
      hook: "Color-coded states make Alloy outcomes easy to see.",
      type: "tech",
      background: "gradient-3"
    },
    // Slide 8 – Production Roadmap
    {
      id: 7,
      title: "Production Readiness",
      subtitle: "Hardening for production",
      content: [
        { icon: "settings", text: "Rate limiting, retries, CSRF/CAPTCHA" },
        { icon: "connection", text: "Webhooks for async review decisions" },
        { icon: "monitoring", text: "Metrics: approval/review/deny rates, latency" },
        { icon: "documentation", text: "Structured logging with PII redaction and retention policy" }
      ],
      hook: "Considerations for scaling in a banking environment.",
      type: "list",
      background: "gradient-9"
    },
    // Slide 9 – Wrap & CTA
    {
      id: 8,
      title: "Wrap",
      subtitle: "Proven integration, ready to scale",
      content: "",
      type: "demo-redirect",
      background: "gradient-10"
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
            {slide.hook && <p className="code-description">{slide.hook}</p>}
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
            {slide.subtitle && <h3>{slide.subtitle}</h3>}
            {slide.hook && <p className="code-description">{slide.hook}</p>}
            <div className="tech-grid">
              {slide.content.map((tech, index) => (
                <div key={index} className="tech-item" style={tech.style}>
                  <div className="tech-item-content">
                    <div className="tech-item-icon" style={tech.iconContainerStyle}>
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
            {slide.hook && <p className="code-description">{slide.hook}</p>}
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
            {slide.hook && <p className="code-description">{slide.hook}</p>}
            
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
                    <h4>Clear UX for all outcomes</h4>
                    <p>Approved, Deny, Manual Review</p>
                  </div>
                  
                  <div className="tech-showcase-item">
                    <div className="tech-icon">
                      <ProfessionalIcon type="shield" className="professional-icon" />
                    </div>
                    <h4>Robust validation and safe error handling</h4>
                    <p>PII protected and friendly messages</p>
                  </div>
                  
                  <div className="tech-showcase-item">
                    <div className="tech-icon">
                      <ProfessionalIcon type="error" className="professional-icon" />
                    </div>
                    <h4>Ready to walk through code or demo live</h4>
                    <p>Hands-on review</p>
                  </div>
                  
                  <div className="tech-showcase-item">
                    <div className="tech-icon">
                      <ProfessionalIcon type="microscope" className="professional-icon" />
                    </div>
                    <h4>Integration demonstrates both technical depth and customer impact</h4>
                    <p></p>
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
