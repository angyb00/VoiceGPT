import { useState, useEffect } from "react";

export default function Typewriter({promptText, delay}) {

    const [currentText, setCurrentText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (promptText !== undefined && currentIndex < promptText.length) {
          const timeout = setTimeout(() => {
            setCurrentText(prevText => prevText + promptText[currentIndex]);
            setCurrentIndex(prevIndex => prevIndex + 1);
          }, delay);
      
          return () => clearTimeout(timeout);
        }
      }, [currentIndex, delay, promptText]);

    return (
        <p>
            {currentText}
        </p>
    );
}