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
import axios from 'axios';


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
                    <button onClick={apiCall} class = "bg-white text-emerald-900 font-sans font-bold rounded-full p-5 m-5">
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
                    <div>
                        <input type = 'search' id = "searchBar" class = "w-full border-2 border-emerald-800 rounded-full mb-5 font-sans text-black h-10 bg-white" placeholder='Search'/>
                    </div>

                    <div class = "flex overflow-auto">
                        <Categories status="Available" categoryName = "Fruit Tea">
                        </Categories>
                        <Categories status = "Available" categoryName = "Milk Tea">

                        </Categories>
                        <Categories status = "Available" categoryName = "Brewed Tea">

                        </Categories>
                        <Categories status = "Available" categoryName = "Ice Blended">

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