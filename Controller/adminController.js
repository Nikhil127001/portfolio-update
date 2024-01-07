const AdminData = require('../Model/AdminModel')
const ProjectModel = require('../Model/ProjectModel');
const skills = require('../Model/skills')
const { generateAuthToken } = require('../utils/generateAuthToken');
require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const postProject = async (req, res, next) => {
    try {
        const files = req.files; // Uploaded files
        const formData = req.body; // Form data fields

        if (
            !(
                formData.title ||
                formData.frontendDiscription ||
                formData.backendDiscription ||
                formData.hostedLink ||
                formData.githubLink ||
                formData.projectType ||
                formData.skills ||
                formData.videoLink
            )
        ) {
            const err = new Error('all fields required');
            next(err);
        } else {
            const uploadPromises = files.images.map((file) => {
                return new Promise((resolve, reject) => {
                    cloudinary.uploader.upload_stream(
                        { resource_type: 'auto' },
                        (error, result) => {
                            if (error) {
                                console.error('Error uploading file:', error);
                                reject(error);
                            } else {
                                console.log('File uploaded:', result.secure_url);
                                resolve(result.secure_url);
                            }
                        }
                    ).end(file.buffer);
                });
            });

            Promise.all(uploadPromises)
                .then(async (urls) => {
                    const project = await ProjectModel.create({
                        title: formData.title,
                        frontendDiscription: formData.frontendDiscription,
                        backendDiscription: formData.backendDiscription,
                        hostedLink: formData.hostedLink,
                        githubLink: formData.githubLink,
                        projectType: formData.projectType,
                        skills: formData.skills,
                        images: urls, // Use the uploaded image URLs here
                        videoLink: formData.videoLink,
                    });
                    res.json({
                        message: 'project posted successfully',
                        project: project,
                    });

                })
                .catch((error) => {
                    console.error('Upload error:', error);
                    res.status(500).json({ error: 'Failed to upload some or all files.' });
                });
        }
    } catch (err) {
        next(err);
    }
};

const Login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const admin = await AdminData.findOne({ email })

        if (admin && admin.password == password) {

            const token = generateAuthToken(admin._id, admin.email)
            res.json({
                message: 'logged In',
                Token: token
            })
        } else {
            const err = new Error('invalid Credentials')
            next(err)
        }
    } catch (err) {
        next(err)
    }
}

const register = async (req, res, next) => {
    const { email, password, introName, introDescription, profileUrl, linkedInUrl, githubUrl, resume, about } = req.body;

    try {
        const admin = await AdminData.create({ email: email, password: password, introName: introName, introDescription: introDescription, profileUrl: profileUrl, linkedInUrl: linkedInUrl, githubUrl: githubUrl, resume: resume, about: about });

        if (admin) {
            res.json({
                message: 'user registered Success',
                user: admin
            })
        } else {
            const err = new Error('something went Wrong');
            next(err)
        }
    } catch (err) {
        next(err)
    }
}

const uploadFileAndGetUrls = async (req, res, next) => {
    const { files } = req;

    const uploadPromises = files.map((file) => {
        return new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { resource_type: 'auto' },
                (error, result) => {
                    if (error) {
                        console.error('Error uploading file:', error);
                        reject(error);
                    } else {
                        console.log('File uploaded:', result.secure_url);
                        resolve(result.secure_url);
                    }
                }
            ).end(file.buffer);
        });
    });

    Promise.all(uploadPromises)
        .then((urls) => {
            res.json({ urls });
        })
        .catch((error) => {
            console.error('Upload error:', error);
            res.status(500).json({ error: 'Failed to upload some or all files.' });
        });
}

const getProjects = async (req, res, next) => {
    try {
        const projects = await ProjectModel.find();
        if (projects.length === 0) {
            const err = new Error('nothing to show')
            next(err);
        } else {
            res.json({
                projects: projects
            })
        }
    } catch (err) {
        next(err)
    }
}

const updateProject = async (req, res, next) => {
    const projectId = req.params.id;
    const data = req.body;

    if (!projectId && !data) {
        const err = new Error('project Id or data required')
        next(err);
    }

    try {
        const Project = await ProjectModel.findById(projectId);
        if (!Project) {
            const err = new Error('project Not Exists')
            next(err);
        } else {

            Project.skills = data.skills || Project.skills,
                Project.frontendDiscription = data.frontendDiscription || Project.frontendDiscription,
                Project.backendDiscription = data.backendDiscription || Project.backendDiscription,
                Project.hostedLink = data.hostedLink || Project.hostedLink,
                Project.githubLink = data.githubLink || Project.githubLink,
                Project.videoLink = data.videoLink || Project.videoLink,
                await Project.save();

            res.json({
                message: 'updated Successfully'
            })
        }
    } catch (err) {
        next(err);
    }
}

const deleteProject = async (req, res, next) => {
    const projectId = req.params.id;
    if (!projectId) {
        const err = new Error('project id required');
        next(err);
    }

    try {
        const isprojectExists = await ProjectModel.findById(projectId);
        if (!isprojectExists) {
            const err = new Error('project not exists or invalid Id');
            next(err);
        } else {
            const deleted = await ProjectModel.findByIdAndDelete(projectId);

            if (!deleted) {
                const err = new Error('something went wrong');
                next(err);
            } else {
                res.json({
                    message: 'deleted Successfully',
                    deleted: deleted
                })
            }
        }
    } catch (err) {
        next(err)
    }
}

const updateAdminProfile = async (req, res, next) => {
    const { email, password, introName, introDescription, linkedInUrl, githubUrl, resume, about } = req.body
    const file = req.file

    try {
        const decoded = req.user;
        const admin = await AdminData.findById(decoded._id);

        if (!admin) {
            const err = new Error('Access Denied');
            next(err);
        } else {
            if (file) {
                // Use a Promise to upload the file and update the admin data
                const fileUploadPromise = new Promise((resolve, reject) => {
                    cloudinary.uploader.upload_stream(
                        { resource_type: 'auto' },
                        (error, result) => {
                            if (error) {
                                console.error('Error uploading file:', error);
                                reject(error);
                            } else {
                                console.log('File uploaded:', result.secure_url);
                                admin.profileUrl = result.secure_url || admin.profileUrl;
                                resolve(result.secure_url);
                            }
                        }
                    ).end(file.buffer);
                });

                // Wait for the file upload to finish
                await fileUploadPromise;
            }

            // Update other fields
            admin.password = password || admin.password;
            admin.introName = introName || admin.introName;
            admin.introDescription = introDescription || admin.introDescription;
            admin.about = about || admin.about;
            admin.email = email || admin.email;
            admin.linkedInUrl = linkedInUrl || admin.linkedInUrl;
            admin.resume = resume || admin.resume;
            admin.githubUrl = githubUrl || admin.githubUrl;

            // Save the admin data
            await admin.save();

            res.json({
                message: 'admin details updated',
                admin: admin,
            });
        }
    } catch (err) {
        next(err);
    }
}


const getAdminProfile = async (req, res, next) => {
    try {
        const decoded = req.user;
        const admin = await AdminData.findById('65301a59a136bbfef05aa142')

        if (!admin) {
            const err = new Error('Access Denied');
            next(err)
        } else {
            res.send({
                message: 'admin details fetched',
                admin: admin
            })
        }
    } catch (err) {
        next(err)
    }

}

const getSkills = async (req, res, next) => {

    try {
        const skillData = await skills.find();
        if (skillData.length === 0) {
            const err = new Error('No Data found');
            next(err);
        } else {
            res.json({
                message: 'fetched Success',
                data: skillData
            })
        }
    } catch (err) {
        next(err)
    }

}

const createSkill = async (req, res, next) => {
    const { name, progress } = req.body;
    const file = req.file;

    try {
        let url = '';
        const decoded = req.user;
        const admin = await AdminData.findById(decoded._id);

        if (!admin) {
            const err = new Error('Access Denied');
            next(err);
        }
        else {
            const uploadImage = new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream({ 'resource_type': 'auto' }, async (err, result) => {
                    if (err) {
                        console.log('Error occured', err);
                        reject(err);
                    } else {
                        console.log('result', result.secure_url)
                        url = result.secure_url;
                        resolve(result.secure_url)
                    }
                }).end(file.buffer)
            })

            await uploadImage
        }
        const skill = await skills.create({ name: name, progress: progress, imageUrl: url })

        res.json({
            message: 'skill added',
            response: skill
        })

    } catch (err) {
        next(err)
    }
}

const deleteSkills = async (req, res, next) => {
    try {
        const skillId = req.params.id;
        const decoded = req.user;
        const admin = await AdminData.findById(decoded._id);

        if (!admin) {
            const err = new Error('Invalid User');
            next(err);
        }else{
            const deleted = await skills.findByIdAndDelete(skillId);
            if(!deleted){
                const err = new Error('skill Not exists');
            next(err);
            }else{
                res.json({
                    message : 'skill deleted'
                })
            }
        }
    } catch (err) {
        next(err)
    }
}

const verifyisLoggedIn = async(req,res,next) => {
        const decoded = req.user
        admin = await AdminData.findById(decoded._id);
        if(admin){
            res.json({
                message : 'user Logged In'
            })
        }
}



module.exports = { postProject, Login, register, uploadFileAndGetUrls, getProjects, updateProject, deleteProject, updateAdminProfile, getAdminProfile, getSkills, createSkill, deleteSkills, verifyisLoggedIn };