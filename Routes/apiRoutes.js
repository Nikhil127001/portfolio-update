const adminRoutes = require('../Routes/adminRoutes')
const express = require('express');
const app  =  express();

app.use('/apiRoutes' , adminRoutes )

module.exports = app