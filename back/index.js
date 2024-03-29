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
const hpp = require('hpp');
const helmet = require('helmet');

const app = express();

db.sequelize.sync();

dotenv.config();
passportConfig(passport);
app.use('/', express.static('uploads'));

if(process.env.NODE_ENV==="production"){
    app.use(hpp());
    app.use(helmet());
}
app.use(morgan(process.env.NODE_ENV==="production"?'combined':'dev'));
app.use(express.json()); // json으로 넘어온 데이타 처리
app.use(express.urlencoded({extended:true})); //form으로 넘어온 데이타 처리
app.use(cors({
    origin: process.env.NODE_ENV==="production"? process.env.FRONT_URL:"http://localhost:3000",
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
        domain: process.env.NODE_ENV==="production" && '.mangotwitter.site',
    },
    name: 'mgck'
}));
app.use(passport.initialize());
app.use(passport.session());



app.use('/api/user', userAPIRouter);
app.use('/api/post', postAPIRouter);
app.use('/api/hashtag', hashtagAPIRouter);


app.get('/',(req, res)=>{
    res.send("Hello, server!")
});

app.get('/test',(req, res)=>{
    res.send("Hello, server test!")
});



app.listen(process.env.NODE_ENV ==="production"? process.env.PORT : 8000, ()=>{
    console.log(`Server is running on http://localhost:${process.env.NODE_ENV ==="production"? process.env.PORT : 8000}`)
})