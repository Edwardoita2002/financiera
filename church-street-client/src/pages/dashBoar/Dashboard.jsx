import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Sidebar from "./Sidebar";
import "./Dashboard.css";
import EmployeesTable from "./EmployeesTables";
import FormApplication from "./FormApplication";
import ListApplication from "./ListApplication";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [activePage, setActivePage] = useState("Application");
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleSidebarSelect = (page) => {
    if (page === "Logout") {
      logout();
      navigate("/signin");
    } else {
      setActivePage(page);
    }
  };

  const renderContent = () => {
    switch (activePage) {
      case "Employees":
        return <EmployeesTable />;
      case "Form":
        return <FormApplication />;
      case "Application":
        return <ListApplication onNavigate={setActivePage} />;
      default:
        return (
          <div className="center-content">
            <h2>{activePage}</h2>
          </div>
        );
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar onSelect={handleSidebarSelect} active={activePage} />
      <main className="main-content">
        <motion.div
          key={activePage} // permite reanimar en cada cambio de sección
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{ fontFamily: "Acme, sans-serif" }} // Usa Acme si está importada
        >
          {renderContent()}
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
