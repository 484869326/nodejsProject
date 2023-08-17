const { exec,escape } = require('../db/mysql');
const getCurrentTime = require("../util/timeConversion");

const updateList=(orderid)=>{
  let sql = `update orders set state=1 where orderid=${orderid}`;
  return exec(sql).then(updateData=>{
      if(updateData.affectedRows>0){
          return true;
      }
      return false;
  })
}

const getList =async (userid) => {
  let orderListSql=`select * from orders where 1=1 `;
  if(userid){
    orderListSql+=`and userid=${userid}`;
  }
  let orderList=await exec(orderListSql);
  orderList=Promise.all(orderList.map(async item=>{
    let orderid=item.orderid;
    let sql = `select * from orderproduct,good where orderid=${orderid} and orderproduct.goodid=good.goodid`
    let goodList=await exec(sql);
    item.goodList=goodList;
    return item;
  }))
 
  return orderList;
}
const insertList =async  (userid, orderData = {}) => {
  const price = orderData.price;
  const orderid = userid.toString() + Date.now();
  const currentTime=escape(getCurrentTime());
  const cart=JSON.parse(orderData.cart);
  let orderSql = `insert into orders values(${orderid},${currentTime},${userid},${price},0)`;
  let result=await exec(orderSql);
  if(result.affectedRows > 0){
    cart.map(async item=>{
      let orderProSql = `insert into orderproduct values(${orderid},${item.goodid},${item.number})`;
      let deleteCartSql = `delete from cart where goodid=${item.goodid} and userid=${userid}`;
      await exec(orderProSql);
      await exec(deleteCartSql);
    })
    return true;
  }else{
    return false;
  }
}


module.exports = {
  getList,
  insertList,
  updateList
}