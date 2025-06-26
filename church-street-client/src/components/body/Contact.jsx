import React from 'react';

import './contact.css';
import { HoverEffect } from "./Card-hover-effect"; // Assuming this path is correct
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'; // Icons for contact info
import ContactForm from '../messages/contactForm';

const Contact = () => {
  const projects = [
    {
      title: "Phone Us",
      description: "+1(973) 555-0123",
      icon: FaPhoneAlt, // Using FaPhoneAlt for phone
    },
    {
      title: "Email Us",
      description: "info@churchstreet management.com.",
      icon: FaEnvelope, // Using FaEnvelope for email
    },
    {
      title: "Visit Our Office",
      description: "123 Church Street, Bonao, Dominican Republic",
      icon: FaMapMarkerAlt, // Using FaMapMarkerAlt for location
    },
    {
      title: "Quick Support",
      description: "Monday-Friday: 9am - 6pm  Saturday: 10am - 4pm",
      icon: FaEnvelope, // You can choose another icon if needed, like FaQuestionCircle
    },
  ];

  return (
    <section  className="contact-section">
      <div className="get-in-touch-header">
        <h2 id='contact' >Get In Touch</h2>
      </div>

      <div className="contact-content-wrapper">
        <div className="contact-form-container">

          <ContactForm  className={"contact-form"} />
        </div>



        <div className="contact-info-map-container">
          <div className="contact-info-boxes">
            {/* The HoverEffect component will display the contact information */}
            <HoverEffect className={"info-box"} items={projects} />
          </div>

          <div className="map-container">
            {/* Embedded Google Map placeholder */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.909565551275!2d-70.40798132578598!3d18.995953382173166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8eb2ed0c33a29487%3A0x7d299b8f2d574677!2sBonao%2C%20Monse%C3%B1or%20Nouel%20Province%2C%20Dominican%20Republic!5e0!3m2!1sen!2sdo!4v1718751515984!5m2!1sen!2sdo"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Our Location"
            ></iframe>
          </div>
        </div>
      </div>

      <div className="ready-to-work-section">
        <div className="overlay"></div>
        <h3>We Are Always Ready To Take A New Project</h3>
        {/* Uncomment the button below if you want a call to action */}
        {/* <button className="call-to-action-button">Let's Discuss</button> */}
      </div>
    </section>
  );
};

export default Contact;