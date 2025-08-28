# Alloy Integration Demo

A complete reference implementation demonstrating how to integrate Alloy's identity verification API into your application.

## 🏦 Overview

This demo application showcases a bank account opening process with real-time fraud detection powered by Alloy's API. It provides a complete example of how to implement identity verification, risk assessment, and automated decisioning in your own applications.

### Features

- **Real-time identity verification** using Alloy's API
- **Complete form validation** with inline error messages
- **Automated decisioning** with three outcome scenarios
- **Responsive design** with modern banking UI
- **Comprehensive error handling** and user feedback
- **Production-ready code** with proper separation of concerns
- **Interactive demo mode** for showcasing integration capabilities

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Alloy API credentials (workflow token and secret)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/alecdalelio/alloy-demo.git
   cd alloy-demo
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   
   # Install root dependencies
   cd ..
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # In the backend directory, copy the example environment file
   cd backend
   cp env.example .env
   ```
   
   Edit `backend/.env` with your Alloy credentials:
   ```env
   ALLOY_WORKFLOW_TOKEN=your_workflow_token_here
   ALLOY_WORKFLOW_SECRET=your_workflow_secret_here
   FRONTEND_ORIGIN=http://localhost:3000
   ```
   
   **Note**: Replace `your_workflow_token_here` and `your_workflow_secret_here` with your actual Alloy API credentials from your dashboard.

4. **Run the application**
   ```bash
   # Start everything at once
   npm run dev
   
   # Or start them separately:
   npm run start:backend    # Backend on port 5000 or 5001 (auto-detected)
   npm run start:frontend   # Frontend on port 3000
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

### Backend endpoint used by the frontend

By default, the frontend submits applications to a hosted backend:

- `https://alloydemo.onrender.com/apply`

To use a local backend for development, update the API URL in `frontend/src/App.js` and ensure CORS `FRONTEND_ORIGIN` in `backend/.env` matches your frontend URL.

## 🛠️ Technical Architecture

### Backend (`/backend`)
- **Framework**: Express.js
- **Authentication**: Basic Auth with Alloy credentials
- **API Integration**: Axios for HTTP requests
- **Environment**: dotenv for configuration
- **Development**: Nodemon for auto-restart

### Frontend (`/frontend`)
- **Framework**: React.js (Create React App)
- **State Management**: React Hooks (useState)
- **Validation**: Client-side form validation with regex patterns
- **Styling**: Custom CSS with responsive design
- **Components**: Modular architecture with ApplicationForm, OutcomeCard, and PresentationMode

### Key Features
- **CORS Configuration**: Properly configured for development
- **Field Mapping**: Converts frontend data to Alloy's API format
- **Outcome Normalization**: Maps Alloy responses to frontend expectations
- **Error Handling**: Clear error responses (no automatic demo-mode fallback)
- **Testing**: Playwright end-to-end smoke tests

## 📋 API Integration Details

### Required Fields (per Alloy API spec)
- `email` - Primary email address
- `address_line_1` - Street address
- `address_country_code` - Two-character country code
- `phone_number` - 10-digit phone number

### Optional Fields
- `name_first`, `name_last` - Full name
- `address_line_2` - Apartment/suite number
- `address_city`, `address_state`, `address_postal_code` - Address details
- `social_security_number` - 9-digit Social Security Number
- `birth_date` - ISO format date (YYYY-MM-DD)

### Validation Rules
- **SSN**: Must be exactly 9 digits (no dashes)
- **Phone**: Must be exactly 10 digits (no formatting)
- **State**: Must be 2-letter uppercase abbreviation
- **Email**: Standard email format validation
- **DOB**: Must be valid date in YYYY-MM-DD format
- **Country**: Must be "US"

## 🧪 Testing Scenarios

The application supports three test scenarios using Alloy's Sandbox Personas feature:

| Last Name | Expected Outcome | UI Display |
|-----------|------------------|------------|
| `Review` | Manual Review | Orange card with review message |
| `Deny` | Application Denied | Red card with denial message |
| Any other | Approved | Green card with success message |

### 🎯 Demo Instructions

To test the different outcome scenarios:

#### 1. **Approved Application**
```json
{
  "firstName": "John",
  "lastName": "Smith",
  "email": "john.smith@example.com",
  "phone": "5551234567",
  "address1": "123 Main St",
  "city": "New York",
  "state": "NY",
  "zip": "10001",
  "country": "US",
  "ssn": "123456789",
  "birth_date": "1990-01-01"
}
```
**Expected Result**: Green success card with "Application Approved!" message

#### 2. **Manual Review Application**
```json
{
  "firstName": "Jessica",
  "lastName": "Review",
  "email": "jessica.review@example.com",
  "phone": "5551234567",
  "address1": "123 Main St",
  "city": "New York",
  "state": "NY",
  "zip": "10001",
  "country": "US",
  "ssn": "123456789",
  "birth_date": "1990-01-01"
}
```
**Expected Result**: Orange review card with "Under Review" message

#### 3. **Denied Application**
```json
{
  "firstName": "John",
  "lastName": "Deny",
  "email": "john.deny@example.com",
  "phone": "5551234567",
  "address1": "123 Main St",
  "city": "New York",
  "state": "NY",
  "zip": "10001",
  "country": "US",
  "ssn": "123456789",
  "birth_date": "1990-01-01"
}
```
**Expected Result**: Red denial card with "Application Not Approved" message

## 🔒 Security Implementation

### Environment Variables
- **Secure Storage**: All sensitive credentials stored in `.env` files
- **Git Protection**: Comprehensive `.gitignore` prevents committing secrets
- **No Hardcoding**: No API credentials in source code

### Input Validation
- **Client-Side**: Real-time validation with immediate feedback
- **Server-Side**: Backend validation before API calls
- **Sanitization**: Input sanitization to prevent injection attacks

### Error Handling & Logging
- **Error Masking**: Sensitive data masked in error logs
- **Graceful Degradation**: Proper error responses without exposing internals
- **Audit Trail**: Detailed logging for debugging (with sensitive data protected)

### CORS & Network Security
- **CORS Policy**: Properly configured for development and production
- **Origin Validation**: Strict origin checking for API requests
- **HTTPS Ready**: Configured for secure deployment

### Data Protection
- **SSN Handling**: SSNs masked in logs and never stored
- **API Security**: Basic authentication with Alloy credentials
- **No Data Persistence**: No sensitive data stored in application

## 🚀 Deployment Options

### Render.com Deployment

#### Backend Deployment
1. **Create a new Web Service**
   - Connect your GitHub repository
   - Set build command: `cd backend && npm install`
   - Set start command: `cd backend && npm start`

2. **Environment Variables**
   ```
   ALLOY_WORKFLOW_TOKEN=your_workflow_token
   ALLOY_WORKFLOW_SECRET=your_workflow_secret
   FRONTEND_ORIGIN=https://alloydemo.vercel.app
   ```

#### Frontend Deployment
1. **Create a new Static Site**
   - Connect your GitHub repository
   - Set build command: `cd frontend && npm install && npm run build`
   - Set publish directory: `frontend/build`

2. **Environment Variables**
   ```
   REACT_APP_API_URL=https://alloydemo.onrender.com
   ```

### Fly.io Deployment

#### Prerequisites
```bash
# Install flyctl
curl -L https://fly.io/install.sh | sh

# Login to Fly.io
fly auth login
```

#### Backend Deployment
1. **Initialize Fly.io app**
   ```bash
   cd backend
   fly launch
   ```

2. **Configure environment variables**
   ```bash
   fly secrets set ALLOY_WORKFLOW_TOKEN=your_workflow_token
   fly secrets set ALLOY_WORKFLOW_SECRET=your_workflow_secret
   fly secrets set FRONTEND_ORIGIN=https://your-frontend-app.fly.dev
   ```

3. **Deploy**
   ```bash
   fly deploy
   ```

#### Frontend Deployment
1. **Build and deploy**
   ```bash
   cd frontend
   npm run build
   fly launch
   fly deploy
   ```

### Vercel Deployment

#### Frontend Deployment
1. **Connect repository to Vercel**
2. **Set build settings**:
   - Framework Preset: Create React App
   - Build Command: `npm run build`
   - Output Directory: `build`

3. **Environment Variables**:
   ```
   REACT_APP_API_URL=https://alloydemo.onrender.com
   ```

Note: The backend is deployed to Render (`https://alloydemo.onrender.com`). Vercel hosts the frontend only, per `vercel.json`.

## 🚨 Troubleshooting

### Common Issues

**Port Conflicts**
- Backend automatically detects available port (5000 preferred, falls back to 5001)
- Frontend runs on port 3000
- Use `lsof -i :5000` or `lsof -i :5001` to check port availability

**CORS Errors**
- Ensure backend is running before frontend
- Check that FRONTEND_ORIGIN in backend `.env` matches your frontend URL
- Hard refresh browser cache (Cmd+Shift+R)

**API Errors**
- Verify `.env` file exists in backend directory
- Check that credentials are valid and properly formatted
- Review terminal logs for detailed error messages

### Development Commands

```bash
# Check backend health (try both ports)
curl http://localhost:5000/ || curl http://localhost:5001/

# Test API endpoint (try both ports)
curl -X POST http://localhost:5000/apply \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","lastName":"User",...}' || \
curl -X POST http://localhost:5001/apply \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","lastName":"User",...}'

# Check running processes
ps aux | grep node

# Kill processes if needed
pkill -f nodemon
```

## 📈 Future Enhancements

- **Unit Tests**: Jest/React Testing Library for component testing
- **Integration Tests**: API endpoint testing with supertest
- **TypeScript**: Type safety for better development experience
- **Docker**: Containerization for consistent deployment
- **CI/CD**: GitHub Actions for automated testing and deployment

## 📋 Implementation Features

This application demonstrates a complete integration with Alloy's API:

### ✅ **Core Features**

**1. Application Form with Required Fields**
- ✅ First Name (required)
- ✅ Last Name (required) 
- ✅ Address (Line 1, Line 2, City, State, ZIP, Country)
- ✅ State validation (2-letter code: NY, CA, etc.)
- ✅ Country validation (must be "US")
- ✅ SSN validation (9 digits, no dashes)
- ✅ Email Address (required)
- ✅ Date of Birth (ISO-8601 format: YYYY-MM-DD)

**2. Alloy API Integration**
- ✅ Real API calls to `https://sandbox.alloy.co/v1/evaluations/`
- ✅ Proper field mapping to Alloy's API format
- ✅ Basic authentication with workflow token and secret
- ✅ Error handling for API responses

**3. Outcome Display**
- ✅ **Approved**: "Success! Customer has successfully created an account"
- ✅ **Manual Review**: "Thanks for submitting your application, we'll be in touch shortly"
- ✅ **Denied**: "Sorry, your application was not successful"

**4. Sandbox Personas Testing**
- ✅ Last name "Review" → Manual Review outcome
- ✅ Last name "Deny" → Denied outcome
- ✅ Any other last name → Approved outcome

**5. Technical Implementation**
- ✅ Frontend: React.js with modern UX
- ✅ Backend: Express.js with proper API integration
- ✅ Form validation with real-time feedback
- ✅ Responsive design for all devices
- ✅ Production-ready code

**6. Security & Best Practices**
- ✅ Environment variables for API credentials
- ✅ No hardcoded secrets in repository
- ✅ Input validation and sanitization
- ✅ CORS configuration
- ✅ Error handling without exposing sensitive data

### 🎯 **Advanced Features**

- 🚀 **Interactive Demo Mode**: Professional showcase of integration capabilities
- 🧪 **E2E Testing**: Playwright tests for key user flows
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- 🎨 **Modern UI/UX**: Professional banking interface with smooth animations
- 🔧 **Developer Experience**: Hot reload, auto-port detection, comprehensive logging
- 📊 **Real-time Validation**: Instant feedback on form fields
- 🚀 **Deployment Ready**: Configured for Render, Fly.io, Vercel, and more

### 📋 **Implementation Details**

**Form Validation**
- ✅ Real-time validation with inline error messages
- ✅ SSN format validation (9 digits, no dashes)
- ✅ State code validation (2-letter format)
- ✅ Email format validation
- ✅ Date of birth validation (ISO-8601 format)
- ✅ Required field validation with visual indicators

**API Integration**
- ✅ POST request to `https://sandbox.alloy.co/v1/evaluations/` for evaluation
- ✅ Basic authentication with `workflow_token:workflow_secret`
- ✅ Proper error handling with informative messages

**Sandbox Personas Testing**
- ✅ "Jessica Review" → Manual Review outcome
- ✅ "John Deny" → Denied outcome  
- ✅ Any other name → Approved outcome

**Outcome Messages**
- ✅ **Approved**: "Success! Customer has successfully created an account"
- ✅ **Manual Review**: "Thanks for submitting your application, we'll be in touch shortly"
- ✅ **Denied**: "Sorry, your application was not successful"

## 📝 Implementation Summary

This application successfully demonstrates:

✅ **API Integration**: Real calls to Alloy's API environment  
✅ **Form Handling**: Complete validation and user experience  
✅ **Error Management**: Graceful handling of edge cases  
✅ **Code Quality**: Clean, maintainable, and well-documented code  
✅ **Technical Depth**: Full-stack implementation with proper architecture  
✅ **Sandbox Personas**: Proper implementation of test scenarios using specific last names  
✅ **Demo Mode**: Interactive showcase of integration capabilities  
✅ **Comprehensive Testing**: Playwright test suite for quality assurance  
✅ **Deployment Ready**: Configured for multiple hosting platforms
