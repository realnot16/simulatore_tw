const mysql = require("mysql");
var con 
exports.dbConnection = function () {
    // Config  database credential
    con = mysql.createConnection({
      user: 'admin',
      password: 'temporanea123',
      host: 'test.cnq4meg666fn.eu-west-1.rds.amazonaws.com',
      port     : '3306',
      database: "tribals"
  });

  return new Promise((resolve,reject)=>{
    con.connect(function(err) {
      if (err){
        console.log("problem: "+err)
        return reject(err)
      } 
      else {
        console.log("connected")
        return resolve()
      }
      //console.log('Data fetched:', records);
    });
  });
}


//GET BUILDING INFO
exports.getBuilding = function (level,name){
  var query ="select * from Buildings WHERE Level="+level+" and Name='"+name+"';"
  return new Promise((resolve,reject)=>{
    con.query(query, (err, records) => {
      if (err){
        console.log("problem: "+err)
        return reject(err)
      } 
      else {
        console.log("db building call success")
        return resolve(records[0])
      }
      //console.log('Data fetched:', records);
    });
  });
}

//GET TROOP INFO
exports.getTroop = function (name){
  var query ="select * from Unit WHERE Name='"+name+"';"
  return new Promise((resolve,reject)=>{
    con.query(query, (err, records) => {
      if (err){
        console.log("problem: "+err)
        return reject(err)
      } 
      else {
        console.log("db troop call success")
        return resolve(records[0])
      }
      //console.log('Data fetched:', records);
    });
  });
}



exports.dbData = function () {
    var query ='select * from Buildings'
      // Query to the database and get the records
    
    return new Promise((resolve,reject)=>{
      con.query(query, (err, records) => {
        if (err){
          console.log("problem: "+err)
          return reject(err)
        } 
        else {
          console.log("made this far "+ records)
          return resolve(records[0].hexcode)
        }
        //console.log('Data fetched:', records);
      });
    });

}
