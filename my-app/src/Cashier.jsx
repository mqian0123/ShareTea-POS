/**
 * @component Cashier
 * @description This is the landing page for the cashier side GUI.
 * 
 * @version 1.4
 * @author Seshadithya Saravanan
 * @author Luke Gutierrez
 */

import './Cashier.css'
import logo from './assets/Share Tea.png'
import ItemCard from './ItemCard.jsx'
import userIcon from './assets/profile-pic-icon.webp'
import Categories from './Categories.jsx'
import wintermelonLemonade from './assets/Wintermelon Lemonade.jpg'
import honeyLemonade from './assets/Honey+Lemonade.jpg'
import strawberryTea from './assets/Strawberry+Tea.jpg'
import peachTea from './assets/Peach+Tea.jpg'
import mangoGreenTea from './assets/Mango Green Tea.jpg'
import kiwiTea from './assets/Kiwi+Aiyu+Fruit+Tea.jpg'
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
import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google'
import axios from 'axios';
import SwipeableOrderButton from './SwipeableOrderButton.jsx'
import { useLocation } from 'react-router-dom';
import Weather from './Weather.jsx';

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

// const apiCall = () => {
//     const data = {
//         name: "BLAHBLHBALBHALBHAHBABHBL",
//         role: "Developer",
//         phone_number: "dingus",
//         email: "dingus@email.com"
//     }
//     axios.post('http://localhost:8080/cashier/employees', data).then((data) => {
//       //this console.log will be in our frontend console
//     console.log(data)
//     })
//     .catch(error => {
//         console.log("error");
//     });
// }


/**
 * 
 * @returns {JSX.Element}
 * @description This function returns the JSX for the Cashier page.
 * @author Seshadithya Saravanan
 * @author Luke Gutierrez
 * 
 * 
 */

function Cashier () {

    // Get the current date and format it to display the day, date, and month
    const currentDate = new Date();
    const date1 = currentDate.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' });

    // Location hook to get state from previous page (login page) so we can get the user's name and email from the google oAuth API
    const location = useLocation();
    const { userName = "Guest", email = "guest.gmail.com"} = location.state || {}; // Destructure userName and email from state

    const [employeeID, setEmployeeID] = useState(null);

    useEffect(() => {
      const fetchEmployeeID = async () => {
        try {
          const response = await axios.post(SERVER_API + "/employee", {email});
        //   setEmployeeID(response.data); // adjust based on actual API shape
          console.log(response.data);
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
        const savedOrderList = getCookie('orderList');
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

    // State hook for the current order type
    // const [currentOrderType, setOrderType] = useState("");
    // Menu items
    const menuItems = [
        { name: "Wintermelon Lemonade", price: 7.00, img: wintermelonLemonade, isSpecial: false, categoryName: "Fruit Tea", menuID:55},
        { name: "Strawberry Tea", price: 5.00, img: strawberryTea, isSpecial: false, categoryName: "Fruit Tea", menuID:  56},
        { name: "Honey Lemonade with Aloe Vera", price: 7.50, img: honeyLemonade, isSpecial: false, categoryName: "Fruit Tea", menuID: 57 },
        { name: "Classic Pearl Milk Tea", price: 9.00, img: classicPearlMilkTea, isSpecial: true, categoryName: "Milk Tea", menuID: 50},
        { name: "Coffee Milk Tea", price: 10.00, img: coffeeMilkTea, isSpecial: false, categoryName: "Milk Tea", menuID: 48},
        { name: "Honey Milk Tea", price: 9.00, img: honeyMilkTea, isSpecial: true, categoryName: "Milk Tea", menuID:  49},
        { name: "Mango Green Milk Tea", price: 10.00, img: mangoGreenMilkTea, isSpecial: false, categoryName: "Milk Tea", menuID: 51},
        { name: "Classic Tea", price: 10.00, img: classicTea, isSpecial: true, categoryName: "Brewed Tea", menuID: 52},
        { name: "Honey Tea", price: 9.00, img: honeyTea, isSpecial: true, categoryName: "Brewed Tea", menuID: 54},
        { name: "Wintermelon Tea", price: 10.00, img: wintermelonTea, isSpecial: false, categoryName: "Brewed Tea", menuID: 53},
        { name: "Milk Tea Ice Blended with Pearl", price: 10.00, img: milkIceBlended, isSpecial: false, categoryName: "Ice Blended", menuID: 59},
        { name: "Mango Ice Blended with Ice Cream", price: 9.00, img: mangoIceBlended, isSpecial: false, categoryName: "Ice Blended", menuID:  60},
        { name: "Oreo Ice Blended with Pearl", price: 10.00, img: oreoIceBlended, isSpecial: false, categoryName: "Ice Blended", menuID:58 },
        { name: "Lime Mojito", price: 10.00, img: limeMojito, isSpecial: false, categoryName: "Tea Mojito", menuID: 61},
        { name: "Mango Mojito", price: 9.00, img: mangoMojito, isSpecial: false, categoryName: "Tea Mojito", menuID:  62},
        { name: "Strawberry Mojito", price: 10.00, img: strawberryMojito, isSpecial: false, categoryName: "Tea Mojito", menuID: 63},
        { name: "Wintermelon Creama", price: 10.00, img: wintermelonCreama, isSpecial: false, categoryName: "Creama", menuID: 74},

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


    const OrderAPICall = () => {
        const data = {
            time: new Date(),
            payment: "cash",
            points: Math.floor(calculateTotal() * 0.5),
            cost: calculateTotal(),
            customerID: 250606,
            employeeID: 11,
            orderList: orderList,
        }
        console.log("server api: " + SERVER_API)
        axios.post(SERVER_API + 'cashier/addOrder', data).then((data) => {
          //this console.log will be in our frontend console
        // console.log("server api: " + SERVER_API)
        })
        .catch(error => {
            console.log("error");
        });
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
        setCookie("orderList", orderList);
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


    return (
        <div className = "flex flex-col ">
            {/* Navbar */}
            <div className = "flex items-center justify-between p-5">
                <div className = "flex items-center">
                    <img className = "hover:cursor-pointer max-h-28" src={logo} onClick={() => navigate("/")}/>

                    <p className = "pl-10 font-sans text-emerald-900 font-bold">
                        {date1}
                    </p>
                </div>
                <Weather>
                </Weather>
                <div className = "flex items-center">
                    <p className = "p-5 font-sans">
                        Total: 20 Orders
                    </p>
                    <button
                    className = "bg-white text-emerald-900 font-sans font-bold rounded-full p-5 m-5">
                        Report 📜
                    </button>
                    {/* Dropdown Avatar Menu */}
                    <button id="dropdownAvatarNameButton" data-dropdown-toggle="dropdownAvatarName" className="flex items-center text-sm pe-1 font-medium text-gray-900 rounded-full md:me-0 focus:ring-4 focus:ring-gray-100 bg-white p-3" type="button">
                        <span className="sr-only">Open user menu</span>
                        <img className="w-8 h-8 me-2 rounded-full" src={userIcon} alt="user photo" />
                        {userName}
                        <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                        </svg>
                    </button>
                    <div id="dropdownAvatarName" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600">
                        <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                        <div>{email}</div>
                        </div>
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownInformdropdownAvatarNameButtonationButton">
                        <li>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                        </li>
                        <li>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                        </li>
                        <li>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                        </li>
                        </ul>
                        <div className="py-2">
                        <a onClick = {handleLogout} href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
                        </div>
                    </div>

                </div>
            </div>

            {/* Main Content */}
            <div className = "flex ml-5 mb-5">

                {/* Searchbar and itemCards*/}
                <div className = "flex flex-col w-3/5 mr-5">

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
                            className="block w-full p-4 ps-10 text-sm rounded-full border-emerald-800 border-2" 
                            placeholder="Search" required />                            
                            <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-emerald-700 hover:bg-emerald-900 focus:ring-4 focus:outline-none focus:ring-emerald-50 font-medium rounded-full text-sm px-4 py-2">⎆</button>
                        </div>
                    </form>
                    {/* Category Cards */}
                    <div className = "flex overflow-auto">
                        <Categories status="Available" 
                        categoryName = "All"
                        
                        onClick = {() => {
                            setSelectedCategory(null);
                          }}
                        > </Categories>
                        <Categories status="Available" 
                        categoryName = "Fruit Tea"
                        onClick = {() => {
                            setSelectedCategory(selectedCategory === "Fruit Tea" ? null : "Fruit Tea");
                          }}
                        >
                        </Categories>
                        <Categories status = "Available" categoryName = "Milk Tea"
                        onClick = {() => {
                            setSelectedCategory(selectedCategory === "Milk Tea" ? null : "Milk Tea");
                          }}
                        >
                        </Categories>
                        <Categories status = "Available" categoryName = "Brewed Tea"
                        onClick = {() => {
                            setSelectedCategory(selectedCategory === "Brewed Tea" ? null : "Brewed Tea");
                          }}
                        >
                        </Categories>
                        <Categories status = "Available" categoryName = "Ice Blended"
                        onClick = {() => {
                            setSelectedCategory(selectedCategory === "Ice Blended" ? null : "Ice Blended");
                          }}
                        >
                        </Categories>   
                        <Categories status = "Available" categoryName = "Tea Mojito"
                        onClick = {() => {
                            setSelectedCategory(selectedCategory === "Tea Mojito" ? null : "Tea Mojito");
                          }}
                        >
                        </Categories>
                        <Categories status = "Available" categoryName = "Creama"
                        onClick = {() => {
                            setSelectedCategory(selectedCategory === "Creama" ? null : "Creama");
                          }}
                        >
                        </Categories>
                    </div>

                    {/* Item Cards filtered based on selected category */}
                    <div className = "grid grid-cols-3 gap-3">
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

                {/* Checkout Menu */}
                <div className = "w-2/5 bg-white rounded-l-3xl grid auto-rows-min h-min ">
                    {/* Header */}
                    <div className='flex items-center p-5'>
                        <button type="button" className="border p-5 rounded-full bg-emerald-800 text-white">
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                            </svg>
                            <span className="sr-only">Icon description</span>
                        </button>
                        <div className = "w-4/5 grid grid-row-2 justify-items-center">
                            <p className='font-bold'>
                            Purchase Receipt
                                </p>
                            <p className='font-bold'>
                                #23456
                            </p>
                        </div>
                        
                    </div>

                    {/* Order Type button group */}
                    <div className='grid grid-cols-3 border rounded-full border-emerald-900 overflow-hidden m-5'>
                        <>
                            {orderType.map((button) => (
                                <button
                                    key={button.id}
                                    onClick={() => {
                                        setActiveButton(button.id);
                                    }
                                    }
                                    className={`rounded-full cursor-pointer py-5 ${
                                        activeButton === button.id 
                                        ? 'bg-emerald-900 text-white transition-colors ease-in' 
                                        : 'text-gray-800 hover:bg-gray-300'
                                    }`}
                                >
                                {button.text}
                                </button>
                            ))}
                        </>
                    </div>

                    {/* Customer information and table information */}
                    <div className='flex flex-col m-5'>
                        <div className='grid grid-cols-2'>
                            
                                 
                                <p className='text-gray-500'>
                                    
                                    Customer name
                                </p>
                            
                            {
                                activeButton === 1 &&
                                <p className='text-gray-500'>
                                    Table
                                </p>
                            }
                            {
                                activeButton === 3 &&
                                <p className='text-gray-500'>
                                    Phone Number
                                </p>
                            }
                            {
                                activeButton === 2 &&
                                <p className='text-gray-500'>
                                Phone Number
                             </p>
                            }
                        </div>
                        <div className='grid grid-cols-2 gap-5'>
                            <input type="text" 
                            value={customerName} // Bind input value to state
                            onChange={(e) => {setCustomerName(e.target.value)
                            }}
                            className="border py-5 border-emerald-900 rounded-full" placeholder="John" required />
                            {
                                activeButton === 1 &&
                                <select 
                                    className="border border-emerald-900 rounded-full"
                                    value={selectedTable}
                                    onChange={(e) => setSelectedTable(e.target.value)}
                                >
                                    <option value="Choose a Table">Choose a Table</option>
                                    <option value="A1 - indoor">A1 - indoor</option>
                                    <option value="A2 - outdoor">A2 - outdoor</option>
                                    <option value="A3 - rooftop">A3 - rooftop</option>
                                    <option value="A4 - underground">A4 - underground</option>
                                </select>
                            }
                            {
                                activeButton === 2 &&
                                <form class="max-w-xs mx-auto">
                                    <div class="relative">
                                        <span class="absolute start-0 bottom-3 text-gray-500">
                                            <svg class="w-4 h-4 rtl:rotate-[270deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 19 18">
                                                <path d="M18 13.446a3.02 3.02 0 0 0-.946-1.985l-1.4-1.4a3.054 3.054 0 0 0-4.218 0l-.7.7a.983.983 0 0 1-1.39 0l-2.1-2.1a.983.983 0 0 1 0-1.389l.7-.7a2.98 2.98 0 0 0 0-4.217l-1.4-1.4a2.824 2.824 0 0 0-4.218 0c-3.619 3.619-3 8.229 1.752 12.979C6.785 16.639 9.45 18 11.912 18a7.175 7.175 0 0 0 5.139-2.325A2.9 2.9 0 0 0 18 13.446Z"/>
                                            </svg>
                                        </span>
                                        <input type="text" id="floating-phone-number" class="block py-2.5 ps-6 pe-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder=" " value={phoneNumber} onChange={(e) => {setPhoneNumber(e.target.value)}}/>
                                        <label for="floating-phone-number" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:start-6 peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Phone number</label>
                                    </div>
                                </form>

                            }
                            {
                                activeButton === 3 && 
                                <form class="max-w-xs mx-auto">
                                <div class="relative">
                                    <span class="absolute start-0 bottom-3 text-gray-500">
                                        <svg class="w-4 h-4 rtl:rotate-[270deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 19 18">
                                            <path d="M18 13.446a3.02 3.02 0 0 0-.946-1.985l-1.4-1.4a3.054 3.054 0 0 0-4.218 0l-.7.7a.983.983 0 0 1-1.39 0l-2.1-2.1a.983.983 0 0 1 0-1.389l.7-.7a2.98 2.98 0 0 0 0-4.217l-1.4-1.4a2.824 2.824 0 0 0-4.218 0c-3.619 3.619-3 8.229 1.752 12.979C6.785 16.639 9.45 18 11.912 18a7.175 7.175 0 0 0 5.139-2.325A2.9 2.9 0 0 0 18 13.446Z"/>
                                        </svg>
                                    </span>
                                    <input type="text" id="floating-phone-number" class="block py-2.5 ps-6 pe-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder=" " value={phoneNumber} onChange={(e) => {setPhoneNumber(e.target.value)}}/>
                                    <label for="floating-phone-number" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:start-6 peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Phone number</label>
                                </div>
                                </form>
                            }
                            
                        </div>
                    </div>

                    {/* Order details */}
                    <div className='grid m-5 auto-rows-min'>
                        <p className='text-gray-500'>
                            Order List
                        </p>
                        <div className="h-100 overflow-y-auto border border-emerald-900 rounded-3xl p-5 my-5">
                            { 
                                (orderList.map((item, index) => (
                                    <div key = {index} className='flex p-3 rounded-3xl border border-emerald-900 mb-5 justify-between'> 
                                        <div>
                                            <img className = 'h-20 rounded mr-5' src={item.img}>
                                            </img>
                                        </div>
                                        
                                            <div className='flex flex-col'> 
                                                <p className='font-bold text-emerald-900'>
                                                    {item.name}
                                                </p>
                                                <div className='h-25 overflow-y-auto gap-2 border border-amber-500 rounded-3xl p-5 mt-5'>
                                                    {item.toppings.map((topping) => (
                                                        <p>
                                                        {topping}
                                                    </p>))}
                                                    <p>
                                                        {item.teaType}
                                                    </p>
                                                    <p>
                                                        {item.iceLevel}
                                                    </p>
                                                    <p>
                                                        {item.sugarLevel}
                                                    </p>
                                                </div>
                                                
                                            </div>

                                            <div className='flex flex-col justify-end'>
                                                <p className='font-bold'>
                                                    ${item.total} 
                                                </p>
                                                <form className="max-w-xs mx-auto">
                                                    <div className="relative flex items-center">
                                                        <button onClick = {() => decrementQuantity(item.name)}  type="button" id="decrement-button" data-input-counter-decrement="counter-input" className="shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                                            <svg className="w-2.5 h-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
                                                            </svg>
                                                        </button>
                                                        <input type="text" id="counter-input" data-input-counter className="shrink-0 text-black border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center" placeholder="" value={item.quantity} required />
                                                        <button onClick = {() => incrementQuantity(item.name)} type="button" id="increment-button" data-input-counter-increment="counter-input" className="shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                                            <svg className="w-2.5 h-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </form>

                                                {/* Delete Button to remove item from cart */}
                                                <button onClick={() => deleteItem(index)} type="button" className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 ">
                                                    Delete
                                                </button>

                                            </div>
                                    </div>
                                    
                                )))
                            }
                        </div>
                        <p className='font-bold'>
                            Payment Details
                        </p>
                        <div className='flex justify-between py-2.5'>
                            <p>
                                Subtotal
                            </p>
                            <p className='font-bold'>
                                ${calculateTotal().toFixed(2)}
                            </p>
                        </div>
                        <div className='flex justify-between py-2.5'>
                            <p>
                                Tax
                            </p>
                            <p className='font-bold'>
                                ${(calculateTotal()*0.05).toFixed(2)}
                            </p>
                        </div>
                        <hr>
                        </hr>
                        <div className='flex justify-between py-2.5'>
                            <p>
                                Total
                            </p>
                            <p className='font-bold'>
                                ${(calculateTotal() + calculateTotal()*0.05).toFixed(2)}
                            </p>
                        </div>
                        <button onClick={() => handlePaymentMethod('Card')} type="button" class="text-white bg-[#050708] hover:bg-[#050708]/80 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#050708]/40 dark:focus:ring-gray-600 me-2 mb-2">
                            <svg class="w-5 h-5 me-2 -ms-1" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="apple" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"></path></svg>
                            Check out with Apple Pay
                        </button>
                        <button onClick={() => handlePaymentMethod('Cash')} type="button" class="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-800 dark:bg-white dark:border-gray-700 dark:text-gray-900 dark:hover:bg-gray-200 me-2 mb-2">
                        <svg aria-hidden="true" class="w-10 h-3 me-2 -ms-1" viewBox="0 0 660 203" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M233.003 199.762L266.362 4.002H319.72L286.336 199.762H233.003V199.762ZM479.113 8.222C468.544 4.256 451.978 0 431.292 0C378.566 0 341.429 26.551 341.111 64.604C340.814 92.733 367.626 108.426 387.865 117.789C408.636 127.387 415.617 133.505 415.517 142.072C415.384 155.195 398.931 161.187 383.593 161.187C362.238 161.187 350.892 158.22 333.368 150.914L326.49 147.803L319.003 191.625C331.466 197.092 354.511 201.824 378.441 202.07C434.531 202.07 470.943 175.822 471.357 135.185C471.556 112.915 457.341 95.97 426.556 81.997C407.906 72.941 396.484 66.898 396.605 57.728C396.605 49.591 406.273 40.89 427.165 40.89C444.611 40.619 457.253 44.424 467.101 48.39L471.882 50.649L479.113 8.222V8.222ZM616.423 3.99899H575.193C562.421 3.99899 552.861 7.485 547.253 20.233L468.008 199.633H524.039C524.039 199.633 533.198 175.512 535.27 170.215C541.393 170.215 595.825 170.299 603.606 170.299C605.202 177.153 610.098 199.633 610.098 199.633H659.61L616.423 3.993V3.99899ZM551.006 130.409C555.42 119.13 572.266 75.685 572.266 75.685C571.952 76.206 576.647 64.351 579.34 57.001L582.946 73.879C582.946 73.879 593.163 120.608 595.299 130.406H551.006V130.409V130.409ZM187.706 3.99899L135.467 137.499L129.902 110.37C120.176 79.096 89.8774 45.213 56.0044 28.25L103.771 199.45L160.226 199.387L244.23 3.99699L187.706 3.996" fill="#0E4595"/><path d="M86.723 3.99219H0.682003L0 8.06519C66.939 24.2692 111.23 63.4282 129.62 110.485L110.911 20.5252C107.682 8.12918 98.314 4.42918 86.725 3.99718" fill="#F2AE14"/></svg>
                        Pay with Cash
                        </button>
                        <SwipeableOrderButton setOrderList={setOrderList} clearUserName = {clearUserName} setSelectedTable = {setSelectedTable} setPhoneNumber = {setPhoneNumber} 
                                data={
                                    {     
                                    time: new Date(),
                                    payment: paymentMethod,
                                    points: Math.floor(calculateTotal() * 10),
                                    cost: calculateTotal(),
                                    customerID: 250606,
                                    employeeID: 11, // store emplyeeID 
                                    orderList: orderList,
                                    }
                                }>
                        </SwipeableOrderButton>
                    </div>
                    
                </div>
            </div>  
        </div>      
    )
}

export default Cashier