const { postProject, register, Login, uploadFileAndGetUrls, getProjects, updateProject, deleteProject, updateAdminProfile, getAdminProfile, createSkill, getSkills, deleteSkills, verifyisLoggedIn } = require('../Controller/adminController')
const express = require('express')
const Routes = express.Router();
const multer = require('multer');
const { sendMessage, getMessages } = require('../Controller/contactForm');
const upload = multer();
const {verifyAuthToken} = require('../utils/generateAuthToken')

Routes.post('/sendMessage' ,sendMessage)
Routes.get('/getprojects', getProjects)
Routes.post('/AdminLogin', Login)
Routes.get('/AdminProfile' , getAdminProfile)


// admin routes
Routes.post('/register',verifyAuthToken, register)
Routes.get('/getMessages' ,verifyAuthToken,getMessages)
Routes.post('/postProject',verifyAuthToken, postProject)
Routes.post('/addProject',verifyAuthToken, upload.fields([{ name: 'images' }]), postProject)
Routes.post('/uploadImages',verifyAuthToken, upload.array('files', 3), uploadFileAndGetUrls)
Routes.put('/updateProject/:id',verifyAuthToken, updateProject)
Routes.delete('/deleteProject/:id',verifyAuthToken, deleteProject)
Routes.put('/updateAdminProfile',verifyAuthToken,upload.single('file'), updateAdminProfile)
Routes.post('/createSkills',verifyAuthToken,upload.single('file'), createSkill)
Routes.get('/getAllSkills',getSkills)
Routes.delete('/deleteSkill/:id',verifyAuthToken, deleteSkills),
Routes.get('/verifyIsLoggedIn',verifyAuthToken, verifyisLoggedIn),

module.exports = Routes;


