var express = require('express');
var router = express.Router();
const {getList,insertList,updateList}=require("../controller/orders");
const loginCheck=require("../middleware/loginCheck");
const { SuccessModel, ErrorModel } = require('../model/resModel');
const xssEscape=require("../middleware/xssEscape");

router.post('/send',loginCheck, xssEscape,(req, res, next)=> {
    const result=updateList(req.body.orderid);
    return result.then(listData=>{
        res.json(new SuccessModel(listData));
    })
});
router.get('/allList',loginCheck, xssEscape,(req, res, next)=> {
    const result=getList();
    return result.then(listData=>{
        res.json(new SuccessModel(listData));
    })
});
router.get('/getList', xssEscape,(req, res, next)=> {
    const result=getList(req.session.user.userid);
    return result.then(listData=>{
        res.json(new SuccessModel(listData));
    })
});
router.post('/insert',loginCheck,(req, res, next) => {
    const result=insertList(req.session.user.userid,req.body);
    return result.then(data => {
        console.log(data);
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
})
module.exports = router;
