var express = require('express');

var mysql = require('mysql2');

var app = express();
  
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "#gominho123",
    database: "gagainsano"
});
  
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.get('/', (req, res) => {res.send("Gominho fofinho!")});
app.listen(3030);
