# Alloy Bank Application Demo

A full-stack web application demonstrating identity verification integration with Alloy's API.

## 🏦 Overview

This application simulates a bank account opening process, integrating with Alloy's identity verification API to process applicant data and display outcomes based on risk assessment.

### Features

- **Real-time identity verification** using Alloy's sandbox API
- **Complete form validation** with inline error messages
- **Three outcome scenarios**: Approved, Manual Review, and Deny
- **Responsive design** with modern banking UI
- **Comprehensive error handling** and user feedback
- **Clean, production-ready code** with proper separation of concerns

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Alloy API credentials (workflow token and secret)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/alloydemo.git
   cd alloydemo
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # In the backend directory, create a .env file
   cd ../backend
   cp .env.example .env
   ```
   
   Add your Alloy credentials to `backend/.env`:
   ```env
   ALLOY_WORKFLOW_TOKEN=your_workflow_token_here
   ALLOY_WORKFLOW_SECRET=your_workflow_secret_here
   ```

4. **Run the application**
   ```bash
   # Terminal 1: Start the backend (from backend directory)
   cd backend
   PORT=5001 npm run dev
   
   # Terminal 2: Start the frontend (from frontend directory)
   cd frontend
   npm start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

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
- **Components**: Modular architecture with ApplicationForm and OutcomeCard

### Key Features
- **CORS Configuration**: Properly configured for development
- **Field Mapping**: Converts frontend data to Alloy's API format
- **Outcome Normalization**: Maps Alloy responses to frontend expectations
- **Error Handling**: Graceful degradation with demo mode fallback

## 📋 API Integration Details

### Required Fields (per Alloy API spec)
- `email_address` - Primary email address
- `address_line_1` - Street address
- `address_country_code` - Two-character country code
- `phone_number` - 10-digit phone number

### Optional Fields
- `name_first`, `name_last` - Full name
- `address_line_2` - Apartment/suite number
- `address_city`, `address_state`, `address_postal_code` - Address details
- `document_ssn` - 9-digit Social Security Number
- `birth_date` - ISO format date (YYYY-MM-DD)

### Validation Rules
- **SSN**: Must be exactly 9 digits (no dashes)
- **Phone**: Must be exactly 10 digits (no formatting)
- **State**: Must be 2-letter uppercase abbreviation
- **Email**: Standard email format validation
- **DOB**: Must be valid date in YYYY-MM-DD format
- **Country**: Must be "US"

## 🧪 Testing Scenarios

The application supports three test scenarios using specific last names:

| Last Name | Expected Outcome | UI Display |
|-----------|------------------|------------|
| `Review` | Manual Review | Orange card with review message |
| `Deny` | Application Denied | Red card with denial message |
| Any other | Approved | Green card with success message |

### Sample Test Data
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

## 🔒 Security & Best Practices

- **Environment Variables**: Sensitive credentials stored in `.env` files
- **Git Ignore**: Comprehensive `.gitignore` prevents committing secrets
- **Input Validation**: Both client-side and server-side validation
- **Error Masking**: Sensitive data masked in error logs
- **CORS Policy**: Properly configured for security

## 📁 Project Structure

alloy-demo-root/
├── backend/
│ ├── index.js # Express server with API integration
│ ├── package.json # Backend dependencies
│ ├── .env # Environment variables (not committed)
│ └── .gitignore # Backend-specific git rules
├── frontend/
│ ├── public/ # Static assets
│ ├── src/
│ │ ├── components/
│ │ │ ├── ApplicationForm.jsx # Main form component
│ │ │ └── OutcomeCard.jsx # Results display
│ │ ├── App.js # Main application logic
│ │ ├── App.css # Application styling
│ │ └── index.js # React entry point
│ └── package.json # Frontend dependencies
├── .gitignore # Root git ignore rules
├── package.json # Root dependencies
└── README.md # This file


## 🚨 Troubleshooting

### Common Issues

**Port Conflicts**
- Backend runs on port 5001 (not 5000 due to macOS AirPlay)
- Frontend runs on port 3000
- Use `lsof -i :5001` to check if port is available

**CORS Errors**
- Ensure backend is running before frontend
- Check that FRONTEND_ORIGIN matches your frontend URL
- Hard refresh browser cache (Cmd+Shift+R)

**API Errors**
- Verify `.env` file exists in backend directory
- Check that credentials are valid and properly formatted
- Review terminal logs for detailed error messages

### Development Commands

```bash
# Check backend health
curl http://localhost:5001/

# Test API endpoint
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

## 📝 Assignment Completion

This application successfully demonstrates:

✅ **API Integration**: Real calls to Alloy's sandbox environment  
✅ **Form Handling**: Complete validation and user experience  
✅ **Error Management**: Graceful handling of edge cases  
✅ **Code Quality**: Clean, maintainable, and well-documented code  
✅ **Technical Depth**: Full-stack implementation with proper architecture  
