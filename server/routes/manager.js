const express = require('express');
const pool = require('../db/db'); // Import database connection
const router = express.Router();



// API CALLS FOR MANAGER VIEWS

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

//TODO: VERIFY QUERY AND COMPLETE QUERY
//TODO: ADD QUERY TO GET INVENTORY ID FROM INVENTORY NAMES
router.post('/menu/ingredient_list/:id', async (req, res) => {
    const { id } = req.params; // menu_id
    const { inventory_ids } = req.body; // expecting an array of inventory_ids

    if (!Array.isArray(inventory_ids) || inventory_ids.length === 0) {
        return res.status(400).json({ error: 'inventory_ids must be a non-empty array' });
    }

    const values = inventory_ids.map((inv_id, i) => `($1, $${i + 2})`).join(', ');
    const params = [id, ...inventory_ids];

    try {
        const result = await pool.query(
            `INSERT INTO menu_inventory (menu_id, inventory_id) VALUES ${values} RETURNING *`,
            params
        );
        res.status(201).json(result.rows);
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













module.exports = router;