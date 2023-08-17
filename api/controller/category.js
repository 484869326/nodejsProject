const {exec}=require('../db/mysql');

const getList = (typeid,typename) => {
    let sql = `select * from category where 1=1 `
    if (typeid) {
        sql += ` and typeid=${typeid} `;
    }
    if (typename) {
        sql += ` and name like '%${typename}%' `;
    }
    return exec(sql)
}
const insertList=(typename)=>{
    let sql = `insert into category values(null,${typename})`;
    return exec(sql).then(insertData=>{
        if(insertData.affectedRows>0){
            return true;
        }
        return false;
    })

}
const updateList=(typeid,typename)=>{
    let sql = `update category set typename=${typename} where typeid=${typeid}`;
    return exec(sql).then(updateData=>{
        if(updateData.affectedRows>0){
            return true;
        }
        return false;
    })
}
const delList = (typeid) => {
    const sql = `delete from category where typeid=${typeid}`;
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