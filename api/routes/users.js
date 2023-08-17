var express = require('express');
var router = express.Router();
const {
  ifExist,
  login,
  getList,
  register,
  updateList,
  delList,
  updateSession
}=require("../controller/users");
const loginCheck=require("../middleware/loginCheck");
const { SuccessModel, ErrorModel } = require('../model/resModel');
const xssEscape=require("../middleware/xssEscape");
const jwt=require("jsonwebtoken");
const {jwtSecretKey}=require("../conf/jwtSecretKey");


router.get('/ifLogin',loginCheck);

router.get('/exit',(req,res,next)=>{
    req.session.user=null;
    res.json(new SuccessModel(true));
})
router.post('/login',xssEscape, (req, res, next) => {
  const telephone=req.body.telephone;
  const password=req.body.password;
  const result = login(telephone,password);
  return result.then(data => {
    if(data.userid){
     req.session.user = data;
     const user={...data,password:''};
     const tokenStr=jwt.sign(user,jwtSecretKey,{
        expiresIn:'1h'
   })
   data.token='Bearer '+tokenStr
     res.json(
      new SuccessModel(data)
      )
    }else{
      res.json(new ErrorModel('登陆失败'));
    }
  })
})
router.get('/getList', (req, res, next)=> {
    const result=getList(req.query);
    return result.then(listData=>{
        res.json(new SuccessModel(listData));
    })
});

router.post('/insert',xssEscape,(req, res, next)=>{
  const telephone=req.body.telephone;
  const result=ifExist(telephone);
   result.then(data=>{
    if(data.userid){
      res.json(new ErrorModel('手机号已存在'));
    }else{
      next();
    }
  })
}, (req, res, next) => {
    const result = register(req.body);
    return result.then(data => {
        res.json(
            new SuccessModel(data)
        )
    })
})
router.get('/intoUpdate',(req,res,next)=>{
    if(!req.session.user){
        res.json(new ErrorModel("还没登陆"));
        return;
    }
    res.json(new SuccessModel(req.session.user));
})
router.post('/update',xssEscape,(req, res, next) => {
    let userid=req.session.user.userid;
    const result = updateList(userid,req.body);
    return result.then(val => {
        if (val) {
            console.log(val);
            updateSession(userid).then(row=>{
                req.session.user=row;
            }).then(()=>{
                res.json(
                    new SuccessModel()
                )
            })
            console.log(req.session.user);
        } else {
            res.json(
                new ErrorModel('更新失败')
            )
        }
    })
})

router.post('/allUpdate',xssEscape,(req, res, next) => {
    const result = updateList(req.query.userid,req.body);
    return result.then(val => {
        if (val) {
           
            res.json(
                new SuccessModel('更新成功')
            )
        } else {
            res.json(
                new ErrorModel('更新失败')
            )
        }
    })
})

router.post('/del', (req, res, next) => {
    const result = delList(req.query.userid);
    return result.then(val => {
        if (val) {
            res.json(
                new SuccessModel()
            )
        } else {
            res.json(
                new ErrorModel('删除失败')
            )
        }
    })
})
module.exports = router;
