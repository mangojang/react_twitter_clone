const express = require('express');
const db = require('./models');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const dotenv = require('dotenv');
const passport = require('passport');
const passportConfig = require('./passport');
const userAPIRouter = require('./routes/user');
const postAPIRouter = require('./routes/post');
const hashtagAPIRouter = require('./routes/hashtag');

const app = express();

db.sequelize.sync();

dotenv.config();
app.use('/', express.static('uploads'));

app.use(morgan('dev'));
app.use(express.json()); // json으로 넘어온 데이타 처리
app.use(express.urlencoded({extended:true})); //form으로 넘어온 데이타 처리
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie:{
        httpOnly: true,
        secure: false, // https 사용시 true
    },
    name: 'mgck'
}));
app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport);


app.use('/api/user', userAPIRouter);
app.use('/api/post', postAPIRouter);
app.use('/api/hashtag', hashtagAPIRouter);


app.get('/',(req, res)=>{
    res.send("Hello, server!")
});



app.listen(8000, ()=>{
    console.log('Server is running on http://localhost:8000')
})