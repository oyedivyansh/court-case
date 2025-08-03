const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

async function fetchCourtDetails(caseType, caseNumber, filingYear) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate to court site (replace with actual URL)
  await page.goto('https://districts.ecourts.gov.in/faridabad');

  // Fill/search the form (selectors update karo as per target page)
  // await page.select('select[name=case_type]', caseType);
  // await page.type('input[name=case_number]', caseNumber);
  // await page.type('input[name=filing_year]', filingYear);
  // await page.click('button[type=submit]');
  // await page.waitForSelector('...'); // selector for result

  await page.waitForTimeout(3000); // Just for demo

  const rawHtml = await page.content();

  // Parse with Cheerio
  const $ = cheerio.load(rawHtml);

  // Example parsing (selectors replace karo as per site layout)
  const parties = $('selector-for-parties').text();
  const filingDate = $('selector-for-filing-date').text();
  const nextDate = $('selector-for-next-hearing').text();
  const pdfLink = $('selector-for-latest-order-PDF').attr('href');

  await browser.close();

  return {
    rawHtml,
    parsed: {
      parties,
      filingDate,
      nextDate,
      pdfLink
    }
  };
}

module.exports = { fetchCourtDetails };
