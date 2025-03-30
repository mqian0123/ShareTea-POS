import './Manager.css';
import logo from './assets/Share Tea.png';
import { useNavigate } from 'react-router-dom';
import { Home, BarChart2, SquarePen, FileText} from 'lucide-react';

import {
    PieChart, Pie, Cell,
    BarChart, Bar, XAxis, YAxis, Tooltip, Label
  } from 'recharts';
  
//This is all temp data for the charts, will be replaced with real data from the database later
  const pieData = [
    { name: 'Card', value: 55.78, color: '#A3E635' },
    { name: 'Cash', value: 44.22, color: '#FACC15' },
  ];
  
  const barData = [
    { name: 'Jan', value: 8000 },
    { name: 'Feb', value: 7600 },
    { name: 'Mar', value: 7000 },
    { name: 'Apr', value: 8500 },
    { name: 'May', value: 6200 },
    { name: 'Jun', value: 5000 },
    { name: 'Jul', value: 6300 },
    { name: 'Aug', value: 6500 },
    { name: 'Sep', value: 0 },
    { name: 'Oct', value: 0 },
    { name: 'Nov', value: 0 },
    { name: 'Dec', value: 0 },
  ];

function Manager() {
    const navigate = useNavigate();

    const navItems = [
        { name: 'Dashboard', icon: <Home size={25} />, path: '/manager/dashboard', active: true },
        { name: 'Analytics', icon: <BarChart2 size={25} />, path: '/manager/analytics' },
        { name: 'Edit Menu Items', icon: <SquarePen size={25} />, path: '/manager/edit' },
        { name: 'Reports', icon: <FileText size={25} />, path: '/manager/reports' },
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
                <p className="text-sm text-gray-500">Showing ShareTea's stats</p>
            </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-6 mb-8">
            {[
                { label: 'Gross Revenue', value: '$3,321.00' },
                { label: 'Total Orders Placed', value: '2520' },
                { label: 'Toppings Sales', value: '$1,250.00' },
                { label: 'Total Tax', value: '$575.00' },
            ].map((stat) => (
                <div className="bg-white p-5 rounded-xl shadow-sm border" key={stat.label}>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <h2 className="text-2xl font-bold">{stat.value}</h2>
                <p className="text-xs text-gray-400 mt-1">From this month</p>
                </div>
            ))}
            </div>

            <div className="grid grid-cols-3 gap-6">
            {/* Pie Chart */}
            <div className="bg-white p-5 rounded-xl shadow-sm border col-span-1">
                <h3 className="text-md font-semibold text-gray-700 mb-4">Card vs. Credit</h3>
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
            </div>

            {/* Bar Chart */}
            <div className="bg-white p-5 rounded-xl shadow-sm border col-span-2">
                <div className="flex justify-between items-center mb-4">
                <h3 className="text-md font-semibold text-gray-700">Monthly sales report</h3>
                <select className="border border-gray-200 rounded px-2 py-1 text-sm">
                    <option>Monthly</option>
                    <option>Weekly</option>
                </select>
                </div>
                <BarChart width={700} height={200} data={barData} margin={{ top: 5, right: 0, left: 15, bottom: 15 }}> 
                <XAxis dataKey="name">
                    <Label value="Month" dy={20} position="insideBottom" />  
                </XAxis>
                <YAxis> 
                    <Label value="Sales ($)" dx={-12} angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />
                </YAxis>
                <Tooltip />
                <Bar dataKey="value" fill="#86EFAC" radius={[5, 5, 0, 0]} />
                </BarChart>
            </div>
            </div>
        </div>        
    </div>
          
    );
}

export default Manager;
