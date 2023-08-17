var express = require('express');
var router = express.Router();
const {getList,insertList,updateList,delList}=require("../controller/good");
const loginCheck=require("../middleware/loginCheck");
const {filesCheck,whetherImg,updateImg}=require("../middleware/filesCheck");
const { SuccessModel, ErrorModel } = require('../model/resModel');
const xssEscape=require("../middleware/xssEscape");

router.get('/getList',loginCheck,(req, res, next)=> {
    const goodid=req.query.goodid||'';
    const typeid=req.query.typeid||'';
    const name=req.query.name||'';
    const result=getList(goodid,typeid,name);
    return result.then(listData=>{
        res.json(new SuccessModel(listData));
    })
});
router.post('/insert',loginCheck, filesCheck,whetherImg,xssEscape,(req, res, next) => {
    const result = insertList(req.body);
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
})
router.post('/update',loginCheck,filesCheck,updateImg,xssEscape,(req, res, next) => {
    const result = updateList(req.query.goodid,req.body);
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
router.post('/del', xssEscape,(req, res, next) => {
    const result = delList(req.query.goodid);
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
