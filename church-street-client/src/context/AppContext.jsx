// src/context/AppContext.jsx
import React, { createContext, useState } from "react";

// Crear el contexto
export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Estado global para empleados
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Jimmy Henderson",
      email: "hendersonj99@mail.com",
      code: "CU009",
      role: "Employee",
      phone: "788-998-1463",
      date: "2016-03-22",
    },
    {
      id: 2,
      name: "Eva W. Ramirez",
      email: "ramirezeva@mail.com",
      code: "CU012",
      role: "Admin",
      phone: "803-601-6810",
      date: "2018-07-02",
    },
  ]);

  // Estado global para aplicaciones
  const [applications, setApplications] = useState([
    {
      id: 1,
      name: "Jimmy Henderson",
      email: "hendersonj99@mail.com",
      rentAmount: 1000,
      location: "New York",
      phone: "788-998-1463",
      date: "Mar 22, 2016",
    },
    {
      id: 2,
      name: "Eva W. Ramirez",
      email: "ramirezeva@mail.com",
      rentAmount: 1200,
      location: "Los Angeles",
      phone: "803-601-6810",
      date: "Jul 02, 2018",
    },
  ]);

  // Funciones de empleados
  const addEmployee = (newEmployeeData) => {
    const newId = employees.length > 0 ? Math.max(...employees.map(emp => emp.id)) + 1 : 1;
    const newEmp = { id: newId, ...newEmployeeData };
    setEmployees([...employees, newEmp]);
  };

  const deleteEmployee = (employeeId) => {
    setEmployees(employees.filter(emp => emp.id !== employeeId));
  };

  const updateEmployee = (updatedEmployee) => {
    setEmployees(prev =>
      prev.map(emp => (emp.id === updatedEmployee.id ? updatedEmployee : emp))
    );
  };

  const getEmployeeById = (employeeId) => {
    return employees.find(emp => emp.id === employeeId);
  };

  // Funciones de aplicaciones
  const deleteApplication = (applicationId) => {
    setApplications(applications.filter(app => app.id !== applicationId));
  };

  const addApplication = (newAppData) => {
    const newId = applications.length > 0 ? Math.max(...applications.map(app => app.id)) + 1 : 1;
    const newApp = { id: newId, ...newAppData };
    setApplications([...applications, newApp]);
  };

  return (
    <AppContext.Provider
      value={{
        // Exporta estados
        employees,
        setEmployees,
        applications,
        setApplications,

        // Exporta funciones
        addEmployee,
        deleteEmployee,
        updateEmployee,
        getEmployeeById,
        addApplication,
        deleteApplication,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
