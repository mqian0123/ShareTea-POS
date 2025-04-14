import './KioskLogin.css';
import languageIcon from './assets/languageIcon.png'
import accessiblityIcon from './assets/accessibilityIcon.png'
import shareTeaLogo from './assets/Sharetea+logo.avif'
import { useNavigate } from 'react-router-dom';


function KioskLogin () {

    const navigate = useNavigate();

    return (
        <>
            <div className="bg flex flex-col">
                <div className=''>
                    <img src={shareTeaLogo}>
                    </img>  
                </div>

                <div className="flex-col flex m-5 justify-between shadow-md gap-5">
                <button onClick = {() => navigate("/kioskMenu")} className='hover:cursor-pointer hover:-translate-y-0.5 border p-5 bg-white rounded shadow-md border-gray-100'>
                        <p className='font-bold text-lg block'>
                            Start Order
                        </p>
                        <p>
                            Continue without logging in 
                        </p>
                </button>
                <button  className='hover:cursor-pointer hover:-translate-y-0.5 border p-5 bg-white rounded shadow-md border-gray-100'>
                        <p className='font-bold text-lg block'>
                            Earn Points
                        </p>
                        <p>
                            By using your rewards account
                        </p>
                </button>
                <button className='hover:cursor-pointer hover:-translate-y-0.5 border bg-white rounded shadow-md border-gray-100 font-bold flex items-center justify-center'>
                    <img src={languageIcon} className='w-27'>
                    </img>
                    <p>
                        Languages
                    </p>
                </button>
                <button className = "hover:cursor-pointer hover:-translate-y-0.5 border bg-white rounded shadow-md border-gray-100 font-bold flex items-center justify-center">
                    <img src={accessiblityIcon} className='w-20'>
                    </img>
                        Accessibility
                </button>

                    {/* <div className='flex flex-col w-3/5  gap-5'>
                        <div className='flex gap-5'>
                            <button className='border w-1/2 bg-white rounded shadow-md border-gray-100 font-bold flex items-center justify-center'>
                                <img src={languageIcon} className='w-25'>
                                </img>
                                <p>
                                    Languages
                                </p>
                            </button>
                            <button className = "border w-1/2 bg-white rounded shadow-md border-gray-100 font-bold flex items-center justify-center">
                            <img src={accessiblityIcon} className='w-25'>
                            </img>
                                Accessibility
                            </button>
                        </div>
                    </div> */}
                {/* <div className=''>
                    <button className='border h-full bg-white rounded shadow-md border-gray-100 font-bold inline-block p-5'>
                        Earn Points
                    </button>
                </div> */}
                </div>
            </div>
        </>
        
    )
}

export default KioskLogin