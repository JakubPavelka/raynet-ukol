import "./AccountDropdown.scss";
import {
  BsPersonCircle,
  BsGear,
  BsGift,
  BsRocket,
  BsPower,
  BsCodeSlash,
  BsRobot,
} from "react-icons/bs";

import { useRef, useEffect } from "react";

const dropdownItems = [
  { icon: <BsPersonCircle />, text: "Můj profil" },
  { icon: <BsGear />, text: "Nastavení" },
  { icon: <BsRobot />, text: "Automatizace" },
  { icon: <BsGift />, text: "Můj dárek" },
  { icon: <BsRocket />, text: "Úvodní tutoriály" },
  { icon: <BsCodeSlash />, text: "O aplikaci RAYNET CRM" },
  { icon: <BsPower />, text: "Odhlásit" },
];

interface DivProps {
  funcProp: () => void;
  accountRef: React.RefObject<HTMLDivElement>;
}

const AccountDropdown: React.FC<DivProps> = ({ funcProp, accountRef }) => {
  const accountDropdownRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Node;
    if (
      accountRef.current &&
      accountDropdownRef.current &&
      !accountRef.current.contains(target) &&
      !accountDropdownRef.current.contains(target)
    ) {
      funcProp();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [funcProp]);

  return (
    <section
      ref={accountDropdownRef}
      className="account-dropdown-menu"
      onClick={(e) => e.stopPropagation()}
    >
      {dropdownItems.map((item, index) => (
        <div
          key={index}
          className="account-dropdown-menu-item"
          onClick={funcProp}
        >
          {item.icon}
          <p>{item.text}</p>
        </div>
      ))}
    </section>
  );
};

export default AccountDropdown;
