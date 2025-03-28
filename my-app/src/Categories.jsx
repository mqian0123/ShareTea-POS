function Categories (props) {
    return (
        <button className = "hover:cursor-pointer w-auto m-5 inline-block bg-emerald-900 border rounded-4xl py-4 pr-20 pl-5">
            <div className = "border whitespace-nowrap border-white rounded-full text-white text-xs py-1 px-3">
                {props.status}
            </div>
            <p className = "font-bold text-white mt-5 whitespace-nowrap">
                {props.categoryName}
            </p>
            <p className = "text-xs text-white whitespace-nowrap">
                50 items
            </p>
        </button>
    )
}

export default Categories