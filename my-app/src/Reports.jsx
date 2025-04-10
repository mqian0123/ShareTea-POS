import './Manager.css';
import logo from './assets/Share Tea.png';
import { useNavigate } from 'react-router-dom';
import { Home, User, ChefHat, SquarePen, ClipboardList, Trash2, PackagePlus } from 'lucide-react';
import { useState, useEffect } from 'react';
import axios from 'axios';





function Reports(){
    const navigate = useNavigate();
    const [selectedReport, setSelectedReport] = useState('x');


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
                            <option value="x">X Report</option>
                            <option value="z">Z Report</option>
                            <option value="total">Total Sales</option>
                        </select>
                    </div>
                    </div>
    

                </div>
            </div>
        );
    }
    
    export default Reports;