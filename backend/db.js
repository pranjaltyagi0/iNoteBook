const mongoose = require("mongoose");

const mongoURI = "mongodb+srv://pranjal:pranjal@cluster0.9b1nmhi.mongodb.net/?retryWrites=true&w=majority";

async function connectToMongo() {
  await mongoose
    .connect(mongoURI)
    .then((result) => console.log("Mongoose Connected Successfully"))
    .catch((error) => console.log(error));
}

module.exports = connectToMongo;
