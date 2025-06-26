import React, { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaTimes } from "react-icons/fa";
import "./TenantForm.css";

const utilityOptions = [
  { value: "Tenant", label: "Tenant" },
  { value: "Owner/Landlord", label: "Owner/Landlord" },
];

const FormApplication = () => {
  const { employees, addApplication } = useContext(AppContext);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    rentAmount: "",
    securityAmount: "",
    leaseStart: "",
    leaseEnd: "",
    utilities: {
      water: null,
      gasElectric: null,
      heat: null,
    },
    equipment: "",
    other: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [selectedRecipients, setSelectedRecipients] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (field, selectedOption) => {
    setFormData((prev) => ({
      ...prev,
      utilities: { ...prev.utilities, [field]: selectedOption },
    }));
  };

  const handleRecipientToggle = (employee) => {
    setSelectedRecipients((prev) => {
      const exists = prev.find((e) => e.id === employee.id);
      if (exists) {
        return prev.filter((e) => e.id !== employee.id);
      } else {
        return [...prev, employee];
      }
    });
  };

  const handleRemoveRecipient = (id) => {
    setSelectedRecipients((prev) => prev.filter((emp) => emp.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isIncomplete =
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.rentAmount ||
      !formData.securityAmount ||
      !formData.leaseStart ||
      !formData.leaseEnd ||
      !formData.utilities.water ||
      !formData.utilities.gasElectric ||
      !formData.utilities.heat;

    if (isIncomplete) {
      toast.error("❌ Please fill in all required fields.");
      return;
    }

    if (selectedRecipients.length === 0) {
      toast.error("❌ Please select at least one email recipient.");
      return;
    }

    const newApp = {
      name: formData.fullName,
      email: formData.email,
      rentAmount: Number(formData.rentAmount),
      location: "Not specified",
      phone: formData.phone,
      date: new Date().toLocaleDateString(),
      securityAmount: Number(formData.securityAmount),
      leaseStart: formData.leaseStart,
      leaseEnd: formData.leaseEnd,
      utilities: {
        water: formData.utilities.water.value,
        gasElectric: formData.utilities.gasElectric.value,
        heat: formData.utilities.heat.value,
      },
      equipment: formData.equipment,
      other: formData.other,
      recipients: selectedRecipients,
    };

    addApplication(newApp);

    toast.success("✅ Form submitted successfully!");

    setFormData({
      fullName: "",
      email: "",
      phone: "",
      rentAmount: "",
      securityAmount: "",
      leaseStart: "",
      leaseEnd: "",
      utilities: {
        water: null,
        gasElectric: null,
        heat: null,
      },
      equipment: "",
      other: "",
    });

    setSelectedRecipients([]);
  };

  return (
    <>
      <header className="dashboard-header">
        <h2>Form</h2>
        <button className="add-btn" onClick={() => setShowModal(true)}>
          + Add Recipient
        </button>
      </header>

      {/* Recipients Section */}
      <h3 className="recipients-section">Emails</h3>
      <div className="recipients-section">
        {selectedRecipients.length === 0 ? (
          <p>No employees selected</p>
        ) : (
          <div className="recipients-list">
            {selectedRecipients.map((emp, index) => (
              <span key={emp.id} className="recipient-item">
                {emp.name}
                <button
                  className="remove-btn"
                  onClick={() => handleRemoveRecipient(emp.id)}
                >
                  <FaTimes />
                </button>
                {index !== selectedRecipients.length - 1 && ", "}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Select Recipients</h3>
            <div className="employee-grid">
              {employees.map((emp) => (
                <div
                  key={emp.id}
                  className={`employee-card ${
                    selectedRecipients.some((e) => e.id === emp.id)
                      ? "selected"
                      : ""
                  }`}
                >
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedRecipients.some((e) => e.id === emp.id)}
                      onChange={() => handleRecipientToggle(emp)}
                    />
                    <div className="employee-info">
                      <strong>{emp.name}</strong>
                      <br />
                      <small>{emp.email}</small>
                    </div>
                  </label>
                </div>
              ))}
            </div>

            <button
              className="confin-btn-modal"
              onClick={() => setShowModal(false)}
            >
              Confirm Selection
            </button>
          </div>
        </div>
      )}

      <br />

      {/* Form */}
      <form className="tenant-form" onSubmit={handleSubmit}>
        <h2>Tenant Information Form</h2>

        <div className="form-grid-container">
          <div className="form-column">
            <label htmlFor="fullName">Full Name:</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />

            <label htmlFor="email">Email Address:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label htmlFor="phone">Phone Number:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-column">
            <label htmlFor="rentAmount">Rent Amount:</label>
            <input
              type="number"
              id="rentAmount"
              name="rentAmount"
              value={formData.rentAmount}
              onChange={handleChange}
              required
            />

            <label htmlFor="securityAmount">Security Amount:</label>
            <input
              type="number"
              id="securityAmount"
              name="securityAmount"
              value={formData.securityAmount}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="date-section">
          <div className="date-input-group">
            <label htmlFor="leaseStart">Lease Start Date:</label>
            <input
              type="date"
              id="leaseStart"
              name="leaseStart"
              value={formData.leaseStart}
              onChange={handleChange}
              required
            />
          </div>
          <div className="date-input-group">
            <label htmlFor="leaseEnd">Lease End Date:</label>
            <input
              type="date"
              id="leaseEnd"
              name="leaseEnd"
              value={formData.leaseEnd}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <h3 className="utility-heading">Who Pays for Each Utility?</h3>
        <div className="utility-section">
          <label htmlFor="water">Water:</label>
          <Select
            id="water"
            name="utilities.water"
            options={utilityOptions}
            value={formData.utilities.water}
            onChange={(selected) => handleSelectChange("water", selected)}
            placeholder="Select payer"
          />

          <label htmlFor="gasElectric">Gas/Electric:</label>
          <Select
            id="gasElectric"
            name="utilities.gasElectric"
            options={utilityOptions}
            value={formData.utilities.gasElectric}
            onChange={(selected) => handleSelectChange("gasElectric", selected)}
            placeholder="Select payer"
          />

          <label htmlFor="heat">Heat:</label>
          <Select
            id="heat"
            name="utilities.heat"
            options={utilityOptions}
            value={formData.utilities.heat}
            onChange={(selected) => handleSelectChange("heat", selected)}
            placeholder="Select payer"
          />
        </div>

        <div className="other-info-section">
          <label htmlFor="equipment">Equipment Provided:</label>
          <input
            type="text"
            id="equipment"
            name="equipment"
            value={formData.equipment}
            onChange={handleChange}
          />

          <label htmlFor="other">Other:</label>
          <input
            type="text"
            id="other"
            name="other"
            value={formData.other}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Submit</button>
      </form>

      <ToastContainer position="bottom-right" autoClose={3000} closeButton={false} />
    </>
  );
};

export default FormApplication;
