# ShareTea POS

A full-stack point-of-sale system for ShareTea that includes a cashier interface, self-service kiosk, and manager interface. The system is hosted on Render, with the backend built using Express and frontend components for the different user roles.

Hosted [here](https://app-98xo.onrender.com/) (https://app-98xo.onrender.com/) on [Render](https://render.com).

---

## Table of Contents

- [Features](#features)  
- [Architecture & Tech Stack](#architecture--tech-stack)  
- [Usage / User Flows](#usage--user-flows)   
- [API Reference](#api-reference)  
- [Contact](#contact)  

---

## Features

- Cashier interface: for staff to take orders, process payments, manage sales.  
- Self-service kiosk: for customers to place orders directly.  
- Manager interface: for supervision, management of inventory / product items / reporting.  
- RESTful API backend (Express) handling all inter-component communication.  
- Hosted on Render for backend / frontend services.  

---

## Architecture & Tech Stack

- **Backend**: Node.js with Express  
- **Frontend(s)**: React with Tailwind CSS
- **Database**: PostgreSQL
- **Hosting / Deployment**: Render used to host both server and app.  
- **Communication**: RESTful API calls between frontends and backend.  

---

## Usage / User Flows

1. **Cashier**: Log in → select items → process orders. 
2. **Kiosk**: Customer selects drinks → places order → pays → order sent to backend.  
3. **Manager**: Manage menu items, inventory, and view reports through a web interface.  

---

## API Reference

| Endpoint (Cashier)       | Method | Description         | Body / Params     |
|--------------------------|--------|---------------------|-------------------|
| `/cashier/employees`     | GET    | Get all employees   | email             |
| `/cashier/customer`      | GET    | Get customer info   | phoneNumber       |
| `/cashier/addCustomer`   | POST   | Create new customer | phoneNumber       |
| `/cashier/updateCustomer`| POST   | Update total points | customerID, points|
| `/cashier/orderID`       | GET    | Get current orderID | none              |
| `/cashier/addOrder`      | POST   | Create a new order  | Order             |

| Endpoint (Manager)         | Method   | Description               | Body / Params    |
|----------------------------|----------|---------------------------|------------------|
| `/manager/monthly-revenue` | GET      | Get monthly revenue       | none             |
| `/manager/monthly-orders`  | GET      | Get monthly orders        | none             |
| `/manager/top-employee`    | GET      | Get highest sale employee | none             |
| `/manager/monthly-sales`   | GET      | Get monthly sales         | none             |
| `/manager/menu`            | GET/POST | Get or add menu item      | Menu             |
| `/manager/inventory`       | GET/POST | Get or add inventory item | Inventory        |
| `/manager/inventory-usage` | GET      | Inventory usage by time   | timeframe        |
| `/manager/credit`          | GET      | proportion of credit/cash | none             |
| `/manager/reports/x`       | GET      | Get X report              | none             |
| `/manager/reports/z`       | GET      | Get Z report              | none             |

---

## Contact

**Author**: Matthew Qian  
**Email**: <mqian01@gmail.com>  
**Repository**: [ShareTea-POS](https://github.com/mqian0123/ShareTea-POS)

