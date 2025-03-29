//index.js

const express = require('express');
const app = express();
const cors = require('cors');
const { Pool } = require('pg');
const dotenv = require('dotenv').config();

// Create pool
const pool = new Pool({
      user: process.env.PSQL_USER,
      host: process.env.PSQL_HOST,
      database: process.env.PSQL_DATABASE,
      password: process.env.PSQL_PASSWORD,
      port: process.env.PSQL_PORT,
      ssl: {rejectUnauthorized: false}
  });
  
  // Add process hook to shutdown pool
  process.on('SIGINT', function() {
      pool.end();
      console.log('Application successfully shutdown');
      process.exit(0);
  });

app.use(cors())

app.get('/', (req, res) => {
      res.send('Hello from our server!')
})

app.get('/user', (req, res) => {
      teammembers = []
      pool
          .query('SELECT * FROM teammembers;')
          .then(query_res => {
              for (let i = 0; i < query_res.rowCount; i++){
                  teammembers.push(query_res.rows[i]);
              }
              const data = {teammembers: teammembers};
              console.log(teammembers);
              res.send(data);        
          });
  });

app.listen(8080, () => {
      console.log('server listening on port 8080')
})