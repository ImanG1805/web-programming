const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',       
  user: 'root',            
  password: 'kimlez123456',
  
  database: 'skincaare_blog' 
  
});

/

module.exports = pool.promise();
