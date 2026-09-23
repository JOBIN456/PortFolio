import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Contact() {
  const { personal } = portfolioData;
  const targetEmail = personal?.email || 'jobinj5210@gmail.com';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(targetEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const getEncodedMailto = (overrideData = null) => {
    const data = overrideData || formData;
    const subject = encodeURIComponent(
      data.subject?.trim() || `Inquiry from ${data.name?.trim() || 'Portfolio Visitor'}`
    );
    const bodyContent = data.message?.trim()
      ? `Hi Jobin,\n\n${data.message.trim()}\n\n---\nFrom: ${data.name?.trim() || 'Visitor'}\nEmail: ${data.email?.trim() || 'Not provided'}`
      : `Hi Jobin,\n\nI came across your portfolio and would like to connect regarding an AI opportunity/collaboration.`;
    const body = encodeURIComponent(bodyContent);
    return `mailto:${targetEmail}?subject=${subject}&body=${body}`;
  };

  const handleSendViaMailApp = (e) => {
    if (e) e.preventDefault();
    const mailtoUrl = getEncodedMailto();
    window.location.href = mailtoUrl;
    setSubmitted(true);
  };

  const handleOpenGmailWeb = () => {
    const subject = encodeURIComponent(
      formData.subject?.trim() || `Inquiry from ${formData.name?.trim() || 'Portfolio Visitor'}`
    );
    const bodyContent = formData.message?.trim()
      ? `Hi Jobin,\n\n${formData.message.trim()}\n\n---\nFrom: ${formData.name?.trim() || 'Visitor'}\nEmail: ${formData.email?.trim() || 'Not provided'}`
      : `Hi Jobin,\n\nI came across your portfolio and would like to connect regarding an AI opportunity/collaboration.`;
    const body = encodeURIComponent(bodyContent);
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${targetEmail}&su=${subject}&body=${body}`;
    window.open(gmailUrl, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section className="contact-section" id="contact">
      <div className="section-header">
        <h2>Get In Touch</h2>
        <p className="subtitle">
          Open for Full Stack AI Engineer roles, GenAI/Agentic consulting & intelligent system collaborations
        </p>
      </div>

      <div className="contact-container">
        {/* Left column: Contact Info & Direct Links */}
        <div className="contact-info">
          <div className="contact-status-pill">
            <span className="pulse-dot"></span>
            <span>Available for Full-time Full Stack AI Roles & Consulting</span>
          </div>

          <h3>Let's Connect</h3>
          <p>
            Looking for a <strong>Full Stack AI Engineer</strong> capable of building and deploying
            production <strong>Generative AI</strong>, <strong>Autonomous Agents</strong>,{' '}
            <strong>Computer Vision (YOLO/OpenCV)</strong>, and <strong>Scalable Full-Stack Microservices</strong>?
            Reach out directly via email or phone:
          </p>

          <div className="contact-item">
            <span className="contact-item-icon" title="Email">
              <Mail size={18} />
            </span>
            <div className="contact-item-details">
              <span className="contact-item-label">Direct Email</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <a
                  href={`mailto:${targetEmail}`}
                  className="contact-item-link"
                  title="Click to open default mail client"
                >
                  {targetEmail}
                </a>
                <button
                  type="button"
                  className="contact-copy-btn"
                  onClick={handleCopyEmail}
                  title="Copy email address"
                  aria-label="Copy email address"
                >
                  {copied ? (
                    <>
                      <Check size={13} color="#17ca80" />
                      <span style={{ color: '#17ca80', fontSize: '0.78rem' }}>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy size={13} />
                      <span style={{ fontSize: '0.78rem' }}>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="contact-item">
            <span className="contact-item-icon" title="Phone">
              <Phone size={18} />
            </span>
            <div className="contact-item-details">
              <span className="contact-item-label">Phone</span>
              <a
                href={`tel:${personal.phone.replace(/\s+/g, '')}`}
                className="contact-item-link"
              >
                {personal.phone}
              </a>
            </div>
          </div>

          <div className="contact-item">
            <span className="contact-item-icon" title="Location">
              <MapPin size={18} />
            </span>
            <div className="contact-item-details">
              <span className="contact-item-label">Location</span>
              <span className="contact-item-link">{personal.location}</span>
            </div>
          </div>

          {/* Quick Direct Email Connect Buttons */}
          <div className="quick-mail-box">
            <span className="quick-mail-title">
              <Sparkles size={15} color="var(--primary-color)" /> Instant Connect
            </span>
            <div className="quick-mail-buttons">
              <a
                href={`mailto:${targetEmail}`}
                className="direct-mail-action-btn primary"
                title="Open in your default mail app"
              >
                <Mail size={16} /> Open Mail App
              </a>
              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${targetEmail}`}
                target="_blank"
                rel="noopener noreferrer"
                className="direct-mail-action-btn secondary"
                title="Compose directly in Gmail (browser)"
              >
                <ExternalLink size={15} /> Open in Gmail
              </a>
            </div>
          </div>
        </div>

        {/* Right column: Direct Mail Composer */}
        <div className="contact-form-wrapper">
          {submitted ? (
            <div className="contact-status-card success">
              <div className="status-icon-bubble success">
                <CheckCircle2 size={36} color="#17ca80" />
              </div>
              <h3>Mail Client Opened!</h3>
              <p>
                Your mail application has been opened with your message pre-filled to{' '}
                <strong>{targetEmail}</strong>. Simply click <strong>Send</strong> in your mail client to deliver it.
              </p>
              <div className="contact-btn-group" style={{ justifyContent: 'center' }}>
                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${targetEmail}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-secondary-btn"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  <ExternalLink size={15} /> Prefer Gmail Web? Click here
                </a>
                <button
                  type="button"
                  className="contact-submit-btn"
                  onClick={handleReset}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  Send Another Message <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSendViaMailApp}>
              <div className="form-group-row">
                <div className="form-group">
                  <label htmlFor="contact-name" className="contact-label">
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="e.g. Alex Morgan"
                    className="contact-input"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-email" className="contact-label">
                    Your Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="alex@company.com"
                    className="contact-input"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="contact-subject" className="contact-label">
                  Subject / Topic
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  placeholder="e.g. GenAI / Agentic Workflow Collaboration, Full-time AI Role"
                  className="contact-input"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-message" className="contact-label">
                  Message <span style={{ color: 'var(--primary-color)' }}>*</span>
                </label>
                <textarea
                  id="contact-message"
                  placeholder="Describe your AI / Computer Vision / ML project, opportunity, or inquiry..."
                  className="contact-textarea"
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                ></textarea>
              </div>

              <div className="contact-form-actions">
                <button
                  type="submit"
                  className="contact-submit-btn"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    flex: '1',
                  }}
                  title="Opens your device's default mail application"
                >
                  <Send size={18} />
                  <span>Send via Mail App</span>
                </button>

                <button
                  type="button"
                  className="contact-secondary-btn"
                  onClick={handleOpenGmailWeb}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                  }}
                  title="Opens directly in Gmail web composer"
                >
                  <ExternalLink size={16} />
                  <span>Send via Gmail</span>
                </button>
              </div>

              <div className="contact-form-footer">
                <span className="contact-form-secure">
                  ⚡ Direct email connect — directly opens your mail application without any third-party delays.
                </span>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
