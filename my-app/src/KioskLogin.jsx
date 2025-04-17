import './KioskLogin.css';
import languageIcon from './assets/languageIcon.png'
import accessiblityIcon from './assets/accessibilityIcon.png'
import shareTeaLogo from './assets/Sharetea+logo.avif'
import { useNavigate } from 'react-router-dom';
import PhoneModal from './PhoneModal';
import { useState } from 'react';

function KioskLogin () {

    const navigate = useNavigate();

    const [isPhoneLoginOpen, setPhoneLoginOpen] = useState(false);

    const OpenPhoneLogin = () => {
        console.log("opening this shit");
        setPhoneLoginOpen(true);
    }

    const ClosePhoneLogin = () => {
        setPhoneLoginOpen(false);
    }

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
                <button  onClick = {OpenPhoneLogin} className='hover:cursor-pointer hover:-translate-y-0.5 border p-5 bg-white rounded shadow-md border-gray-100'>
                        <p className='font-bold text-lg block'>
                            Earn Points
                        </p>
                        <p>
                            By using your rewards account
                        </p>
                </button>
                {
                    isPhoneLoginOpen && (
                        <PhoneModal onClose = {ClosePhoneLogin}>
                        </PhoneModal>
                    )
                            
                }
                <button className = "hover:cursor-pointer hover:-translate-y-0.5 border bg-white rounded shadow-md border-gray-100 font-bold flex items-center justify-center">
                    <img src={accessiblityIcon} className='w-20'>
                    </img>
                        Accessibility
                </button>
                <div id="google_translate_element" className='bg-white'></div>

                </div>
            </div>
        </>
        
    )
}

export default KioskLogin