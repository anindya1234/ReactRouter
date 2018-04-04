const mongoose = require("mongoose");
const db = require("../models");
mongoose.Promise = global.Promise;

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/nytreact"
);

const ArticleSeed = [
  {
    title: "Trump Says He Plans to Order Military to Guard Border",
    url: "https://www.nytimes.com/2018/04/03/us/politics/trump-border-immigration-caravan.html?ribbon-ad-idx=4&rref=politics&module=ArrowsNav&contentCollection=Politics&action=swipe&region=FixedLeft&pgtype=article",
    date: new Date(Date.now())
  },
    {
    title: "Trump Says He Plans to Order Military to Guard Border",
    url: "https://www.nytimes.com/2018/04/03/us/politics/trump-border-immigration-caravan.html?ribbon-ad-idx=4&rref=politics&module=ArrowsNav&contentCollection=Politics&action=swipe&region=FixedLeft&pgtype=article",
    date: new Date(Date.now())
  }

];

db.Article
  .remove({})
  .then(() => db.Article.collection.insertMany(ArticleSeed))
  .then(data => {
    console.log(data.insertedIds.length + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
