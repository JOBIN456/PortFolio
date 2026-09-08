import React from 'react';
import { portfolioData } from '../data/portfolioData';

export default function Education() {
  const { education } = portfolioData;

  return (
    <section className="education-section" id="education">
      <div className="section-header">
        <h2>Education</h2>
        <p className="subtitle">Academic background and degrees</p>
      </div>

      <div className="edu-grid-single">
        {education.map((edu, idx) => (
          <div className="edu-card" key={idx}>
            <div className="edu-card-top">
              <span className="edu-period">{edu.period}</span>
              <span className="edu-icon">🎓</span>
            </div>
            <h3 className="edu-degree">{edu.degree}</h3>
            <p className="edu-inst">{edu.institution}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

