const { MongoClient } = require("mongodb");
const dotenv = require("dotenv").config();

//const url = "mongodb://localhost:27017";
const url = process.env.MONGODB_URL;

const client = new MongoClient(url);

module.exports = {
  //database
  db: null,

  //collections
  amazon: null,
  flipkart: null,
  snapdeal: null,

  async connect() {
    await client.connect(); // connecting to mongodb
    this.db = client.db("scrapingData"); // selecting the database
    this.amazon = this.db.collection("amazon"); //selecting the collection from above database
    this.flipkart = this.db.collection("flipkart");
    this.snapdeal = this.db.collection("snapdeal");
  },
};
