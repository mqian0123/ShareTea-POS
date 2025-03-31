//index.js
const cashierRoutes = require('./routes/cashier');
const managerRoutes = require('./routes/manager')

const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv').config();

const pool = require('./db/db'); // Import database connection


  
  // Add process hook to shutdown pool
  process.on('SIGINT', function() {
      pool.end();
      console.log('Application successfully shutdown');
      process.exit(0);
  });

app.use(cors())
app.use(express.json());  // This is required to parse the request body

app.get('/', (req, res) => {
      res.send('Hello from our server!')
})

app.use('/cashier', cashierRoutes);
app.use('/manager', managerRoutes);


app.listen(10000, () => {
      console.log('server listening on port 10000')
})