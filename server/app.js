// Dependencies
const express = require("express");
const champions = require("./routers/champion");
const games = require("./routers/game");
const path = require("path");
const mongoose = require('mongoose');
var cors = require('cors')

main().catch(err => console.log(err));

async function main() {
  try{
    await mongoose.connect('mongodb://localhost:27017/HP_Trivia', { useNewUrlParser: true, useUnifiedTopology: true });

    console.log("mongoose is in the house!")
  }
  catch {
    console.log("mongoose has left the building")
  }
}

// App data
const PORT = process.env.PORT || 4000;
const app = express();

app.use(cors())

// static files in public folder
app.use(express.static(path.join(__dirname, "public")));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// log time for every route
app.use(function (req, res, next) {
  console.log('Time:', Date.now())
  next()
})

// home page route
app.get("/", (req, res) => {
  res.send("I am Lord Voldemort");
});

// Routers for specific pages
app.use("/champions", champions);
app.use("/games", games);


// default error handler
app.use(function (err, req, res, next) {
  console.error(err)
  res.status(500).json({Error:err})
})

app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`);
  console.log("Press Ctrl+C to quit");
});
