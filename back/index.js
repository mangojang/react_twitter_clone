const express = require('express');
const db = require('./models');

const app = express();
db.sequelize.sync();

app.get('/',(req, res)=>{
    res.send("Hello, server!")
});

app.get('/about',(req, res)=>{
    res.send("Hello, about!")
});

app.listen(8000, ()=>{
    console.log('Server is running on http://localhost:8000')
})