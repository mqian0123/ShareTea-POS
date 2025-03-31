import React, { useState, useRef, useEffect } from 'react';

function SwipeableOrderButton({ setOrderList, clearUserName }) {
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState(0);
    const [completed, setCompleted] = useState(false);
    const buttonRef = useRef(null);
    const containerRef = useRef(null);
    const maxPosition = useRef(0);

    useEffect(() => {
        if (containerRef.current && buttonRef.current) {
            // Calculate maxPosition dynamically based on container and button widths
            maxPosition.current = containerRef.current.clientWidth - buttonRef.current.offsetWidth;
        }
    }, []);

    const handleMouseDown = () => {
        setIsDragging(true);
    };

    const handleMouseMove = (e) => {
        if (isDragging && !completed) {
            const containerRect = containerRef.current.getBoundingClientRect();
            const newPosition = Math.max(0, Math.min(e.clientX - containerRect.left - buttonRef.current.offsetWidth / 2, maxPosition.current));
            setPosition(newPosition);

            // Check if swipe is completed
            if (newPosition >= maxPosition.current) {
                setCompleted(true);
                placeOrder();
            }
        }
    };

    const handleMouseUp = () => {
        if (!completed) {
            setPosition(0);
        }
        setIsDragging(false);
    };

    const placeOrder = () => {
        console.log('Order placed successfully!');
        setOrderList([]);
        clearUserName('');

        // Automatically reset the button after a short delay
        setTimeout(() => {
            setPosition(0);
            setCompleted(false);
        }, 1000); // Reset after 2 seconds
    };

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