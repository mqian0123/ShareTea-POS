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
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editItemData, setEditItemData] = useState(null);
    const [ingredientString, setIngredientString] = useState('');



    const [newItemName, setNewItemName] = useState('');
    const [newItemPrice, setNewItemPrice] = useState('');
    const [newItemCategory, setNewItemCategory] = useState('');
    const [newItemIngredients, setNewItemIngredients] = useState([]); // this should be an array of inventory ids


    //List of menu items
    //TODO: Fetch from backend
    const [menuItem, setMenuItem] = useState([]);

    const [searchQuery, setSearchQuery] = useState('');

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

    const confirmDelete = async () => {
        try {
            await axios.delete('http://localhost:10000/manager/menu/' + pendingDeleteId);
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
        saveEditedMenuitem(itemToEdit);
        setShowEditModal(true);
    };

    const saveEditedMenuitem = async(updatedItem) => {
        try {
            const response = await axios.patch("http://localhost:10000/manager/menu/" + updatedItem.menu_id, {
                name: updatedItem.name,
                price: updatedItem.price,
                total_purchases: updatedItem.total_purchases,
                category: updatedItem.category
            })

            const updatedData = response.data;
    
            // Update local state
            setMenuItem(prev =>
                prev.map(menu =>
                    menu.menu_id === updatedData.menu_id ? updatedData : menu
                )
            );
        } catch (error) {
            console.error('Failed to update menu item:', error);
        }
    };

    const handleAddItem = async () => {
        console.log("Recieved");
        try {
            // 1. Add the menu item
            console.log("Trying");
            const menuRes = await axios.post('http://localhost:10000/menu', {
                name: newItemName,
                price: newItemPrice,
                category: newItemCategory,
            });
    
            console.log("Posted item");
            const menuItemId = menuRes.data.id;
    
            // 2. Add the ingredients using the menu item ID
            if (newItemIngredients.length > 0) {
                await axios.post(`http://localhost:10000/menu/ingredients/${menuItemId}`, {
                    inventory_names: newItemIngredients,
                });
            }
            console.log("Posted ingredients");
    
            // Optionally refetch or update UI
            // fetchMenuItems(); // Or however you're refreshing the UI
    
            console.log('Item added successfully!');
        } catch (error) {
            console.error('Error adding item:', error);
        }
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

        {showAddModal && (
            <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50">
                <div className="bg-white rounded-lg p-6 shadow-lg w-96">
                    <h2 className="text-lg font-semibold mb-4">Add New Menu Item</h2>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            const ingredientsArray = ingredientString
                                .split(',')
                                .map(i => i.trim())
                                .filter(i => i.length > 0);

                            setNewItemIngredients(ingredientsArray);
                            console.log("Here");
                            handleAddItem();
                            setShowAddModal(false);
                        }}
                        className="space-y-4"
                    >
                        <input
                            type="text"
                            placeholder="Name"
                            className="w-full border rounded p-2"
                            value={newItemName}
                            onChange={(e) => setNewItemName(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Category"
                            className="w-full border rounded p-2"
                            value={newItemCategory}
                            onChange={(e) => setNewItemCategory(e.target.value)}
                            required
                        />
                        <input
                            type="number"
                            placeholder="Price"
                            className="w-full border rounded p-2"
                            value={newItemPrice}
                            onChange={(e) => setNewItemPrice(e.target.value)}
                            required
                        />

                        {/* Ingredients Field */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Ingredients (comma-separated)
                            </label>
                            <input
                                type="text"
                                className="w-full border border-gray-300 rounded-lg p-2"
                                placeholder="e.g. 1, 2, 3"
                                value={ingredientString}
                                onChange={(e) => setIngredientString(e.target.value)}
                            />
                        </div>

                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => setShowAddModal(false)}
                                className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded"
                            >
                                Add
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )}

        {/* Edit Modal */}
        {showEditModal && editItemData && (
            <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50">
                <div className="bg-white rounded-lg p-6 shadow-lg w-96">
                    <h2 className="text-lg font-semibold mb-4">Edit Menu Item</h2>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            // TODO: Add edit logic
                            saveEditedMenuitem(editItemData.menu_id);
                            setShowEditModal(false);
                        }}
                        className="space-y-4"
                    >
                        <input
                            type="text"
                            defaultValue={editItemData.name}
                            className="w-full border rounded p-2"
                            required
                        />
                        <input
                            type="text"
                            defaultValue={editItemData.category}
                            className="w-full border rounded p-2"
                            required
                        />
                        <input
                            type="number"
                            defaultValue={editItemData.price}
                            className="w-full border rounded p-2"
                            required
                        />
                        <div className="flex justify-end gap-2">
                            <button type="button" onClick={() => setShowEditModal(false)} className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded">
                                Cancel
                            </button>
                            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )}

        </div>
    );
}

export default MenuItems;
