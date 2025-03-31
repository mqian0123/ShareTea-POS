const express = require('express');
const pool = require('../db/db'); // Import database connection


const router = express.Router();

// Get all employees
router.get('/employees', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM employees');
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Add an employee
router.post('/employees', async (req, res) => {
    const { name, role, phone_number, email } = req.body;
    try {
      const result = await pool.query(
        'INSERT INTO employees (name, role, phone_number, email) VALUES ($1, $2, $3, $4) RETURNING *',
        [name, role, phone_number, email]
      );
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});
  
  module.exports = router;


// view employees