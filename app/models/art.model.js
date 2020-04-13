const mongoose = require('mongoose');

const ArtSchema = mongoose.Schema({
    title: String,
    content: String,
    contentOne: String,
    contentTwo: String,
    contentThree: String,
    imgUrl:String,
    imgUrlOne:String,
    imgUrlTwo:String,
    imgUrlThree:String,
    author: String,
    date: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('Art', ArtSchema);