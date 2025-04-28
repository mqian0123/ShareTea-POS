import './Manager.css';
import logo from './assets/Share Tea.png';
import { useNavigate } from 'react-router-dom';
import { Home, User, ChefHat, SquarePen, ClipboardList, Trash2, UserPlus, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const SERVER_API = import.meta.env.VITE_SERVER_API;


/**
 * 
 * @description Creates the employees page for the manager GUI
 * @returns {JSX.Element} 
 * 
 * @author Luke GUtierrez
 */

function Employees() {
    const navigate = useNavigate();
    const [showConfirm, setShowConfirm] = useState(false);
    const [pendingDeleteId, setPendingDeleteId] = useState(null);

    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);


    const [showAddModal, setShowAddModal] = useState(false);
    const [newEmployee, setNewEmployee] = useState({
        name: '',
        role: '',
        phone_number: '',
        email: ''
    });

    const [searchQuery, setSearchQuery] = useState('');
    
    //List of current employees
    //TODO: Fetch from backend
    //  completed by yahia 
    //  TODO: change local host to actual server URL
    const [employees, setEmployees] = useState([]);
    
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get(SERVER_API + 'manager/employees');
                setEmployees(response.data);
            } catch (error) {
                console.error('Error fetching employees:', error);
                setEmployees([]);  // Set empty data if there's an error
            }
        };
        fetchEmployees();
    }, []);




    //handler for the delete button that confirms the delete action
    const handleDeleteClick = (id) => {
        setPendingDeleteId(id);
        setShowConfirm(true);
    };
    
    const confirmDelete = async () => {
        
        try {
            await axios.delete(SERVER_API + 'manager/employees/' + pendingDeleteId);
            setEmployees(prev => prev.filter(emp => emp.employee_id !== pendingDeleteId));
        } catch (error) {
            console.error("Failed to delete employee:", error);
        } finally {        
        
        setShowConfirm(false);
        setPendingDeleteId(null);}
    };
    
    const cancelDelete = () => {
        setShowConfirm(false);
        setPendingDeleteId(null);
    };

    //handler for the edit button that opens the edit modal
    const handleEdit = (id) => {
        const employee = employees.find(emp => emp.employee_id === id);
        setSelectedEmployee(employee);
        setShowEditModal(true);
    };
    
    const saveEditedEmployee = async (updatedEmployee) => {
        try {
            const response = await axios.patch(SERVER_API + "manager/employees/" + updatedEmployee.employee_id, {
                name: updatedEmployee.name,
                role: updatedEmployee.role,
                phone_number: updatedEmployee.phone_number,
                email: updatedEmployee.email
            });
    
            const updatedData = response.data;
    
            // Update local state
            setEmployees(prev =>
                prev.map(emp =>
                    emp.employee_id === updatedData.employee_id ? updatedData : emp
                )
            );
    
            setShowEditModal(false);
        } catch (error) {
            console.error('Failed to update employee:', error);
        }
    };
    

    //handler for the add button that opens the add modal
    const handleAdd = () => {
        setNewEmployee({ name: '', role: '', phone_number: '', email: '' });
        setShowAddModal(true);
    };


    const saveNewEmployee = async () => {
        try {
            const response = await axios.post(SERVER_API + 'manager/employees', {
                name: newEmployee.name,
                role: newEmployee.role,
                phone_number: newEmployee.phone_number,
                email: newEmployee.email
            });
    
            const created = response.data;
    
            // Add new employee to state
            setEmployees(prev => [...prev, created]);
    
            setShowAddModal(false);
        } catch (error) {
            console.error('Failed to add employee:', error);
            // Optionally show a toast or user-friendly message
        }
    };
    
    

    //list of nav items for the the navigation bar
    const navItems = [
        { name: 'Dashboard', icon: <Home size={25} />, path: '/manager/dashboard'},
        { name: 'Employees', icon: <User size={25} />, path: '/manager/employees' , active: true },
        { name: 'Menu Items', icon: <SquarePen size={25} />, path: '/manager/menu' },
        { name: 'Inventory', icon: <ChefHat  size={25} />,  path: '/manager/inventory'},
        { name: 'Reports', icon: <ClipboardList size={25} />, path: '/manager/reports' },
        { name: 'Logout', icon: <LogOut size={25} />, path: '/' }

    ];

    
    //function to render each section of the navigation bar
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
            {/* Navigation bar */}
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

                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Search employees..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                </div>

                {/* List of employees */}
                {/* Search will filter base on any employee field, name, email, phone, role... may modify later */}
                <div className="space-y-4">
                {employees
                    .filter(emp => 
                        (emp.name?.toLowerCase().includes(searchQuery.toLowerCase()) || '') ||
                        (emp.role?.toLowerCase().includes(searchQuery.toLowerCase()) || '') ||
                        (emp.email?.toLowerCase().includes(searchQuery.toLowerCase()) || '') ||
                        (emp.phone_number?.toLowerCase().includes(searchQuery.toLowerCase()) || '')
                    )
                    .map(emp => (
                        <div key={emp.employee_id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border">
                            <div>
                                <p className="text-lg font-medium">{emp.name}</p>
                                <p className="text-sm text-gray-500">{emp.role} | {emp.phone_number} | {emp.email}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <button onClick={() => handleEdit(emp.employee_id)} className="text-blue-600 hover:text-blue-800">
                                    <SquarePen size={20} />
                                </button>
                                <button onClick={() => handleDeleteClick(emp.employee_id)} className="text-red-600 hover:text-red-800">
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* Add new employee button */}
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

            {/* Confirmation modal for delete action */}
            {showConfirm && (
            <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50">
                <div className="bg-white rounded-lg p-6 shadow-lg w-96">
                    <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
                    <p className="text-gray-700 mb-6">Are you sure you want to delete this menu item?</p>
                    <div className="flex justify-end gap-4">
                        <button 
                            onClick={cancelDelete}
                            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg text-gray-800"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={confirmDelete}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        )}

            {showEditModal && selectedEmployee && (
            <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50">
                <div className="bg-white rounded-lg p-6 shadow-lg w-96">
                    <h2 className="text-lg font-semibold mb-4">Edit Employee</h2>

                    <div className="space-y-4">
                        <input
                            type="text"
                            value={selectedEmployee.name}
                            onChange={(e) =>
                                setSelectedEmployee({ ...selectedEmployee, name: e.target.value })
                            }
                            className="w-full border rounded px-3 py-2"
                            placeholder="Name"
                        />
                        <input
                            type="text"
                            value={selectedEmployee.role}
                            onChange={(e) =>
                                setSelectedEmployee({ ...selectedEmployee, role: e.target.value })
                            }
                            className="w-full border rounded px-3 py-2"
                            placeholder="Role"
                        />
                        <input
                            type="text"
                            value={selectedEmployee.phone_number}
                            onChange={(e) =>
                                setSelectedEmployee({ ...selectedEmployee, phone_number: e.target.value })
                            }
                            className="w-full border rounded px-3 py-2"
                            placeholder="Phone Number"
                        />
                        <input
                            type="email"
                            value={selectedEmployee.email}
                            onChange={(e) =>
                                setSelectedEmployee({ ...selectedEmployee, email: e.target.value })
                            }
                            className="w-full border rounded px-3 py-2"
                            placeholder="Email"
                        />
                    </div>

                    <div className="flex justify-end gap-4 mt-6">
                        <button
                            onClick={() => setShowEditModal(false)}
                            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg text-gray-800"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => {
                                saveEditedEmployee(selectedEmployee);
                                setShowEditModal(false);
                            }}
                            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        )}

            {showAddModal && (
            <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50">
                <div className="bg-white rounded-lg p-6 shadow-lg w-96">
                    <h2 className="text-lg font-semibold mb-4">Add New Employee</h2>

                    <div className="space-y-4">
                        <input
                            type="text"
                            value={newEmployee.name}
                            onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                            className="w-full border rounded px-3 py-2"
                            placeholder="Name"
                        />
                        <input
                            type="text"
                            value={newEmployee.role}
                            onChange={(e) => setNewEmployee({ ...newEmployee, role: e.target.value })}
                            className="w-full border rounded px-3 py-2"
                            placeholder="Role"
                        />
                        <input
                            type="text"
                            value={newEmployee.phone_number}
                            onChange={(e) => setNewEmployee({ ...newEmployee, phone_number: e.target.value })}
                            className="w-full border rounded px-3 py-2"
                            placeholder="Phone Number"
                        />
                        <input
                            type="email"
                            value={newEmployee.email}
                            onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                            className="w-full border rounded px-3 py-2"
                            placeholder="Email"
                        />
                    </div>

                    <div className="flex justify-end gap-4 mt-6">
                        <button
                            onClick={() => setShowAddModal(false)}
                            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg text-gray-800"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={saveNewEmployee}
                            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg"
                        >
                            Add
                        </button>
                    </div>
                </div>
            </div>
        )}





        </div>
    );
}

export default Employees;
