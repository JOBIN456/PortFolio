import React from 'react';
import { portfolioData } from '../data/portfolioData';

export default function About() {
  const { personal, skills, languages } = portfolioData;

  return (
    <section className="about-us" id="about">
      <div className="thegridabout">
        <div className="imagegrid">
          <div className="profile-content">
            <div className="profile-icon">
              <img src={personal.computerImage} alt="AI Engineering Icon" />
            </div>
            <h2>About Me</h2>
            <p className="title">{personal.profileRole}</p>

            <div className="about-ai-badges">
              <span className="ai-sub-badge">Generative AI</span>
              <span className="ai-sub-badge">Deep Learning</span>
              <span className="ai-sub-badge">Computer Vision</span>
              <span className="ai-sub-badge">Machine Learning</span>
            </div>

            <div
              style={{
                marginTop: '1.2rem',
                display: 'flex',
                gap: '0.4rem',
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              {languages.map((lang) => (
                <span
                  key={lang}
                  style={{
                    background: 'rgba(255, 255, 255, 0.18)',
                    color: '#fff',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '999px',
                    fontSize: '0.72rem',
                    backdropFilter: 'blur(4px)',
                  }}
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="contentgrid">
          <h3>AI Engineering & Research Profile</h3>
          <p className="about-text">{personal.aboutText}</p>

          <div className="skills-grid">
            {skills.map((skillGroup) => (
              <div className="skill-category" key={skillGroup.category}>
                <h4>{skillGroup.category}</h4>
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
