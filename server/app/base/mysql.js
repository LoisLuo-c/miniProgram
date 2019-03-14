var mysql = require('mysql');
var config = require('./default.js')

var pool  = mysql.createPool({
  host     : config.database.HOST,
  user     : config.database.USERNAME,
  password : config.database.PASSWORD,
  database : config.database.DATABASE
});

//查询数据库
let query = function( sql, values ) {

  return new Promise(( resolve, reject ) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        reject( err )
      } else {
        connection.query(sql, values, ( err, rows) => {

          if ( err ) {
            reject( err )
          } else {
            resolve( rows )
          }
          connection.release()
        })
      }
    })
  })

}

//用户字段
let users =
    `create table if not exists users(
     id INT NOT NULL AUTO_INCREMENT,
     username VARCHAR(100) NOT NULL,
     passward VARCHAR(100) NOT NULL,
     moment VARCHAR(100) NOT NULL,
     avator VARCHAR(100),
     token VARCHAR(100),
     PRIMARY KEY ( id )
    );`



let createTable = function( sql ) {
  return query( sql, [] )
}

// 建表
createTable(users)

// 注册用户
let insertData = function( value ) {
  let _sql = "insert into users set?"
  return query( _sql, value )
}
// 删除用户
let deleteUserData = function( name ) {
  let _sql = `delete from users where name="${name}";`
  return query( _sql )
}
// 查找用户
let findUserData = function( name ) {
  let _sql = `select * from users where name="${name}";`
  return query( _sql )
}
// 通过名字查找用户
let findDataByName = function ( name ) {
  console.log(name)
  let _sql = `select * from users where name="${name}";`
  return query( _sql)
}


module.exports = {
    query,
    createTable,
    insertData,
    deleteUserData,
    findUserData,
    findDataByName
    
}