const mongoose = require('mongoose')
const ProjectSchema = mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    frontendDiscription : {
        type : String,
        required : true,
    },
    backendDiscription : {
        type : String,
        required : true,
    },
    hostedLink : {
        type : String,
        default : 'yet to deploy'
    },
    githubLink : {
        type : String,
        required : true,
        default : 'yet to deploy'
    },
    projectType : {
        type : String,
        required: true
    },
    skills : {
        type : String,
        required : true
    },

    images : {
        type : Array,
        default : ''
    },

    videoLink : {
        type : String,
        default: ''
    }
})


const ProjectModel = mongoose.model('Projects' , ProjectSchema);

module.exports = ProjectModel