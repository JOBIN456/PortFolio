import React from 'react';
import { portfolioData } from '../data/portfolioData';

export default function Education() {
  const { education, achievements } = portfolioData;

  return (
    <section className="education-section" id="education">
      <div className="section-header">
        <h2>Education & Open Source</h2>
        <p className="subtitle">Academic background and published open-source contributions</p>
      </div>

      <div className="edu-grid">
        <div className="edu-col">
          <h3 className="col-title">🎓 Education</h3>
          <div className="edu-cards-list">
            {education.map((edu, idx) => (
              <div className="edu-card" key={idx}>
                <span className="edu-period">{edu.period}</span>
                <h4 className="edu-degree">{edu.degree}</h4>
                <p className="edu-inst">{edu.institution}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="edu-col">
          <h3 className="col-title">🏆 Featured Achievement & Open Source</h3>
          <div className="edu-cards-list">
            {achievements.map((ach, idx) => (
              <div className="edu-card highlight" key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <h4 className="edu-degree" style={{ margin: 0, color: 'var(--primary-color)' }}>
                    {ach.title}
                  </h4>
                  <span className="duration-badge" style={{ fontSize: '0.75rem', padding: '4px 10px' }}>
                    {ach.badge}
                  </span>
                </div>
                <p className="card-description" style={{ fontSize: '0.9rem', marginBottom: '14px' }}>
                  {ach.description}
                </p>
                <a
                  href={ach.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link-btn"
                  style={{ fontWeight: '700' }}
                >
                  View on PyPI Package Index →
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
