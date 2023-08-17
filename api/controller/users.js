const { exec, } = require('../db/mysql');

const login = (telephone, password) => {
  let sql = `select * from users where telephone=${telephone} and password=${password}`;
  return exec(sql).then(row => {
    return row[0] || {}
  })
}
const getList = (userData) => {
  const userid=userData.userid || '';
 
  let sql = `select * from users where 1=1 `
  if(userid){
    sql+=` and userid=${userid}`;
  }
  return exec(sql).then(row => {
    return row
  })
}

const updateSession=(userid)=>{
  let sql=`select * from users where userid=${userid}`;
  return exec(sql).then(row => {
    return row[0]||{}
  })
}

const ifExist=(telephone)=>{
  let sql = `select * from users where telephone=${telephone}`;
  console.log(sql);
  return exec(sql).then(row => {
    return row[0] || {}
  })
}
const register = (userData = {}) => {
  const telephone = userData.telephone;
  const password = userData.password;
  const name = userData.name;
  const mail = userData.mail;
  const address = userData.address;
  const nickname = userData.nickname;
  let sql = `insert into users values(null,${password},${nickname},${name},${telephone},${mail},${address})`;
  return exec(sql).then(insertData => {
    return {
      userid: insertData.insertId
    }
  })
}

const updateList = (userid, userData = {}) => {
  const name = userData.name;
  const telephone = userData.telephone;
  const mail = userData.mail;
  const address = userData.address;
  let sql = `update users set name=${name},telephone=${telephone},mail=${mail},address=${address} where userid=${userid}`;
  return exec(sql).then(updateData => {
    if (updateData.affectedRows > 0) {
      return true;
    }
    return false;
  })
}
const delList = (userid) => {
  const sql = `delete from users where userid=${userid}`;
  return exec(sql).then(delData => {
    if (delData.affectedRows > 0) {
      return true;
    }
    return false;
  })
}

module.exports = {
  ifExist,
  login,
  getList,
  register,
  updateList,
  delList,
  updateSession
}