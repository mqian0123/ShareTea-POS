import './Manager.css';
import logo from './assets/Share Tea.png';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, User, ChefHat, SquarePen, ClipboardList, Trash2, PackagePlus, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const SERVER_API = import.meta.env.VITE_SERVER_API;

/**
 * 
 * @description Creates the inventory page for the manager GUI
 * @returns {JSX.Element} 
 * 
 * @author Luke GUtierrez
 */

function Inventory() {
    const navigate = useNavigate();
    const [showConfirm, setShowConfirm] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showAdd, setShowAdd] = useState(false);

    const [selectedInventoryItem, setSelectedInventoryItem] = useState(null);
    const [editedInventoryQuantity, setEditedInventoryQuantity] = useState(null);

    const [newItemName, setNewItemName] = useState('');
    const [newItemQuantity, setNewItemQuantity] = useState('');

    const [pendingDeleteId, setPendingDeleteId] = useState(null);

    const [searchQuery, setSearchQuery] = useState('');

    const [name, setName] = useState('');
    useEffect(() => {
        const savedName = localStorage.getItem('name');
        setName(savedName || 'Guest');
    }, []);

    //List of inventory items
    //TODO: Fetch from backen
    //  completed by yahia
    //  TODO: change local host to actual server URL
    const [inventoryItem, setInventoryItem] = useState([]);
    
    useEffect(() => {
        const fetchInventoryItems = async () => {
            try {
                const response = await axios.get(SERVER_API + 'manager/inventory');
                setInventoryItem(response.data);
            } catch (error) {
                console.error('Error fetching inventory items:', error);
                setInventoryItem([]);  // Set empty data if there's an error
            }
        };
        fetchInventoryItems();
    }, []);

    //handler for the delete button that confirms the delete action
    const handleDeleteClick = (id) => {
        setPendingDeleteId(id);
        setShowConfirm(true);
    };


    const confirmDelete = async () => {
        
        try {
            await axios.delete(SERVER_API + 'manager/inventory/' + pendingDeleteId);
            setInventoryItem(inventoryItem.filter(item => item.inventory_id !== pendingDeleteId));
        } catch (error) {
            console.error("Failed to delete inventory item:", error);
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
        const item = inventoryItem.find(item => item.inventory_id === id);
        setSelectedInventoryItem(item);
        setEditedInventoryQuantity(item.quantity);
        setShowEdit(true);
    };

    //handler for the add button that opens the add modal
    const handleAdd = () => {
        setShowAdd(true);
    };

    // Handler for creating a new inventory item
    const handleCreateNewItem = async () => {
        // Validation of item quantity
        const qty = parseInt(newItemQuantity, 10);
        if (isNaN(qty) || qty < 0) {
            alert("Please enter a valid quantity.");
            return;
        }
        try {
            await axios.post(SERVER_API + 'manager/inventory', {
                name: newItemName,
                quantity: qty
            });
            // Refresh the inventory list
            const refreshed = await axios.get(SERVER_API + 'manager/inventory');
            setInventoryItem(refreshed.data);

            setShowAdd(false);
            setNewItemName('');
            setNewItemQuantity('');
        } catch (error) {
            console.error("Failed to create inventory item:", error);
        }
    };

    //list of nav items for the the navigation bar
    const navItems = [
        { name: 'Dashboard', icon: <Home size={25} />, path: '/manager/dashboard'},
        { name: 'Employees', icon: <User size={25} />, path: '/manager/employees'},
        { name: 'Menu Items', icon: <SquarePen size={25} />, path: '/manager/menu' },
        { name: 'Inventory', icon: <ChefHat  size={25} />,  path: '/manager/inventory' , active: true },
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
            {/* Navigation Bar */}
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
                        <h1 className="text-2xl font-semibold text-gray-800">Hello, {name}</h1>
                        <p className="text-sm text-gray-500">Showing ShareTea's Inventory</p>
                    </div>
                </div>

                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Search inventory..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                </div>

                {/* Inventory Items List */}
                <div className="space-y-4">
                {inventoryItem
                        .filter(item =>
                            item.name.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        .map(item => (
                            <div key={item.inventory_id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border">
                                <div>
                                    <p className="text-lg font-medium">{item.name}</p>
                                    <p className="text-sm text-gray-500"> Quantity: {item.quantity}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <button onClick={() => handleEdit(item.inventory_id)} className="text-blue-600 hover:text-blue-800">
                                        <SquarePen size={20} />
                                    </button>
                                    <button onClick={() => handleDeleteClick(item.inventory_id)} className="text-red-600 hover:text-red-800">
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                        ))}
                </div>
                
                {/* Add New Inventory Item Button */}
                <div className="mt-10 flex justify-center">
                    <button 
                        onClick={handleAdd} 
                        className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg shadow"
                    >
                        <PackagePlus size={20} />
                        Add New Inventory Item
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

        {/*Edit Order Modal for editing inventory item quantities*/}
        {showEdit && selectedInventoryItem && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50">
            <div className="bg-white rounded-lg p-6 shadow-lg w-96">
             <h2 className="text-lg font-semibold mb-4">Edit Quantity</h2>
                <p className="text-gray-700 mb-4">Editing: <strong>{selectedInventoryItem.name}</strong></p>
                <input 
                    type="number" 
                    value={editedInventoryQuantity} 
                    onChange={(e) => setEditedInventoryQuantity(e.target.value)} 
                    className="w-full px-3 py-2 border rounded-lg mb-4"
                    />
                <div className="flex justify-end gap-4">
                 <button 
                    onClick={() => setShowEdit(false)}
                    className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg text-gray-800"
                >
                    Cancel
                </button>
                <button 
                    onClick={async () => {
                        const qty = parseInt(editedInventoryQuantity, 10);
                        if (isNaN(qty) || qty < 0) {
                            alert("Please enter a valid quantity.");
                            return;
                        }
                        try {
                            await axios.patch(SERVER_API + `manager/inventory/${selectedInventoryItem.inventory_id}`, { quantity: qty });
                            const refreshed = await axios.get(SERVER_API + 'manager/inventory');
                            setInventoryItem(refreshed.data);
                    
                        } catch (error) {
                            console.error("Failed to update inventory item:", error);
                        } finally {
                            setShowEdit(false);
                            setSelectedInventoryItem(null);
                            setEditedInventoryQuantity(null);
                        }
                    }}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg"
                >
                    Save
                </button>
             </div>
            </div>
        </div>
        )}
        {/* Add New Inventory Item Modal */}
        {showAdd && (
                    <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50">
                        <div className="bg-white rounded-lg p-6 shadow-lg w-96">
                            <h2 className="text-lg font-semibold mb-4">Add New Inventory Item</h2>
                            
                            <label className="block mb-2 text-gray-700">Item Name</label>
                            <input
                                type="text"
                                value={newItemName}
                                onChange={(e) => setNewItemName(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg mb-4"
                                placeholder="Enter item name..."
                            />

                            <label className="block mb-2 text-gray-700">Quantity</label>
                            <input
                                type="number"
                                value={newItemQuantity}
                                onChange={(e) => setNewItemQuantity(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg mb-4"
                                placeholder="Enter quantity..."
                            />
                            <div className="flex justify-end gap-4">
                                <button
                                    onClick={() => {
                                        setShowAdd(false);
                                        setNewItemName('');
                                        setNewItemQuantity('');
                                    }}
                                    className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg text-gray-800"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleCreateNewItem}
                                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg"
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                )}
    </div>
    );}

export default Inventory;
