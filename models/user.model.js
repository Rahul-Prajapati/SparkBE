const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        unique: true,
        sparse: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profileImage: { 
        type: String, 
        default: "https://img.freepik.com/premium-vector/anonymous-user-circle-icon-vector-illustration-flat-style-with-long-shadow_520826-1931.jpg",
    },
    category: {
         type: String
    },
    bio:{
        type : String
    },
});
module.exports = mongoose.model("User", userSchema);