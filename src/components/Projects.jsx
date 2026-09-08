import React, { useState, useEffect } from 'react';
import { portfolioData } from '../data/portfolioData';

export default function Projects() {
  const { projects } = portfolioData;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsVisible, setItemsVisible] = useState(3);
  const [isPaused, setIsPaused] = useState(false);

  // Responsive items visible calculation
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 680) {
        setItemsVisible(1);
      } else if (width < 1024) {
        setItemsVisible(2);
      } else {
        setItemsVisible(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, projects.length - itemsVisible);

  // Auto-play
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused, maxIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  return (
    <section className="projects-section" id="projects">
      <div className="section-header">
        <div className="projects-header-top">
          <div>
            <h2>Featured AI & ML Projects</h2>
            <p className="subtitle">
              Production Generative AI architectures, Computer Vision pipelines & Machine Learning deployments
            </p>
          </div>

          <div className="carousel-nav-buttons">
            <button
              className="carousel-control-btn"
              onClick={handlePrev}
              aria-label="Previous project slide"
            >
              ❮
            </button>
            <button
              className="carousel-control-btn"
              onClick={handleNext}
              aria-label="Next project slide"
            >
              ❯
            </button>
          </div>
        </div>
      </div>

      <div
        className="carousel-multi-container"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="carousel-viewport-multi">
          <div
            className="carousel-track-multi"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsVisible)}%)`,
            }}
          >
            {projects.map((proj, idx) => (
              <div
                className="carousel-slide-multi"
                key={idx}
                style={{ width: `${100 / itemsVisible}%` }}
              >
                <div className="project-card-v2">
                  <div className="card-top-bar">
                    <span className="card-project-num">0{idx + 1}</span>
                    {proj.badge && (
                      <span className="project-badge-tag-v2">{proj.badge}</span>
                    )}
                  </div>

                  <h3 className="project-title-v2">{proj.title}</h3>
                  <p className="project-desc-v2">{proj.description}</p>

                  <div className="card-bottom-v2">
                    <div className="project-tech-v2">
                      {proj.tech.map((t) => (
                        <span className="project-tech-tag-v2" key={t}>
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="project-links-v2">
                      <a
                        href={proj.link}
                        target={proj.link !== '#' ? '_blank' : '_self'}
                        rel="noopener noreferrer"
                        className="project-link-btn-v2"
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
      </div>

      {/* Pagination indicators */}
      <div className="carousel-dots-multi">
        {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
          <button
            key={idx}
            className={`carousel-dot-v2 ${currentIndex === idx ? 'active' : ''}`}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Slide group ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}


