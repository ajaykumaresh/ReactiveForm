const mongoose = require('mongoose');
const Schema = mongoose.Schema;
console.log(mongoose.connection.readyState);
var Comment = new Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    phonenumber: Number,
    dob: String,
    address: String,
    Education: Array,
    Career: Array
});
module.exports = mongoose.model("Comment", Comment);