const Contact = require('../Model/Contact')
const AdminData = require('../Model/AdminModel')

const sendMessage = async(req,res,next) => {
    const {name , email, subject, message} = req.body

   
    try{
        if(!(name || email||subject||message)){
            const err = new Error('all fields required');
            next(err);
        }else{
            const Message = await Contact.create({name : name , email : email , subject : subject , message : message})

            if(!Message){
                const err = new Error('something went wrong');
            next(err);
            }else{
                res.json({
                    message: 'message send successfully',
                    Message : Message
                })
            }
        }
    }catch(err){
        next(err);
    }
}

const getMessages = async(req,res,next) => {
    try{    const decoded = req.user;
            if (!decoded){
                const err = new Error('admin login required');
            next(err);
            }
            const admin = await AdminData.findById(decoded._id);
            if(!admin){
                const err = new Error('access denied');
            next(err);
            }
            const Messages = await Contact.find();

            if(!Messages){
                const err = new Error('no messages');
            next(err);
            }else{
                res.json({
                    message: 'message fetched success',
                    Message : Messages
                })
            }
    }catch(err){
        next(err);
    }
}


module.exports = {sendMessage, getMessages}