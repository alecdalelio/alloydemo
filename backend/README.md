# Alloy Demo Backend

Express.js backend server that integrates with Alloy's identity verification API.

## 🏗️ Architecture

- **Framework**: Express.js
- **Authentication**: Basic Auth with Alloy credentials
- **API Integration**: Axios for HTTP requests to Alloy
- **Environment**: dotenv for configuration
- **Development**: Nodemon for auto-restart

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- Alloy API credentials (workflow token and secret)

### Installation
```bash
cd backend
npm install
```

### Environment Setup
Create a `.env` file in the backend directory:
```env
ALLOY_WORKFLOW_TOKEN=your_workflow_token_here
ALLOY_WORKFLOW_SECRET=your_workflow_secret_here
FRONTEND_ORIGIN=http://localhost:3000
```

### Running the Server
```bash
npm start
```

The server will automatically detect available ports:
- Prefers port 5000
- Falls back to port 5001 if 5000 is busy

## 📡 API Endpoints

### POST `/apply`
Processes application data through Alloy's API.

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Smith",
  "email": "john.smith@example.com",
  "phone": "1234567890",
  "address1": "123 Main St",
  "city": "New York",
  "state": "NY",
  "zip": "10001",
  "country": "US",
  "ssn": "123456789",
  "birth_date": "1990-01-01"
}
```

**Response:**
```json
{
  "outcome": "Approved",
  "full": { /* Full Alloy API response */ }
}
```

### GET `/`
Health check endpoint.

## 🔧 Configuration

### Environment Variables
- `ALLOY_WORKFLOW_TOKEN`: Your Alloy workflow token
- `ALLOY_WORKFLOW_SECRET`: Your Alloy workflow secret
- `FRONTEND_ORIGIN`: CORS origin (default: http://localhost:3000)
- `PORT`: Server port (auto-detected if not specified)

### CORS Configuration
Properly configured for development with:
- Origin: `http://localhost:3000`
- Methods: GET, POST, OPTIONS
- Headers: Content-Type, Authorization

## 🔒 Security Features

- **Input Validation**: Validates all incoming data
- **Error Masking**: Sensitive data masked in logs
- **CORS Protection**: Properly configured CORS policy
- **Environment Variables**: Secure credential storage

## 🧪 Testing

### Sandbox Personas
The backend supports Alloy's Sandbox Personas for testing:

| Last Name | Expected Outcome |
|-----------|------------------|
| `Review` | Manual Review |
| `Deny` | Application Denied |
| Any other | Approved |

### Manual Testing
```bash
# Test the API endpoint
curl -X POST http://localhost:5000/apply \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Jessica",
    "lastName": "Review",
    "email": "jessica@example.com",
    "phone": "1234567890",
    "address1": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zip": "10001",
    "country": "US",
    "ssn": "123456789",
    "birth_date": "1990-01-01"
  }'
```

## 🐛 Troubleshooting

### Common Issues

**Port Conflicts**
- Server automatically detects available ports
- Check logs for which port is being used
- Use `lsof -i :5000` to check port availability

**API Errors**
- Verify `.env` file exists and has correct credentials
- Check Alloy API status
- Review server logs for detailed error messages

**CORS Errors**
- Ensure FRONTEND_ORIGIN matches your frontend URL
- Check that backend is running before frontend

## 📊 Logging

The server provides detailed logging:
- Environment variable status
- API request/response details
- Error information (with sensitive data masked)
- Port detection and server startup

## 🔄 Data Transformation

The backend transforms frontend data to Alloy's API format:

**Frontend → Alloy API**
- `firstName` → `name_first`
- `lastName` → `name_last`
- `address1` → `address_line_1`
- `ssn` → `document_ssn` (formatted to 9 digits)
- `birth_date` → `birth_date` (ISO format)

## 🚨 Error Handling

- **Network Timeouts**: 15-second timeout for API calls
- **Graceful Degradation**: Proper error responses to frontend
- **Logging**: Detailed error logs with sensitive data masked
- **Validation**: Input validation before API calls
