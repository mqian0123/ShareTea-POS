import './Home.css';
import logo from './assets/Share Tea.png'
import { useNavigate } from 'react-router-dom';


function Home () {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col">
        <div className="flex items-center justify-between p-5">
          <div className="flex items-center">
            <img className = "hover:cursor-pointer max-h-28" src={logo} onClick={() => navigate("/")}/>
            <div className="pl-85 font-sans text-emerald-900 font-bold">
              <h1 className="text-4xl font-bold text-gray-800">Welcome to Share Tea!</h1>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center bg-gradient-to-b from-emerald-50 to-emerald-100 py-16">
          <div className="mt-6 flex flex-col gap-10 w-full max-w-md">
            <button
              onClick={() => navigate("/cashier")}
              className="btn-cashier hover:cursor-pointer py-10 text-2xl font-semibold text-white rounded-2xl shadow-md transition"
            >
              Cashier Menu
            </button>
            <button
              onClick={() => navigate("/manager")}
              className="btn-manager hover:cursor-pointer py-10 text-2xl font-semibold text-white rounded-2xl shadow-md transition"
            >
              Manager Menu
            </button>
            <button
              onClick={() => navigate("/kiosk")}
              className="btn-kiosk hover:cursor-pointer py-10 text-2xl font-semibold text-white rounded-2xl shadow-md transition"
            >
              Customer Kiosk
            </button>
          </div>
        </div>
      </div>
    )
}

export default Home