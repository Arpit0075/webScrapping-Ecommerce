// product carteogry -laptop

const puppeteer = require("puppeteer");

async function scrapeProduct(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  //extracting img
  const [el] = await page.$x(
    "/html/body/div[2]/div[2]/div[5]/div[4]/div[3]/div[1]/div[1]/div/div/div[2]/div[1]/div[1]/ul/li[1]/span/span/div/img"
  );
  const src = await el.getProperty("src");
  const srcText = await src.jsonValue(); //imgrc for first watch

  //extracting origional price
  const [el2] = await page.$x(
    "/html/body/div[2]/div[2]/div[5]/div[4]/div[4]/div[9]/div[1]/div/table/tbody/tr[1]/td[2]/span[1]"
  );
  const txt = await el2.getProperty("textContent");
  const oriPrice = await txt.jsonValue(); //origional price

  //extracting sale price
  const [el3] = await page.$x(
    "/html/body/div[2]/div[2]/div[5]/div[4]/div[4]/div[9]/div[1]/div/table/tbody/tr[2]/td[2]/span[1]"
  );
  const txt3 = await el3.getProperty("textContent");
  const salePrice = await txt3.jsonValue(); //origional price

  //title
  const [el4] = await page.$x(
    "/html/body/div[2]/div[2]/div[5]/div[4]/div[4]/div[1]/div/h1/span"
  );
  const txt4 = await el4.getProperty("textContent");
  const title = await txt4.jsonValue();

  //   //rating
  const [el5] = await page.$x(
    "/html/body/div[2]/div[2]/div[5]/div[4]/div[4]/div[5]/div/span[1]/span/span[1]/a/i[1]/span"
  );
  const txt5 = await el5.getProperty("textContent");
  const rating = await txt5.jsonValue();

  //console.log(srcText, oriPrice, title.trim(), rating, salePrice);
  browser.close();
  return { srcText, oriPrice, title, rating, salePrice };
}

module.exports = { scrapeProduct };
