import './Manager.css';
import logo from './assets/Share Tea.png';
import { useNavigate } from 'react-router-dom';
import { Home, User, ChefHat, SquarePen, ClipboardList, Trash2, Plus } from 'lucide-react';
import { useState, useEffect } from 'react';
import axios from 'axios';

function MenuItems() {
    const navigate = useNavigate();
    const [showConfirm, setShowConfirm] = useState(false);
    const [pendingDeleteId, setPendingDeleteId] = useState(null);

    //List of menu items
    //TODO: Fetch from backend
    const [menuItem, setMenuItem] = useState([]);

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const response = await axios.get('http://localhost:10000/manager/menu');
                setMenuItem(response.data);
            } catch (error) {
                console.error('Error fetching menu items:', error);
                setMenuItem([]);  // Set empty data if there's an error
            }
        };
        fetchMenuItems();
    }, []);


    //handler for the delete button that confirms the delete action
    const handleDeleteClick = (id) => {
        setPendingDeleteId(id);
        setShowConfirm(true);
    };
    
    const confirmDelete = () => {
        setMenuItem(menuItem.filter(item => item.menu_id !== pendingDeleteId));
        setShowConfirm(false);
        setPendingDeleteId(null);
    };
    
    const cancelDelete = () => {
        setShowConfirm(false);
        setPendingDeleteId(null);
    };

    //handler for the edit button that opens the edit modal
    const handleEdit = (id) => {
        // TODO: Implement edit logic or modal popup
        console.log("Edit menu item", id);
    };

    //handler for the add button that opens the add modal
    const handleAdd = () => {
        // TODO:  open modal
        console.log("Add new menu item");
    };

    //list of nav items for the the navigation bar
    const navItems = [
        { name: 'Dashboard', icon: <Home size={25} />, path: '/manager/dashboard'},
        { name: 'Employees', icon: <User size={25} />, path: '/manager/employees'},
        { name: 'Menu Items', icon: <SquarePen size={25} />, path: '/manager/menu', active: true },
        { name: 'Inventory', icon: <ChefHat  size={25} />,  path: '/manager/inventory'},
        { name: 'Reports', icon: <ClipboardList size={25} />, path: '/manager/reports' }
    ];

    
    // Function to render each section of the navigation bar
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
                        <p className="text-sm text-gray-500">Showing ShareTea's Menu Items</p>
                    </div>
                </div>

                {/* Menu Items List */}
                <div className="space-y-4">
                    {menuItem.map(item => (
                        <div key={item.menu_id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border">
                            <div>
                                <p className="text-lg font-medium">{item.name}</p>
                                <p className="text-sm text-gray-500"> Category: {item.category} |  Price: {item.price} | total purchases: {item.total_purchases}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <button onClick={() => handleEdit(item.menu_id)} className="text-blue-600 hover:text-blue-800">
                                    <SquarePen size={20} />
                                </button>
                                <button onClick={() => handleDeleteClick(item.menu_id)} className="text-red-600 hover:text-red-800">
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* Button to add new menu item */}
                <div className="mt-10 flex justify-center">
                    <button 
                        onClick={handleAdd} 
                        className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg shadow"
                    >
                        <Plus size={20} />
                        Add New Menu Item
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
        </div>
    );
}

export default MenuItems;
