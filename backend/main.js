const puppeteer = require('puppeteer');
const path = require('path');
const downloadPath = path.resolve(`/home/vanni/jtc/aps-file-download`);

async function download(i, browser) {
  console.log(`download start...........${i}`);
  const page = await browser.newPage();
  await page.goto('http://127.0.0.1:5500/index.html', {
    waitUntil: 'networkidle2',
  });
  const billsData = await page.$$('.pdf');
  console.log(downloadPath);
  await page._client.send('Page.setDownloadBehavior', {
    behavior: 'allow',
    downloadPath: downloadPath,
  });
  await billsData[i].click();
  console.log(`bill click end.......${i}`);
  await new Promise((resolve) => setTimeout(resolve, 12000));
  console.log(`download end.......${i}`);
}

async function simplefileDownload() {
  const browser = await puppeteer.launch();
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

// const puppeteer = require('puppeteer');
// const path = require('path');

// (async () => {
//   try {
//     const browser = await puppeteer.launch();
//     const urls = [0, 1, 2];
//     const pdfs = urls.map(async (i) => {
//       const page = await browser.newPage();

//       console.log(`loading page: ${i}`);
//       await page.goto('http://127.0.0.1:5500/index.html', {
//         waitUntil: 'networkidle0',
//       });

//       const billsData = await page.$$('.pdf');
//       const downloadPath = path.resolve(
//         `/home/vanni/jtc/aps-file-download/${i}`
//       );
//       console.log(downloadPath);
//       await page._client.send('Page.setDownloadBehavior', {
//         behavior: 'allow',
//         downloadPath: downloadPath,
//       });
//       await billsData[i].click();
//       await new Promise((resolve) => setTimeout(resolve, 10000));
//       console.log(`closing page: ${i}`);
//     });
//     console.log('start...........');
//     await Promise.all(pdfs).then(() => {
//       browser.close();
//     });
//     console.log('end...............');
//   } catch (error) {
//     console.log(error);
//   }
// })();
