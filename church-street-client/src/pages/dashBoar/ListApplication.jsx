import React, { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { FaPrint, FaTrash } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

function ListApplication({ onNavigate }) {
  const { applications, deleteApplication } = useContext(AppContext);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [applicationToDelete, setApplicationToDelete] = useState(null);

  const handlePrint = (id) => {
    console.log(`Printing details for application ID: ${id}`);
  };

  const handleDeleteClick = (id) => {
    setApplicationToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    deleteApplication(applicationToDelete);
    setShowDeleteModal(false);
    setApplicationToDelete(null);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setApplicationToDelete(null);
  };

  const handleAddApplicationClick = () => {
    onNavigate("Form");
  };

  return (
    <>
      <header className="dashboard-header">
        <h2>Applications</h2>
        <button className="add-btn" onClick={handleAddApplicationClick}>
          + Add Application
        </button>
      </header>

      <div className="employee-table">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Basic Info</th>
              <th>Rent Amount</th>
              <th>Location</th>
              <th>Phone Number</th>
              <th>Joining Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {applications.length === 0 ? (
                <motion.tr
                  key="no-applications"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <td colSpan="7" style={{ textAlign: "center", padding: "1rem", fontStyle: "italic" }}>
                    No applications found.
                  </td>
                </motion.tr>
              ) : (
                applications.map((app, i) => (
                  <motion.tr
                    key={app.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td>{i + 1}</td>
                    <td>
                      <strong>{app.name}</strong>
                      <div className="email">{app.email}</div>
                    </td>
                    <td>${app.rentAmount}</td>
                    <td>{app.location}</td>
                    <td>{app.phone}</td>
                    <td>{app.date}</td>
                    <td>
                      <button
                        onClick={() => handlePrint(app.id)}
                        className="icon-btn print-btn"
                        title="Print Application Details"
                      >
                        <FaPrint />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(app.id)}
                        className="icon-btn delete-btn"
                        title="Delete Application"
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

      {/* Delete Modal with animation */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3>Confirm Deletion</h3>
              <p>Are you sure you want to delete this application? This action cannot be undone.</p>
              <div className="modal-actions">
                <button onClick={confirmDelete} className="confirm-btn">
                  Yes, Delete
                </button>
                <button onClick={cancelDelete} className="cancel-btn">
                  No, Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default ListApplication;
