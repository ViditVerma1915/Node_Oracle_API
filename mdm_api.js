const express = require('express');
const bodyParser = require('body-parser')
const app = express()
const port = 8000
var oracledb = require('oracledb');

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

  //-----MDM_Business Unit Master
  app.post('/MDM_Business_Unit_Master',function(req, res){
    oracledb.getConnection(connAttrs, function (err, connection) {
       
        connection.execute("", {}, {
            outFormat: oracledb.OBJECT // Return the result as Object
        }, function (err, result) {
            if (err) {
                throw err
              }
              response.status(200).json(result.rows)   
                
        });
    });

  });

  //-----MDM_Currency Master
  app.post('/MDM_Currency_Master',function(req, res){
    oracledb.getConnection(connAttrs, function (err, connection) {
       
        connection.execute("", {}, {
            outFormat: oracledb.OBJECT // Return the result as Object
        }, function (err, result) {
            if (err) {
                throw err
              }
              response.status(200).json(result.rows)   
                
        });
    });

  });

  //-----MDM_ User_Master
  app.post('/MDM_ User_Master',function(req, res){
    oracledb.getConnection(connAttrs, function (err, connection) {
       
        connection.execute("", {}, {
            outFormat: oracledb.OBJECT // Return the result as Object
        }, function (err, result) {
            if (err) {
                throw err
              }
              response.status(200).json(result.rows)   
                
        });
    });

  });

  //-----MDM_GL account
  app.post('/MDM_GL_account',function(req, res){
    oracledb.getConnection(connAttrs, function (err, connection) {
       
        connection.execute("", {}, {
            outFormat: oracledb.OBJECT // Return the result as Object
        }, function (err, result) {
            if (err) {
                throw err
              }
              response.status(200).json(result.rows)   
                
        });
    });

  });

  //-----MDM_Place of supply
  app.post('/MDM_Place_of_supply',function(req, res){
    oracledb.getConnection(connAttrs, function (err, connection) {
       
        connection.execute("", {}, {
            outFormat: oracledb.OBJECT // Return the result as Object
        }, function (err, result) {
            if (err) {
                throw err
              }
              response.status(200).json(result.rows)   
                
        });
    });

  });

  //-----MDM_Tax code 
  app.post('/MDM_Tax_code',function(req, res){
    oracledb.getConnection(connAttrs, function (err, connection) {
       
        connection.execute("", {}, {
            outFormat: oracledb.OBJECT // Return the result as Object
        }, function (err, result) {
            if (err) {
                throw err
              }
              response.status(200).json(result.rows)   
                
        });
    });

  });

  //-----MDM_ TDS details
  app.post('/MDM_ TDS_details',function(req, res){
    oracledb.getConnection(connAttrs, function (err, connection) {
       
        connection.execute("", {}, {
            outFormat: oracledb.OBJECT // Return the result as Object
        }, function (err, result) {
            if (err) {
                throw err
              }
              response.status(200).json(result.rows)   
                
        });
    });

  });

  //-----MDM_Vendor Master
  app.post('/MDM_Vendor_Master',function(req, res){
    oracledb.getConnection(connAttrs, function (err, connection) {
       
        connection.execute("", {}, {
            outFormat: oracledb.OBJECT // Return the result as Object
        }, function (err, result) {
            if (err) {
                throw err
              }
              response.status(200).json(result.rows)   
                
        });
    });

  });

  app.listen(port, () => {
    console.log(`App running on port ${port}.`) //8000
  })