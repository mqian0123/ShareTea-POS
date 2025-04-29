import './Manager.css';
import logo from './assets/Share Tea.png';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, BarChart2, SquarePen, FileText, User, ChefHat, ClipboardList, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import axios from 'axios';

import {
    PieChart, Pie, Cell,
    BarChart, Bar, XAxis, YAxis, Tooltip, Label
} from 'recharts';

const SERVER_API = import.meta.env.VITE_SERVER_API;


/**
 * Manager Component
 *
 * This component serves as the Manager Dashboard for the Share Tea application.
 * It provides navigation options for different manager functionalities, displays
 * key statistics, and visualizes data using charts.
 *
 * @component
 * @returns {JSX.Element} The rendered Manager Dashboard page.
 */


function Manager() {
    // Hook to programmatically navigate between routes
    const navigate = useNavigate();

    const [pieData, setPieData] = useState([
        { name: 'Card', value: 0.00, color: '#A3E635' },
        { name: 'Cash', value: 0.00, color: '#FACC15' },
    ]);
    const [grossRevenue, setGrossRevenue] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);
    const [topEmployee, setTopEmployee] = useState('');
    const [barChartData, setBarChartData] = useState([]);

    // const name = location.state?.userName || "Guest";
    const [name, setName] = useState('');
    useEffect(() => {
        const savedName = localStorage.getItem('name');
        setName(savedName || 'Guest');
    }, []);

    // Fetch gross revenue data
    useEffect(() => {
        const fetchRevenue = async () => {
            try {
                const response = await axios.get(SERVER_API + 'manager/monthly-revenue'); 
                const revenue = parseFloat(response.data.total_cost) || 0;
                setGrossRevenue(revenue);
            } catch (error) {
                console.error('Error fetching gross revenue:', error);
            }
        };
        fetchRevenue();
    }, []);

    // Fetch total orders data
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(SERVER_API + 'manager/monthly-orders');
                const orders = parseInt(response.data.total_orders) || 0;
                setTotalOrders(orders);
            } catch (error) {
                console.error('Error fetching order count:', error);
            }
        };
        fetchOrders();
    }, []);

    // Fetch top employee data
    useEffect(() => {
        const fetchTopEmployee = async () => {
            try {
                const response = await axios.get(SERVER_API + 'manager/top-employee');
                console.log(response.data.name)
                const name = response.data.name || 'N/A';
                setTopEmployee(name);
            } catch (error) {
                console.error('Error fetching top employee:', error);
            }
        };
        fetchTopEmployee();
    }, []);

    // Fetch payment method data for the pie chart
    useEffect(() => {
        const fetchPieData = async () => {
            try {
                const response = await axios.get(SERVER_API + 'manager/payment-methods');
    
                const cashCount = response.data.cash || 0;
                const cardCount = response.data.card || 0;
                const total = cashCount + cardCount;
    
                const percentageCash = total > 0 ? (cashCount / total) * 100 : 0;
                const percentageCard = total > 0 ? (cardCount / total) * 100 : 0;
    
                const newPieData = [
                    { name: 'Cash', value: parseFloat(percentageCash.toFixed(2)), color: '#A3E635' },
                    { name: 'Card', value: parseFloat(percentageCard.toFixed(2)), color: '#FACC15' },
                ];
    
                setPieData(newPieData);
            } catch (error) {
                console.error('Error fetching payment method data:', error);
                setPieData([]);
            }
        };
    
        fetchPieData();
    }, []);

    // Fetch monthly sales data for the bar chart
    useEffect(() => {
    const fetchMonthlySales = async () => {
        try {
            const response = await axios.get(SERVER_API + 'manager/monthly-sales');

            const formatted = response.data.map(row => ({
                name: row.month, // e.g., Jan, Feb
                value: parseFloat(row.total),
            }));

            setBarChartData(formatted);
        } catch (error) {
            console.error('Error fetching monthly sales:', error);
        }
    };
    fetchMonthlySales();
}, []);
    

    /**
     * Navigation items for the sidebar menu.
     * 
     * @constant {Array<Object>}
     */
    const navItems = [
        { name: 'Dashboard', icon: <Home size={25} />, path: '/manager/dashboard', active: true },
        { name: 'Employees', icon: <User size={25} />, path: '/manager/employees' },
        { name: 'Menu Items', icon: <SquarePen size={25} />, path: '/manager/menu' },
        { name: 'Inventory', icon: <ChefHat  size={25} />,  path: '/manager/inventory'},
        { name: 'Reports', icon: <ClipboardList size={25} />, path: '/manager/reports' },
        { name: 'Logout', icon: <LogOut size={25} />, path: '/' }

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
                        <h1 className="text-2xl font-semibold text-gray-800">Hello, {name}</h1>
                        <p className="text-sm text-gray-500">Showing ShareTea's Stats</p>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-4 gap-6 mb-8">
                    {[
                        { label: 'Gross Revenue', value: `$${grossRevenue.toFixed(2)}` },
                        { label: 'Total Orders Placed', value: totalOrders.toLocaleString() },
                        { label: 'Total Tax', value:  `$${(grossRevenue * .05).toFixed(2)}` },
                        { label: 'Top Employee', value: topEmployee },
                    ].map((stat) => (
                        <div className="bg-white p-5 rounded-xl shadow-sm border" key={stat.label}>
                            <p className="text-sm text-gray-500">{stat.label}</p>
                            <h2 className="text-2xl font-bold">{stat.value}</h2>
                            <p className="text-xs text-gray-400 mt-1">In the last month</p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-3 gap-6">
                    {/* Pie Chart Section */}
                    <div className="bg-white p-5 rounded-xl shadow-sm border col-span-1">
                        <h3 className="text-md font-semibold text-gray-700 mb-4">Cash vs. Card </h3>
                        <PieChart width={250} height={200}>
                            <Pie data={pieData} dataKey="value" innerRadius={50} outerRadius={70} label>
                                {pieData.map((entry, index) => (
                                    <Cell key={index} fill={entry.color} />
                                ))}
                            </Pie>
                        </PieChart>
                        <div className="flex justify-between px-4 text-sm text-gray-600 mt-4">
                            {pieData.map((entry) => (
                                <span key={entry.name} className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full" style={{ background: entry.color }}></span>
                                    {entry.name}
                                </span>
                            ))}
                        </div>
                        <p className="text-xs text-gray-400 mt-4">In the last Year</p>
                    </div>

                    {/* Bar Chart Section */}
                    <div className="bg-white p-5 rounded-xl shadow-sm border col-span-2">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-md font-semibold text-gray-700">Monthly Sales Report</h3>
                        </div>
                        <div style={{ width: '100%', height: '200px', marginTop: '50px' }}>
                            <BarChart
                                width={600}
                                height={200}
                                data={barChartData}
                                margin={{ top: 5, right: 0, left: 15, bottom: 15 }}
                            >
                                <XAxis dataKey="name">
                                    <Label value="Month" dy={20} position="insideBottom" />
                                </XAxis>
                                <YAxis>
                                    <Label
                                        value="Sales ($)"
                                        dx={-12}
                                        angle={-90}
                                        position="insideLeft"
                                        style={{ textAnchor: 'middle' }}
                                    />
                                </YAxis>
                                <Tooltip />
                                <Bar dataKey="value" fill="#86EFAC" radius={[5, 5, 0, 0]} />
                            </BarChart>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Manager;