const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { Pool } = require('pg');

const app = express();

// 1. Security Headers (Helmet) - Protection against XSS, Clickjacking, etc.
app.use(helmet());

// 2. Rate Limiting - Prevent Brute Force/DoS on banking endpoints
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

app.use(express.json());

// 3. Secure DB Connection logic
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: true } // Mandatory for banking data in transit
});

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'Secure' });
});

// A sample 'Secure' endpoint with Input Validation
app.post('/api/balance', async (req, res) => {
  const { accountId } = req.body;
  
  // Shift Left: Basic check before DB query
  if (!accountId || typeof accountId !== 'string') {
    return res.status(400).json({ error: 'Invalid Account ID format' });
  }

  try {
    // Parameterized query to prevent SQL Injection (SonarCloud will look for this!)
    const result = await pool.query('SELECT balance FROM accounts WHERE id = $1', [accountId]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Secure Banking API running on port ${PORT}`));