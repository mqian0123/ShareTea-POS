import './Manager.css';
import logo from './assets/Share Tea.png';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, User, ChefHat, SquarePen, ClipboardList, Trash2, Plus, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const SERVER_API = import.meta.env.VITE_SERVER_API;


function MenuItems() {
    const navigate = useNavigate();
    const [showConfirm, setShowConfirm] = useState(false);
    const [pendingDeleteId, setPendingDeleteId] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editItemData, setEditItemData] = useState(null);
    const [ingredientString, setIngredientString] = useState('');

    const [inventoryItems, setInventoryItems] = useState([]);
    const [name, setName] = useState('');
    useEffect(() => {
        const savedName = localStorage.getItem('name');
        setName(savedName || 'Guest');
    }, []);

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const res = await axios.get(SERVER_API + 'manager/inventory');
                setInventoryItems(res.data);
            } catch (err) {
                console.error("Error fetching inventory:", err);
            }
        };
        fetchInventory();
    }, []);

    



    const [newItemName, setNewItemName] = useState('');
    const [newItemPrice, setNewItemPrice] = useState('');
    const [newItemCategory, setNewItemCategory] = useState('');

    const defaultIngredients = ["Plastic Cups", "Bubble Tea Straws", "Cup Sealing Film"];
    const [newItemIngredients, setNewItemIngredients] = useState([]); // this should be an array of inventory ids


    //List of menu items
    //TODO: Fetch from backend
    const [menuItem, setMenuItem] = useState([]);

    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (showAddModal && inventoryItems.length > 0) {
            const defaultIds = inventoryItems
                .filter(item => defaultIngredients.includes(item.name))
                .map(item => item.inventory_id);
            setNewItemIngredients(defaultIds);
        }
    }, [showAddModal, inventoryItems]);

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const response = await axios.get(SERVER_API + 'manager/menu');
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

    const confirmDelete = async () => {
        try {
            await axios.delete(SERVER_API + 'manager/menu/' + pendingDeleteId);
            setMenuItem(menuItem.filter(item => item.menu_id !== pendingDeleteId));
        } catch (error) {
            console.error("Failed to delete menu item:", error);
        } finally {        
        
        setShowConfirm(false);
        setPendingDeleteId(null);}
    };
    
    const cancelDelete = () => {
        setShowConfirm(false);
        setPendingDeleteId(null);
    };

    const handleAdd = () => {
        setShowAddModal(true);
    };
    
    const handleEdit = (id) => {
        const itemToEdit = menuItem.find(item => item.menu_id === id);
        setEditItemData(itemToEdit);
        setShowEditModal(true);
    };
    

    const saveEditedMenuitem = async (updatedItem) => {
        try {
            await axios.patch(`${SERVER_API}manager/menu/${updatedItem.menu_id}`, {
                name: updatedItem.name,
                category: updatedItem.category,
                price: updatedItem.price
            });
            setMenuItem(prev =>
                prev.map(item =>
                    item.menu_id === updatedItem.menu_id ? { ...item, ...updatedItem } : item
                )
            );
            setShowEditModal(false);
            setEditItemData(null);
        } catch (error) {
            console.error('Failed to update menu item:', error);
        }
    };
    

    const handleAddItem = async () => {
        try {
            // 1. Add the menu item
            const newItem = {
                name: newItemName,
                price: parseFloat(newItemPrice),
                category: newItemCategory
            };
    
            const res = await axios.post(SERVER_API + 'manager/menu', newItem);
            const newMenuItem = res.data;
    
            // 2. Attach ingredients by name
            if (newItemIngredients.length > 0) {
                const ingredientNames = inventoryItems
                    .filter(item => newItemIngredients.includes(item.inventory_id))
                    .map(item => item.name);
    
                await axios.post(`${SERVER_API}manager/menu/ingredients/${newMenuItem.menu_id}`, {
                    inventory_names: ingredientNames
                });
            }
    
            // 3. Refresh state
            setMenuItem([...menuItem, newMenuItem]);
    
            // Reset form
            setNewItemName('');
            setNewItemPrice('');
            setNewItemCategory('');
            setNewItemIngredients([]);
            setShowAddModal(false);
        } catch (err) {
            console.error("Error adding menu item or ingredients:", err);
        }
    };
    
    
      

    //list of nav items for the the navigation bar
    const navItems = [
        { name: 'Dashboard', icon: <Home size={25} />, path: '/manager/dashboard'},
        { name: 'Employees', icon: <User size={25} />, path: '/manager/employees'},
        { name: 'Menu Items', icon: <SquarePen size={25} />, path: '/manager/menu', active: true },
        { name: 'Inventory', icon: <ChefHat  size={25} />,  path: '/manager/inventory'},
        { name: 'Reports', icon: <ClipboardList size={25} />, path: '/manager/reports' },
        { name: 'Logout', icon: <LogOut size={25} />, path: '/' }

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
                        <h1 className="text-2xl font-semibold text-gray-800">Hello, {name}</h1>
                        <p className="text-sm text-gray-500">Showing ShareTea's Menu Items</p>
                    </div>
                </div>

                <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search menu items..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
            </div>

                {/* Menu Items List */}
                <div className="space-y-4">
                {menuItem
                    .filter(item =>
                        item.name.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map(item => (
                        <div key={item.menu_id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border">
                            <div>
                                <p className="text-lg font-medium">{item.name}</p>
                                <p className="text-sm text-gray-500">
                                    Category: {item.category} | Price: {item.price} | Total Purchases: {item.total_purchases}
                                </p>
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

        {/* Edit Modal */}
        {showEditModal && editItemData && (
            <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50">
                <div className="bg-white rounded-lg p-6 shadow-lg w-96">
                    <h2 className="text-lg font-semibold mb-4">Edit Menu Item</h2>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            value={editItemData.name}
                            onChange={(e) =>
                                setEditItemData({ ...editItemData, name: e.target.value })
                            }
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Category</label>
                        <input
                            type="text"
                            value={editItemData.category}
                            onChange={(e) =>
                                setEditItemData({ ...editItemData, category: e.target.value })
                            }
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700">Price</label>
                        <input
                            type="number"
                            value={editItemData.price}
                            onChange={(e) =>
                                setEditItemData({ ...editItemData, price: e.target.value })
                            }
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                    </div>

                    <div className="flex justify-end gap-4">
                        <button
                            onClick={() => {
                                setShowEditModal(false);
                                setEditItemData(null);
                            }}
                            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg text-gray-800"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => saveEditedMenuitem(editItemData)}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        )}

{showAddModal && (
    <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-white rounded-lg p-6 shadow-lg w-[500px]">
            <h2 className="text-lg font-semibold mb-4">Add Menu Item</h2>
            <div className="space-y-3">
                <input
                    type="text"
                    placeholder="Name"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    className="w-full border px-3 py-2 rounded-md"
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={newItemPrice}
                    onChange={(e) => setNewItemPrice(e.target.value)}
                    className="w-full border px-3 py-2 rounded-md"
                />
                <input
                    type="text"
                    placeholder="Category"
                    value={newItemCategory}
                    onChange={(e) => setNewItemCategory(e.target.value)}
                    className="w-full border px-3 py-2 rounded-md"
                />
                <div>
                    <p className="font-medium mb-1">Ingredients:</p>
                    <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                        {inventoryItems.map(item => (
                            <label key={item.inventory_id} className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    value={item.inventory_id}
                                    checked={newItemIngredients.includes(item.inventory_id)}
                                    onChange={(e) => {
                                        const id = parseInt(e.target.value);
                                        if (e.target.checked) {
                                            setNewItemIngredients(prev => [...prev, id]);
                                        } else {
                                            setNewItemIngredients(prev => prev.filter(i => i !== id));
                                        }
                                    }}
                                    className="accent-emerald-500"
                                />
                                {item.name}
                            </label>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex justify-end gap-3 mt-5">
                <button
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg"
                >
                    Cancel
                </button>
                <button
                    onClick={handleAddItem}
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

export default MenuItems;
