const mongoose = require('mongoose')

const ImageSchema = mongoose.Schema({
    type : String ,
    require : true
});


const ImageModel = mongoose.mode('Images', ImageSchema);

module.exports = ImageModel