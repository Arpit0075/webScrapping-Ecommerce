const express = require("express");
const mongo = require("./mongo");
const cors = require("cors");
const { scrapeProduct } = require("./scrapeFunctionAmazon");
const { urlObjAma } = require("./urlsAma");
const { scrapeProduct1 } = require("./scrapeFunctionFlip");
const { urlObjFli } = require("./urlsFli");

const app = express();
const port = process.env.PORT || 3001;

async function loadApp() {
  try {
    //mongodb connect
    await mongo.connect();

    //middleware to parse request body into JSON
    app.use(express.json());

    //middleware to allow cors
    app.use(cors());

    //insert data into db
    // const data1 = await scrapeProduct(urlObj.url1);
    // const inserted1 = await mongo.amazon.insertOne({
    //   imgSrc: data1.srcText,
    //   origionalPrice: data1.oriPrice,
    //   title: data1.title.trim(),
    //   rating: data1.rating,
    //   salePrice: data1.salePrice,
    // });
    // console.log("inserted1");

    //function to insert data into amazon collection
    const insertData = async (url) => {
      const data = await scrapeProduct(url);
      const inserted = await mongo.amazon.insertOne({
        imgSrc: data.srcText ? data.srcText : "",
        origionalPrice: data.oriPrice ? data.oriPrice : "",
        title: data.title.trim() ? data.title.trim() : "",
        rating: data.rating ? data.rating : "",
        salePrice: data.salePrice ? data.salePrice : "",
      });
      console.log("inserted");
    };

    for (let url in urlObjAma) {
      insertData(urlObjAma[url]);
    }

    // //function to insert data into flipkart collection
    const insertData1 = async (url) => {
      const data = await scrapeProduct1(url);
      const inserted = await mongo.flipkart.insertOne({
        imgSrc: data.srcText ? data.srcText : "",
        origionalPrice: data.oriPrice ? data.oriPrice : "",
        title: data.title.trim() ? data.title.trim() : "",
        rating: data.rating ? data.rating : "",
        salePrice: data.salePrice ? data.salePrice : "",
      });
      console.log("inserted");
    };

    for (let url in urlObjFli) {
      insertData1(urlObjFli[url]);
    }

    //routes for frontend
    app.get("/", (req, res) => {
      res.send("Welcome!");
    });

    app.get("/amazon", async (req, res) => {
      try {
        const data = await mongo.amazon.find().toArray();
        res.send(data);
      } catch (err) {
        console.log(rrr);
        res.sendStatus(400);
      }
    });

    app.get("/flipkart", async (req, res) => {
      try {
        const data = await mongo.flipkart.find().toArray();
        res.send(data);
      } catch (err) {
        console.log(rrr);
        res.sendStatus(400);
      }
    });

    //server status
    app.listen(port);
  } catch (err) {
    console.log(err);
  }
}
loadApp();
