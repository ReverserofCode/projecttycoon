import React, { useState } from "react";
import { PiArrowCircleUpBold } from "react-icons/pi";
import "./ScrollButton.css";
function Scroll() {
  const [showScrollButton, setShowScrollButton] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setShowScrollButton(true);
    } else {
      setShowScrollButton(false);
    }
  };

  window.addEventListener("scroll", handleScroll);

  return (
    <div>
      {showScrollButton && (
        <button className="scroll-to-top-button" onClick={scrollToTop}>
          <PiArrowCircleUpBold
            size="45"
            className="scroll"
          ></PiArrowCircleUpBold>
        </button>
      )}
    </div>
  );
}

export default Scroll;
