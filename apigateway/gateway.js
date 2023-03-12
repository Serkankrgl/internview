const express = require('express');
const app = express();
const helmet = require('helmet');
const routes = require('./routes')
const PORT = 3000;
app.use(express.json());
app.use(helmet())

app.use('/',routes);

app.listen(PORT,(req,res)=>{
    console.log('Gate has open PORT: '+ PORT );
});