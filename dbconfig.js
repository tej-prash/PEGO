var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  port: 3306,
  database:'pego'
});
 //Setup a connection
 con.connect(function (err) {
  if (err){
    res.status(400).send('Error in connecting');
  }
  console.log("Connected!");
  });

module.exports=con;