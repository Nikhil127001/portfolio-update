const mongoose = require('mongoose')


const Skills = mongoose.Schema({
    name: {
        type : String,
        required : true
    },
    progress : {
        type : Number,
        required: true
    },
    imageUrl :{
        type : String,
        required: true
    }
})

const skills = mongoose.model('skills', Skills);

module.exports = skills;