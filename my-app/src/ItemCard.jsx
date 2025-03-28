import React from "react";
import Modal from './Modal.jsx';
function ItemCard (props) {

    const [showPopup, setShowPopup] = React.useState(false);

    return (
        <div className="bg-white border border-emerald-900 h-auto w-auto p-5 rounded-4xl">
            <img className = "mb-5 rounded-4xl" src={props.img}/>
            <div className="flex justify-between">
                <div className="flex flex-col mr-5">
                    <p className = "font-bold">
                        {props.itemName}
                    </p>
                    <p className= "font-extralight">
                        $ {props.itemPrice}
                    </p>
                </div>
                {/* <button className="hover: cursor-pointer max-w-14 max-h-10 border-2 rounded-full border-emerald-900 px-5">
                    +
                </button> */}
                <Modal></Modal>
            </div>
            
        </div>
    )
}
export default ItemCard