const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    }
})

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);


// note =>  which hashing algorithm used in passport 
// answer => pbkdf2 hashing algorithm (this passport hasing algorithm used in my project)