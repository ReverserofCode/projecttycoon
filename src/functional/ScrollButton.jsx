import React, { useState } from "react";
import { PiArrowCircleUpBold } from "react-icons/pi";
import "./ScrollButton.css";
import styled from "@emotion/styled";
const Button = styled.button`
  font-size: 55px;
  @media screen and (max-width: 370px) {
    font-size: 35px;
  }
`;
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
        <Button className="scroll-to-top-button" onClick={scrollToTop}>
          <PiArrowCircleUpBold
            // size="55"
            className="scroll"
          ></PiArrowCircleUpBold>
        </Button>
      )}
    </div>
  );
}

export default Scroll;
