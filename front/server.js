const express = require('express');
const next = require('next');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const dotenv = require('dotenv');

dotenv.config();

const dev= process.env.NODE_ENV !== 'development';
const prod= process.env.NODE_ENV === 'production';

const app = next({dev});
const handle = app.getRequestHandler();

app.prepare().then(()=>{
    const server= express();
    server.use(morgan('dev'));
    server.use(express.json()); // json으로 넘어온 데이타 처리
    server.use(express.urlencoded({extended:true})); //form으로 넘어온 데이타 처리
    server.use(cookieParser(process.env.COOKIE_SECRET));
    server.use(expressSession({
        resave: false,
        saveUninitialized: false,
        secret: process.env.COOKIE_SECRET,
        cookie:{
            httpOnly: true,
            secure: false, // https 사용시 true
        },
        name: 'mgck'
    }));

    server.get('*',(req, res)=>{
        return handle(req,res)
    });
    
    server.listen(3000, ()=>{
        console.log('Server is running on http://localhost:3000')
    })
});

