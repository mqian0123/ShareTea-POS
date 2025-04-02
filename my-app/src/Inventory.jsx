import './Manager.css';
import logo from './assets/Share Tea.png';
import { useNavigate } from 'react-router-dom';
import { Home, User, ChefHat, SquarePen, ClipboardList, Trash2, PackagePlus } from 'lucide-react';
import { useState } from 'react';


function Inventory() {
    const navigate = useNavigate();

    const [inventoryItem, setInventoryItem] = useState([
        { name: 'special sauce', inventory_id: 1, quantity: 'Milk Tea'},
        { name: 'Ice', inventory_id: 1, quantity: 'Fruit Tea' },
    ]);

    const handleDelete = (id) => {
        setInventoryItem(inventoryItem.filter(item => item.inventory_id !== id));
    };

    const handleEdit = (id) => {
        // TODO: Implement edit logic or modal popup
        console.log("Edit inventory item", id);
    };

    const handleAdd = () => {
        // TODO: open modal
        console.log("Add new inventory item");
    };

    const navItems = [
        { name: 'Dashboard', icon: <Home size={25} />, path: '/manager/dashboard'},
        { name: 'Employees', icon: <User size={25} />, path: '/manager/employees'},
        { name: 'Menu Items', icon: <SquarePen size={25} />, path: '/manager/menu' },
        { name: 'Inventory', icon: <ChefHat  size={25} />,  path: '/manager/inventory' , active: true },
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
                        <p className="text-sm text-gray-500">Showing ShareTea's Menu Items</p>
                    </div>
                </div>

                <div className="space-y-4">
                    {inventoryItem.map(item => (
                        <div key={item.inventory_id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border">
                            <div>
                                <p className="text-lg font-medium">{item.name}</p>
                                <p className="text-sm text-gray-500"> Quantity: {item.quantity}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <button onClick={() => handleEdit(item.inventory_id)} className="text-blue-600 hover:text-blue-800">
                                    <SquarePen size={20} />
                                </button>
                                <button onClick={() => handleDelete(item.inventory_id)} className="text-red-600 hover:text-red-800">
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
                        <PackagePlus size={20} />
                        Add New Inventory Item
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Inventory;
