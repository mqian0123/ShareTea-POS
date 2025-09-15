import './Modal.css';

function SuccessModal ({onClose, handleLogout}) {
    return (
        <>
            <div id="static-modal" data-modal-backdrop="static" tabIndex="-1" aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed flex z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative p-4 w-full max-w-2xl max-h-full bg-amber-50 border rounded">
                    <div className="relative text-gray-900 bg-white border font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ">
                        <p>
                            Order placed successfully
                        </p>
                    </div>
                    <div className="flex justify-center items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">      
                    {/* TODO: placeOrder method onClick for this button: */}
                    <button onClick={onClose} data-modal-hide="static-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Back to Menu</button>
                    <button onClick={handleLogout} className='border p-5 ml-5 rounded text-amber-50 hover:bg-black hover:text-white bg-gray-500'>Log out</button>
                </div>
                </div>
                
            </div>
        </>
    );
}

export default SuccessModal