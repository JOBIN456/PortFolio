import React, { useState, useMemo } from 'react';
import { portfolioData } from '../data/portfolioData';
import {
  Sparkles,
  Layers,
  Server,
  Eye,
  BarChart3,
  Database,
  Workflow,
  Cloud,
  Terminal,
  Search,
  X,
  Check,
  Code2,
} from 'lucide-react';

const DOMAIN_CONFIG = {
  'Generative AI & Agentic Systems': {
    icon: Sparkles,
    accent: '#00f0ff',
    accentBg: 'rgba(0, 240, 255, 0.12)',
    borderColor: 'rgba(0, 240, 255, 0.35)',
    glow: 'rgba(0, 240, 255, 0.25)',
    group: 'ai',
    subtitle: 'LLMs, Multimodal Agents & RAG',
    badge: 'Core Focus',
  },
  'Full Stack & Web Engineering': {
    icon: Layers,
    accent: '#10b981',
    accentBg: 'rgba(16, 185, 129, 0.12)',
    borderColor: 'rgba(16, 185, 129, 0.35)',
    glow: 'rgba(16, 185, 129, 0.25)',
    group: 'engineering',
    subtitle: 'Reactive Interfaces & Web Architecture',
    badge: 'Production Core',
  },
  'AI Backend & Microservices': {
    icon: Server,
    accent: '#818cf8',
    accentBg: 'rgba(129, 140, 248, 0.12)',
    borderColor: 'rgba(129, 140, 248, 0.35)',
    glow: 'rgba(129, 140, 248, 0.25)',
    group: 'engineering',
    subtitle: 'High-Throughput APIs & Async Services',
    badge: 'Scalable Systems',
  },
  'Computer Vision & Deep Learning': {
    icon: Eye,
    accent: '#f59e0b',
    accentBg: 'rgba(245, 158, 11, 0.12)',
    borderColor: 'rgba(245, 158, 11, 0.35)',
    glow: 'rgba(245, 158, 11, 0.25)',
    group: 'ai',
    subtitle: 'YOLO Detection, OCR & Perception',
    badge: 'Deep Perception',
  },
  'Machine Learning & Data Science': {
    icon: BarChart3,
    accent: '#c084fc',
    accentBg: 'rgba(192, 132, 252, 0.12)',
    borderColor: 'rgba(192, 132, 252, 0.35)',
    glow: 'rgba(192, 132, 252, 0.25)',
    group: 'ai',
    subtitle: 'Predictive Modeling & Statistical Flow',
    badge: 'Advanced ML',
  },
  'Vector Stores & Databases': {
    icon: Database,
    accent: '#38bdf8',
    accentBg: 'rgba(56, 189, 248, 0.12)',
    borderColor: 'rgba(56, 189, 248, 0.35)',
    glow: 'rgba(56, 189, 248, 0.25)',
    group: 'infra',
    subtitle: 'Vector Embeddings & Relational DBs',
    badge: 'Data Layer',
  },
  'MLOps, Tools & Platforms': {
    icon: Workflow,
    accent: '#fb7185',
    accentBg: 'rgba(251, 113, 133, 0.12)',
    borderColor: 'rgba(251, 113, 133, 0.35)',
    glow: 'rgba(251, 113, 133, 0.25)',
    group: 'infra',
    subtitle: 'CI/CD, Docker & Model Lifecycle',
    badge: 'DevOps & Tooling',
  },
  'Cloud Platforms (Foundational)': {
    icon: Cloud,
    accent: '#2dd4bf',
    accentBg: 'rgba(45, 212, 191, 0.12)',
    borderColor: 'rgba(45, 212, 191, 0.35)',
    glow: 'rgba(45, 212, 191, 0.25)',
    group: 'infra',
    subtitle: 'Distributed Hosting & Cloud Services',
    badge: 'Cloud Native',
  },
  'Programming Languages': {
    icon: Terminal,
    accent: '#a3e635',
    accentBg: 'rgba(163, 230, 53, 0.12)',
    borderColor: 'rgba(163, 230, 53, 0.35)',
    glow: 'rgba(163, 230, 53, 0.25)',
    group: 'engineering',
    subtitle: 'Multi-Paradigm Programming & Scripts',
    badge: 'Core Syntax',
  },
};

const DEFAULT_CONFIG = {
  icon: Code2,
  accent: '#17ca80',
  accentBg: 'rgba(23, 202, 128, 0.12)',
  borderColor: 'rgba(23, 202, 128, 0.35)',
  glow: 'rgba(23, 202, 128, 0.25)',
  group: 'engineering',
  subtitle: 'Technical Competency',
  badge: 'Core Stack',
};

export default function About() {
  const { personal, skills } = portfolioData;

  const [activeGroup, setActiveGroup] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedSkill, setCopiedSkill] = useState(null);

  const totalSkills = useMemo(
    () => skills.reduce((acc, curr) => acc + curr.items.length, 0),
    [skills]
  );

  const filterTabs = useMemo(() => [
    { id: 'all', label: 'All Domains', count: skills.length },
    {
      id: 'ai',
      label: 'AI & Machine Learning',
      count: skills.filter((s) => DOMAIN_CONFIG[s.category]?.group === 'ai').length,
    },
    {
      id: 'engineering',
      label: 'Full Stack & Backend',
      count: skills.filter((s) => DOMAIN_CONFIG[s.category]?.group === 'engineering').length,
    },
    {
      id: 'infra',
      label: 'Data & Cloud Infra',
      count: skills.filter((s) => DOMAIN_CONFIG[s.category]?.group === 'infra').length,
    },
  ], [skills]);

  // Filter skills based on tab and live search
  const filteredSkills = useMemo(() => {
    return skills.filter((skillGroup) => {
      const config = DOMAIN_CONFIG[skillGroup.category] || DEFAULT_CONFIG;

      // Group filter
      if (activeGroup !== 'all' && config.group !== activeGroup) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesCat = skillGroup.category.toLowerCase().includes(query);
        const matchesSubtitle = config.subtitle?.toLowerCase().includes(query);
        const matchesItem = skillGroup.items.some((item) =>
          item.toLowerCase().includes(query)
        );
        return matchesCat || matchesSubtitle || matchesItem;
      }

      return true;
    });
  }, [skills, activeGroup, searchQuery]);

  const handleSkillClick = (skillName) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(skillName);
      setCopiedSkill(skillName);
      setTimeout(() => setCopiedSkill(null), 1600);
    }
  };

  return (
    <section className="about-us" id="about">
      <div className="section-header">
        <h2>About & Engineering Profile</h2>
        <p className="subtitle">
          Specialized in bridging advanced Generative AI models with robust, production-grade software architectures
        </p>
      </div>

      {/* Single Unified Container */}
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

        {/* Technical Competencies & Domain Expertise Section */}
        <div className="about-skills-section">
          {/* Header */}
          <div className="skills-section-header">
            <div className="skills-header-title-group">
              <h4>Technical Competencies & Domain Expertise</h4>
              <p className="skills-header-desc">
                High-impact toolchains, neural frameworks, microservices & scalable data systems
              </p>
            </div>
            <span className="skills-count-chip">
              {totalSkills} Technologies Across {skills.length} Domains
            </span>
          </div>

          {/* Interactive Controls Bar: Filters & Live Search */}
          <div className="skills-controls-bar">
            <div className="skills-filter-tabs">
              {filterTabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`skills-tab-btn ${activeGroup === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveGroup(tab.id)}
                  type="button"
                >
                  <span>{tab.label}</span>
                  <span className="tab-badge">{tab.count}</span>
                </button>
              ))}
            </div>

            <div className="skills-search-wrapper">
              <Search className="skills-search-icon" size={15} />
              <input
                type="text"
                className="skills-search-input"
                placeholder="Search tech (e.g. LangGraph, YOLO, FastAPI)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  className="skills-search-clear"
                  onClick={() => setSearchQuery('')}
                  title="Clear search"
                  type="button"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* STRICT 3-CARDS PER GRID */}
          <div className="skills-grid-unified">
            {filteredSkills.length > 0 ? (
              filteredSkills.map((skillGroup) => {
                const config = DOMAIN_CONFIG[skillGroup.category] || DEFAULT_CONFIG;
                const IconComponent = config.icon;

                const cardStyle = {
                  '--card-accent': config.accent,
                  '--card-accent-bg': config.accentBg,
                  '--card-border-color': config.borderColor,
                  '--card-glow': config.glow,
                };

                return (
                  <div
                    className="skill-category-card"
                    key={skillGroup.category}
                    style={cardStyle}
                  >
                    {/* Card Header */}
                    <div className="skill-cat-header">
                      <div className="skill-cat-left">
                        <div className="skill-cat-icon-badge">
                          <IconComponent size={20} strokeWidth={2.2} />
                        </div>
                        <div className="skill-cat-info">
                          <h5>{skillGroup.category}</h5>
                          <span className="skill-cat-subtitle">{config.subtitle}</span>
                        </div>
                      </div>
                      <span className="skill-cat-count">
                        {skillGroup.items.length} Techs
                      </span>
                    </div>

                    {/* Skill Tags Cloud */}
                    <div className="skill-tags">
                      {skillGroup.items.map((item) => {
                        const isMatched =
                          searchQuery.trim().length > 0 &&
                          item.toLowerCase().includes(searchQuery.toLowerCase().trim());
                        const isCopied = copiedSkill === item;

                        return (
                          <span
                            className={`skill-tag ${isMatched ? 'matched' : ''} ${
                              isCopied ? 'copied' : ''
                            }`}
                            key={item}
                            onClick={() => handleSkillClick(item)}
                            title="Click to copy technology name"
                          >
                            <span className="skill-tag-dot" />
                            <span className="skill-name">
                              {isCopied ? '✓ Copied' : item}
                            </span>
                          </span>
                        );
                      })}
                    </div>

                    {/* Card Bottom Footer */}
                    <div className="skill-card-footer">
                      <span className="skill-card-badge">
                        <span className="skill-card-badge-dot" />
                        {config.badge}
                      </span>
                      <span className="skill-card-action-hint">
                        {copiedSkill && skillGroup.items.includes(copiedSkill)
                          ? 'Copied to clipboard'
                          : 'Click tag to copy'}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="skills-empty-state">
                <p>No technologies found matching &ldquo;{searchQuery}&rdquo;</p>
                <button
                  className="skills-reset-btn"
                  onClick={() => {
                    setSearchQuery('');
                    setActiveGroup('all');
                  }}
                  type="button"
                >
                  Reset Search & Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
