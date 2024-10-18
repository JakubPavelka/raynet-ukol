import "./Notifications.scss";
import { BsBellFill } from "react-icons/bs";
import { useRef, useEffect } from "react";

interface NotificationsProps {
  funcPropNotifications: () => void;
  accountRefNotifications: React.RefObject<HTMLDivElement>;
}

const Notifications: React.FC<NotificationsProps> = ({
  funcPropNotifications,
  accountRefNotifications,
}) => {
  const notificationsRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Node;
    if (
      notificationsRef.current &&
      accountRefNotifications.current &&
      !notificationsRef.current.contains(target) &&
      !accountRefNotifications.current.contains(target)
    ) {
      funcPropNotifications();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [funcPropNotifications]);

  return (
    <div className="overlay">
      <section ref={notificationsRef} className="notifications">
        <div onClick={funcPropNotifications} className="notifications-bell">
          <BsBellFill />
        </div>
        <h4>UPOZORNĚNÍ</h4>
        <p className="notifications-text">
          <span>Nemáte žádné upozornění</span>
          <br />
          Zde se objeví upozornění, pokud ve vašem CRM dojde k nějaké změně
        </p>
      </section>
    </div>
  );
};

export default Notifications;
