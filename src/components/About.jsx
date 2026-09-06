import React from 'react';
import { portfolioData } from '../data/portfolioData';

export default function About() {
  const { personal, skills } = portfolioData;

  return (
    <section className="about-us" id="about">
      <div className="thegridabout">
        <div className="imagegrid">
          <div className="profile-content">
            <div className="profile-icon">
              <img src={personal.computerImage} alt="Computer icon" />
            </div>
            <h2>About Me</h2>
            <p className="title">{personal.profileRole}</p>
          </div>
        </div>

        <div className="contentgrid">
          <h3>Professional Profile</h3>
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
