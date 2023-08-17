const {exec}=require('../db/mysql');
const getList = (goodid,typeid, name) => {
    let sql = `select * from good,category where good.typeid=category.typeid `
    if (goodid) {
        sql += ` and goodid=${goodid} `;
    }
    if (typeid) {
        sql += ` and typeid=${typeid} `;
    }
    if (name) {
        sql += ` and name like '%${name}%' `;
    }
    sql+='order by goodid '
    return exec(sql)
}
const insertList=(goodData={})=>{
    const typeid=goodData.typeid;
    const name=goodData.goodname;
    const price=goodData.price;
    const picture=goodData.picture;
    const state=goodData.state;
    let sql = `insert into good values(null,${typeid},${name},${price},${picture},${state})`;
    return exec(sql).then(insertData=>{
      return{
        goodid:insertData.insertId
      }
    })
}
const updateList=(goodid,goodData={})=>{
    const typeid=goodData.typeid;
    const name=goodData.goodname;
    const price=goodData.price;
    const picture=goodData.picture;
    const state=goodData.state;
    let sql = `update good set typeid=${typeid},name=${name},price=${price},state=${state} `;
    if(picture){
        sql+=`,picture=${picture} `;
    }
    sql+=` where goodid=${goodid}`;

    return exec(sql).then(updateData=>{
        if(updateData.affectedRows>0){
            return true;
        }
        return false;
    })
}
const delList = (goodid) => {
    const sql = `delete from good where goodid=${goodid}`;
    return exec(sql).then(delData => {
        if (delData.affectedRows > 0) {
            return true;
        }
        return false;
    })
}
module.exports = {
    getList,
    insertList,
    updateList,
    delList
}