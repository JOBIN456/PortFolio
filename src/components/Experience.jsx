import React from 'react';
import { portfolioData } from '../data/portfolioData';

export default function Experience() {
  const { experience } = portfolioData;

  return (
    <section className="experience" id="experience">
      <div className="experience-flex">
        <div className="section-header">
          <h2>Work Experience</h2>
          <p className="subtitle">
            Building impactful solutions across different domains
          </p>
        </div>

        <div className="experience-grid">
          {experience.map((exp, index) => (
            <div className="experience-card" key={index}>
              <div className="card-header">
                <div className="company-info">
                  <h3>{exp.company}</h3>
                  <p className="job-role">{exp.role}</p>
                </div>
                <span className="duration-badge">{exp.duration}</span>
              </div>

              <p className="card-description">{exp.description}</p>

              <div className="achievements">
                <h4>Key Achievements:</h4>
                <ul>
                  {exp.achievements.map((achieve, i) => (
                    <li key={i}>{achieve}</li>
                  ))}
                </ul>
              </div>

              <div className="tech-stack">
                {exp.techStack.map((tech) => (
                  <span className="tech-tag" key={tech}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
