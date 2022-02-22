const puppeteer = require('puppeteer');
const path = require('path');

async function download(i, browser) {
  console.log(`download start...........${i}`);
  const page = await browser.newPage();
  await page.goto('http://127.0.0.1:5500/index.html', {
    waitUntil: 'networkidle2',
  });
  const billsData = await page.$$('.pdf');
  const downloadPath = path.resolve(`/home/vanni/jtc/aps-file-download/${i}`);
  console.log(downloadPath);
  await page._client.send('Page.setDownloadBehavior', {
    behavior: 'allow',
    downloadPath: downloadPath,
  });
  await billsData[i].click();
  console.log(`bill click end.......${i}`);
  await new Promise((resolve) => setTimeout(resolve, 5000));
  console.log(`download end.......${i}`);
}

async function simplefileDownload() {
  const browser = await puppeteer.launch({headless: false});
  const promises = [];
  for (let i = 0; i < 4; i++) {
    promises.push(download(i, browser));
  }
  console.log('promise start.....');
  await Promise.all(promises).then(() => {
    browser.close();
  });
  console.log('promise end......');
}

simplefileDownload();
