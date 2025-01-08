import puppeteer from 'puppeteer';

async function googleSearch(query: string) {
  // Launch browser
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Navigate to Google
  await page.goto('https://www.google.com');

  // Handle consent screen (if it appears)
  try {
    // Wait for the "I agree" button and click it
    await page.waitForSelector('div#L2AGLb', { timeout: 5000 });
    await page.click('div#L2AGLb');
    console.log('Consent screen accepted');
  } catch (error) {
    console.log('No consent screen found or already accepted.');
  }

  // Type the query into the search box
  await page.type('input[name="q"]', query);

  // Press Enter to submit the search
  await page.keyboard.press('Enter');

  // Wait for the results page to load
  await page.waitForSelector('h3');

  // Extract the titles of the search results
  const results = await page.evaluate(() => {
    const titles = Array.from(document.querySelectorAll('h3'));
    return titles.map(title => title.innerText);
  });

  // Log the results
  console.log('Search results:');
  results.forEach((title: string, index: number) => {
    console.log(`${index + 1}: ${title}`);
  });

  // Close the browser
  await browser.close();
}

// Run the function with your desired search query
googleSearch('TypeScript automation tutorial').catch(console.error);
