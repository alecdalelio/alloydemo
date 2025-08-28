// backend/index.js
require('dotenv').config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

// More robust CORS configuration
const allowedOrigins = [
  "https://alloydemo.vercel.app",
  "https://alloydemo.vercel.app/",
  "http://localhost:3000",
  "http://localhost:3001"
];

// Add FRONTEND_ORIGIN from environment if it's not already in the list
const envFrontendOrigin = process.env.FRONTEND_ORIGIN;
if (envFrontendOrigin && !allowedOrigins.includes(envFrontendOrigin)) {
  allowedOrigins.push(envFrontendOrigin);
}

// Auto-detect available port (5000 preferred, fallback to 5001)
function getAvailablePort() {
  const net = require('net');
  
  return new Promise((resolve) => {
    const server = net.createServer();
    server.listen(5000, () => {
      const { port } = server.address();
      server.close(() => resolve(port));
    });
    server.on('error', () => {
      console.log('⚠️  Port 5000 is busy, using port 5001');
      resolve(5001);
    });
  });
}

let PORT;

// Debug environment variables
console.log('🔍 Environment check:');
console.log('Token provided:', !!process.env.ALLOY_WORKFLOW_TOKEN);
console.log('Secret provided:', !!process.env.ALLOY_WORKFLOW_SECRET);
console.log('Token preview:', process.env.ALLOY_WORKFLOW_TOKEN?.substring(0, 8) + '...');
console.log('Allowed origins:', allowedOrigins);

// ---------- CORS Configuration ----------
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('❌ CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 204,
  credentials: true
};

// ---------- Middleware ----------
app.use(cors(corsOptions));
app.use(express.json({ limit: "1mb" }));

// ---------- Explicit preflight for /apply ----------
app.options("/apply", cors(corsOptions));



// ---------- Health check ----------
app.get("/", (_req, res) => {
  res.send("Backend running 🚀");
});

// ---------- Helpers ----------
function mask(value, visible = 2) {
  if (!value || typeof value !== "string") return value;
  if (value.length <= visible) return "*".repeat(value.length);
  return value.slice(0, visible) + "*".repeat(value.length - visible);
}

function toAlloyPayload(applicant = {}) {
  // Support both flat fields and nested address object
  const addr = applicant.address || {};
  const address_line_1 = addr.line1 ?? applicant.address1 ?? "";
  const address_line_2 = addr.line2 ?? applicant.address2 ?? "";
  const address_city = addr.city ?? applicant.city ?? "";
  const address_state = addr.state ?? applicant.state ?? "";
  const address_postal_code = addr.zip ?? applicant.zip ?? "";
  const address_country_code = addr.country ?? applicant.country ?? "US";

  // Prefer birth_date if provided; accept dob for compatibility
  const birth_date = applicant.birth_date ?? applicant.dob ?? "";

  // Format SSN to 9 digits (remove dashes and spaces)
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
    social_security_number: formattedSsn, // Alloy API expects social_security_number
    email: applicant.email, // Alloy API expects email (not email_address)
    phone_number: applicant.phone || applicant.phoneNumber || "", // Required field per Alloy API
    birth_date,
  };
}



// Normalize Alloy API outcomes to match frontend expectations
function normalizeOutcome(alloyOutcome) {
  if (!alloyOutcome) return "Unknown";
  
  // Map Alloy's outcomes to our expected format
  switch (alloyOutcome.toLowerCase()) {
    case 'approved':
      return 'Approved';
    case 'denied':
    case 'deny':
      return 'Deny';
    case 'manual review':
    case 'manual_review':
      return 'Manual Review';
    default:
      return alloyOutcome; // Return as-is if no mapping needed
  }
}

// ---------- Routes ----------
app.post("/apply", async (req, res) => {
  const applicant = req.body;
  const payload = toAlloyPayload(applicant);

  const url = "https://sandbox.alloy.co/v1/evaluations";
  const auth = {
    username: process.env.ALLOY_WORKFLOW_TOKEN || "",
    password: process.env.ALLOY_WORKFLOW_SECRET || "",
  };

  // Always attempt real API call first to demonstrate integration
  console.log(`🔄 Processing application for ${applicant.firstName} ${applicant.lastName}`);

  try {
    const { data } = await axios.post(url, payload, {
      auth,
      timeout: 15000, // 15s network timeout
      headers: { "Content-Type": "application/json" },
    });

    // Log key response details
    console.log(`✅ Alloy API Response: ${data?.summary?.outcome || 'Unknown'}`);
    console.log(`📊 Score: ${data?.summary?.score || 'N/A'}, Tags: ${data?.summary?.tags?.join(', ') || 'None'}`);

    const rawOutcome = data?.summary?.outcome;
    const normalizedOutcome = normalizeOutcome(rawOutcome);
    
    console.log(`✅ Application processed: ${rawOutcome} → ${normalizedOutcome}`);
    
    res.json({
      outcome: normalizedOutcome,
      full: data,
    });
  } catch (err) {
    // Log the API call attempt and error
    const status = err?.response?.status || 500;
    const msg = err?.message || "Unknown error";
    
    console.log(`❌ Alloy API Error: ${status} - ${msg}`);
    
    // Log minimal info (masked for security)
    const safe = {
      status,
      message: msg,
      applicant: {
        firstName: applicant?.firstName,
        lastName: applicant?.lastName,
        email: mask(applicant?.email, 3),
        ssn: mask(applicant?.ssn, 0),
        birth_date: applicant?.birth_date ?? applicant?.dob,
      },
      alloyError: err?.response?.data ? "[redacted]" : undefined,
    };
    console.error("Alloy proxy error:", safe);

    res.status(status).json({
      error: "Failed to evaluate with Alloy",
      details: err?.response?.data || msg,
    });
  }
});

// Global error handling
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
});

// ---------- Start ----------
async function startServer() {
  try {
    PORT = process.env.PORT || await getAvailablePort();
    
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log(`CORS origin allowed: ${allowedOrigins.join(', ')}`);
      console.log(`🚀 Backend ready to receive requests`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer();