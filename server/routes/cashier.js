const express = require('express');
const pool = require('../db/db'); // Import database connection


const router = express.Router();


// item struct holds: 
// const newItem = {
//   name: name,
//   menuID: menuID,
//   price: price,
//   img: img,
//   quantity: 1,
//   toppings: toppingsList,
//   teaType: selectedTeaType,
//   iceLevel: selectedIceLevel,
//   sugarLevel: selectedSugarLevel,
//   total: price
// };


// testing get quantity used
router.get('/qUsed', async (req, res) => {
  try {
    const ingredients = []
    const result = await pool.query(
      'SELECT inventory_id FROM JUNCT_inventory_items WHERE menu_id = $1',
      [48]
    );
    result.rows.forEach(element => {
      ingredients.push(element['inventory_id'])
    });
    console.log(ingredients)

    res.json(result.rows);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// testing getOrderID
router.get('/orderID', async (req, res) => {
  try {
    const result = await pool.query('SELECT MAX(order_id) FROM orders');
    res.json(result.rows);
    console.log(result.rows[0]['max']);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// add order
router.post('/addOrder', async (req, res) => {
    const { time, payment, points, cost, customerID, employeeID, orderList } = req.body;
    let orderID = -1;
    try {

        // get current orderID
        const result = await pool.query(
          'SELECT MAX(order_id) FROM orders'
        );
        orderID = result.rows[0]['max'] + 1 // current order ID = max orderID + 1

        // console.log("orderID: " + orderID);
        // console.log("orderList length: " + orderList.length)
        // console.log("name: " + orderList[0]['name'])
        // console.log("price: " + orderList[0]['price'])
        // console.log("toppings?: " + orderList[0]['toppings'])
        // console.log()

        await pool.query(
            'INSERT INTO orders (time_stamp, payment_method, reward_points_earned, total_cost, customer_id, employee_id) VALUES ($1::TIMESTAMP, $2, $3, $4, $5, $6)',
            [time, payment, points, cost, customerID, employeeID]
        );

        ///// VERIFIED UP TO HERE ////

        // Parse through orderList, each element is a menu item
        for (let i=0; i < orderList.length; i++) {
          
            // const menuID = orderList[i]['menuID']
            // just get the menuID from database based on name
            const menuResult = await pool.query(
              'SELECT * FROM menu_items WHERE name=$1',
              [orderList[0]['name']]
            );

            const menuID = menuResult.rows[0]['menu_id']
            
            // increment total purchases in menu_items table
            
            
            // ISSUE 1: orderList does not contain menuID
            // console.log("menuID: " + menuID)

            // update JUNCT_order_items
            await pool.query(
                'INSERT INTO JUNCT_order_items (order_id, menu_id) VALUES ($1, $2)',
                [orderID, menuID]
            );

            // update toppings total_times_ordered for current menu item
            let toppingsList = orderList[i]['toppings']
            for(let j=0; j < toppingsList.length; j++) {
              // updates total_times_ordered
              const name = toppingsList[j]
              // console.log("topping name : " + name)
              await pool.query(
                'UPDATE toppings SET total_times_ordered = total_times_ordered + 1 WHERE name = $1',
                [name]
              );

              // get amount used per request
              const result2 = await pool.query(
                'SELECT amount_per_request FROM toppings WHERE name = $1',
                [name]
              );
              let amountUsed = result2.rows[0]['amount_per_request']

              // reduce inventory quantity for each topping
              await pool.query(
                'UPDATE inventory SET quantity = quantity - $1 WHERE name = $2',
                [amountUsed, name]
              );
            }

            // VERIFIED UP TO HERE

            // TODO: Deal with ice and sugar

            // update inventory for menu item ingredients
            const inventoryResult = await pool.query(
              'SELECT inventory_id FROM JUNCT_inventory_items WHERE menu_id = $1',
              [menuID]
            );
            inventoryResult.rows.forEach(async element => {
              const inventoryID = element['inventory_id']
              
              const result1 = await pool.query(
                'SELECT quantity_used_per_menu_item FROM JUNCT_inventory_items WHERE inventory_id = $1 AND menu_id = $2',
                [inventoryID, menuID]
              );
              const quantityUsed = result1.rows[0]['quantity_used_per_menu_item'];
              await pool.query(
                'UPDATE inventory SET quantity = quantity - $1 WHERE inventory_id = $2',
                [quantityUsed, inventoryID]
              );
            });

        }


        

        

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
