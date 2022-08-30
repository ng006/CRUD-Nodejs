const sql = require('mssql');                //import
const express= require('express');           // import
const { response } = require('express');
const app=express();                         // import
const path= require('path');
var bodyParser= require(body-Parser);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


var config = {                          // variable  config will  contain configuration 
    user :'sa' ,                         // of  data base
    password : 'Avdhesh@123' ,
    server : 'AVDHESHLAPTOP\\SQLEXPRESS',
    database : 'company',
    options: {
        encrypt : false,
        useUTC : true,
    }
}
// now  i  will call connect function of  sql
sql.connect(config,function(err){
    if(err)console.log(err)
    else  console.log("connection is successful.")
})
app.listen(8080, function(err){
    if(!err)
    console.log("listening at port 8080")
    else console.log(err);
})
//now  create end points

app.get('/index.html',(request,response) =>{
    response.sendFile(path.join(__dirname+'/index.html'));
})

app.get('/add.html',(request,response) =>{
    response.sendFile(path.join(__dirname+'/add.html'));
})


app.get('/update.html',(request,response) =>{
    response.sendFile(path.join(__dirname+'/update.html'));
})

app.get('/delete.html',(request,response) =>{
    response.sendFile(path.join(__dirname+'/delete.html'));
})



app.get('/studentsget/:id',function(request,response )            //trying to access university  database and students  table
{                                                           // withh end point  studentsget
    sql.query('select * from employee where Emp_Id= '+
    [request.params.id],function(recordset,err)                  // if fN  is resolved iwill get  records,  if not resolved  then i would get error
    {
        if(err) console.log(err)
        else
        response.send(recordset);
    } )
})

app.post('/add',(request,response)=> {
    const {Emp_Id,Emp_name,Designation,MgrId,Department_Id } = request.body
    var req= new sql.Request();
    req.query("insert into employee values ('"+Emp_Id+"','"+Emp_name+"' ,'"+Designation+"' ,'"+MgrId+"','"+Department_Id+"')",function(recordset,err)                  // if fN  is resolved iwill get  records,  if not resolved  then i would get error
    {
        if(err) console.log(err);
        else
        response.send("data is inserted");
        response.redirect("../");
    });
})

app.post('/update',(request,response)=> {
    const {Emp_Id,Emp_name,Designation,MgrId,Department_Id } = request.body
    var req= new sql.Request();
    req.query("update employee set Emp_name ='"+empname+"',Emp_Id = '"+empid+"', Department_Id='"+deptid+"',Designation= '"+ designation+"', MgrId='"+managerid+"' ",
     (recordset,err) =>{
    if(err) console.log(err);
    else response.send("updated");
    response.redirect("../");
    
    })

})

app.post('/delete/:id',(request,response)=> {
    const {Emp_Id} = request.body
    var req= new sql.Request();
    req.query(
    "delete from employee where Emp_Id= '"+empid+"'" , function(recordset,err){
    if(err) console.log(err);
    else response.send("Record deleted");
    
    })

})



app.post('/add.html', function(req,res, next){
    var empid = req.body.empid;
    var empName = req.body.empName;
    var designation = req.body.designation;
    var salary = req.body.salary;
    var deptId = req.body.deptId;
    var mgrID = req.body.mgrID;
    var sqlserver= `INSERT INTO employee VALUES('${empid}', '${empName}', '${designation}','${salary}','${deptId}','${mgrID}')`;
    sql.query(sqlserver, function(err, result){
        if(err) throw err;
        console.log("record inserted");
        // alert("Record Inserted..");
        res.redirect('/');
    });
});



//2:31   se padhna hai  2 july  ka video  post req   only  15 min left

/*     
app.get('/employee',(request,response)=>
{
    var req = new sql.Request();
    req.query('select * from employee',function(recordset,err)
    {
        if(err) console.log(err);
        else
        response.send(recordset);

    });
})



app.get('employee/:id',(request,response)=>
{
    var req = new sql.Request();
    req.query('select * from employee where employee_id= '+
    [request.params.id],function(recordset,err)
    {
        if(err) console.log(err);
        else
        response.send(recordset);

    });

})



app.get('/insert',(request,response)=>
{
    var req = new sql.Request();
    req.query("insert into employee values(503, 'Rahul','Developer')",function(recordset,err)
    {
        if(err) console.log(err);
        else
        response.send("data is inserted");

    });

})



 */




