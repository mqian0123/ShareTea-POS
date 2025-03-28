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

function Cashier () {
    const currentDate = new Date();
    // const dateString = currentDate.toLocaleDateString();
    const date1 = currentDate.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' });
    

    return (
        <div class = "flex flex-col ">
            <div class = "flex items-center justify-between p-5">
                <div class = "flex items-center">
                    <img class = "max-h-28" src={logo}/>

                    <p className = "pl-10 font-sans text-emerald-900 font-bold">
                        {date1}
                    </p>
                </div>
                <div class = "flex items-center">
                    <p class = "p-5 font-sans">
                        Total: 20 Orders
                    </p>
                    <button class = "bg-white text-emerald-900 font-sans font-bold rounded-full p-5 m-5">
                        Report 📜
                    </button>
                    <button class = "bg-white text-emerald-900 font-sans rounded-full pl-2 pr-10 m-5 py-2">
                        <div class = "flex items-center">
                            <img class = "max-h-10 pr-5" src = {userIcon}/>
                            
                            <div class = "text-left">
                                <p class = "font-bold">
                                    Samantha W
                                </p>
                                <p>
                                    Cashier
                                </p>
                            </div>
                        </div>
                    </button>
                </div>
            </div>
            <div class = "flex m-5">
                <div class = "flex flex-col w-3/5 mr-5">
                    <form class="max-w-full">   
                        <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                </svg>
                            </div>
                            <input type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
                            <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-emerald-700 hover:bg-emerald-900 focus:ring-4 focus:outline-none focus:ring-emerald-50 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                        </div>
                    </form>
                    <div class = "flex overflow-auto">
                        <Categories status="Available" categoryName = "Fruit Tea">
                        </Categories>
                        <Categories status = "Available" categoryName = "Milk Tea">

                        </Categories>
                        <Categories status = "Available" categoryName = "Brewed Tea">

                        </Categories>
                        <Categories status = "Available" categoryName = "Ice Blended">
                        </Categories>
                        <Categories status = "Available" categoryName = "Tea Mojito">
                        </Categories>
                        <Categories status = "Available" categoryName = "Creama">
                        </Categories>
                    </div>

                    <div class = "grid grid-cols-3 gap-3">
                        <ItemCard img={wintermelonLemonade} itemName = "Wintermelon Lemonade" itemPrice = "7.00" isSpecial = {false}>
                        </ItemCard>

                        <ItemCard img={kiwiTea} itemName = "Kiwi Fruit Tea with Aiyu Jelly" itemPrice = "8.00" isSpecial = {false}>
                        </ItemCard>

                        <ItemCard img={strawberryTea} itemName = "Strawberry Tea" itemPrice = "5.00" isSpecial = {false}>
                        </ItemCard>

                        <ItemCard img = {peachTea} itemName = "Peach Kiwi Tea with Aiyu Jelly" itemPrice = "6.50" isSpecial = {false}>
                        </ItemCard>

                        <ItemCard img = {honeyLemonade} itemName = "Honey Lemonade with Aloe Vera" itemPrice = "7.50" isSpecial = {false}>
                        </ItemCard>

                        <ItemCard img = {mangoGreenTea} itemName = "Mango Green Tea" itemPrice = "9.00" isSpecial = {false}>
                        </ItemCard>
                    </div>
                </div>
                <div class = "w-2/5">
                    Current Order Stats
                </div>
            </div>
            
            
        </div>
        

    )
}

export default Cashier