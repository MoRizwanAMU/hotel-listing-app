const mongoose = require("mongoose");
const initData = require("./data");
const Listing = require("../models/listing");

const mongo_URL = 'mongodb://127.0.0.1:27017/wanderlust';

main()
    .then( (res) => {
        console.log("connected to DB")
})
    .catch( (err) => {
        console.log(err);
    })
async function main() {
    await mongoose.connect(mongo_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map( (obj) => ({...obj, owner: "6873f0a9d84f4de474b02a04"}));
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();