import './Modal.css';
import {useState, useEffect} from 'react';

function CartModal ({onClose, orderList, incrementQuantity, decrementQuantity, deleteItem, calculateTotal, totalPoints}) {

    const [applyDiscount, setApplyDiscount] = useState(false);
    const [finalPrice, setFinalPrice] = useState(0);

    const subtotal = calculateTotal();
    const tax = (subtotal*0.05);
    // setFinalPrice(subtotal+tax);
    const userPoints = totalPoints;

    useEffect(() => {
        if (applyDiscount) {
            setFinalPrice((subtotal + tax - userPoints / 100).toFixed(2));
        } else {
            setFinalPrice((subtotal + tax).toFixed(2));
        }
    }, [subtotal, tax, applyDiscount]);

    const handleApplyDiscount = () => {
        setApplyDiscount(!applyDiscount);
    };



    return (
        <>
                <div id="static-modal" data-modal-backdrop="static" tabIndex="-1" aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed flex z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div className="relative p-4 w-full max-w-2xl max-h-full">
                        <div className="relative text-gray-900 bg-white border font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ">
                            
                            {/* Header */}
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200 mb-5">
                                <h3 className="text-xl font-semibold">
                                    Cart
                                </h3>
                                <button onClick={onClose} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="static-modal">
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            {/* Order List */}
                            <div className=''>
                                {
                                    orderList.map((item, index) => (
                                        <div className='flex p-3 text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mb-5 justify-between'> 
                                        <div>
                                            <img className = 'h-20 rounded mr-5' src={item.img}>
                                            </img>
                                        </div>
                                            <div className='flex flex-col'> 
                                                <p className='font-bold'>
                                                    {item.name}
                                                </p>
                                                <div className='h-25 overflow-y-auto gap-2 rounded-3xl p-5 mt-5'>
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
                                                <p>
                                                    {item.points} (points)
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
                                    ))
                                }
                            </div>

                            <div className='flex justify-between py-2.5 items-center'>
                                <p className='font-bold'>
                                    Discount Code
                                </p>
                                <input type='text' className='uppercase rounded'>
                                </input>
                                <button className='border p-5 rounded hover:bg-blue-500 transition-colors duration-300 hover:text-white active:translate-y-1 shadow-md'>
                                    Apply
                                </button>
                            </div>

                            <div className='flex justify-between py-2.5 items-center'>
                                <p className='font-bold'>
                                    Use Reward Points
                                </p>
                                <input type='checkbox' onChange={handleApplyDiscount}>
                                </input>
                            </div>
                            
                            <hr>
                            </hr>
                            <p className='font-bold py-2.5'>
                                Payment Details
                            </p>
                            <div className='flex justify-between py-2.5'>
                                <p>
                                    Subtotal
                                </p>
                                <p className='font-bold'>
                                    ${subtotal}
                                </p>
                            </div>
                            <div className='flex justify-between py-2.5'>
                                <p>
                                    Tax
                                </p>
                                <p className='font-bold'>
                                    ${tax.toPrecision(2)}
                                </p>
                            </div>
                            <hr>
                            </hr>
                            {
                                applyDiscount && (
                                    <>
                                        <div className='flex justify-between py-2.5'>
                                            <p>
                                                Rewards Applied
                                            </p>
                                            <p className='font-bold'>
                                                -${(userPoints/100).toFixed(2)}
                                            </p>
                                        </div>
                                        <hr>
                                        </hr>
                                    </>
                            )
                            }
                            <div className='flex justify-between py-2.5'>
                                <p>
                                    Total
                                </p>
                                <p className='font-bold'>
                                    ${finalPrice}
                                </p>
                            </div>
                            <div class="text-white bg-[#050708] hover:bg-[#050708]/80 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#050708]/40 dark:focus:ring-gray-600 me-2 mb-2">
                                <input onChange = {() => handlePaymentMethod('Card')} id="applePay" type="radio" value="Card" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mr-5" />
                                <svg class="w-5 h-5 me-2 -ms-1" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="apple" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"></path></svg>
                                <label for="applePay">Pay with Apple Pay</label>
                            </div>
                            <div class="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-800 dark:bg-white dark:border-gray-700 dark:text-gray-900 dark:hover:bg-gray-200 me-2 mb-2">
                                <input onChange={() => handlePaymentMethod('Cash')}  id="cash" type="radio" value="Cash" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mr-5" />
                                <svg aria-hidden="true" class="w-10 h-3 me-2 -ms-1" viewBox="0 0 660 203" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M233.003 199.762L266.362 4.002H319.72L286.336 199.762H233.003V199.762ZM479.113 8.222C468.544 4.256 451.978 0 431.292 0C378.566 0 341.429 26.551 341.111 64.604C340.814 92.733 367.626 108.426 387.865 117.789C408.636 127.387 415.617 133.505 415.517 142.072C415.384 155.195 398.931 161.187 383.593 161.187C362.238 161.187 350.892 158.22 333.368 150.914L326.49 147.803L319.003 191.625C331.466 197.092 354.511 201.824 378.441 202.07C434.531 202.07 470.943 175.822 471.357 135.185C471.556 112.915 457.341 95.97 426.556 81.997C407.906 72.941 396.484 66.898 396.605 57.728C396.605 49.591 406.273 40.89 427.165 40.89C444.611 40.619 457.253 44.424 467.101 48.39L471.882 50.649L479.113 8.222V8.222ZM616.423 3.99899H575.193C562.421 3.99899 552.861 7.485 547.253 20.233L468.008 199.633H524.039C524.039 199.633 533.198 175.512 535.27 170.215C541.393 170.215 595.825 170.299 603.606 170.299C605.202 177.153 610.098 199.633 610.098 199.633H659.61L616.423 3.993V3.99899ZM551.006 130.409C555.42 119.13 572.266 75.685 572.266 75.685C571.952 76.206 576.647 64.351 579.34 57.001L582.946 73.879C582.946 73.879 593.163 120.608 595.299 130.406H551.006V130.409V130.409ZM187.706 3.99899L135.467 137.499L129.902 110.37C120.176 79.096 89.8774 45.213 56.0044 28.25L103.771 199.45L160.226 199.387L244.23 3.99699L187.706 3.996" fill="#0E4595"/><path d="M86.723 3.99219H0.682003L0 8.06519C66.939 24.2692 111.23 63.4282 129.62 110.485L110.911 20.5252C107.682 8.12918 98.314 4.42918 86.725 3.99718" fill="#F2AE14"/></svg>
                                <label for="cash" class="ms-2 text-sm font-medium text-gray-900 ">Pay with Cash</label>
                            </div>
                                {/* Footer with add to order and cancel buttons */}
                                <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                                <button data-modal-hide="static-modal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Proceed to Checkout</button>                                
                                <button onClick={onClose} data-modal-hide="static-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Back to Menu</button>
                                </div>
                            </div>
                    </div>
                </div>
            </>
    )
}

export default CartModal