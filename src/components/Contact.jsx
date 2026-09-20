import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import {
  Mail,
  Phone,
  MapPin,
  Package,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  ArrowRight,
  Info
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Contact() {
  const { personal } = portfolioData;
  const targetEmail = 'jobinj5210@gmail.com';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  // status: 'idle' | 'sending' | 'success' | 'error' | 'needs_config'
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [copied, setCopied] = useState(false);

  // EmailJS credentials from Vite environment
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  // Check if real credentials have been provided
  const isConfigured = Boolean(
    serviceId &&
    templateId &&
    publicKey &&
    serviceId.trim() !== '' &&
    serviceId !== 'your_service_id' &&
    templateId !== 'your_template_id' &&
    publicKey !== 'your_public_key'
  );

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(targetEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleMailtoFallback = () => {
    const subject = encodeURIComponent(
      formData.subject || `AI Engineering Inquiry from ${formData.name || 'Visitor'}`
    );
    const body = encodeURIComponent(
      `Hi Jobin,\n\nName: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.subject || 'AI Project Collaboration'}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:${targetEmail}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Please fill in your name, email address, and message.');
      return;
    }

    // If EmailJS credentials are not yet configured in .env, display the configuration guide & direct fallback
    if (!isConfigured) {
      setStatus('needs_config');
      return;
    }

    setStatus('sending');
    setErrorMessage('');

    try {
      // Provide variables compatible with various EmailJS template parameter naming conventions
      const templateParams = {
        name: formData.name.trim(),
        user_name: formData.name.trim(),
        from_name: formData.name.trim(),
        email: formData.email.trim(),
        user_email: formData.email.trim(),
        from_email: formData.email.trim(),
        reply_to: formData.email.trim(),
        to_email: targetEmail,
        recipient_email: targetEmail,
        to_name: personal.name || 'Jobin Jose',
        subject: formData.subject.trim() || `AI Project Inquiry from ${formData.name.trim()}`,
        message: formData.message.trim(),
      };

      const result = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );

      if (result.status === 200 || result.text === 'OK') {
        setStatus('success');
      } else {
        throw new Error(result.text || 'EmailJS returned a non-success response.');
      }
    } catch (err) {
      console.error('EmailJS Send Error:', err);
      setStatus('error');
      setErrorMessage(
        err?.text ||
        err?.message ||
        'Failed to deliver email through EmailJS. You can use direct mail below.'
      );
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setErrorMessage('');
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
        {/* Left column: Contact Info */}
        <div className="contact-info">
          <div className="contact-status-pill">
            <span className="pulse-dot"></span>
            <span>Available for Full-time Full Stack AI Roles & Consulting</span>
          </div>

          <h3>Let's Connect</h3>
          <p>
            Looking for an experienced <strong>Full Stack AI Engineer</strong> capable of building and deploying
            production <strong>Generative AI</strong>, <strong>Autonomous Agents</strong>,{' '}
            <strong>Computer Vision (YOLO/OpenCV)</strong>, and <strong>Scalable Full-Stack Microservices</strong>?
            Reach out directly or send a message via the form:
          </p>

          <div className="contact-item">
            <span className="contact-item-icon" title="Email">
              <Mail size={18} />
            </span>
            <div className="contact-item-details">
              <span className="contact-item-label">Email</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <a
                  href={`mailto:${targetEmail}`}
                  className="contact-item-link"
                  title="Click to email"
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


        </div>

        {/* Right column: Form / Status States */}
        <div className="contact-form-wrapper">
          {status === 'success' && (
            <div className="contact-status-card success">
              <div className="status-icon-bubble success">
                <CheckCircle2 size={36} color="#17ca80" />
              </div>
              <h3>Message Sent Successfully!</h3>
              <p>
                Thank you, <strong>{formData.name || 'there'}</strong>! Your message has been sent
                directly to <strong>{targetEmail}</strong>. Jobin will review your inquiry and get
                back to you shortly.
              </p>
              <button
                type="button"
                className="contact-submit-btn"
                onClick={handleReset}
                style={{ marginTop: '1rem', width: 'auto', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                Send Another Message <ArrowRight size={16} />
              </button>
            </div>
          )}

          {status === 'needs_config' && (
            <div className="contact-status-card warning">
              <div className="status-icon-bubble warning">
                <Info size={36} color="#f59e0b" />
              </div>
              <h3>EmailJS Setup Note</h3>
              <p>
                To enable instant automated delivery through EmailJS, configure your keys in the{' '}
                <code>.env</code> file:
              </p>
              <div className="env-code-box">
                <code>
                  VITE_EMAILJS_SERVICE_ID=your_service_id<br />
                  VITE_EMAILJS_TEMPLATE_ID=your_template_id<br />
                  VITE_EMAILJS_PUBLIC_KEY=your_public_key<br />
                  VITE_RECIPIENT_EMAIL={targetEmail}
                </code>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#ccc', marginTop: '8px' }}>
                Don't worry! Your message is saved. Click below to deliver it directly to{' '}
                <strong>{targetEmail}</strong> via your email app:
              </p>
              <div className="contact-btn-group">
                <button
                  type="button"
                  className="contact-submit-btn"
                  onClick={handleMailtoFallback}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  <Mail size={16} /> Open in Email App
                </button>
                <button
                  type="button"
                  className="contact-secondary-btn"
                  onClick={() => setStatus('idle')}
                >
                  Back to Form
                </button>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="contact-status-card error">
              <div className="status-icon-bubble error">
                <AlertCircle size={36} color="#ef4444" />
              </div>
              <h3>Delivery Issue</h3>
              <p>{errorMessage}</p>
              <p style={{ fontSize: '0.85rem', color: '#d1d5db', marginTop: '6px' }}>
                You can still forward your message directly to <strong>{targetEmail}</strong>:
              </p>
              <div className="contact-btn-group">
                <button
                  type="button"
                  className="contact-submit-btn"
                  onClick={handleMailtoFallback}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  <Mail size={16} /> Send via Mail App
                </button>
                <button
                  type="button"
                  className="contact-secondary-btn"
                  onClick={() => setStatus('idle')}
                >
                  Edit & Retry
                </button>
              </div>
            </div>
          )}

          {(status === 'idle' || status === 'sending') && (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group-row">
                <div className="form-group">
                  <label htmlFor="contact-name" className="contact-label">
                    Your Name <span style={{ color: 'var(--primary-color)' }}>*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="e.g. Alex Morgan"
                    className="contact-input"
                    required
                    disabled={status === 'sending'}
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-email" className="contact-label">
                    Your Email <span style={{ color: 'var(--primary-color)' }}>*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="alex@company.com"
                    className="contact-input"
                    required
                    disabled={status === 'sending'}
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
                  disabled={status === 'sending'}
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
                  disabled={status === 'sending'}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                ></textarea>
              </div>

              <button
                type="submit"
                className="contact-submit-btn"
                disabled={status === 'sending'}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  opacity: status === 'sending' ? 0.75 : 1,
                  cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                }}
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 size={18} className="contact-spin" />
                    <span>Sending via EmailJS...</span>
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    <span>Send Message to Jobin</span>
                  </>
                )}
              </button>


            </form>
          )}
        </div>
      </div>
    </section>
  );
}
