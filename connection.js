const mysql = require("mysql")

const con  = mysql.createConnection({
 host: "localhost",
 database: "employee",
 user: "root",
 password:""
});

con.connect((err) =>{
    if(err) 
    throw err;
    console.log("Connection Create...")
});
 
module.exports.con = con;