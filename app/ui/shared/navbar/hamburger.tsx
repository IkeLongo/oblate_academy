import { useState } from "react";
import Hamburger from "hamburger-react";

export const HamburgerReact = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="hamburger-wrapper">
      <Hamburger toggled={isOpen} toggle={setIsOpen} />
      <div>{isOpen ? "Open" : "Close"}</div>
    </div>
  );
};