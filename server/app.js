const dotenv=require('dotenv');
const { json } = require('express');
const express=require('express');
const app=express();
app.use(express.json())

dotenv.config({path:'./config.env'});
require('./db/conn');
const PORT=process.env.PORT;
app.use(require('./router/auth'));
app.listen(PORT,()=>{
    console.log('server ok')
})