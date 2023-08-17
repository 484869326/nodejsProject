const { ErrorModel } = require('../model/resModel')
const {jwtSecretKey}=require("../conf/jwtSecretKey");
const { expressjwt } = require("express-jwt");
module.exports = expressjwt({secret:jwtSecretKey,algorithms: ['HS256']}),(err,req, res, next) => {
    if (req.session.user) {
        next()
        return
    }
    res.json(
        new ErrorModel('请先登录')
    )
}