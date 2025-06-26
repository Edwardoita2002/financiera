import React, { useState } from "react";
import { motion } from "framer-motion";
import { PanelLeft, AppWindow, Users, FileText, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import "./Sidebar.css";

const Sidebar = ({ onSelect, active }) => {
  const [isOpen, setIsOpen] = useState(true);
  const { user, logout } = useAuth();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logout();
    onSelect("Logout");
  };

  const menuItems = [
    { icon: <PanelLeft size={20} />, label: "Menu", isToggle: true },
    { icon: <FileText size={20} />, label: "Form" },
    { icon: <AppWindow size={20} />, label: "Application" },
    // Solo mostrar "Employees" si el usuario es Admin o Employe
    ...(user?.role === "Admin"
      ? [{ icon: <Users size={20} />, label: "Employees" }]
      : []),
    { icon: <LogOut size={20} />, label: "Logout", onClick: handleLogout },
  ];

  return (
    <motion.aside
      className={`sidebar ${isOpen ? "open" : "collapsed"}`}
      animate={{ width: isOpen ? 200 : 100 }}
      transition={{ duration: 0.05, ease: "easeInOut" }}
    >
      <ul className="sidebar-menu">
        {menuItems.map((item, index) => {
          const handleClick = item.isToggle
            ? toggleSidebar
            : item.onClick
            ? item.onClick
            : () => onSelect(item.label);

          return (
            <li
              key={index}
              onClick={handleClick}
              className={active === item.label ? "active" : ""}
            >
              {item.icon}
              <span>{item.label}</span>
            </li>
          );
        })}
      </ul>
    </motion.aside>
  );
};

export default Sidebar;
