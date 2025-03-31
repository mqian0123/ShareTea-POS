const express = require('express');
const pool = require('../db/db'); // Import database connection


const router = express.Router();

// add order
router.post('/addOrder', async (req, res) => {
    const { time, payment, points, cost, customerID, employeeID, orderIDList, menuIDList } = req.body;
    try {
        await pool.query(
            'INSERT INTO orders (time_stamp, payment_method, reward_points_earned, total_cost, customer_id, employee_id) VALUES ($1::TIMESTAMP, $2, $3, $4, $5, $6)',
            [time, payment, points, cost, customerID, employeeID]
        );

        for (let i=0; i < orderIDList.length; i++) {
            await pool.query(
                'INSERT INTO JUNCT_order_items (order_id, menu_id) VALUES ($1, $2)',
                [orderID, menuID]
            );
        }


        
        res.json(result.rows[0]);
    
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});



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


// const apiCall = () => {
//     axios.get('http://localhost:8080/user').then((data) => {
//     const data = {
//         name: "BLAHBLHBALBHALBHAHBABHBL",
//         role: "Developer",
//         phone_number: "dingus",
//         email: "dingus@email.com"
//     }
//     axios.post('http://localhost:8080/cashier/employees', data).then((data) => {
//       //this console.log will be in our frontend console
//       console.log(data)
//     })



// const newOrder = new Order(
//     '2025-03-31 10:00:00',
//     'Credit Card',
//     100,
//     50.00,
//     1,
//     2
// );

// const additionalData = {
//     discount: 10,  // Extra parameter
//     notes: "Urgent delivery" // Extra parameter
// };

// fetch('http://localhost:5000/addOrder', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//         order: newOrder,  // Send the class instance as part of request body
//         ...additionalData  // Include extra parameters
//     })
// })
// .then(response => response.json())
// .then(data => console.log('Success:', data))
// .catch(error => console.error('Error:', error));


// const express = require('express');
// const Order = require('./Order'); // Import the Order class
// const pool = require('./db'); // Database connection
// const router = express.Router();

// router.post('/addOrder', async (req, res) => {
//     try {
//         const { order, discount, notes } = req.body; // Extract order and extra params

//         // Convert the received JSON object back into an Order instance
//         const newOrder = new Order(
//             order.time,
//             order.payment,
//             order.points,
//             order.cost,
//             order.customerID,
//             order.employeeID
//         );

//         console.log("Received Order:", newOrder);
//         console.log("Additional Data - Discount:", discount, "Notes:", notes);

//         // Insert into database (example: apply discount to total cost)
//         const result = await pool.query(
//             'INSERT INTO orders (time_stamp, payment_method, reward_points_earned, total_cost, customer_id, employee_id, notes) VALUES ($1::TIMESTAMP, $2, $3, $4, $5, $6, $7) RETURNING *',
//             [newOrder.time, newOrder.payment, newOrder.points, newOrder.cost - discount, newOrder.customerID, newOrder.employeeID, notes]
//         );

//         res.json({ message: 'Order added successfully', order: result.rows[0] });

//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// module.exports = router;
