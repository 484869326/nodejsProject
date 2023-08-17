const {exec}=require('../db/mysql');
const ifAdd=(userid,goodid)=> {
    let sql = `select * from cart where userid=${userid} and goodid=${goodid}`
    return exec(sql).then(row=>{
        return row
    })
}
const getList = (userid) => {
    let sql = `select * from cart,good where userid=${userid} and cart.goodid=good.goodid `
    return exec(sql).then(row=>{
        return row
    })
}
const insertList=(userid,cartData={})=>{
    const goodid=cartData.goodid;
    const number=cartData.number;
    let sql = `insert into cart values(${userid},${goodid},${number})`;
    return exec(sql).then(insertData=>{
        if(insertData.affectedRows>0){
            return true;
        }
        return false;
    })

}
const updateList=(goodid,userid,number)=>{
    let sql = `update cart set number=${number} where goodid=${goodid} and userid=${userid}`;
    return exec(sql).then(updateData=>{
        if(updateData.affectedRows>0){
            return true;
        }
        return false;
    })
}
const delList = (goodid,userid) => {
    const sql = `delete from cart where goodid=${goodid} and userid=${userid}`;
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
    delList,
    ifAdd
}