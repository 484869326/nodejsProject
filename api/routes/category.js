var express = require('express');
var router = express.Router();
const {getList,insertList,updateList,delList}=require("../controller/category");
const loginCheck=require("../middleware/loginCheck");
const { SuccessModel, ErrorModel } = require('../model/resModel');
const xssEscape=require("../middleware/xssEscape");

router.get('/getList',(req, res, next)=> {
    const typeid=req.query.typeid||'';
    const typename=req.query.typename||'';
    const result=getList(typeid,typename);
    return result.then(listData=>{
        res.json(new SuccessModel(listData));
    })
});
router.post('/insert',loginCheck,xssEscape,(req, res, next) => {
    const result = insertList(req.body.typename);
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
router.post('/update',loginCheck,xssEscape,(req, res, next) => {
    const result = updateList(req.query.typeid,req.body.typename);
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
    const result = delList(req.query.typeid);
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
