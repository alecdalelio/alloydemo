const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());            // allow frontend localhost in dev
app.use(express.json());

// Health check
app.get("/", (_req, res) => {
  res.send("Backend running 🚀");
});

// Alloy proxy (env-driven auth)
app.post("/apply", async (req, res) => {
  try {
    // Map your frontend payload to Alloy format as needed.
    const applicant = req.body;

    const url = "https://sandbox.alloy.co/v1/evaluations";
    const auth = {
      username: process.env.ALLOY_WORKFLOW_TOKEN || "",
      password: process.env.ALLOY_WORKFLOW_SECRET || ""
    };

    // Minimal example payload. You’ll expand this with all fields later.
    const payload = {
      name_first: applicant.firstName,
      name_last: applicant.lastName,
      address_line_1: applicant.address1,
      address_city: applicant.city,
      address_state: applicant.state,        // 2-letter
      address_postal_code: applicant.zip,
      address_country_code: "US",
      ssn: applicant.ssn,                    // 9 digits, no dashes
      email_address: applicant.email,
      birth_date: applicant.dob              // YYYY-MM-DD
    };

    const { data } = await axios.post(url, payload, { auth });
    // Return only what the frontend needs
    res.json({
      outcome: data?.summary?.outcome || "Unknown",
      full: data
    });
  } catch (err) {
    console.error(err?.response?.data || err.message);
    res.status(err?.response?.status || 500).json({
      error: "Failed to evaluate with Alloy",
      details: err?.response?.data || err.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});