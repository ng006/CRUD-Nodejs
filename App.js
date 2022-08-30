const express = require("express");
const app = express();
const port = 3000;
const mysql = require("./connection").con;


//configuration
app.set("view engine", "hbs");
app.set("views","./view")

//Routing

app.get("/", (req,res) => {
    res.render("");
});

app.get("/add", (req,res) => {
    res.render("Add");
});

app.get("/view", (req,res) => {
    let qry = "select * from empinfo";
    mysql.query(qry,(err, results) => {
       if(err) throw err
       else{
        res.render("view", {data: results});
       }
    })
});

app.get("/update", (req,res) => {
    res.render("update");
});

app.get("/delete", (req,res) => {
    res.render("delete");
});

//Add Student Data

app.get("/addStudent", (req, res) => {
    // fetching data from form

    const {EmpId, EmpName, Designation, ManagerId, Department} = req.query;

    // Sanitization XSS...
    let qry = "select * from empinfo where EmpId=?"    
    mysql.query(qry,[EmpId], (err,result) => {
      if (err)
       throw err;
      else {
        if(result.length>0){
            res.render("add", {checkmsg: true})
        }
        else{
            let qry2 = "insert into empinfo value(?,?,?,?,?)";
            mysql.query(qry2,[EmpId,EmpName,Designation,ManagerId,Department], (err,result) =>{
                if (result.affectedRows > 0) {
                    res.render("add", { mesg: true })
                }
            })
        }
      }
    })
});

//Update Employee Data

app.get("/updateStudent", (req, res) => {

    const { EmpId } = req.query;

    let qry = "select * from empinfo where EmpId=?";
    mysql.query(qry, [EmpId], (err, results) => {
        if (err) throw err
        else {
            if (results.length > 0) {
                res.render("update", { mesg1: true, mesg2: false, data: results })
            } else {

                res.render("update", { mesg1: false, mesg2: true })

            }

        }
    });
})

//Delete User From The Database

app.get("/removestudent", (req, res) => {

    // fetch data from the form


    const { EmpId } = req.query;

    let qry = "delete from empinfo where EmpId=?";
    mysql.query(qry, [EmpId], (err, results) => {
        if (err) throw err
        else {
            if (results.affectedRows > 0) {
                res.render("delete", { mesg1: true, mesg2: false })
            } else {

                res.render("delete", { mesg1: false, mesg2: true })

            }

        }
    });
});


//Create Server
app.listen(port,(err) =>{
    if(err)
     throw err
    else
     console.log("Server is running at post no", port)
});