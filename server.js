const express = require("express");
var bodyParser = require("body-parser");
require('dotenv').config();

const port =  process.env.PORT || 5000
const app = express();
var cors = require('cors')


const authRoutes = require('./src/components/auth/authRoutes');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());





app.use(cors())
app.use('/auth', authRoutes)


app.get('/',(req,res)=>{
  res.send("server is working")
})

app.listen(port, () => {
    console.log(`server running on port ${port}`);
  });
