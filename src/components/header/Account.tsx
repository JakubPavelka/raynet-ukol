import "./Account.scss";
import { useState, useRef } from "react";
import { BsPersonCircle, BsBellFill, BsChevronDown } from "react-icons/bs";
import AccountDropdown from "./AccountDropdown";
import Notifications from "./Notifications";

const Account = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);
  const accountRef = useRef<HTMLDivElement | null>(null);
  const accountRefNotifications = useRef<HTMLDivElement | null>(null);

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };
  const handleMenuClose = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };
  const handleNotificationToggle = () => {
    setIsNotificationOpen((prev) => !prev);
  };
  const handleNotificationClose = () => {
    if (isNotificationOpen) {
      setIsNotificationOpen(false);
    }
  };

  return (
    <div className="account-wrapper">
      <section className="header-user">
        <div className="user-pannel">
          <div
            ref={accountRefNotifications}
            className="bell-wrapper"
            onClick={handleNotificationToggle}
          >
            <BsBellFill className="bell-icon" />
          </div>
          <div
            ref={accountRef}
            onClick={handleMenuToggle}
            className="account-dropdown"
          >
            <BsPersonCircle />
            <p className="name">Jakub Pavelka</p>
            <BsChevronDown />
          </div>
        </div>
      </section>
      {isMenuOpen && (
        <AccountDropdown funcProp={handleMenuClose} accountRef={accountRef} />
      )}
      {isNotificationOpen && (
        <Notifications
          funcPropNotifications={handleNotificationClose}
          accountRefNotifications={accountRefNotifications}
        />
      )}
    </div>
  );
};

export default Account;
