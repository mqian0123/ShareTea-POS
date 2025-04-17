import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function PhoneModal ({onClose}) {

    const [phoneNumber, setPhoneNumber] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        console.log(phoneNumber);
    }, [phoneNumber]);

    return (
        <>
            <div id="static-modal" data-modal-backdrop="static" tabIndex="-1" aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed flex z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative p-4 w-full max-w-2xl max-h-full">
                    <div className="relative text-gray-900 bg-white border font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ">
                        
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200 mb-5">
                                <h3 className="text-xl font-semibold">
                                    Enter your rewards phone number
                                </h3>
                                <button onClick={onClose} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="static-modal">
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                        </div>


                        <form class="max-w-sm mx-auto space-y-4">
                            <label for="phone" class="block text-sm font-medium">Phone</label>
                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                pattern="\(\d{3}\)-\d{3}-\d{4}"
                                inputmode="numeric"
                                placeholder="(123)-456-7890"
                                required
                                class="peer block w-full px-4 py-2 border rounded-md
                                    focus:outline-none focus:ring-2 focus:ring-blue-400
                                    invalid:border-red-500 invalid:ring-red-200"
                                onChange={e => setPhoneNumber(e.target.value)}
                            />
                            <p class="mt-1 text-sm text-red-600 hidden peer-invalid:block">
                                Please enter a valid phone number in the format (123)-456-7890.
                            </p>
                            <button
                                type="submit"
                                class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                onClick={() => navigate("/kioskMenu")}
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
    
}

export default PhoneModal;