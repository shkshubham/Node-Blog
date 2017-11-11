const auth =(req,res,next)=> {
  if(!req.user){
    res.redirect('/auth/login');
  }else{
    next();
  }
}

const notAuth =(req,res,next)=> {
  if(req.user){
    res.redirect('/profile');
  }else{
    next();
  }
}

module.exports = {
  auth,
  notAuth
};
