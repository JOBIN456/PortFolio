import React, { useState, useEffect } from 'react';
import { portfolioData } from '../data/portfolioData';

export default function Projects() {
  const { projects } = portfolioData;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-play carousel every 5 seconds if not hovered
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused, projects.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  return (
    <section className="projects-section" id="projects">
      <div className="section-header">
        <h2>AI, Deep Learning & Vision Projects</h2>
        <p className="subtitle">
          Interactive showcase of Generative AI systems, Computer Vision pipelines & Machine Learning solutions
        </p>
      </div>

      <div
        className="carousel-wrapper"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <button
          className="carousel-control-btn prev"
          onClick={handlePrev}
          aria-label="Previous project"
        >
          ❮
        </button>

        <div className="carousel-viewport">
          <div
            className="carousel-track"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {projects.map((proj, idx) => (
              <div className="carousel-slide" key={idx}>
                <div className="project-card carousel-card">
                  <div className="card-top-meta">
                    {proj.badge && (
                      <span className="project-badge-tag">{proj.badge}</span>
                    )}
                    <span className="slide-counter">
                      0{idx + 1} / 0{projects.length}
                    </span>
                  </div>

                  <h3 className="project-title">{proj.title}</h3>
                  <p className="project-desc">{proj.description}</p>

                  <div className="card-bottom">
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
              </div>
            ))}
          </div>
        </div>

        <button
          className="carousel-control-btn next"
          onClick={handleNext}
          aria-label="Next project"
        >
          ❯
        </button>
      </div>

      {/* Carousel Pagination Dots */}
      <div className="carousel-dots">
        {projects.map((_, idx) => (
          <button
            key={idx}
            className={`carousel-dot ${currentIndex === idx ? 'active' : ''}`}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

