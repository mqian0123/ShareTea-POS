/**
 * @description This component is used to display the categories of the products.
 * @param {*} props 
 * @returns {JSX.Element}
 * 
 * @author Seshadithya Saravanan 
 */

function Categories (props) {
    return (
        
        <button 
        onClick = {props.onClick} 
        className = {props.className}>

            {/* //TODO: Change the status dynamically */ }
            <div className = "whitespace-nowrap rounded-full text-xs py-1 px-3">
                {props.status}
            </div>
            <p className = "font-bold mt-5 whitespace-nowrap">
                {props.categoryName}
            </p>

            {/* //TODO: Change the number of items dynamically */ }
            <p className = "text-xs whitespace-nowrap">
                50 items
            </p>
        </button>
    )
}

export default Categories

