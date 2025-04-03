import React, { useState, useRef, useEffect } from 'react';

/**
 * A React component that provides a swipeable button for placing an order.
 * The button can be dragged to the right to complete an action, and it resets automatically after completion.
 *
 * @param {Function} setOrderList - A function to update the order list.
 * @param {Function} clearUserName - A function to clear the username after the order is placed.
 * @author Garry Peter Thompson
 */
function SwipeableOrderButton({ setOrderList, clearUserName, setSelectedTable, setPhoneNumber}) {
    // State to track whether the button is being dragged
    const [isDragging, setIsDragging] = useState(false);

    // State to track the current position of the button
    const [position, setPosition] = useState(0);

    // State to track whether the swipe action is completed
    const [completed, setCompleted] = useState(false);

    // Reference to the draggable button element
    const buttonRef = useRef(null);

    // Reference to the container element
    const containerRef = useRef(null);

    // Reference to store the maximum draggable position
    const maxPosition = useRef(0);

    /**
     * useEffect hook to calculate the maximum draggable position dynamically
     * based on the container and button widths.
     */
    useEffect(() => {
        if (containerRef.current && buttonRef.current) {
            maxPosition.current = containerRef.current.clientWidth - buttonRef.current.offsetWidth;
        }
    }, []);

    /**
     * Handles the mouse down event to start dragging the button.
     */
    const handleMouseDown = () => {
        setIsDragging(true);
    };

    /**
     * Handles the mouse move event to update the button's position while dragging.
     *
     * @param {MouseEvent} e - The mouse move event.
     */
    const handleMouseMove = (e) => {
        if (isDragging && !completed) {
            const containerRect = containerRef.current.getBoundingClientRect();
            const newPosition = Math.max(0, Math.min(e.clientX - containerRect.left - buttonRef.current.offsetWidth / 2, maxPosition.current));
            setPosition(newPosition);

            // Check if the swipe action is completed
            if (newPosition >= maxPosition.current) {
                setCompleted(true);
                placeOrder();
            }
        }
    };

    /**
     * Handles the mouse up event to stop dragging the button.
     * Resets the button's position if the swipe action is not completed.
     */
    const handleMouseUp = () => {
        if (!completed) {
            setPosition(0);
        }
        setIsDragging(false);
    };

    /**
     * Handles the logic for placing an order.
     * Clears the order list and username, and resets the button after a short delay.
     */
    const placeOrder = () => {
        console.log('Order placed successfully!');
        setOrderList([]);
        clearUserName('');
        setSelectedTable('Choose a Table');
        setPhoneNumber('xxx-xxx-xxxx')
        // Automatically reset the button after a short delay
        setTimeout(() => {
            setPosition(0);
            setCompleted(false);
        }, 1000); // Reset after 1 second
    };

    // Calculate the progress percentage based on the button's position
    const progress = Math.min(100, (position / maxPosition.current) * 100);

    return (
        <div className="w-full max-w-md mx-auto p-4">
            <div
                ref={containerRef}
                className="relative h-16 rounded-full overflow-hidden shadow-md"
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                style={{
                    background: `linear-gradient(to right, rgb(3, 87, 38) ${progress}%, rgb(3, 87, 38) ${progress}%)`,
                    backgroundColor: 'rgb(3, 87, 38)',
                }}
            >
                <div className="absolute inset-0 flex items-center justify-between px-16 pointer-events-none">
                    <span className={`font-medium transition-colors ${progress > 50 ? 'text-white' : 'text-white'}`}>
                        {completed ? 'Order Placed!' : 'Swipe to Place Order'}
                    </span>
                </div>

                <button
                    ref={buttonRef}
                    className={`absolute top-2 left-0 h-12 w-12 rounded-full bg-white shadow-lg flex items-center justify-center cursor-grab transition-transform ${isDragging ? 'cursor-grabbing' : ''}`}
                    style={{ transform: `translateX(${position}px)` }}
                    onMouseDown={handleMouseDown}
                    disabled={completed}
                >
                    <svg
                        className="h-6 w-6 text-emerald-700"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default SwipeableOrderButton;