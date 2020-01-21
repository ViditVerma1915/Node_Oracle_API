const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 8000
var oracledb = require('oracledb');
var auth = require('basic-auth');

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
// connection
var connAttrs = {
    user          : "system",
    password      : "oracle123",
    connectString : "orcl"
    // host: 'localhost',
    // database: 'awc',
    // port: 1521,
  }

const fs = require('fs');
var rawdata = fs.readFileSync('config.json');
var student = JSON.parse(rawdata);
var auth = require('basic-auth');

//CHECK AUTHENTICATION OF USER
 function checkUser (name, pass){
  for(var i=0;i<student.users.length;i++)
  {
    if (student.users[i].name==name && student.users[i].pwd==pass)
    {   
        console.log(student.users[i].name+" Exists");
        return true;
    }
  }
      console.log("Check Username and Password")
      return false;
}

//GET USER DETAILS
app.get('/users', (request, response) => {
    var credentials = auth(request)
    const vname = credentials.name;
    const vpwd = credentials.pass;
    var userAuth = checkUser(vname,vpwd);
  
   if(userAuth){
    oracledb.getConnection(connAttrs, function (err, connection) {
       
        connection.execute("SELECT * FROM thermax", {}, {
            outFormat: oracledb.OBJECT // Return the result as Object
        }, function (err, result) {
            if (err) {
                throw err
              }
              response.status(200).json(result.rows)   
                
        });
    });
  }else{
    response.status(403).send('WRONG CREDENTIALS');
  }
});

// READ USERS w.r.t ID
app.get('/users/:id', function (req, res) {
    "use strict";
    var credentials = auth(request)
    const vname = credentials.name;
    const vpwd = credentials.pass;
    var userAuth = checkUser(vname,vpwd);
  
   if(userAuth){
    oracledb.getConnection(connAttrs, function (err, connection) { 
        connection.execute("SELECT * FROM thermax where id=:id",  [req.params.id], {
            outFormat: oracledb.OBJECT // Return the result as Object
        }, function (err, result) {
            if (err) {
                throw err
              }
              res.status(200).send(JSON.stringify(result.rows));    
        });
    });
}else{
    response.status(403).send('WRONG CREDENTIALS');
  }
  });

  // CREATE USERS
app.post('/users', function (req, res) {
    "use strict";
    var credentials = auth(req)
    const vname = credentials.name;
    const vpwd = credentials.pass;
    var userAuth = checkUser(vname,vpwd);
  
   if(userAuth){
    oracledb.getConnection(connAttrs, function (err, connection) { 
        const { id,name, city } = req.body;
        connection.execute("INSERT INTO thermax VALUES(:id,:name, :city) ", [id,name, city], {
            autoCommit: true,
            outFormat: oracledb.OBJECT // Return the result as Object
        }, function (err, result) {
            if (err) {
                throw err
              }
              res.send(JSON.stringify({
                 status:'Created User'
              }));
              res.end(); 
        });
    });
}else{
    res.status(403).send('WRONG CREDENTIALS');
  }
  });

// Update users w.r.t ID
app.put('/users/:id', function (req, res) {
    "use strict";
    var credentials = auth(req)
    const vname = credentials.name;
    const vpwd = credentials.pass;
    var userAuth = checkUser(vname,vpwd);
  
   if(userAuth){
    oracledb.getConnection(connAttrs, function (err, connection) {
        var id=req.params.id;
        const {name, city } = req.body;   
        connection.execute("update thermax set name=:name,city=:city where id=:id", [name, city,id], {
            autoCommit: true,
            outFormat: oracledb.OBJECT // Return the result as Object
        }, function (err, result) {
            if (err) {
                throw err
              }
              res.send(JSON.stringify({
                 status:'Updated User'
              }));
              res.end(); 
        });
    });
}else{
    res.status(403).send('WRONG CREDENTIALS');
  }
  });

//Delete USERS w.r.t ID
  app.delete('/users/:id', function (req, res) {
    "use strict";
    var credentials = auth(req)
    const vname = credentials.name;
    const vpwd = credentials.pass;
    var userAuth = checkUser(vname,vpwd);
  
   if(userAuth){
    oracledb.getConnection(connAttrs, function (err, connection) {
        var id=req.params.id;
        connection.execute("delete from thermax where id=:id", [id], {
            autoCommit: true,
            outFormat: oracledb.OBJECT // Return the result as Object
        }, function (err, result) {
            if (err) {
                throw err
              }
              res.send(JSON.stringify({
                 status:'Deleted User'
              }));
              res.end(); 
        });
    });
}else{
    res.status(403).send('WRONG CREDENTIALS');
  }
  });

app.listen(port, () => {
    console.log(`App running on port ${port}.`) //8000
  })