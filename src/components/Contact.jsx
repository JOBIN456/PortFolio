import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';

export default function Contact() {
  const { personal } = portfolioData;
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', message: '' });
      }, 4000);
    }
  };

  return (
    <section className="contact-section" id="contact">
      <div className="section-header">
        <h2>Get In Touch</h2>
        <p className="subtitle">Let's discuss opportunities or collaborations</p>
      </div>

      <div className="contact-container">
        <div className="contact-info">
          <h3>Let's Connect</h3>
          <p>
            Have a project in mind, an opportunity, or looking for an experienced
            Python Full Stack & AI Engineer? Feel free to reach out.
          </p>

          <div className="contact-item">
            <span className="contact-item-icon">✉</span>
            <span>your.email@example.com</span>
          </div>
          <div className="contact-item">
            <span className="contact-item-icon">⚡</span>
            <span>Available for Full-time Roles & Contracts</span>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          {submitted ? (
            <div
              style={{
                backgroundColor: 'rgba(23, 202, 128, 0.15)',
                border: '1px solid #17ca80',
                color: '#17ca80',
                padding: '1.2rem',
                borderRadius: '8px',
                textAlign: 'center',
                fontWeight: '600',
              }}
            >
              Thank you! Your message has been sent successfully.
            </div>
          ) : (
            <>
              <input
                type="text"
                placeholder="Your Name"
                className="contact-input"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <input
                type="email"
                placeholder="Your Email"
                className="contact-input"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <textarea
                placeholder="Your Message..."
                className="contact-textarea"
                required
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              ></textarea>
              <button type="submit" className="contact-submit-btn">
                Send Message
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  );
}
