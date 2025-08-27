# Playwright MCP Configuration for Alloy Demo

This project includes a comprehensive Playwright MCP (Model Context Protocol) setup for testing the interactive presentation mode and responsive design across different devices and browsers.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
# Install root dependencies
npm install

# Install Playwright browsers
npm run playwright:install
```

### 2. Start the Development Environment
```bash
# Start backend, frontend, and Playwright MCP server
npm run dev

# Or start them separately:
npm run start:backend    # Backend on port 5001
npm run start:frontend   # Frontend on port 3000
npm run mcp:start        # Playwright MCP on port 8080
```

## 📋 Available Scripts

### Testing Scripts
```bash
# Run all Playwright tests
npm run test:playwright

# Run only presentation mode tests
npm run test:presentation

# Run responsive design tests on mobile devices
npm run test:responsive

# Run tests with UI (interactive mode)
cd frontend && npm run test:playwright:ui

# Run tests in headed mode (see browser)
cd frontend && npm run test:playwright:headed

# Debug tests step by step
cd frontend && npm run test:playwright:debug
```

### Playwright MCP Scripts
```bash
# Start Playwright MCP server
npm run mcp:start

# Test MCP server directly
npm run mcp:test

# Generate test code interactively
npm run playwright:codegen
```

## 🧪 Test Scenarios

The Playwright MCP configuration includes comprehensive test scenarios:

### 1. Presentation Mode Testing
- ✅ Enter/exit presentation mode
- ✅ Navigate through all slides
- ✅ Keyboard shortcuts (arrows, space, ESC, F11)
- ✅ Auto-hiding controls
- ✅ Fullscreen toggle

### 2. Responsive Design Testing
- ✅ Desktop (1920x1080)
- ✅ Tablet (768x1024)
- ✅ Mobile (375x667)
- ✅ Small Mobile (320x568)
- ✅ Landscape orientation

### 3. Live Demo Testing
- ✅ Form display in presentation
- ✅ Form validation
- ✅ API submission
- ✅ Outcome display (Approve/Deny/Manual Review)
- ✅ Reset functionality

### 4. Cross-Browser Testing
- ✅ Chromium (Chrome/Edge)
- ✅ Firefox
- ✅ WebKit (Safari)
- ✅ Mobile Chrome
- ✅ Mobile Safari

## 📱 Device Testing

The configuration includes predefined test data for different scenarios:

### Test Data Sets
```javascript
// Approved application
{
  firstName: "John",
  lastName: "Smith",
  // ... other fields
}

// Manual Review (last name "Review")
{
  firstName: "Jessica",
  lastName: "Review",
  // ... other fields
}

// Denied application (last name "Deny")
{
  firstName: "John",
  lastName: "Deny",
  // ... other fields
}
```

## 🔧 Configuration Files

### `playwright-mcp.config.json`
Main MCP server configuration with:
- Browser settings (Chromium, headless: false)
- Server settings (port 8080)
- Test configurations for different devices
- Predefined test data

### `playwright.config.js`
Playwright test runner configuration with:
- Multiple browser projects
- Mobile device emulation
- Test reporting (HTML, JSON, JUnit)
- Screenshot and video capture on failure

### `tests/presentation.spec.js`
Comprehensive test suite covering:
- Desktop, tablet, and mobile views
- Presentation mode functionality
- Live demo integration
- Responsive design validation

## 🎯 Usage Examples

### Test Presentation Mode on Desktop
```bash
npm run test:presentation -- --project=chromium
```

### Test Responsive Design on Mobile
```bash
npm run test:responsive
```

### Debug a Specific Test
```bash
cd frontend && npm run test:playwright:debug tests/presentation.spec.js
```

### Generate New Tests
```bash
npm run playwright:codegen
# This opens Playwright Inspector for interactive test creation
```

## 📊 Test Reports

After running tests, you'll find reports in:
- `playwright-report/` - HTML report
- `test-results/` - JSON and JUnit reports
- Screenshots and videos for failed tests

## 🔍 Troubleshooting

### Common Issues

1. **Port conflicts**: Make sure ports 3000, 5001, and 8080 are available
2. **Browser installation**: Run `npm run playwright:install` if browsers aren't found
3. **MCP server issues**: Check that `@playwright/mcp` is properly installed

### Debug Mode
```bash
# Run with verbose logging
DEBUG=pw:* npm run test:playwright

# Run specific test with debug
npm run test:playwright:debug -- tests/presentation.spec.js
```

## 🎨 Customization

### Add New Test Scenarios
1. Edit `tests/presentation.spec.js`
2. Add new test cases
3. Update `playwright-mcp.config.json` if needed

### Modify Device Configurations
Edit the `devices` array in `playwright-mcp.config.json`:
```json
{
  "name": "Custom Device",
  "viewport": { "width": 1200, "height": 800 }
}
```

### Add New Test Data
Add to the `testData` section in `playwright-mcp.config.json`:
```json
{
  "customScenario": {
    "firstName": "Custom",
    "lastName": "User",
    // ... other fields
  }
}
```

## 📚 Resources

- [Playwright Documentation](https://playwright.dev/)
- [Playwright MCP Documentation](https://github.com/microsoft/playwright-mcp)
- [Alloy API Documentation](https://docs.alloy.com/)

## 🤝 Contributing

When adding new tests:
1. Follow the existing test structure
2. Add appropriate assertions
3. Include responsive design considerations
4. Test across multiple browsers
5. Update this README if needed
