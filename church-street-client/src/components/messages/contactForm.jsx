import  { useState } from 'react';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ContactForm.css';
import sendMessages from '../messages/sendMessages.jsx'; // Ensure this path is correct

const subjectOptions = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'support', label: 'Technical Support' },
  { value: 'billing', label: 'Billing' },
  { value: 'feedback', label: 'Feedback' },
  { value: 'other', label: 'Other' },
];

const customStyles = {
  control: (base) => ({
    ...base,
    backgroundColor: 'transparent',
    border: '1px solid #ff7300',
    borderRadius: '10px',
    padding: '2px 4px',
    color: '#f0f0f0',
    boxShadow: 'none',
    '&:hover': {
        borderColor: '#ff7300', // Keep border color consistent on hover
    },
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: '#111', // Darker background for the dropdown menu
    borderRadius: '10px',
    marginTop: 0,
    zIndex: 9999, // Ensure dropdown appears above other content
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? '#222' : '#111', // Darker on focus, dark for others
    color: '#f0f0f0',
    cursor: 'pointer',
    '&:active': {
        backgroundColor: '#333', // Even darker on active click
    },
  }),
  singleValue: (base) => ({
    ...base,
    color: '#f0f0f0', // Color of the selected value
  }),
  placeholder: (base) => ({
    ...base,
    color: '#ff7300', // Color of the placeholder text
  }),
  input: (base) => ({
    ...base,
    color: '#f0f0f0', // Color of text when typing in the search box
  }),
};

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: null, // Stores the selected option object from react-select
    message: '',
  });

  const [loading, setLoading] = useState(false); // You forgot to declare these states!
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (selectedOption) => {
    // selectedOption is the full object { value: '...', label: '...' }
    setFormData((prev) => ({ ...prev, subject: selectedOption }));
  };

  const handleSubmit = async (e) => { // Make handleSubmit async
    e.preventDefault();

    // Basic client-side validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        toast.error('❌ Please fill in all required fields.');
        return; // Stop the submission
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Pass formData.subject.value to backend as it's typically just the value string
      await sendMessages({ ...formData, subject: formData.subject.value }); // Await the async function
      setSuccess(true);
      setFormData({ // Clear the form after successful submission
        name: '',
        email: '',
        subject: null, // Reset Select component
        message: '',
      });
      toast.success('✅ Success! Your message has been sent.');
    } catch (err) {
      // Access the error message provided by your sendMessages utility
      const errorMessage = err.message || 'An unexpected error occurred.';
      setError(errorMessage);
      toast.error(`❌ Error: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-form-container">
      <h2 className="form-title">Contact Us</h2>
      <p className="form-subtitle">Get In Touch</p>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="subject">Subject</label>
          <Select
            id="subject"
            name="subject"
            options={subjectOptions}
            styles={customStyles}
            placeholder="Select a subject"
            isSearchable={false}
            value={formData.subject} // This ensures the selected value is displayed
            onChange={handleSelectChange}
            required // HTML5 required attribute for consistency, but react-select handles its own validation
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            rows="5"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </form>

      {/* Toast container is typically rendered once at a high level in your app,
          but for a single component, placing it here is fine. */}
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default ContactForm;