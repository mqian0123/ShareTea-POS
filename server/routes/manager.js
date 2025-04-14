const express = require('express');
const pool = require('../db/db'); // Import database connection
const router = express.Router();



// API CALLS FOR MANAGER VIEWS

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// API CALLS FOR DASHBOARD

//get the total revenue in the last month
router.get('/monthly-revenue', async (req, res) => {
    try {
        const revenueQuery = `
            SELECT SUM(total_cost) AS total_cost
            FROM orders
            WHERE time_stamp >= NOW() - INTERVAL '1 month';
        `;

        const result = await pool.query(revenueQuery);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//get the number of orders in the last month
router.get('/monthly-orders', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT COUNT(*) AS total_orders
            FROM orders
            WHERE time_stamp >= NOW() - INTERVAL '1 month';
        `);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//get the top employee in the last month (by number of orders handled)
router.get('/top-employee', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT e.name, COUNT(*) AS orders_handled
            FROM orders o
            JOIN employees e ON o.employee_id = e.employee_id
            WHERE o.time_stamp >= NOW() - INTERVAL '1 month'
            GROUP BY e.employee_id, e.name
            ORDER BY orders_handled DESC
            LIMIT 1;
        `);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//get the payment methods used in the last year and their counts (cash vs card)
router.get('/payment-methods', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT payment_method, COUNT(*) AS count
            FROM orders
            WHERE time_stamp >= NOW() - INTERVAL '1 year'
            GROUP BY payment_method;
        `);

        // Reshape the result into a simple object like { cash: 50, card: 80 }
        const data = {};
        result.rows.forEach(row => {
            data[row.payment_method.toLowerCase()] = parseInt(row.count);
        });

        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//get the total sales for each month in the current year (in $USD)
router.get('/monthly-sales', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT
                TO_CHAR(DATE_TRUNC('month', time_stamp), 'Mon') AS month,
                DATE_PART('month', time_stamp) AS month_num,
                SUM(total_cost) AS total
            FROM orders
            WHERE time_stamp >= DATE_TRUNC('year', CURRENT_DATE)
            GROUP BY month, month_num
            ORDER BY month_num;
        `);

        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// API CALLS FOR EMPLOYEE

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
  

// Update an employee by ID
router.patch('/employees/:id', async (req, res) => {
    const { id } = req.params;
    const { name, role, phone_number, email } = req.body;
    try {
        const result = await pool.query(
            'UPDATE employees SET name = COALESCE($1, name), role = COALESCE($2, role), phone_number = COALESCE($3, phone_number), email = COALESCE($4, email) WHERE employee_id = $5 RETURNING *',
            [name, role, phone_number, email, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Delete an employee by ID
router.delete('/employees/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            'DELETE FROM employees WHERE employee_id = $1 RETURNING *',
            [id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.json({ message: 'Employee deleted successfully', deletedEmployee: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get an employee by ID
router.get('/employees/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            'SELECT * FROM employees WHERE employee_id = $1',
            [id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.json({ message: 'Employee GET successfully', deletedEmployee: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// API CALLS FOR MENU


// Get all menu items
router.get('/menu', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM menu_items');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Add a menu item
router.post('/menu', async (req, res) => {
    const { name, price, category } = req.body;
    console.log('Incoming menu item:', req.body);

    try {
        const result = await pool.query(
            'INSERT INTO menu_items (name, price, total_purchases, category) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, price, 0, category]
        );
        res.json(result.rows[0]);
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update a menu item by ID
router.patch('/menu/:id', async (req, res) => {
    const { id } = req.params;
    const { name, price, total_purchases, category } = req.body;
    try {
        const result = await pool.query(
            'UPDATE menu_items SET name = COALESCE($1, name), price = COALESCE($2, price), total_purchases = COALESCE($3, total_purchases), category = COALESCE($4, category) WHERE menu_id = $5 RETURNING *',
            [name, price, total_purchases, category, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Menu item not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete a menu item by ID
router.delete('/menu/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            'DELETE FROM menu_items WHERE menu_id = $1 RETURNING *',
            [id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Menu item not found' });
        }
        res.json({ message: 'Menu item deleted successfully', deletedItem: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get menu item by ID
router.get('/menu/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            'SELECT * FROM menu_items WHERE menu_id = $1',
            [id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Menu item not found' });
        }
        res.json({ message: 'Menu item retrieved successfully', menuItem: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// API CALLS FOR HANDLING INGREDIENTS FOR EACH MENU ITEM

router.delete('/menu/ingredients/:id', async (req, res) => {
    const { id } = req.params;
    const { inventory_ids } = req.body;
    // const inventory_ids = [6, 11, 1, 14];

    if (!Array.isArray(inventory_ids) || inventory_ids.length === 0) {
        return res.status(400).json({ error: 'inventory_ids must be a non-empty array' });
    }

    // Build parameter placeholders for inventory_ids: $2, $3, ...
    const placeholders = inventory_ids.map((_, i) => `$${i + 2}`).join(', ');
    const query = `
        DELETE FROM junct_inventory_items WHERE menu_id = $1 AND inventory_id IN (${placeholders}) RETURNING *;
    `;
    const params = [id, ...inventory_ids];

    try {
        const result = await pool.query(query, params);
        res.status(200).json({ deleted: result.rowCount, rows: result.rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
});


//adds ingredient lists for menu_id with menu id
router.post('/menu/ingredients/:id', async (req, res) => {
    const { id } = req.params;
    const { inventory_names } = req.body;

    if (!Array.isArray(inventory_names) || inventory_names.length === 0) {
        return res.status(400).json({ error: 'inventory_names must be a non-empty array' });
    }

    try {
        // 1. Lookup IDs from names
        const resultIds = await pool.query(
            `SELECT id FROM inventory_items WHERE name = ANY($1::text[])`,
            [inventory_names]
        );

        const inventory_ids = resultIds.rows.map(row => row.id);

        if (inventory_ids.length !== inventory_names.length) {
            return res.status(400).json({ error: 'Some ingredient names were not found' });
        }

        // 2. Insert into junction table
        const values = inventory_ids.map((_, index) => `($1, $${index + 2}, 1.00)`).join(', ');
        const params = [id, ...inventory_ids];

        const insertResult = await pool.query(
            `INSERT INTO junct_inventory_items (menu_id, inventory_id, quantity_used_per_menu_item) VALUES ${values} RETURNING *`,
            params
        );

        res.status(201).json(insertResult.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
});

//gets the list of ingredients for a menu item with menu_id = id
router.get('/menu/ingredients/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            'SELECT menu_id, inventory.inventory_id, name FROM junct_inventory_items INNER JOIN inventory ON junct_inventory_items.inventory_id = inventory.inventory_id WHERE menu_id = $1',
            [id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Menu item not found' });
        }
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// API CALLS FOR INVENTORY

// Get all inventory items
router.get('/inventory', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM inventory');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Add a menu item
router.post('/inventory', async (req, res) => {
    const { name, quantity} = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO inventory (name, quantity) VALUES ($1, $2) RETURNING *',
            [name, quantity]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update a inventory item by ID
router.patch('/inventory/:id', async (req, res) => {
    const { id } = req.params;
    const { name, quantity} = req.body;
    try {
        const result = await pool.query(
            'UPDATE inventory SET name = COALESCE($1, name), quantity = COALESCE($2, quantity) WHERE inventory_id = $3 RETURNING *',
            [name, quantity, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Inventory item not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete a inventory item by ID
router.delete('/inventory/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            'DELETE FROM inventory WHERE inventory_id = $1 RETURNING *',
            [id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'inventory item not found' });
        }
        res.json({ message: 'inventory item deleted successfully', deletedItem: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get inventory item by ID
router.get('/inventory/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            'SELECT * FROM inventory WHERE inventory_id = $1',
            [id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'inventory item not found' });
        }
        res.json({ message: 'inventory item retrieved successfully', inventoryItem: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// API CALLS FOR REPORTS

//credit get
router.get('/credit', async (req, res) => {
    try {
        const numCardResult = await pool.query("SELECT COUNT(*) AS count FROM orders WHERE payment_method = 'card'");
        const totalResult = await pool.query('SELECT COUNT(*) AS count FROM orders');

        const numCard = parseInt(numCardResult.rows[0].count, 10);
        const total = parseInt(totalResult.rows[0].count, 10);
        
        const ratio = total !== 0 ? numCard / total : 0; // Avoid division by zero

        res.json({ratio});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


//Inventory usage 
router.get('/inventory-usage', async (req, res) => {
    try {
        const { timeframe } = req.query;

        // Default to 1 week
        const validTimeframes = {
            day: '1 day',
            week: '1 week',
            month: '1 month',
            year: '1 year'
          };
          
          const tf = (timeframe || '').toLowerCase();
          const interval = validTimeframes[tf] || '1 week';

          console.log('Received timeframe:', timeframe);
          console.log('Using interval:', interval);
          
          const usageQuery = `
                    SELECT
                        i.inventory_id,
                        i.name,
                        i.quantity,
                        COUNT(*) AS usage_count
                    FROM orders o
                    JOIN junct_order_items joi_menu ON o.order_id = joi_menu.order_id
                    JOIN junct_inventory_items joi ON joi_menu.menu_id = joi.menu_id
                    JOIN inventory i ON joi.inventory_id = i.inventory_id
                    WHERE o.time_stamp >= NOW() - INTERVAL '${interval}'
                    GROUP BY i.inventory_id, i.name, i.quantity
                    ORDER BY usage_count DESC;
                    `;

            const result = await pool.query(usageQuery);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: 'Internal Server Error'});
    }
});

router.get('/reports/x', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                hour_series.hour,
                COALESCE(SUM(total_cost), 0) AS sales,
                COALESCE(SUM(CASE WHEN LOWER(payment_method) = 'cash' THEN total_cost ELSE 0 END), 0) AS cash_sales,
                COALESCE(SUM(CASE WHEN LOWER(payment_method) = 'credit' THEN total_cost ELSE 0 END), 0) AS credit_sales,
                COALESCE(SUM(reward_points_earned), 0) AS total_reward_points,
                COALESCE(COUNT(orders.order_id), 0) AS number_of_sales
            FROM 
                generate_series(
                    CURRENT_DATE + INTERVAL '6 hours', 
                    CURRENT_DATE + INTERVAL '22 hours', 
                    '1 hour'::interval
                ) AS hour_series(hour)
            LEFT JOIN orders ON DATE_TRUNC('hour', orders.time_stamp) = hour_series.hour
            WHERE (orders.time_stamp >= CURRENT_DATE + INTERVAL '6 hours' OR orders.time_stamp IS NULL)
            GROUP BY hour_series.hour
            ORDER BY hour_series.hour
        `);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.get('/reports/z', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT
                SUM(orders.total_cost) AS total_sales,
                SUM(CASE WHEN LOWER(orders.payment_method) = 'cash' THEN orders.total_cost ELSE 0 END) AS total_cash,
                SUM(CASE WHEN LOWER(orders.payment_method) = 'credit' THEN orders.total_cost ELSE 0 END) AS total_credit,
                STRING_AGG(DISTINCT employees.name, ', ') AS employee_signatures,
                ROUND(SUM(orders.total_cost) / 1.1 * 0.1, 2) AS total_tax_paid
            FROM orders
            JOIN employees ON orders.employee_id = employees.employee_id
            WHERE orders.time_stamp >= CURRENT_DATE
              AND orders.time_stamp < CURRENT_DATE + INTERVAL '1 day'
        `);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});






module.exports = router;