//Button back to top

import React, { useState, useEffect } from 'react';
import { FaArrowUp } from "react-icons/fa";

const BackToTopButton: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop; //Get the number of pixels the document has been scrolled vertically.

            //Check if a certain amount of pixels has been reached and the button will be displayed and vice versa
            if (scrollTop > 100) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility); //Create an event listener for the scroll action

        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    // Just a scroll to top function
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <button
            className={`back-to-top ${isVisible ? 'show' : 'hide'}`}
            onClick={scrollToTop}
            title="Go to top"
        >
            <FaArrowUp size={20}/>
        </button>
    );
};

export default BackToTopButton;