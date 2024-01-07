const mongoose = require('mongoose')

const uri = process.env.MONGO_URI
mongoose.connect(uri).then(()=>{
    console.log('connected to database');
}).catch((err) =>{
    console.log('Database error', err)
})