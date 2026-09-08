import React from 'react';
import { portfolioData } from '../data/portfolioData';

export default function Projects() {
  const { projects } = portfolioData;

  return (
    <section className="projects-section" id="projects">
      <div className="section-header">
        <h2>AI, Deep Learning & Vision Projects</h2>
        <p className="subtitle">
          Production Generative AI systems, Computer Vision pipelines & Machine Learning solutions
        </p>
      </div>

      <div className="projects-grid">
        {projects.map((proj, idx) => (
          <div className="project-card" key={idx}>
            <div>
              {proj.badge && (
                <div style={{ marginBottom: '10px' }}>
                  <span className="project-badge-tag">{proj.badge}</span>
                </div>
              )}
              <h3 className="project-title">{proj.title}</h3>
              <p className="project-desc">{proj.description}</p>
            </div>

            <div>
              <div className="project-tech">
                {proj.tech.map((t) => (
                  <span className="project-tech-tag" key={t}>
                    {t}
                  </span>
                ))}
              </div>

              <div className="project-links">
                <a
                  href={proj.link}
                  target={proj.link !== '#' ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  className="project-link-btn"
                >
                  {proj.linkText}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
