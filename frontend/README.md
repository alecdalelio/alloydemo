# Alloy Demo Frontend

React.js frontend application demonstrating Alloy API integration, featuring an interactive application form and demo mode.

## 🏗️ Architecture

- **Framework**: React.js (Create React App)
- **State Management**: React Hooks (useState)
- **Validation**: Client-side form validation with regex patterns
- **Styling**: Custom CSS with responsive design
- **Components**: Modular architecture with ApplicationForm, OutcomeCard, and PresentationMode

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- Backend server running (see backend README)

### Installation
```bash
cd frontend
npm install
```

### Running the Application
```bash
npm start
```

The application will open at `http://localhost:3000`

## 📋 Available Scripts

### Development
```bash
npm start          # Start development server
npm test           # Run React tests
npm run build      # Build for production
```

### Playwright Testing
```bash
npm run test:playwright        # Run all Playwright tests
npm run test:demo             # Presentation mode tests
npm run test:layout           # Final slide layout checks
npm run test:smoke            # Minimal smoke test (Chromium only)
npm run test:playwright:ui    # Run tests with UI
npm run test:playwright:headed # Run tests in headed mode
npm run test:playwright:debug # Debug tests step by step
```

### Playwright Setup
```bash
npm run playwright:install    # Install Playwright browsers
npm run playwright:codegen    # Generate test code interactively
```

## 🎯 Features

### Application Form
- **Complete Validation**: All required fields with real-time validation
- **User Experience**: Inline error messages and field highlighting
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Accessibility**: Proper labels, focus states, and keyboard navigation

### Demo Mode
- **Interactive Slides**: Navigate through integration overview
- **Live Demo**: Real application form embedded in demo
- **Code Examples**: Syntax-highlighted code snippets
- **Keyboard Navigation**: Arrow keys, space, ESC, F11
- **Fullscreen Support**: Toggle fullscreen mode

### Outcome Display
- **Three Scenarios**: Approved, Manual Review, Deny
- **Visual Feedback**: Color-coded cards with icons
- **Clear Messaging**: Assignment-specific outcome messages
- **Reset Functionality**: Start new application

## 🧪 Testing Scenarios

### Sandbox Personas Testing
Use these last names to test different outcomes:

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

## 🔧 Configuration

### Environment / Backend
By default, the frontend posts to a hosted backend:
- https://alloydemo.onrender.com/apply

To use a local backend instead, update the API URL in `src/App.js` and start the backend (`npm run start:backend` from project root). Ensure backend CORS `FRONTEND_ORIGIN` matches your frontend URL.

### Build Configuration
- **Production Build**: `npm run build`
- **Static Files**: Served from `build/` directory
- **Optimization**: Minified and optimized for production

## 🎨 Styling

### CSS Architecture
- **Custom CSS**: No external UI libraries
- **Responsive Design**: Mobile-first approach
- **Modern Features**: CSS Grid, Flexbox, CSS Variables
- **Animations**: Smooth transitions and hover effects

### Design System
- **Color Palette**: Banking-themed colors
- **Typography**: Clean, readable fonts
- **Spacing**: Consistent padding and margins
- **Components**: Reusable button and form styles

## 🧪 Testing

### Playwright Test Coverage
- **Presentation Mode**: Navigation, keyboard shortcuts, fullscreen
- **Responsive Design**: Desktop, tablet, mobile views
- **Form Validation**: Field validation and error handling
- **API Integration**: Form submission and outcome display
- **Layout Testing**: Element positioning and spacing

### Test Structure
```
tests/
├── presentation.spec.js    # Presentation mode tests
└── layout.spec.js          # Final slide layout & responsiveness
```

## 🚨 Troubleshooting

### Common Issues

**Backend Connection**
- Ensure backend is running before starting frontend
- Check that backend is on port 5001 or 5000
- Verify CORS configuration in backend

**Build Issues**
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Clear build cache: `rm -rf build && npm run build`

**Test Issues**
- Install Playwright browsers: `npm run playwright:install`
- Check that application is running before tests

## 📱 Responsive Design

### Breakpoints
- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: 375px - 767px
- **Small Mobile**: 320px - 374px

### Features
- **Flexible Layout**: Adapts to screen size
- **Touch-Friendly**: Large touch targets on mobile
- **Readable Text**: Appropriate font sizes for each device
- **Optimized Forms**: Mobile-friendly form inputs

## 🔒 Security

### Client-Side Security
- **Input Validation**: Comprehensive form validation
- **XSS Prevention**: React's built-in XSS protection
- **No Sensitive Data**: Credentials handled by backend only

### Best Practices
- **Environment Variables**: No hardcoded secrets
- **HTTPS Ready**: Configured for secure deployment
- **Content Security**: Proper CSP headers in production
