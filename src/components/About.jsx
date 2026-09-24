import React from 'react';
import { portfolioData } from '../data/portfolioData';

export default function About() {
  const { personal, skills } = portfolioData;

  const totalSkills = skills.reduce((acc, curr) => acc + curr.items.length, 0);

  return (
    <section className="about-us" id="about">
      <div className="section-header">
        <h2>About & Engineering Profile</h2>
        <p className="subtitle">
          Specialized in bridging advanced Generative AI models with robust, production-grade software architectures
        </p>
      </div>

      {/* Single Unified Container (No 2-grid, No image) */}
      <div className="about-single-card">
        {/* Top Header Row */}
        <div className="about-card-top">
          <div className="about-title-group">
            <h3>Full Stack AI Engineering Background</h3>
            <span className="about-role-pill">
              <span className="pill-dot"></span>
              {personal.profileRole || personal.badge || 'Full Stack AI Engineer'}
            </span>
          </div>
        </div>

        {/* Bio Paragraph */}
        <p className="about-text">{personal.aboutText}</p>

        {/* Core Pillars Chips */}
        {personal.corePillars && personal.corePillars.length > 0 && (
          <div className="about-pillars-row">
            <span className="pillars-label">Core Pillars:</span>
            <div className="pillars-list">
              {personal.corePillars.map((pillar) => (
                <span className="about-pillar-tag" key={pillar}>
                  ✦ {pillar}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="about-card-divider" />

        {/* Skills Section */}
        <div className="about-skills-section">
          <div className="skills-section-header">
            <h4>Technical Competencies & Domain Expertise</h4>
            <span className="skills-count-chip">{totalSkills} Skills Across {skills.length} Domains</span>
          </div>

          <div className="skills-grid-unified">
            {skills.map((skillGroup) => (
              <div className="skill-category-card" key={skillGroup.category}>
                <div className="skill-cat-header">
                  <h5>{skillGroup.category}</h5>
                  <span className="skill-cat-count">{skillGroup.items.length}</span>
                </div>
                <div className="skill-tags">
                  {skillGroup.items.map((item) => (
                    <span className="skill-tag" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
