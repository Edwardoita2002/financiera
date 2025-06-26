import React, { useState, useContext } from 'react';
import { AppContext } from "../../context/AppContext";
import { FaEye, FaEyeSlash, FaEdit, FaTrash } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

function EmployeesTable() {
  const {
    employees,
    addEmployee,
    deleteEmployee,
    updateEmployee,
    getEmployeeById
  } = useContext(AppContext);

  const [visibleCodeId, setVisibleCodeId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEmployeeData, setNewEmployeeData] = useState({
    name: "", email: "", code: "", role: "", phone: "", date: ""
  });
  const [showEditModal, setShowEditModal] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);

  const toggleCodeVisibility = (id) => {
    setVisibleCodeId(prevId => (prevId === id ? null : id));
  };

  const handleDeleteClick = (employeeId) => {
    setEmployeeToDelete(employeeId);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    deleteEmployee(employeeToDelete);
    setShowDeleteModal(false);
    setEmployeeToDelete(null);
    setVisibleCodeId(null);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setEmployeeToDelete(null);
  };

  const handleAddEmployeeClick = () => {
    setNewEmployeeData({
      name: "", email: "", code: "", role: "", phone: "", date: ""
    });
    setShowAddModal(true);
  };

  const handleNewEmployeeChange = (e) => {
    const { name, value } = e.target;
    setNewEmployeeData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitAddEmployee = () => {
    addEmployee(newEmployeeData);
    setShowAddModal(false);
  };

  const cancelAddEmployee = () => {
    setShowAddModal(false);
    setNewEmployeeData({
      name: "", email: "", code: "", role: "", phone: "", date: ""
    });
  };

  const handleUpdate = (employeeId) => {
    const emp = getEmployeeById(employeeId);
    if (emp) {
      setEmployeeToEdit({ ...emp });
      setShowEditModal(true);
    }
  };

  const handleEditEmployeeChange = (e) => {
    const { name, value } = e.target;
    setEmployeeToEdit(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitEditEmployee = () => {
    updateEmployee(employeeToEdit);
    setShowEditModal(false);
    setEmployeeToEdit(null);
  };

  const cancelEditEmployee = () => {
    setShowEditModal(false);
    setEmployeeToEdit(null);
  };

  return (
    <>
      <header className="dashboard-header">
        <h2>Employees</h2>
        <button className="add-btn" onClick={handleAddEmployeeClick}>
          + Add Employee
        </button>
      </header>

      <div className="employee-table">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Basic Info</th>
              <th>Employee Code</th>
              <th>Role</th>
              <th>Phone</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {employees.length === 0 ? (
                <motion.tr
                  key="no-employees"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <td colSpan="7" style={{ textAlign: "center", padding: "1rem", fontStyle: "italic" }}>
                    No employees found.
                  </td>
                </motion.tr>
              ) : (
                employees.map((emp, i) => (
                  <motion.tr
                    key={emp.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td>{i + 1}</td>
                    <td>
                      <strong>{emp.name}</strong>
                      <div className="email">{emp.email}</div>
                    </td>
                    <td>
                      {visibleCodeId === emp.id ? (
                        <>
                          {emp.code}{' '}
                          <button
                            onClick={() => toggleCodeVisibility(emp.id)}
                            className="icon-btn"
                            title="Hide Code"
                          >
                            <FaEyeSlash />
                          </button>
                        </>
                      ) : (
                        <>
                          *******{' '}
                          <button
                            onClick={() => toggleCodeVisibility(emp.id)}
                            className="icon-btn"
                            title="Show Code"
                          >
                            <FaEye />
                          </button>
                        </>
                      )}
                    </td>
                    <td>{emp.role}</td>
                    <td>{emp.phone}</td>
                    <td>{emp.date}</td>
                    <td>
                      <button
                        onClick={() => handleUpdate(emp.id)}
                        className="icon-btn update-btn"
                        title="Edit Employee"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(emp.id)}
                        className="icon-btn delete-btn"
                        title="Delete Employee"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </motion.tr>
                ))
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Modals ya incluidos con AnimatePresence */}
      {/* No se modifican más porque ya tienen animación correctamente */}

      {/* ... (tus modales existentes para eliminar, agregar y editar) ... */}
    </>
  );
}

export default EmployeesTable;
