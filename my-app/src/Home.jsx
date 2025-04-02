import './Home.css';
import logo from './assets/Share Tea.png';
import { useNavigate } from 'react-router-dom';

/**
 * Home Component
 *
 * This component serves as the landing page for the Share Tea application.
 * It provides navigation options for different user roles: Cashier, Manager, and Customer.
 *
 * @component
 * @returns {JSX.Element} The rendered Home page with navigation buttons.
 */
function Home() {
    // Hook to programmatically navigate between routes
    const navigate = useNavigate();

    return (
        <div className="flex flex-col">
            {/* Header Section */}
            <div className="flex items-center justify-between p-5">
                <div className="flex items-center">
                    {/* Logo with navigation to the home page */}
                    <img
                        className="hover:cursor-pointer max-h-28"
                        src={logo}
                        alt="Share Tea Logo"
                        onClick={() => navigate("/")}
                    />
                    <div className="pl-85 font-sans text-emerald-900 font-bold">
                        <h1 className="text-4xl font-bold text-gray-800">
                            Welcome to Share Tea!
                        </h1>
                    </div>
                </div>
            </div>

            {/* Main Content Section */}
            <div className="flex flex-col items-center bg-gradient-to-b from-emerald-50 to-emerald-100 py-16">
                <div className="mt-6 flex flex-col gap-10 w-full max-w-md">
                    {/* Button to navigate to the Cashier Menu */}
                    <button
                        onClick={() => navigate("/login")}
                        className="btn-cashier hover:cursor-pointer py-10 text-2xl font-semibold text-white rounded-2xl shadow-md transition"
                    >
                        Cashier Menu
                    </button>

                    {/* Button to navigate to the Manager Dashboard */}
                    <button
                        onClick={() => navigate("/manager/dashboard")}
                        className="btn-manager hover:cursor-pointer py-10 text-2xl font-semibold text-white rounded-2xl shadow-md transition"
                    >
                        Manager Menu
                    </button>

                    {/* Button to navigate to the Customer Kiosk */}
                    <button
                        onClick={() => navigate("/kiosk")}
                        className="btn-kiosk hover:cursor-pointer py-10 text-2xl font-semibold text-white rounded-2xl shadow-md transition"
                    >
                        Customer Kiosk
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Home;