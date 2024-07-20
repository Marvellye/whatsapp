const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false }); // Set to true for headless mode
  const page = await browser.newPage();
  await page.goto('https://web.whatsapp.com/');

  console.log('Please scan the QR code with your phone.');
  await page.waitForSelector('._1awRl', { timeout: 60000 }); // Wait up to 60 seconds for QR code to be scanned

  const contactName = 'Contact Name'; // Replace with the actual contact name
  const message = 'Hello, this is an automated message!';

  // Search for the contact
  await page.waitForSelector('div[contenteditable="true"][data-tab="3"]');
  await page.click('div[contenteditable="true"][data-tab="3"]');
  await page.type('div[contenteditable="true"][data-tab="3"]', contactName);
  await page.waitForTimeout(2000); // Wait for search results

  // Click on the contact
  await page.click(`span[title="${contactName}"]`);
  await page.waitForTimeout(2000); // Wait for chat to open

  // Send the message
  await page.waitForSelector('div[contenteditable="true"][data-tab="10"]');
  await page.click('div[contenteditable="true"][data-tab="10"]');
  await page.type('div[contenteditable="true"][data-tab="10"]', message);
  await page.keyboard.press('Enter');

  console.log(`Message sent to ${contactName}.`);
  await browser.close();
})();
