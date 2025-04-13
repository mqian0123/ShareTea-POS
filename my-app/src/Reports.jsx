import './Manager.css';
import logo from './assets/Share Tea.png';
import { useNavigate } from 'react-router-dom';
import { Home, User, ChefHat, SquarePen, ClipboardList, Trash2, PackagePlus } from 'lucide-react';
import { useState, useEffect } from 'react';
import axios from 'axios';





function Reports(){
    const navigate = useNavigate();
    const [selectedReport, setSelectedReport] = useState('inventory');
    const [inventoryUsage, setInventoryUsage] = useState([]);
    const [timeframe, setTimeframe] = useState('week');


    /**
     * Navigation items for the sidebar menu.
     * 
     * @constant {Array<Object>}
     */
    const navItems = [
        { name: 'Dashboard', icon: <Home size={25} />, path: '/manager/dashboard'},
        { name: 'Employees', icon: <User size={25} />, path: '/manager/employees' },
        { name: 'Menu Items', icon: <SquarePen size={25} />, path: '/manager/menu' },
        { name: 'Inventory', icon: <ChefHat  size={25} />,  path: '/manager/inventory'},
        { name: 'Reports', icon: <ClipboardList size={25} />, path: '/manager/reports', active: true },
    ];


    useEffect(() => {
        const fetchInventoryUsage = async () => {
            try {
                const res = await axios.get(`http://localhost:10000/manager/inventory-usage?timeframe=${timeframe}`);
                console.log('Inventory Usage Response:', res.data);
                setInventoryUsage(Array.isArray(res.data) ? res.data : []); // guard fallback
            } catch (error) {
                console.error('Error fetching inventory usage:', error);

                setInventoryUsage([]); // fallback to avoid map error
            }
        };
    
        if (selectedReport === 'inventory') {
            fetchInventoryUsage();
        }
    }, [selectedReport, timeframe]);

    console.log('Inventory Usage:', inventoryUsage);

    /**
     * Renders a section of navigation items.
     *
     * @param {Array<Object>} items - The navigation items to render.
     * @returns {JSX.Element} The rendered navigation section.
     */
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
                {/* Sidebar Section */}
                <div className="w-64 border-r shadow-sm p-5">
                    <div className="flex items-center mb-8">
                        {/* Logo with navigation to the home page */}
                        <img
                            className="hover:cursor-pointer max-h-28"
                            src={logo}
                            alt="Share Tea Logo"
                            onClick={() => navigate("/")}
                        />
                    </div>
                    <div className="text-gray-800">
                        {renderSection(navItems)}
                    </div>
                </div>
    
                {/* Main Content Section */}
            <div className="flex-1 p-10 bg-gray-50 overflow-y-auto">

            {/* Header Section */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-800">Hello, Stewart Little</h1>
                    <p className="text-sm text-gray-500">Showing ShareTea's Reports</p>
                </div>
                <div>
                    <select
                        value={selectedReport}
                        onChange={(e) => setSelectedReport(e.target.value)}
                        className="p-4 border rounded-md bg-white shadow-sm focus:outline-none"
                    >
                        <option value="inventory">Inventory Usage</option>
                        <option value="x">X Report</option>
                        <option value="z">Z Report</option>
                    </select>
                </div>
            </div>

            {/* Timeframe Selector (conditionally shown) */}
            {selectedReport === 'inventory' && (
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Timeframe:</label>
                    <select
                        value={timeframe}
                        onChange={(e) => setTimeframe(e.target.value)}
                        className="p-3 border rounded-md bg-white shadow-sm focus:outline-none"
                    >
                        <option value="day">Last Day</option>
                        <option value="week">Last Week</option>
                        <option value="month">Last Month</option>
                        <option value="year">Last Year</option>
                    </select>
                </div>
            )}

            {/* Table */}
            {selectedReport === 'inventory' && (
                <div>
                    <h2 className="text-xl font-semibold mb-4">Inventory Usage</h2>
                    <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="text-left px-6 py-3">Inventory ID</th>
                                <th className="text-left px-6 py-3">Name</th>
                                <th className="text-left px-6 py-3">Quantity</th>
                                <th className="text-left px-6 py-3">Times Used</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inventoryUsage.map((item) => (
                                <tr key={item.inventory_id} className="border-t">
                                    <td className="px-6 py-4">{item.inventory_id}</td>
                                    <td className="px-6 py-4">{item.name}</td>
                                    <td className="px-6 py-4">{item.quantity}</td>
                                    <td className="px-6 py-4">{item.usage_count}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
    
            </div>
            </div>
        );
    }
    
    export default Reports;