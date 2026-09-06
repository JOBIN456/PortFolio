import React from 'react';
import { portfolioData } from '../data/portfolioData';

export default function Projects() {
  const { projects } = portfolioData;

  return (
    <section className="projects-section" id="projects">
      <div className="section-header">
        <h2>Featured Projects</h2>
        <p className="subtitle">
          Engineered scalable web applications & AI-driven solutions
        </p>
      </div>

      <div className="projects-grid">
        {projects.map((proj, idx) => (
          <div className="project-card" key={idx}>
            <div>
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
                  href={proj.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link-btn"
                >
                  View Code →
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
