import { useState } from "react";


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


function CustomModal ( {itemName, itemPrice, img, onClose, addToOrder}) {

        const [toppingsList, setToppingsList] = useState([]);

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

        // States to track the selected tea type, ice level, and sugar level
        //TODO: Rename these functions to be more descriptive

        const [selectedTeaType, setSelectedTeaType] = useState("");
        const handleRadioChange1 = (event) => {
            setSelectedTeaType(event.target.value);
             // Update the selected tea type
        };

        const [selectedIceLevel, setSelectedIceLevel] = useState("");
        const handleRadioChange2 = (event) => {
            setSelectedIceLevel(event.target.value);
        };

        

        const [selectedSugarLevel, setSelectedSugarLevel] = useState("");
        const handleRadioChange3 = (event) => {
            setSelectedSugarLevel(event.target.value);
        };

        return (
            <div id="static-modal" data-modal-backdrop="static" tabIndex="-1" aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative p-4 w-full max-w-2xl max-h-full">
                    <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">

                        {/* Header */}
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Toppings Menu
                            </h3>
                            <button onClick={onClose} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="static-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
    
                        {/* Tea Type Div */}
                        <div className="p-4 md:p-5 space-y-4">
                            <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">Tea Type</h3>
                            <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                    <div className="flex items-center ps-3">
                                        <input onChange = {handleRadioChange1} id="blackTea" type="radio" value="Black Tea" name="list-radio-1" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                        <label htmlFor="blackTea" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Black Tea</label>
                                    </div>
                                </li>
                                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                    <div className="flex items-center ps-3">
                                        <input onChange = {handleRadioChange1} id="greenTea" type="radio" value="Green Tea" name="list-radio-1" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                        <label htmlFor="greenTea" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Green Tea</label>
                                    </div>
                                </li>
                                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                    <div className="flex items-center ps-3">
                                        <input onChange = {handleRadioChange1} id="oolongTea" type="radio" value="Oolong Tea" name="list-radio-1" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                        <label htmlFor="oolongTea" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Oolong Tea</label>
                                    </div>
                                </li>
                            </ul>
                        </div>
    
                        {/* Ice Level Div */}
                        <div className="p-4 md:p-5 space-y-4">
                            <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">Ice Level</h3>
                            <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                    <div className="flex items-center ps-3">
                                        <input onChange= {handleRadioChange2} id="horizontal-list-radio-license" type="radio" value="No Ice" name="list-radio-2" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                        <label htmlFor="horizontal-list-radio-license" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">No Ice </label>
                                    </div>
                                </li>
                                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                    <div className="flex items-center ps-3">
                                        <input onChange = {handleRadioChange2} id="horizontal-list-radio-id" type="radio" value="Light Ice" name="list-radio-2" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                        <label htmlFor="horizontal-list-radio-id" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Light Ice</label>
                                    </div>
                                </li>
                                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                    <div className="flex items-center ps-3">
                                        <input onChange = {handleRadioChange2} id="horizontal-list-radio-military" type="radio" value="Half Ice" name="list-radio-2" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                        <label htmlFor="horizontal-list-radio-military" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Half Ice</label>
                                    </div>
                                </li>
                                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                    <div className="flex items-center ps-3">
                                        <input onChange = {handleRadioChange2} id="horizontal-list-radio-passport" type="radio" value="Less Ice" name="list-radio-2" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                        <label htmlFor="horizontal-list-radio-passport" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Less Ice</label>
                                    </div>
                                </li>
                                <li className="w-full dark:border-gray-600">
                                    <div className="flex items-center ps-3">
                                        <input onChange = {handleRadioChange2} id="horizontal-list-radio-fullIce" type="radio" value="Full Ice" name="list-radio-2" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                        <label htmlFor="horizontal-list-radio-fullIce" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Full Ice</label>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        {/* Sugar level div */}
                        <div className="p-4 md:p-5 space-y-4">
                            <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">Sugar Level </h3>
                            <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                    <div className="flex items-center ps-3">
                                        <input onChange = {handleRadioChange3} id="horizontal-list-radio-license" type="radio" value="No Sugar" name="list-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                        <label htmlFor="horizontal-list-radio-license" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">No Sugar </label>
                                    </div>
                                </li>
                                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                    <div className="flex items-center ps-3">
                                        <input onChange = {handleRadioChange3} id="horizontal-list-radio-id" type="radio" value="Light Sugar" name="list-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                        <label htmlFor="horizontal-list-radio-id" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Light Sugar</label>
                                    </div>
                                </li>
                                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                    <div className="flex items-center ps-3">
                                        <input onChange = {handleRadioChange3} id="horizontal-list-radio-military" type="radio" value="Half Sugar" name="list-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                        <label htmlFor="horizontal-list-radio-military" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Half Sugar</label>
                                    </div>
                                </li>
                                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                    <div className="flex items-center ps-3">
                                        <input onChange = {handleRadioChange3} id="horizontal-list-radio-passport" type="radio" value="Less Sugar" name="list-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                        <label htmlFor="horizontal-list-radio-passport" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Less Sugar</label>
                                    </div>
                                </li>
                                <li className="w-full dark:border-gray-600">
                                    <div className="flex items-center ps-3">
                                        <input onChange = {handleRadioChange3} id="horizontal-list-radio-fullIce" type="radio" value="Full Sugar" name="list-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                        <label htmlFor="horizontal-list-radio-fullIce" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Full Sugar</label>
                                    </div>
                                </li>
                            </ul>
                        </div>
    
                        {/* toppings div */}
                        <div className="p-4 md:p-5 space-y-4">

                            <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">Toppings</h3>
                            <ul className="grid grid-cols-4 gap-4 items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                    <div className="flex items-center ps-3">
                                        <input onChange = {() => handleCheckboxChange("Pudding")}  id="pudding" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                        <label htmlFor="pudding" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Pudding</label>
                                    </div>
                                </li>
                                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                    <div className="flex items-center ps-3">
                                        <input onChange = {() => handleCheckboxChange("Herb Jelly")} id="herbJelly" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                        <label htmlFor="herbJelly" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Herb Jelly</label>
                                    </div>
                                </li>
                                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                    <div className="flex items-center ps-3">
                                        <input onChange = {() => handleCheckboxChange("Crystal Boba")} id="crystalBoba" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                        <label htmlFor="crystalBoba" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Crystal Boba</label>
                                    </div>
                                </li>
                                <li className="w-full dark:border-gray-600">
                                    <div className="flex items-center ps-3">
                                        <input onChange = {() => handleCheckboxChange("Wintermelon")} id="wintermelon" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                        <label htmlFor="wintermelon" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Wintermelon</label>
                                    </div>
                                </li>
                                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                    <div className="flex items-center ps-3">
                                        <input onChange = {() => handleCheckboxChange("Mini Tapioca Pearls")} id="miniTapioca" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                        <label htmlFor="miniTapioca" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Mini Tapioca Pearls</label>
                                    </div>
                                </li>
                                <li className="w-full border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                    <div className="flex items-center ps-3">
                                        <input onChange = {() => handleCheckboxChange("Aloe Vera")} id="aloeVera" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                        <label htmlFor="aloeVera" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Aloe Vera</label>
                                    </div>
                                </li>
                                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                    <div className="flex items-center ps-3">
                                        <input onChange = {() => handleCheckboxChange("Aiyu Jelly")} id="aiyuJelly" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                        <label htmlFor="aiyuJelly" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Aiyu Jelly</label>
                                    </div>
                                </li>
                                <li className="w-full dark:border-gray-600">
                                    <div className="flex items-center ps-3">
                                        <input onChange = {() => handleCheckboxChange("Crushed Oreo")} id="crushedOreo" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                        <label htmlFor="crushedOreo" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Crushed Oreo</label>
                                    </div>
                                </li>
                                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                    <div className="flex items-center ps-3">
                                        <input onChange = {() => handleCheckboxChange("Whipped Cream")} id="whippedCream" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                        <label htmlFor="whippedCream" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Whipped Cream</label>
                                    </div>
                                </li>
                                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                    <div className="flex items-center ps-3">
                                        <input onChange = {() => handleCheckboxChange("Tapicoa Pearls")} id="tapiocaPearls" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                        <label htmlFor="tapiocaPearls" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Tapioca Pearls</label>
                                    </div>
                                </li>
                                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                    <div className="flex items-center ps-3">
                                        <input onChange = {() => handleCheckboxChange("Red Bean")} id="redBean" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                        <label htmlFor="redBean" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Red Bean</label>
                                    </div>
                                </li>
                                <li className="w-full dark:border-gray-600">
                                    <div className="flex items-center ps-3">
                                        <input  onChange = {() => handleCheckboxChange("Lychee Jelly")} id="lycheeJelly" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                        <label htmlFor="lycheeJelly" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Lychee Jelly</label>
                                    </div>
                                </li>
                                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                    <div className="flex items-center ps-3">
                                        <input  onChange = {() => handleCheckboxChange("Lemonade Syrup")} id="lemonadeSyrup" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                        <label htmlFor="lemonadeSyrup" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Lemonade Syrup</label>
                                    </div>
                                </li>
                                <li className="w-full dark:border-gray-600">
                                    <div className="flex items-center ps-3">
                                        <input onChange = {() => handleCheckboxChange("Vanilla Ice Cream")} id="vanillaIceCream" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                        <label htmlFor="vanillaIceCream" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Vanilla Ice Cream</label>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        
                        {/* Buttons div */}
                        <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <button onClick={() => {addToOrder(itemName, itemPrice, img, toppingsList, selectedTeaType, selectedIceLevel, selectedSugarLevel);
                                onClose();
                            }} data-modal-hide="static-modal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to Order</button>
                            <button onClick={onClose} data-modal-hide="static-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        )
}

export default CustomModal