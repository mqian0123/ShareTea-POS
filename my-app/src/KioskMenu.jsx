/**
 * @component Cashier
 * @description This is the landing page for the cashier side GUI.
 * 
 * @version 1.4
 * @author Seshadithya Saravanan
 * @author Luke Gutierrez
 */

import './Cashier.css'
import ItemCard from './ItemCard.jsx'
import userIcon from './assets/profile-pic-icon.webp'
import Categories from './Categories.jsx'
import wintermelonLemonade from './assets/Wintermelon Lemonade.jpg'
import honeyLemonade from './assets/Honey+Lemonade.jpg'
import strawberryTea from './assets/Strawberry+Tea.jpg'
import coffeeMilkTea from './assets/Classic+Milk+Tea.jpg'
import classicPearlMilkTea from './assets/Classic+Pearl+Milk+Tea.jpg'
import honeyMilkTea from './assets/Honey+Milk+Tea.jpg'
import mangoGreenMilkTea from './assets/Mango+Green+Milk+Tea.jpg'
import classicTea from './assets/Classic+Tea.jpg'
import honeyTea from './assets/Honey+Tea.jpg'
import wintermelonTea from './assets/Wintermelon+Tea.jpg'
import milkIceBlended from './assets/Milk+Tea+Ice+Blended.jpg'
import mangoIceBlended from './assets/Mango+Ice+Blended.jpg'
import oreoIceBlended from './assets/Oreo+Ice+Blended.jpg'
import mangoMojito from './assets/Mango+Mojito.jpg'
import strawberryMojito from './assets/Strawberry+Mojito.jpg'
import limeMojito from './assets/Lime+Mojito.jpg'
import wintermelonCreama from './assets/Wintermelon+Creama.jpg'
import {useState, useEffect, useCallback} from 'react'
import { useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google'
import axios from 'axios';
import SwipeableOrderButton from './SwipeableOrderButton.jsx'
import { useLocation } from 'react-router-dom';
import Weather from './Weather.jsx';
import shareTeaLogo from './assets/Sharetea+logo.avif'
import CartModal from './CartModal.jsx'
import GoogleTranslate from './GoogleTranslate.jsx'
import SuccessModal from './SuccessModal.jsx';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'



const SERVER_API = import.meta.env.VITE_SERVER_API;

/**
 * 
 * @param {String} name 
 * @param {String} value 
 * @param {Number} days
 */
const setCookie = (name, value, days = 7) => {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (JSON.stringify(value) || "") + expires + "; path=/";
};

const getCookie = (name) => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) {
            const value = c.substring(nameEQ.length, c.length);
            try {
                return JSON.parse(value);
            } catch (e) {
                return value;
            }
        }
    }
    return null;
};


/**
 * 
 * @returns {JSX.Element}
 * @description This function returns the JSX for the Cashier page.
 * @author Seshadithya Saravanan
 * @author Luke Gutierrez
 * 
 * 
 */

function KioskMenu () {

        // Get the current date and format it to display the day, date, and month
        const currentDate = new Date();
        const date1 = currentDate.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' });
    
        // Location hook to get state from previous page (login page) so we can get the user's name and email from the google oAuth API
        const location = useLocation();
        const { userName = "Guest", email = "guest.gmail.com"} = location.state || {}; // Destructure userName and email from state
    
        const [employeeID, setEmployeeID] = useState(null);
        const [customerID, setCustomerID] = useState(1);
    
        useEffect(() => {
            const fetchEmployeeID = async () => {
                try {
                const response = await axios.get(SERVER_API + "cashier/employee", {
                    params: { email: email }
                });
                    setEmployeeID(response.data[0]['employee_id'])
                } catch (error) {
                console.error('Error fetching employee ID:', error);
                }
            };
        
            fetchEmployeeID();
        }, []); // [] ensures it runs only once on mount
    
        // navigate hook to navigate to different pages
        const navigate = useNavigate();
    
        // State hooks to store the selected category, search term, and order list
        const [selectedCategory, setSelectedCategory] = useState(null);
        const [searchTerm, setSearchTerm] = useState('');
        const [orderList, setOrderList] = useState(() => {
            // Initialize from cookie if it exists, otherwise empty array
            const savedOrderList = getCookie('kioskOrderList');
            return savedOrderList || [];
        });
    
        // State hooks for the order types
        const [activeButton, setActiveButton] = useState(() => {
            const savedActiveButton = getCookie('activeButton');
            return savedActiveButton || 0;
        });
    
        // useEffect (() => {
        //     const storedButton = localStorage.getItem('storedOrderType');
        //     if (storedButton) {
        //         setActiveButton(JSON.parse(storedButton));
        //     }
        // }, [])
    
        // State hook for customer name so that it can be cleared after the order is placed
        const [customerName, setCustomerName] = useState(() => {
            const savedCustomerName = getCookie('customerName');
            return savedCustomerName || '';
        });
    
        const [phoneNumber, setPhoneNumber] = useState(() => {
            const savedPhoneNumber = getCookie('phoneNumber');
            return savedPhoneNumber || 'xxx-xxx-xxxx'
        });
    
        const [selectedTable, setSelectedTable] = useState(() => {
            const savedTable = getCookie('selectedTable');
            return savedTable || 'Choose a Table';
        });
    
        // phoneNumber must be stored as a strong in the format "(XXX) XXX-XXXX"
        const fetchCustomerID = async () => {
            console.log("fetchCustomerID?");
            const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
            if(!phoneRegex.test(phoneNumber)) { // phone number doesnt match current regex expression
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
        
        useEffect(() => {
            if (phoneNumber) {
                fetchCustomerID();
                }
            }, [phoneNumber]);
        // State hook for the current order type
        // const [currentOrderType, setOrderType] = useState("");
        // Menu items
        const menuItems = [
            { name: "Wintermelon Lemonade", price: 7.00, img: wintermelonLemonade, isSpecial: false, categoryName: "Fruit Tea", menuID:55, points:700},
            { name: "Strawberry Tea", price: 5.00, img: strawberryTea, isSpecial: false, categoryName: "Fruit Tea", menuID:  56, points: 500},
            { name: "Honey Lemonade with Aloe Vera", price: 7.50, img: honeyLemonade, isSpecial: false, categoryName: "Fruit Tea", menuID: 57, points: 750 },
            { name: "Classic Pearl Milk Tea", price: 9.00, img: classicPearlMilkTea, isSpecial: true, categoryName: "Milk Tea", menuID: 50, points: 900},
            { name: "Coffee Milk Tea", price: 10.00, img: coffeeMilkTea, isSpecial: false, categoryName: "Milk Tea", menuID: 48, points: 1000},
            { name: "Honey Milk Tea", price: 9.00, img: honeyMilkTea, isSpecial: true, categoryName: "Milk Tea", menuID:  49, points: 900},
            { name: "Mango Green Milk Tea", price: 10.00, img: mangoGreenMilkTea, isSpecial: false, categoryName: "Milk Tea", menuID: 51, points: 1000},
            { name: "Classic Tea", price: 10.00, img: classicTea, isSpecial: true, categoryName: "Brewed Tea", menuID: 52, points: 900},
            { name: "Honey Tea", price: 9.00, img: honeyTea, isSpecial: true, categoryName: "Brewed Tea", menuID: 54, points: 900},
            { name: "Wintermelon Tea", price: 10.00, img: wintermelonTea, isSpecial: false, categoryName: "Brewed Tea", menuID: 53, points: 1000},
            { name: "Milk Tea Ice Blended with Pearl", price: 10.00, img: milkIceBlended, isSpecial: false, categoryName: "Ice Blended", menuID: 59, points: 1000},
            { name: "Mango Ice Blended with Ice Cream", price: 9.00, img: mangoIceBlended, isSpecial: false, categoryName: "Ice Blended", menuID:  60, points: 900},
            { name: "Oreo Ice Blended with Pearl", price: 10.00, img: oreoIceBlended, isSpecial: false, categoryName: "Ice Blended", menuID:58, points: 1000 },
            { name: "Lime Mojito", price: 10.00, img: limeMojito, isSpecial: false, categoryName: "Tea Mojito", menuID: 61, points: 1000},
            { name: "Mango Mojito", price: 9.00, img: mangoMojito, isSpecial: false, categoryName: "Tea Mojito", menuID:  62, points: 900},
            { name: "Strawberry Mojito", price: 10.00, img: strawberryMojito, isSpecial: false, categoryName: "Tea Mojito", menuID: 63, points: 1000},
            { name: "Wintermelon Creama", price: 10.00, img: wintermelonCreama, isSpecial: false, categoryName: "Creama", menuID: 74, points: 1000},
        ]
    
        const categories = [
            { name: null, status: "Available"},
            { name: "Fruit Tea", status: "Available"},
            { name: "Milk Tea", status: "Available"},
            { name: "Brewed Tea", status: "Available"},
            { name: "Ice Blended", status: "Available"},
            { name: "Tea Mojito", status: "Available"},
            { name: "Creama", status: "Available"},
        ]
    
        /**
         * @description Filter the menu items based on the selected category and search term
         * @returns {Array} filteredItems - The filtered menu items
         * @author Luke Gutierrez
         * 
         */
        const filteredItems = menuItems.filter(item => {
            const matchesCategory = selectedCategory ? item.categoryName === selectedCategory : true;
            const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    
        // Order types data structure for the order type button group
        const orderType = [
            { id: 1, text: "Dine in" },
            { id: 2, text: "Take out" },
            { id: 3, text: "Online" }
        ];
    
        /** 
         * @description Add an item to the order list
         * @param {String} name - The name of the item
         * @param {Number} price - The price of the item
         * @param {String} img - The image of the item
         * @param {Array} toppingsList - The list of toppings
         * @param {String} selectedTeaType - The selected tea type
         * @param {String} selectedIceLevel - The selected ice level
         * @param {String} selectedSugarLevel - The selected sugar level
         * @returns {Void} - No return value
         * 
         * @author Seshadithya Saravanan
        */
        const addToOrder = (name, price, img, toppingsList, selectedTeaType, selectedIceLevel, selectedSugarLevel, menuID) => {
            const newItem = {
                name: name,
                price: price,
                img: img,
                quantity: 1,
                toppings: toppingsList,
                teaType: selectedTeaType,
                iceLevel: selectedIceLevel,
                sugarLevel: selectedSugarLevel,
                total: price,
                meunID: menuID
            };
            setOrderList([...orderList, newItem]);
        };
    
        /**
         * @description Increment the quantity of an item in the order list
         * @param {String} name - The name of the item
         * @returns {Void} - No return value
         * 
         * @author Seshadithya Saravanan
         */
        const incrementQuantity = (name) => {
            setOrderList(orderList.map((item) => item.name === name ? {...item, quantity: item.quantity + 1, total: (item.quantity + 1) * item.price } : item));
        }
    
        /**
         * @description Decrement the quantity of an item in the order list
         * @param {String} name - The name of the item
         * @returns {Void} - No return value
         * 
         * @author Seshadithya Saravanan
         */
        const decrementQuantity = (name) => {
            setOrderList(orderList.map((item) => item.name === name && item.quantity > 1 
                                                                ? {...item, quantity: item.quantity - 1, total: (item.quantity - 1) * item.price } 
                                                                : item));         
        }
        
    
        /**
         * 
         * @param {Number} index 
         * @description Removes the item at index from the current order list
         * @returns {Void}
         * 
         * @author Seshadithya Saravanan
         */
        const deleteItem = (index) => {
            setOrderList(orderList.filter((_, i) => i!==index))
        }
    
        /**
         * @description Calculate the total price of all the items in the order list
         * @returns {Number} sum - The total price of all the items in the order list
         * 
         * @author Seshadithya Saravanan
         */
        const calculateTotal = () => {
            let sum = 0;
            for (let index = 0; index < orderList.length; index++) {
                sum += orderList[index].total;
            }
            return sum;
        }
    
        /**
         * @description Clear the customer name after the order is placed
         * @returns {Void} - No return value
         * 
         * @author Seshadithya Saravanan
         */
        const clearUserName = () => {
            setCustomerName('');
        }
    
    
        /**
         * @description Handle the logout button click event
         * @returns {Void} - No return value
         * 
         * @author Seshadithya Saravanan
         */
        const handleLogout = () => {
            googleLogout();
            navigate('/');
        }
    
        /**
         * @description Saves the customer name, orderList, activeButton, phoneNumber, and selectedTable to cookie storage upon change
         * @returns {Void}
         * 
         * @author Seshadithya Saravanan
         */
    
        useEffect(() => {
            setCookie("customerName", customerName);
        }, [customerName]);
    
        // Add this useEffect to save to cookie whenever orderList changes
        useEffect(() => {
            setCookie("kioskOrderList", orderList);
        }, [orderList]);
    
        useEffect(() => {
            setCookie("activeButton", activeButton);
        }, [activeButton])
    
        useEffect(() => {
            setCookie("phoneNumber", phoneNumber);
        }, [phoneNumber])
    
        useEffect(() => {
            setCookie("selectedTable", selectedTable);
        }, [selectedTable])
    
        const [paymentMethod, setPaymentMethod] = useState('Cash');
        
        const handlePaymentMethod = (paymentMethod) => {
            setPaymentMethod(paymentMethod)
        }
    
        useEffect(() => {
            console.log(paymentMethod);
        }, [paymentMethod])
    
        const [isCartModalOpen, setCartModalOpen] = useState(false);

        const openCartModal = () => {
            setCartModalOpen(true);
        }

        const closeCartModal = () => {
            setCartModalOpen(false);
        }

        const calculateTotalQuantity = () => {
            let sum = 0;
            for (let index = 0; index < orderList.length; index++) {
                sum += orderList[index].quantity;
            }
            return sum;
        }
    
        const [successModal, setSuccessModal] = useState(false);

        const openSuccessModal = () => {
            setSuccessModal(true);
        }

        const closeSuccessModal = () => {
            setSuccessModal(false);
        }
        
        const { width, height } = useWindowSize()

        return (
            <div className = "flex flex-col bg-amber-50">
                {/* Navbar */}
                <div className = "flex items-center justify-between p-5">
                    <div className = "flex items-center">
                        <img className = "hover:cursor-pointer max-h-15" src={shareTeaLogo}  onClick={() => navigate("/")}/>
    
                        <p className = "pl-10 font-sans text-red-600 font-bold">
                            {date1}
                        </p>
                    </div>
                    <Weather>
                    </Weather>
                    <button onClick = {openCartModal} type="button" class="text-white bg-red-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2">
                        <svg class="w-3.5 h-3.5 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
                        <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z"/>
                        </svg>
                        <p>{calculateTotalQuantity()}</p>
                    </button>
                    {
                        isCartModalOpen && (
                            <CartModal onClose = {closeCartModal} orderList = {orderList} incrementQuantity = {incrementQuantity} decrementQuantity = {decrementQuantity} deleteItem={deleteItem} calculateTotal={calculateTotal} displaySuccessful = {openSuccessModal} clearOrderList = {setOrderList}>
                            </CartModal>
                        )
                    }
                    {
                        successModal && (
                            <>
                                <Confetti
                                    width={width}
                                    height={height}
                                />
                                <SuccessModal onClose= {closeSuccessModal} handleLogout = {handleLogout}>
                                </SuccessModal>
                            </>
                            
                        )
                    }
                    <GoogleTranslate/>

                    

                    <Menu as="div" className="relative inline-block text-left">
                            <div>
                                <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50">
                                {userName}
                                <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
                                </MenuButton>
                            </div>

                            <MenuItems
                                transition
                                className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                            >
                                <div className="py-1">
                                    <MenuItem>
                                    <button
                                        type="submit"
                                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                                        onClick={handleLogout}
                                    >
                                        Sign out
                                    </button>
                                    </MenuItem>
                                </div>
                            </MenuItems>
                        </Menu>

                </div>
    
                {/* Main Content */}
                
    
                    {/* Searchbar and itemCards*/}
                    <div className = "flex flex-col m-5">
    
                        {/* Search bar */}
                        <form className="max-w-full">   
                            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
    
                                    </svg>
                                </div>
                                <input type="search" 
                                id="default-search" 
                                value = {searchTerm}
                                onChange = {(e) => setSearchTerm(e.target.value)}
                                className="block w-full p-4 ps-10 text-sm rounded-full border-red-600 border-2" 
                                placeholder="Search" required />                            
                                <button type="submit" className=" absolute end-2.5 bottom-2.5 bg-red-600 focus:ring-4 font-medium rounded-full text-sm px-4 py-2">⎆</button>
                            </div>
                        </form>
                        {/* Category Cards */}
                        <div className = "flex overflow-auto">
                            {categories.map((category) => (
                                <Categories 
                                    onClick = {() => setSelectedCategory(category.name)}
                                    status = {category.status} 
                                    categoryName = {category.name === null ? "All" : category.name}
                                    menuList = {menuItems}
                                    className={`rounded-full cursor-pointer py-5 ${
                                        selectedCategory === category.name 
                                        ? 'hover:cursor-pointer w-auto m-5 inline-block border  py-4 pr-20 pl-5 transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 bg-red-600 text-white' 
                                        : 'hover:cursor-pointer w-auto m-5 inline-block bg-white border py-4 pr-20 pl-5 transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-red-600 hover:text-white focus:bg-red-600 focus:text-white'
                                    }`}
                                />
                            ))}
                        </div>
    
                        {/* Item Cards filtered based on selected category */}
                        <div className = "flex gap-5 overflow-auto">
                            {filteredItems.map((item, index) => (
                                <ItemCard 
                                key={index} 
                                itemName={item.name} 
                                itemPrice={item.price} 
                                img={item.img} 
                                isSpecial = {item.isSpecial}
                                categoryName={item.categoryName}
                                menuID = {item.menuID}
                                addToOrder = {addToOrder}/>
                            ))}
                        </div>
                    </div>
            </div>      
        )
    }


export default KioskMenu;