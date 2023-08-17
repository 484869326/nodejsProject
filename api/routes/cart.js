var express = require('express');
var router = express.Router();
const {getList,insertList,updateList,delList,ifAdd}=require("../controller/cart");
const loginCheck=require("../middleware/loginCheck");
const { SuccessModel, ErrorModel } = require('../model/resModel');
const xssEscape=require("../middleware/xssEscape");

router.get('/getList',loginCheck, xssEscape,(req, res, next)=> {
    const result=getList(req.session.user.userid);
    return result.then(listData=>{
        res.json(new SuccessModel(listData));
    })
});
router.post('/insert',loginCheck,xssEscape,(req, res, next) => {
    let userid=req.session.user.userid;
    let goodid=req.body.goodid;
    const flag=ifAdd(userid,goodid);
    return flag.then(data=>{
        if(data.length!=0){
            updateList(goodid,userid,req.body.number);
            return res.json(
                new SuccessModel(true)
            )
        }else{
            const result = insertList(userid,req.body);
            return result.then(data => {
               if(data){
                res.json(
                    new SuccessModel(data)
                )
               }else{
                res.json(
                    new ErrorModel("增加失败")
                )
               }
            })
        }
      
    })
   
})
router.post('/update',loginCheck,xssEscape,(req, res, next) => {
    const result = updateList(req.body.goodid,req.session.user.userid,req.body.number);
    return result.then(val => {
        if (val) {
            res.json(
                new SuccessModel()
            )
        } else {
            res.json(
                new ErrorModel('更新失败')
            )
        }
    })
})
router.post('/del',loginCheck, xssEscape,(req, res, next) => {
    const result = delList(req.body.goodid,req.session.user.userid);
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
