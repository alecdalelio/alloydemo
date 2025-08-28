import React, { useState, useEffect } from 'react';

const ApplicationForm = ({ onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    country: 'US',
    ssn: '',
    email: '',
    phone: '',
    birth_date: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [validationStatus, setValidationStatus] = useState({});

  // Validation patterns
  const patterns = {
    ssn: /^\d{9}$/,
    state: /^[A-Z]{2}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^\d{10}$/,
    birth_date: /^\d{4}-\d{2}-\d{2}$/
  };

  const validateField = (name, value) => {
    switch (name) {
      case 'firstName':
      case 'lastName':
      case 'address1':
      case 'city':
      case 'zip':
      case 'email':
      case 'phone':
        return !value.trim() ? `${name.charAt(0).toUpperCase() + name.slice(1)} is required` : '';
      
      case 'ssn':
        if (!value.trim()) return 'SSN is required';
        const cleanSsn = value.replace(/[-\s]/g, '');
        if (!patterns.ssn.test(cleanSsn)) return 'SSN must be 9 digits (no dashes)';
        if (cleanSsn === '000000000' || cleanSsn === '111111111') return 'SSN cannot be all zeros or ones';
        return '';
      
      case 'phone':
        if (!value.trim()) return 'Phone number is required';
        const cleanPhone = value.replace(/[-\s]/g, '');
        if (!patterns.phone.test(cleanPhone)) return 'Phone must be 10 digits (no dashes or spaces)';
        return '';
      
      case 'state':
        if (!value.trim()) return 'State is required';
        return !patterns.state.test(value) ? 'State must be 2 letters (e.g. NY, CA)' : '';
      
      case 'country':
        return value !== 'US' ? 'Country must be US' : '';
      
      case 'birth_date':
        if (!value.trim()) return 'Date of birth is required';
        if (!patterns.birth_date.test(value)) return 'Date must be YYYY-MM-DD format';
        
        // Check if it's a valid date
        const date = new Date(value);
        const today = new Date();
        if (isNaN(date.getTime())) return 'Invalid date';
        if (date >= today) return 'Birth date must be in the past';
        if (date.getFullYear() < 1900) return 'Invalid birth year';
        if (date.getFullYear() > today.getFullYear() - 13) return 'Applicant must be at least 13 years old';
        return '';
      
      default:
        return '';
    }
  };

  const getValidationStatus = (name, value) => {
    if (!touched[name]) return 'idle';
    const error = validateField(name, value);
    return error ? 'error' : 'success';
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    
    // Auto-uppercase state
    if (name === 'state') {
      value = value.toUpperCase();
    }
    
    // Auto-format SSN (remove non-digits)
    if (name === 'ssn') {
      value = value.replace(/\D/g, '');
    }
    
    // Auto-format phone (remove non-digits)
    if (name === 'phone') {
      value = value.replace(/\D/g, '');
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
      
      setValidationStatus(prev => ({
        ...prev,
        [name]: getValidationStatus(name, value)
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
    
    setValidationStatus(prev => ({
      ...prev,
      [name]: getValidationStatus(name, value)
    }));
  };

  const isFormValid = () => {
    const requiredFields = ['firstName', 'lastName', 'address1', 'city', 'state', 'zip', 'country', 'ssn', 'email', 'phone', 'birth_date'];
    
    // Check if all required fields have values
    const hasAllValues = requiredFields.every(field => formData[field]?.trim());
    
    // Check if there are any validation errors
    const hasNoErrors = requiredFields.every(field => !validateField(field, formData[field]));
    
    return hasAllValues && hasNoErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allFields = Object.keys(formData);
    const newTouched = {};
    const newErrors = {};
    const newValidationStatus = {};
    
    allFields.forEach(field => {
      newTouched[field] = true;
      newErrors[field] = validateField(field, formData[field]);
      newValidationStatus[field] = getValidationStatus(field, formData[field]);
    });
    
    setTouched(newTouched);
    setErrors(newErrors);
    setValidationStatus(newValidationStatus);
    
    if (isFormValid()) {
      onSubmit(formData);
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: '',
      country: 'US',
      ssn: '',
      email: '',
      phone: '',
      birth_date: ''
    });
    setErrors({});
    setTouched({});
    setValidationStatus({});
  };

  // Real-time validation status updates
  useEffect(() => {
    const newValidationStatus = {};
    Object.keys(formData).forEach(field => {
      newValidationStatus[field] = getValidationStatus(field, formData[field]);
    });
    setValidationStatus(newValidationStatus);
  }, [formData, touched]);

  const getFieldIcon = (name) => {
    const status = validationStatus[name];
    if (status === 'success') return '✅';
    if (status === 'error') return '❌';
    return '';
  };

  const getFieldClassName = (name) => {
    const status = validationStatus[name];
    if (status === 'success') return 'success';
    if (status === 'error') return 'error';
    return '';
  };

  return (
    <form onSubmit={handleSubmit} className="application-form" data-testid="application-form">
      <div className="form-section">
        <h3>Personal Information</h3>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstName">First Name *</label>
            <div className="input-container">
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={getFieldClassName('firstName')}
                placeholder="Enter first name"
              />
              {validationStatus.firstName && (
                <span className="validation-icon">{getFieldIcon('firstName')}</span>
              )}
            </div>
            {errors.firstName && touched.firstName && (
              <span className="error-message">{errors.firstName}</span>
            )}
          </div>
          
          <div className="form-group">
            <label htmlFor="lastName">Last Name *</label>
            <div className="input-container">
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={getFieldClassName('lastName')}
                placeholder="Enter last name"
              />
              {validationStatus.lastName && (
                <span className="validation-icon">{getFieldIcon('lastName')}</span>
              )}
            </div>
            {errors.lastName && touched.lastName && (
              <span className="error-message">{errors.lastName}</span>
            )}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address *</label>
          <div className="input-container">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={getFieldClassName('email')}
              placeholder="Enter email address"
            />
            {validationStatus.email && (
              <span className="validation-icon">{getFieldIcon('email')}</span>
            )}
          </div>
          {errors.email && touched.email && (
            <span className="error-message">{errors.email}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number *</label>
          <div className="input-container">
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              onBlur={handleBlur}
              placeholder="1234567890"
              maxLength="10"
              className={getFieldClassName('phone')}
            />
            {validationStatus.phone && (
              <span className="validation-icon">{getFieldIcon('phone')}</span>
            )}
          </div>
          <small className="helper-text">10 digits, no dashes or spaces</small>
          {errors.phone && touched.phone && (
            <span className="error-message">{errors.phone}</span>
          )}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="birth_date">Date of Birth *</label>
            <div className="input-container">
              <input
                type="date"
                id="birth_date"
                name="birth_date"
                value={formData.birth_date}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={getFieldClassName('birth_date')}
              />
              {validationStatus.birth_date && (
                <span className="validation-icon">{getFieldIcon('birth_date')}</span>
              )}
            </div>
            <small className="helper-text">Format: YYYY-MM-DD</small>
            {errors.birth_date && touched.birth_date && (
              <span className="error-message">{errors.birth_date}</span>
            )}
          </div>
          
          <div className="form-group">
            <label htmlFor="ssn">Social Security Number *</label>
            <div className="input-container">
              <input
                type="text"
                id="ssn"
                name="ssn"
                value={formData.ssn}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder="123456789"
                maxLength="9"
                className={getFieldClassName('ssn')}
              />
              {validationStatus.ssn && (
                <span className="validation-icon">{getFieldIcon('ssn')}</span>
              )}
            </div>
            <small className="helper-text">9 digits, no dashes</small>
            {errors.ssn && touched.ssn && (
              <span className="error-message">{errors.ssn}</span>
            )}
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3>Address Information</h3>
        
        <div className="form-group">
          <label htmlFor="address1">Address Line 1 *</label>
          <div className="input-container">
            <input
              type="text"
              id="address1"
              name="address1"
              value={formData.address1}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={getFieldClassName('address1')}
              placeholder="Enter street address"
            />
            {validationStatus.address1 && (
              <span className="validation-icon">{getFieldIcon('address1')}</span>
            )}
          </div>
          {errors.address1 && touched.address1 && (
            <span className="error-message">{errors.address1}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="address2">Address Line 2</label>
          <input
            type="text"
            id="address2"
            name="address2"
            value={formData.address2}
            onChange={handleInputChange}
            onBlur={handleBlur}
            placeholder="Apartment, suite, etc. (optional)"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="city">City *</label>
            <div className="input-container">
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={getFieldClassName('city')}
                placeholder="Enter city"
              />
              {validationStatus.city && (
                <span className="validation-icon">{getFieldIcon('city')}</span>
              )}
            </div>
            {errors.city && touched.city && (
              <span className="error-message">{errors.city}</span>
            )}
          </div>
          
          <div className="form-group">
            <label htmlFor="state">State *</label>
            <div className="input-container">
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder="NY"
                maxLength="2"
                className={getFieldClassName('state')}
              />
              {validationStatus.state && (
                <span className="validation-icon">{getFieldIcon('state')}</span>
              )}
            </div>
            {errors.state && touched.state && (
              <span className="error-message">{errors.state}</span>
            )}
          </div>
          
          <div className="form-group">
            <label htmlFor="zip">ZIP Code *</label>
            <div className="input-container">
              <input
                type="text"
                id="zip"
                name="zip"
                value={formData.zip}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder="12345"
                className={getFieldClassName('zip')}
              />
              {validationStatus.zip && (
                <span className="validation-icon">{getFieldIcon('zip')}</span>
              )}
            </div>
            {errors.zip && touched.zip && (
              <span className="error-message">{errors.zip}</span>
            )}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="country">Country *</label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            onBlur={handleBlur}
            readOnly
            className={getFieldClassName('country')}
          />
          {errors.country && touched.country && (
            <span className="error-message">{errors.country}</span>
          )}
        </div>
      </div>

      <div className="form-actions">
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={!isFormValid() || isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Application'}
        </button>
      </div>
    </form>
  );
};

export default ApplicationForm;
