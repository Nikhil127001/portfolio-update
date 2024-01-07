

const mongoose = require('mongoose');

const AdminSchema = mongoose.Schema({
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    introName : {
        type : String, 
    },
    introDescription : {
        type : String,
    },
    profileUrl : {
        type : String,
    },
    linkedInUrl : {
        type : String,
    },
    githubUrl : {
        type : String,
    },
    resume : {
        type : String,
    },
    about : [{
        heading : {
            type : String,
        },
        description : {
            type : String,
        }
    }
    ]
})

const AdminData = mongoose.model('AdminData',AdminSchema)

module.exports = AdminData;