import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const SERVER_API = import.meta.env.VITE_SERVER_API;

function PhoneModal ({onClose}) {

    // phoneNumber dynamically updated
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();

    const checkSyntax = () => {
        const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/; // regex expression (XXX) XXX-XXXX
        if(!phoneRegex.test(phoneNumber)) { 
            return false;
        }
        console.log("Phone number format is valid");
        return true;
    };

    const checkExistingNumber = async () => {
        const response = await axios.get(SERVER_API + "cashier/customer", {
            params: { phoneNumber: phoneNumber }
        });
        console.log(response.data[0]);
        return (response.data[0] != undefined);
    }

    const addCustomer = async () => {
        const response = await axios.get(SERVER_API + "cashier/customer", {
            params: { phoneNumber: phoneNumber }
        });
        if(response.data[0] == undefined) { // phone number not yet in databse, add into system
            await axios.get(SERVER_API + "cashier/addCustomer", {
                params: { phoneNumber: phoneNumber }
            });
            console.log("Account added into database!");
        }
        else {
            console.log("ERROR: Account already in database");
        }
        setSuccess(true);
    }

    const fetchCustomerID = async () => {
        const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
        if(!phoneRegex.test(phoneNumber)) { // phone number doesnt match current regex expression
            console.log("incorrect syntax");
            return;
        }
        else {
            try {
                const response = await axios.get(SERVER_API + "cashier/customer", {
                    params: { phoneNumber: phoneNumber }
                });
                console.log("upon obtaining phone number: ");
                console.log(response.data[0]);
                if(response.data[0] == undefined) { // phone number not yet in databse, add into system
                    const newResponse = await axios.get(SERVER_API + "cashier/addCustomer", {
                        params: { phoneNumber: phoneNumber }
                    });
                    setCustomerID(newResponse.data[0]['customer_id']);
                    console.log("Account added into database!");

                }
                else {
                    setCustomerID(response.data[0]['customer_id']);
                }
                } catch (error) {
                console.error('Error fetching employee ID:', error);
                }
        }
    };  
    
    // useEffect(() => {
    //     if (phoneNumber) {
    //         fetchCustomerID();
    //         }
    //     }, [phoneNumber]);

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

                        {showModal && (
                            <div style={styles.modalOverlay}>
                            <div style={styles.modalContent}>
                            {success ? (
                                <>
                                    <p>Successfully added account!</p>
                                    <button onClick={() => 
                                        navigate("/rewardsMenu", {state: {phoneNumber}})
                                    }>Continue</button>
                                </>
                                ) : (
                                <>
                                    <p>Phone number not found. Do you want to add it?</p>
                                    <button onClick={addCustomer}>Yes</button>
                                    <button onClick={() => setShowModal(false)} style={{ marginLeft: '10px' }}>
                                    Cancel
                                    </button>
                                </>
                            )}
                            </div>
                            </div>
                        )}

                        <form class="max-w-sm mx-auto space-y-4">
                            <label for="phone" class="block text-sm font-medium">Phone</label>
                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                pattern="\(\d{3}\) \d{3}-\d{4}"
                                inputmode="numeric"
                                placeholder="(123)-456-7890"
                                required
                                class="peer block w-full px-4 py-2 border rounded-md
                                    focus:outline-none focus:ring-2 focus:ring-blue-400
                                    invalid:border-red-500 invalid:ring-red-200"
                                onChange={e => setPhoneNumber(e.target.value)}
                            />
                            {isVisible && <p class="mt-1 text-sm text-red-600 hidden peer-invalid:block">
                                Please enter a valid phone number in the format (123) 456-7890.
                            </p>}
                            <button
                                type="submit"
                                class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                onClick={async (event) => {
                                    event.preventDefault();
                                    if (!checkSyntax()) { // checks if syntax is correct
                                        setIsVisible(true);
                                    } 
                                    else if (!(await checkExistingNumber())) { // checks if number is in database yet
                                        setShowModal(true);
                                    }
                                    else {  // phoneNumber exists already in database
                                        navigate("/rewardsMenu", {state: {phoneNumber}})
                                    }
                                }}
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

const styles = {
    modalOverlay: {
      position: 'fixed',
      top: 0, left: 0,
      width: '100%', height: '100%',
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '10px',
      textAlign: 'center',
    },
  };

export default PhoneModal;