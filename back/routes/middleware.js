exports.isLoggedIn = (req,res,next) =>{
    console.log('@@req.isAuthenticated', req.isAuthenticated());
    console.log('@@req.user', req.user);
    console.log('@@req.headers.cookie', req.headers.cookie);    

    if(req.isAuthenticated()){
        next();
    }else{
        res.status(401).send('로그인이 필요합니다.');
    }
}

exports.isNotLoggedIn = (req,res,next) =>{
    if(!req.isAuthenticated()){
        next();
    }else{
        res.status(401).send('로그인한 사용자는 접근할 수 없습니다.');
    }
}