const multer = require('multer');
const path = require('path');
const fs = require('fs');
const imgURL = path.join(__dirname, '../', 'public', 'img', 'goodImg','/');
const upload = multer({ dest: imgURL });
const { ErrorModel } = require('../model/resModel');
const whetherImg = (req, res, next) => {
    let extname = path.extname(req.file.originalname);
    let imgArr = ['.jpg', '.jpeg', '.bmp', '.png', '.gif'];
    if (imgArr.indexOf(extname) == -1) {
        res.json(
            new ErrorModel('图片格式不对，请重新上传')
        );
        return;
    }
    //后缀
    const oldPath = imgURL + req.file.filename;
    const filename = Date.now() + Math.floor(Math.random(100000, 999999)) + extname;
    const newpath = imgURL + filename;
    fs.rename(oldPath, newpath, (err) => {
        if (!err) {
            req.body.picture = 'img/goodImg/' + filename;
            next();
        }
    })
   
}
const updateImg=(req,res,next)=>{
    if(req.file){
        whetherImg(req,res,next);
        return;
    }
    req.body.picture=undefined;
    next();
}
module.exports = {
    filesCheck: upload.single('picture'),
    whetherImg,
    updateImg
}