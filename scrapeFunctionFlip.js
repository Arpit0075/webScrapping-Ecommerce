// product carteogry -laptop

const puppeteer = require("puppeteer");

async function scrapeProduct1(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  //extracting img
  const [el] = await page.$x(
    "/html/body/div[1]/div/div[3]/div[1]/div[1]/div[1]/div/div[1]/div[2]/div[1]/div[2]/div/img"
  );
  const src = await el.getProperty("src");
  const srcText = await src.jsonValue(); //imgrc for first watch

  //extracting origional price
  const [el2] = await page.$x(
    "/html/body/div[1]/div/div[3]/div[1]/div[2]/div[2]/div/div[3]/div[1]/div/div[2]/text()[2]"
  );
  const txt = await el2.getProperty("textContent");
  const oriPrice = await txt.jsonValue(); //origional price

  //extracting sale price
  const [el3] = await page.$x(
    "/html/body/div[1]/div/div[3]/div[1]/div[2]/div[2]/div/div[3]/div[1]/div/div[1]"
  );
  const txt3 = await el3.getProperty("textContent");
  const salePrice = await txt3.jsonValue(); //origional price

  //title
  const [el4] = await page.$x(
    "/html/body/div[1]/div/div[3]/div[1]/div[2]/div[2]/div/div[1]/h1/span[2]"
  );
  const txt4 = await el4.getProperty("textContent");
  const title = await txt4.jsonValue();

  //   //rating
  const [el5] = await page.$x(
    "/html/body/div[1]/div/div[3]/div[1]/div[2]/div[2]/div/div[4]/div/div/span[1]/div"
  );
  const txt5 = await el5.getProperty("textContent");
  const rating = await txt5.jsonValue();

  //console.log(srcText, oriPrice, salePrice, title.trim(), rating);
  browser.close();
  return { srcText, oriPrice, title, rating, salePrice };
}

module.exports = { scrapeProduct1 };

// scrapeProduct(
//   "https://www.flipkart.com/seven-rocks-solid-men-mandarin-collar-green-t-shirt/p/itm0d1f8d4f63374/"
// );
