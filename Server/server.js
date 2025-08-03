const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected')).catch(err => console.log(err));

const { fetchCourtDetails } = require('./scraper/courtScraper');

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Court Data Fetcher backend running!');
});

// API endpoint abhi yahan nahi, woh agle step me
const Query = require('./models/Query');

// POST /api/case-details
app.post('/api/case-details', async (req, res) => {
  const { caseType, caseNumber, filingYear } = req.body;

  //--- Scrape logic yahan call hoga ---
  try {
    // Puppeteer ko call karo
    const { rawHtml, parsed } = await fetchCourtDetails(caseType, caseNumber, filingYear);

    // MongoDB log karo
    await Query.create({
      caseType, caseNumber, filingYear, rawHtml, extracted: parsed
    });

    res.json(parsed);
  } catch (err) {
    res.status(500).json({ error: 'Court lookup failed. Please try later.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
