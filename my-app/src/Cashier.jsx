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
import {useState, useRef} from 'react'
import { useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google'
import axios from 'axios';
import SwipeableOrderButton from './SwipeableOrderButton.jsx'

const apiCall = () => {
    axios.get('http://localhost:8080/user').then((data) => {
      //this console.log will be in our frontend console
    console.log(data)
    })
    .catch(error => {
        console.log("error");
    });
}


function Cashier () {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const currentDate = new Date();
    const date1 = currentDate.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' });
    const [activeButton, setActiveButton] = useState(0);
    const [orderList, setOrderList] = useState([]);
    const [customerName, setCustomerName] = useState("");

    const menuItems = [
        { name: "Wintermelon Lemonade", price: 7.00, img: wintermelonLemonade, isSpecial: false, categoryName: "Fruit Tea" },
        { name: "Kiwi Fruit Tea with Aiyu Jelly", price: 8.00, img: kiwiTea, isSpecial: false, categoryName: "Fruit Tea" },
        { name: "Strawberry Tea", price: 5.00, img: strawberryTea, isSpecial: false, categoryName: "Fruit Tea" },
        { name: "Peach Kiwi Tea with Aiyu Jelly", price: 6.50, img: peachTea, isSpecial: false, categoryName: "Fruit Tea" },
        { name: "Honey Lemonade with Aloe Vera", price: 7.50, img: honeyLemonade, isSpecial: false, categoryName: "Fruit Tea" },
        { name: "Mango Green Tea", price: 9.00, img: mangoGreenTea, isSpecial: false, categoryName: "Fruit Tea" },
        { name: "Classic Pearl Milk Tea", price: 9.00, img: classicPearlMilkTea, isSpecial: true, categoryName: "Milk Tea" },
        { name: "Coffee Milk Tea", price: 10.00, img: coffeeMilkTea, isSpecial: false, categoryName: "Milk Tea"},
        { name: "Honey Milk Tea", price: 9.00, img: honeyMilkTea, isSpecial: true, categoryName: "Milk Tea" },
        { name: "Mango Green Milk Tea", price: 10.00, img: mangoGreenMilkTea, isSpecial: false, categoryName: "Milk Tea"},
        { name: "Classic Tea", price: 10.00, img: classicTea, isSpecial: true, categoryName: "Brewed Tea"},
        { name: "Honey Tea", price: 9.00, img: honeyTea, isSpecial: true, categoryName: "Brewed Tea" },
        { name: "Wintermelon Tea", price: 10.00, img: wintermelonTea, isSpecial: false, categoryName: "Brewed Tea"},
        { name: "Milk Tea Ice Blended with Pearl", price: 10.00, img: milkIceBlended, isSpecial: false, categoryName: "Ice Blended"},
        { name: "Mango Ice Blended with Ice Cream", price: 9.00, img: mangoIceBlended, isSpecial: false, categoryName: "Ice Blended" },
        { name: "Oreo Ice Blended with Pearl", price: 10.00, img: oreoIceBlended, isSpecial: false, categoryName: "Ice Blended"},
        { name: "Lime Mojito", price: 10.00, img: limeMojito, isSpecial: false, categoryName: "Tea Mojito"},
        { name: "Mango Mojito", price: 9.00, img: mangoMojito, isSpecial: false, categoryName: "Tea Mojito" },
        { name: "Strawberry Mojito", price: 10.00, img: strawberryMojito, isSpecial: false, categoryName: "Tea Mojito"},
        { name: "Wintermelon Creama", price: 10.00, img: wintermelonCreama, isSpecial: false, categoryName: "Creama"},

    ]

    const filteredItems = menuItems.filter(item => {
        const matchesCategory = selectedCategory ? item.categoryName === selectedCategory : true;
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const orderType = [
        { id: 1, text: "Dine in" },
        { id: 2, text: "Take out" },
        { id: 3, text: "Online" }
    ];

    const addToOrder = (name, price, img, toppingsList, selectedTeaType, selectedIceLevel, selectedSugarLevel) => {
        const newItem = {
            name: name,
            price: price,
            img: img,
            quantity: 1,
            toppings: toppingsList,
            teaType: selectedTeaType,
            iceLevel: selectedIceLevel,
            sugarLevel: selectedSugarLevel,
            total: price
        };
        setOrderList([...orderList, newItem]);
    };

    const incrementQuantity = (name) => {
        setOrderList(orderList.map((item) => item.name === name ? {...item, quantity: item.quantity + 1, total: (item.quantity + 1) * item.price } : item));
    }

    const decrementQuantity = (name) => {
        setOrderList(orderList.map((item) => item.name === name && item.quantity > 1 
                                                            ? {...item, quantity: item.quantity - 1, total: (item.quantity - 1) * item.price } 
                                                            : item));         
    }

    
    const calculateTotal = () => {
        let sum = 0;
        for (let index = 0; index < orderList.length; index++) {
            sum += orderList[index].total;
        }
        return sum;
    }

    const clearUserName = () => {
        setCustomerName('');
    }


    const handleLogout = () => {
        googleLogout();
        navigate('/');
    }

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
                <div className = "flex items-center">
                    <p className = "p-5 font-sans">
                        Total: 20 Orders
                    </p>
                    <button className = "bg-white text-emerald-900 font-sans font-bold rounded-full p-5 m-5">
                        Report 📜
                    </button>
                    
                <button id="dropdownAvatarNameButton" data-dropdown-toggle="dropdownAvatarName" class="flex items-center text-sm pe-1 font-medium text-gray-900 rounded-full md:me-0 focus:ring-4 focus:ring-gray-100 bg-white p-3" type="button">
                    <span class="sr-only">Open user menu</span>
                    <img class="w-8 h-8 me-2 rounded-full" src={userIcon} alt="user photo" />
                    Bonnie Green
                    <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                    </svg>
                </button>

                <div id="dropdownAvatarName" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600">
                    <div class="px-4 py-3 text-sm text-gray-900 dark:text-white">
                    <div class="font-medium ">Pro User</div>
                    <div class="truncate">name@flowbite.com</div>
                    </div>
                    <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownInformdropdownAvatarNameButtonationButton">
                    <li>
                        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                    </li>
                    <li>
                        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                    </li>
                    <li>
                        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                    </li>
                    </ul>
                    <div class="py-2">
                    <a onClick = {handleLogout} href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
                    </div>
                </div>

                </div>
            </div>

            <div className = "flex ml-5 mb-5">
                {/* Searchbar and itemCards*/}
                <div className = "flex flex-col w-3/5 mr-5">
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


                    <div className = "grid grid-cols-3 gap-3">
                        {filteredItems.map((item, index) => (
                            <ItemCard 
                            key={index} 
                            itemName={item.name} 
                            itemPrice={item.price} 
                            img={item.img} 
                            isSpecial = {item.isSpecial}
                            categoryName={item.categoryName}
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
                                    onClick={() => setActiveButton(button.id)}
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
                            <p className='text-gray-500'>
                                Table
                            </p>
                        </div>
                        <div className='grid grid-cols-2 gap-5'>
                            <input type="text" 
                            value={customerName} // Bind input value to state
                            onChange={(e) => setCustomerName(e.target.value)}
                            className="border py-5 border-emerald-900 rounded-full" placeholder="John" required />
                            <select className="border border-emerald-900 rounded-full">
                                <option selected>Choose a Table</option>
                                <option value="US">A1 - indoor</option>
                                <option value="CA">A2 - outdoor</option>
                                <option value="FR">A3 - rooftop</option>
                                <option value="DE">A4 - underground</option>
                            </select>
                        </div>
                    </div>

                    {/* Order details */}
                    <div className='grid m-5 auto-rows-min'>
                        <p className='text-gray-500'>
                            Order List
                        </p>
                        <div className="h-100 overflow-y-auto border border-emerald-900 rounded-3xl p-5 my-5">
                            { 
                                (orderList.map((item) => (
                                    <div className='flex p-3 rounded-3xl border border-emerald-900 mb-5 justify-between'> 
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
                        {/* <div
                            {...swipeHandlers}
                            className="relative mt-4 p-4 text-white text-center rounded-lg cursor-pointer select-none"
                            style={{ backgroundColor: buttonColor }} // Apply dynamic background color
                        >
                            <div
                                className="absolute top-1/2 transform -translate-y-1/2"
                                style={{
                                    left: `${swipeProgressRef.current}%`, // Use ref for immediate updates
                                }}
                            >
                                ➡️ 
                            </div>
                            Swipe Right to Place Order
                        </div> */}
                        <SwipeableOrderButton setOrderList={setOrderList} clearUserName = {clearUserName}>

                        </SwipeableOrderButton>
                    </div>
                    
                </div>
            </div>  
        </div>      
    )
}

export default Cashier