import './Manager.css';
import logo from './assets/Share Tea.png';
import { useNavigate } from 'react-router-dom';
import { Home, User, ChefHat, SquarePen, ClipboardList, Trash2, UserPlus } from 'lucide-react';
import { useState } from 'react';


function Employees() {
    const navigate = useNavigate();

    const [employees, setEmployees] = useState([
        { name: 'Meow', employee_id: 1, role: 'Cashier', phone_number: '123-456-7890', email: 'cashier1@example.com', password: '******' },
        { name: 'Yahia', employee_id: 2, role: 'Manager', phone_number: '234-567-8901', email: 'manager@example.com', password: '******' },
        { name: 'luke', employee_id: 3, role: 'Barista', phone_number: '345-678-9012', email: 'barista@example.com', password: '******' }
    ]);

    const handleDelete = (id) => {
        setEmployees(employees.filter(emp => emp.employee_id !== id));
    };

    const handleEdit = (id) => {
        // TODO: Implement edit logic or modal popup
        console.log("Edit employee", id);
    };

    const handleAdd = () => {
        // TODO: Navigate to Add Employee form or open modal
        console.log("Add new employee");
    };

    const navItems = [
        { name: 'Dashboard', icon: <Home size={25} />, path: '/manager/dashboard'},
        { name: 'Employees', icon: <User size={25} />, path: '/manager/employees' , active: true },
        { name: 'Menu Items', icon: <SquarePen size={25} />, path: '/manager/menu' },
        { name: 'Inventory', icon: <ChefHat  size={25} />,  path: '/manager/inventory'},
        { name: 'Reports', icon: <ClipboardList size={25} />, path: '/manager/reports' }
    ];

    

    const renderSection = (items) => (
        <>
            {items.map(item => (
                <div
                    key={item.name}
                    onClick={() => navigate(item.path)}
                    className={`flex items-center gap-3 px-4 py-10 cursor-pointer rounded-lg transition ${
                        item.active ? 'bg-green-200 text-emerald-900 font-semibold' : 'hover:bg-gray-400'
                    }`}
                >
                    {item.icon}
                    <span>{item.name}</span>
                </div>
            ))}
        </>
    );

    return (
        <div className="flex h-screen">
            <div className="w-64  border-r shadow-sm p-5">
                <div className="flex items-center mb-8">
                    <img className = "hover:cursor-pointer max-h-28" src={logo} onClick={() => navigate("/")}/>
                </div>
                <div className="text-gray-800">
                    {renderSection(navItems)}
                </div>
            </div>    

            <div className="flex-1 p-10 bg-gray-50 overflow-y-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-800">Hello, Stewart Little</h1>
                        <p className="text-sm text-gray-500">Showing ShareTea's Employees</p>
                    </div>
                </div>

                <div className="space-y-4">
                    {employees.map(emp => (
                        <div key={emp.employee_id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border">
                            <div>
                                <p className="text-lg font-medium">{emp.name}</p>
                                <p className="text-sm text-gray-500">{emp.role} | {emp.phone_number} | {emp.email}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <button onClick={() => handleEdit(emp.employee_id)} className="text-blue-600 hover:text-blue-800">
                                    <SquarePen size={20} />
                                </button>
                                <button onClick={() => handleDelete(emp.employee_id)} className="text-red-600 hover:text-red-800">
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-10 flex justify-center">
                    <button 
                        onClick={handleAdd} 
                        className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg shadow"
                    >
                        <UserPlus size={20} />
                        Add New Employee
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Employees;
