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
      const subject = encodeURIComponent(`AI Project Inquiry from ${formData.name}`);
      const body = encodeURIComponent(
        `Hi Jobin,\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      );
      window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`;

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', message: '' });
      }, 5000);
    }
  };

  return (
    <section className="contact-section" id="contact">
      <div className="section-header">
        <h2>Get In Touch</h2>
        <p className="subtitle">
          Open for AI Engineer roles, GenAI/CV consulting & intelligent system collaborations
        </p>
      </div>

      <div className="contact-container">
        <div className="contact-info">
          <h3>Let's Connect</h3>
          <p>
            Looking for an experienced <strong>AI Engineer</strong> capable of building and deploying
            production <strong>Generative AI</strong>, <strong>Deep Learning</strong>,{' '}
            <strong>Computer Vision (YOLO/OpenCV)</strong>, and <strong>Agentic RAG workflows</strong>?
            Reach out directly:
          </p>

          <div className="contact-item">
            <span className="contact-item-icon">✉</span>
            <a href={`mailto:${personal.email}`} style={{ color: '#e0e0e0', textDecoration: 'none' }}>
              {personal.email}
            </a>
          </div>
          <div className="contact-item">
            <span className="contact-item-icon">📞</span>
            <a href={`tel:${personal.phone.replace(/\s+/g, '')}`} style={{ color: '#e0e0e0', textDecoration: 'none' }}>
              {personal.phone}
            </a>
          </div>
          <div className="contact-item">
            <span className="contact-item-icon">📍</span>
            <span>{personal.location}</span>
          </div>
          <div className="contact-item">
            <span className="contact-item-icon">📦</span>
            <a
              href={personal.socialLinks.pypi}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--primary-color)', textDecoration: 'none', fontWeight: 'bold' }}
            >
              pyvalidex on PyPI (0.1.1)
            </a>
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
              Drafting email in your email app to {personal.email}...
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
                placeholder="Describe your AI / Computer Vision / ML project or opportunity..."
                className="contact-textarea"
                required
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              ></textarea>
              <button type="submit" className="contact-submit-btn">
                Send Message via Email
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  );
}
