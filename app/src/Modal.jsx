import './Modal.css';
import {useState} from 'react';

/**
 * 
 * @param  itemName - The name of the item
 * @param  itemPrice - The price of the item
 * @param  img - The image of the item 
 * @param  onClose - The function to close the modal
 * @param  addToOrder - The function to add the item to the order
 *  
 * @returns {JSX.Element} - The modal toppings selection component
 * 
 * @author Seshadithya Saravanan
 */

function Modal({itemName, itemPrice, img, onClose, addToOrder, menuID}) {

    // State to track the selected toppings
    const [toppingsList, setToppingsList] = useState([]);
    //TODO: Change the function names to be relevant to the project
    const handleCheckboxChange = (topping) => {
        setToppingsList((prevSelected) => {
            if (prevSelected.includes(topping)) {
                // Remove the topping if it is already selected
                return prevSelected.filter((item) => item !== topping);
            } else {
                // Add the topping if it is not already selected
                return [...prevSelected, topping];
            }
        });
    };

    // State to track selected ice level
    //TODO: Change the function names to be relevant to the project
    const [selectedIceLevel, setSelectedIceLevel] = useState(""); 
    const handleRadioChange2 = (event) => {
        setSelectedIceLevel(event.target.value);
    };

    
    // State to track selected sugar level
    //TODO: Change the function names to be relevant to the project
    const [selectedSugarLevel, setSelectedSugarLevel] = useState(""); 
    const handleRadioChange3 = (event) => {
        setSelectedSugarLevel(event.target.value);
    };


        return (
            <>
                <div id="static-modal" data-modal-backdrop="static" tabIndex="-1" aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed flex z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div className="relative p-4 w-full max-w-2xl max-h-full">
                        <div className="relative text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ">

                            {/* Header */}
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                                <h3 className="text-xl font-semibold">
                                    Toppings Menu
                                </h3>
                                <button onClick={onClose} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="static-modal">
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            {/* Ice Level Div */}
                            <div className="p-4 md:p-5 space-y-4">
                                <h3 className="mb-4 font-semibold">Ice Level</h3>
                                <ul className="items-center w-full text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 sm:flex ">
                                    <li className="w-full border-b border-gray-200 sm:border-b-0 dark:border-gray-600">
                                        <div className="flex items-center ps-3">
                                            <input onChange= {handleRadioChange2} id="No Ice" type="radio" value="No Ice" name="list-radio-2" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500" />
                                            <label htmlFor="No Ice" className="w-full py-3 ms-2 text-sm font-medium ">No Ice </label>
                                        </div>
                                    </li>
                                    <li className="w-full border-b border-gray-200 sm:border-b-0 dark:border-gray-600">
                                        <div className="flex items-center ps-3">
                                            <input onChange = {handleRadioChange2} id="Light Ice" type="radio" value="Light Ice" name="list-radio-2" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500" />
                                            <label htmlFor="Light Ice" className="w-full py-3 ms-2 text-sm font-medium">Light Ice</label>
                                        </div>
                                    </li>
                                    <li className="w-full border-b border-gray-200 sm:border-b-0 dark:border-gray-600">
                                        <div className="flex items-center ps-3">
                                            <input onChange = {handleRadioChange2} id="Half Ice" type="radio" value="Half Ice" name="list-radio-2" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500" />
                                            <label htmlFor="Half Ice" className="w-full py-3 ms-2 text-sm font-mediu">Half Ice</label>
                                        </div>
                                    </li>
                                    <li className="w-full border-b border-gray-200 sm:border-b-0 dark:border-gray-600">
                                        <div className="flex items-center ps-3">
                                            <input onChange = {handleRadioChange2} id="Less Ice" type="radio" value="Less Ice" name="list-radio-2" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500" />
                                            <label htmlFor="Less Ice" className="w-full py-3 ms-2 text-sm font-mediu">Less Ice</label>
                                        </div>
                                    </li>
                                    <li className="w-full dark:border-gray-600">
                                        <div className="flex items-center ps-3">
                                            <input onChange = {handleRadioChange2} id="Full Ice" type="radio" value="Full Ice" name="list-radio-2" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500" />
                                            <label htmlFor="Full Ice" className="w-full py-3 ms-2 text-sm font-mediu">Full Ice</label>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            {/* Sugar level div */}
                            <div className="p-4 md:p-5 space-y-4">
                                <h3 className="mb-4 font-semibold">Sugar Level </h3>
                                <ul className="items-center w-full text-sm text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 sm:flex">
                                    <li className="w-full border-b border-gray-200 sm:border-b-0 dark:border-gray-600">
                                        <div className="flex items-center ps-3">
                                            <input onChange = {handleRadioChange3} id="No Sugar" type="radio" value="No Sugar" name="list-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500" />
                                            <label htmlFor="No Sugar" className="w-full py-3 ms-2 text-sm font-medium">No Sugar </label>
                                        </div>
                                    </li>
                                    <li className="w-full border-b border-gray-200 sm:border-b-0 dark:border-gray-600">
                                        <div className="flex items-center ps-3">
                                            <input onChange = {handleRadioChange3} id="Light Sugar" type="radio" value="Light Sugar" name="list-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500" />
                                            <label htmlFor="Light Sugar" className="w-full py-3 ms-2 text-sm font-medium">Light Sugar</label>
                                        </div>
                                    </li>
                                    <li className="w-full border-b border-gray-200 sm:border-b-0 dark:border-gray-600">
                                        <div className="flex items-center ps-3">
                                            <input onChange = {handleRadioChange3} id="Half Sugar" type="radio" value="Half Sugar" name="list-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500" />
                                            <label htmlFor="Half Sugar" className="w-full py-3 ms-2 text-sm font-medium">Half Sugar</label>
                                        </div>
                                    </li>
                                    <li className="w-full border-b border-gray-200 sm:border-b-0 dark:border-gray-600">
                                        <div className="flex items-center ps-3">
                                            <input onChange = {handleRadioChange3} id="Less Sugar" type="radio" value="Less Sugar" name="list-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500" />
                                            <label htmlFor="Less Sugar" className="w-full py-3 ms-2 text-sm font-medium">Less Sugar</label>
                                        </div>
                                    </li>
                                    <li className="w-full dark:border-gray-600">
                                        <div className="flex items-center ps-3">
                                            <input onChange = {handleRadioChange3} id="Full Sugar" type="radio" value="Full Sugar" name="list-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500" />
                                            <label htmlFor="Full Sugar" className="w-full py-3 ms-2 text-sm font-medium">Full Sugar</label>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            {/* toppings div */}
                            <div className="p-4 md:p-5 space-y-4">
                                <h3 className="mb-4 font-semibold">Toppings</h3>
                                <ul className="grid grid-cols-4 gap-4 items-center w-full text-sm text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                                    <li className="w-full border-b border-gray-200 sm:border-b-0 dark:border-gray-600">
                                        <div className="flex items-center ps-3">
                                            <input onChange = {() => handleCheckboxChange("Pudding")}  id="pudding" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 " />
                                            <label htmlFor="pudding" className="w-full py-3 ms-2 text-sm font-medium">Pudding</label>
                                        </div>
                                    </li>
                                    <li className="w-full border-b border-gray-200 sm:border-b-0 dark:border-gray-600">
                                        <div className="flex items-center ps-3">
                                            <input onChange = {() => handleCheckboxChange("Herb Jelly")} id="herbJelly" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 " />
                                            <label htmlFor="herbJelly" className="w-full py-3 ms-2 text-sm font-medium">Herb Jelly</label>
                                        </div>
                                    </li>
                                    <li className="w-full border-b border-gray-200 sm:border-b-0 dark:border-gray-600">
                                        <div className="flex items-center ps-3">
                                            <input onChange = {() => handleCheckboxChange("Crystal Boba")} id="crystalBoba" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 " />
                                            <label htmlFor="crystalBoba" className="w-full py-3 ms-2 text-sm font-medium">Crystal Boba</label>
                                        </div>
                                    </li>
                                    <li className="w-full dark:border-gray-600">
                                        <div className="flex items-center ps-3">
                                            <input onChange = {() => handleCheckboxChange("Wintermelon")} id="wintermelon" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 " />
                                            <label htmlFor="wintermelon" className="w-full py-3 ms-2 text-sm font-medium">Wintermelon</label>
                                        </div>
                                    </li>
                                    <li className="w-full border-b border-gray-200 sm:border-b-0 dark:border-gray-600">
                                        <div className="flex items-center ps-3">
                                            <input onChange = {() => handleCheckboxChange("Mini Tapioca Pearls")} id="miniTapioca" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 " />
                                            <label htmlFor="miniTapioca" className="w-full py-3 ms-2 text-sm font-medium">Mini Tapioca Pearls</label>
                                        </div>
                                    </li>
                                    <li className="w-full border-gray-200 sm:border-b-0 dark:border-gray-600">
                                        <div className="flex items-center ps-3">
                                            <input onChange = {() => handleCheckboxChange("Aloe Vera")} id="aloeVera" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 " />
                                            <label htmlFor="aloeVera" className="w-full py-3 ms-2 text-sm font-medium">Aloe Vera</label>
                                        </div>
                                    </li>
                                    <li className="w-full border-b border-gray-200 sm:border-b-0 dark:border-gray-600">
                                        <div className="flex items-center ps-3">
                                            <input onChange = {() => handleCheckboxChange("Aiyu Jelly")} id="aiyuJelly" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 " />
                                            <label htmlFor="aiyuJelly" className="w-full py-3 ms-2 text-sm font-medium">Aiyu Jelly</label>
                                        </div>
                                    </li>
                                    <li className="w-full dark:border-gray-600">
                                        <div className="flex items-center ps-3">
                                            <input onChange = {() => handleCheckboxChange("Crushed Oreo")} id="crushedOreo" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 " />
                                            <label htmlFor="crushedOreo" className="w-full py-3 ms-2 text-sm font-medium">Crushed Oreo</label>
                                        </div>
                                    </li>
                                    <li className="w-full border-b border-gray-200 sm:border-b-0 dark:border-gray-600">
                                        <div className="flex items-center ps-3">
                                            <input onChange = {() => handleCheckboxChange("Whipped Cream")} id="whippedCream" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 " />
                                            <label htmlFor="whippedCream" className="w-full py-3 ms-2 text-sm font-medium">Whipped Cream</label>
                                        </div>
                                    </li>
                                    <li className="w-full border-b border-gray-200 sm:border-b-0 dark:border-gray-600">
                                        <div className="flex items-center ps-3">
                                            <input onChange = {() => handleCheckboxChange("Tapicoa Pearls")} id="tapiocaPearls" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 " />
                                            <label htmlFor="tapiocaPearls" className="w-full py-3 ms-2 text-sm font-medium">Tapioca Pearls</label>
                                        </div>
                                    </li>
                                    <li className="w-full border-b border-gray-200 sm:border-b-0 dark:border-gray-600">
                                        <div className="flex items-center ps-3">
                                            <input onChange = {() => handleCheckboxChange("Red Bean")} id="redBean" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 " />
                                            <label htmlFor="redBean" className="w-full py-3 ms-2 text-sm font-medium">Red Bean</label>
                                        </div>
                                    </li>
                                    <li className="w-full dark:border-gray-600">
                                        <div className="flex items-center ps-3">
                                            <input  onChange = {() => handleCheckboxChange("Lychee Jelly")} id="lycheeJelly" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 " />
                                            <label htmlFor="lycheeJelly" className="w-full py-3 ms-2 text-sm font-medium">Lychee Jelly</label>
                                        </div>
                                    </li>
                                    <li className="w-full border-b border-gray-200 sm:border-b-0 dark:border-gray-600">
                                        <div className="flex items-center ps-3">
                                            <input  onChange = {() => handleCheckboxChange("Lemonade Syrup")} id="lemonadeSyrup" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500" />
                                            <label htmlFor="lemonadeSyrup" className="w-full py-3 ms-2 text-sm font-medium">Lemonade Syrup</label>
                                        </div>
                                    </li>
                                    <li className="w-full dark:border-gray-600">
                                        <div className="flex items-center ps-3">
                                            <input onChange = {() => handleCheckboxChange("Vanilla Ice Cream")} id="vanillaIceCream" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 " />
                                            <label htmlFor="vanillaIceCream" className="w-full py-3 ms-2 text-sm font-medium">Vanilla Ice Cream</label>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            {/* Footer with add to order and cancel buttons */}
                            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <button onClick={() => {addToOrder(itemName, itemPrice, img, toppingsList, selectedIceLevel, selectedSugarLevel);
                                onClose();
                            }} data-modal-hide="static-modal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to Order</button>                                
                            <button onClick={onClose} data-modal-hide="static-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
            );
}

export default Modal;