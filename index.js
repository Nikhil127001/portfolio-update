const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const apiRoutes = require('./Routes/apiRoutes')
const path = require('path')
const cors = require('cors')

require('dotenv').config();
require('./Db')
app.use(cors())
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json())
app.use('/api', apiRoutes);

app.use(express.static(path.join(__dirname,"./Frontend/build")))

app.get('*', function (_,res){
    res.sendFile(path.join(__dirname, "./Frontend/build/index.html"),function(err){ res.status(500).send(err)
    })
})

app.use((err, req, res, next) => {
    res.json({
        message: err.message
    })
})
const port = process.env.PORT || 8001
app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})
