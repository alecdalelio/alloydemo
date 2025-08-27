#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

// Start the Playwright MCP server
const mcpProcess = spawn('npx', ['@playwright/mcp@latest', '--config', 'playwright-mcp.config.json'], {
  stdio: 'inherit',
  shell: true
});

console.log('🚀 Starting Playwright MCP server...');
console.log('📋 Configuration: playwright-mcp.config.json');
console.log('🌐 Server will be available at: http://localhost:8080');
console.log('📱 Testing URL: http://localhost:3000');
console.log('');
console.log('Available test scenarios:');
console.log('  • Desktop presentation mode');
console.log('  • Tablet responsive design');
console.log('  • Mobile responsive design');
console.log('  • Live demo functionality');
console.log('  • Form submission testing');
console.log('');

mcpProcess.on('close', (code) => {
  console.log(`Playwright MCP server exited with code ${code}`);
});

mcpProcess.on('error', (err) => {
  console.error('Failed to start Playwright MCP server:', err);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down Playwright MCP server...');
  mcpProcess.kill('SIGINT');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Shutting down Playwright MCP server...');
  mcpProcess.kill('SIGTERM');
  process.exit(0);
});
