import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import candidatesData from '../data/candidates.json';
import './EspaceCandidats.css';

const EspaceCandidats = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedExperience, setSelectedExperience] = useState('all');
  const [selectedAvailability, setSelectedAvailability] = useState('all');
  const [selectedSector, setSelectedSector] = useState('all');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [sortBy, setSortBy] = useState('recent');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'
  const [expandedCandidate, setExpandedCandidate] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  // Extract unique values for filters
  const regions = useMemo(() => {
    const uniqueRegions = [...new Set(candidatesData.map(c => c.region))];
    return uniqueRegions.sort();
  }, []);

  const sectors = useMemo(() => {
    const uniqueSectors = [...new Set(candidatesData.map(c => c.sector))];
    return uniqueSectors.sort();
  }, []);

  const allSkills = useMemo(() => {
    const skillsSet = new Set();
    candidatesData.forEach(c => c.skills.forEach(skill => skillsSet.add(skill)));
    return Array.from(skillsSet).sort();
  }, []);

  const toggleSkill = (skill) => {
    setSelectedSkills(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  // Advanced filtering logic
  const filteredCandidates = useMemo(() => {
    let filtered = candidatesData;

    // Search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(candidate =>
        candidate.name.toLowerCase().includes(query) ||
        candidate.position.toLowerCase().includes(query) ||
        candidate.location.toLowerCase().includes(query) ||
        candidate.skills.some(skill => skill.toLowerCase().includes(query))
      );
    }

    // Region filter
    if (selectedRegion !== 'all') {
      filtered = filtered.filter(c => c.region === selectedRegion);
    }

    // Sector filter
    if (selectedSector !== 'all') {
      filtered = filtered.filter(c => c.sector === selectedSector);
    }

    // Experience filter
    if (selectedExperience !== 'all') {
      filtered = filtered.filter(c => {
        const years = parseInt(c.experience);
        if (selectedExperience === '0-5') return years <= 5;
        if (selectedExperience === '5-10') return years > 5 && years <= 10;
        if (selectedExperience === '10-15') return years > 10 && years <= 15;
        if (selectedExperience === '15+') return years > 15;
        return true;
      });
    }

    // Availability filter
    if (selectedAvailability !== 'all') {
      filtered = filtered.filter(c => c.availability === selectedAvailability);
    }

    // Skills filter
    if (selectedSkills.length > 0) {
      filtered = filtered.filter(c =>
        selectedSkills.every(skill => c.skills.includes(skill))
      );
    }

    // Sorting
    switch (sortBy) {
      case 'experience':
        return [...filtered].sort((a, b) => parseInt(b.experience) - parseInt(a.experience));
      case 'name':
        return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
      case 'location':
        return [...filtered].sort((a, b) => a.location.localeCompare(b.location));
      default:
        return filtered;
    }
  }, [searchQuery, selectedRegion, selectedSector, selectedExperience, selectedAvailability, selectedSkills, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedRegion('all');
    setSelectedSector('all');
    setSelectedExperience('all');
    setSelectedAvailability('all');
    setSelectedSkills([]);
  };

  const activeFiltersCount = [
    searchQuery.trim(),
    selectedRegion !== 'all',
    selectedSector !== 'all',
    selectedExperience !== 'all',
    selectedAvailability !== 'all',
    selectedSkills.length > 0
  ].filter(Boolean).length;

  return (
    <div className="espace-candidats-page">
      {/* Hero Section */}
      <section className="candidates-hero">
        <div className="container">
          <div className="hero-content">
            <h1>Trouvez votre talent idéal</h1>
            <p className="hero-subtitle">Plus de {candidatesData.length} professionnels qualifiés dans l'industrie</p>

            {/* Search Bar */}
            <div className="hero-search">
              <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <input
                type="text"
                placeholder="Nom, métier, compétence, ville..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Results Section */}
      <section className="candidates-main">
        <div className="container">
          <div className="main-layout">
            {/* Sidebar Filters */}
            <aside className={`filters-sidebar ${showFilters ? 'show' : ''}`}>
              <div className="filters-header">
                <h3>Filtres</h3>
                {activeFiltersCount > 0 && (
                  <button onClick={handleResetFilters} className="reset-filters">
                    Réinitialiser ({activeFiltersCount})
                  </button>
                )}
              </div>

              {/* Region Filter */}
              <div className="filter-group">
                <label className="filter-label">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  Région
                </label>
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">Toutes les régions</option>
                  {regions.map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
              </div>

              {/* Sector Filter */}
              <div className="filter-group">
                <label className="filter-label">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/>
                  </svg>
                  Secteur
                </label>
                <select
                  value={selectedSector}
                  onChange={(e) => setSelectedSector(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">Tous les secteurs</option>
                  {sectors.map(sector => (
                    <option key={sector} value={sector}>{sector}</option>
                  ))}
                </select>
              </div>

              {/* Experience Filter */}
              <div className="filter-group">
                <label className="filter-label">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                  </svg>
                  Expérience
                </label>
                <select
                  value={selectedExperience}
                  onChange={(e) => setSelectedExperience(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">Toute expérience</option>
                  <option value="0-5">0-5 ans</option>
                  <option value="5-10">5-10 ans</option>
                  <option value="10-15">10-15 ans</option>
                  <option value="15+">15+ ans</option>
                </select>
              </div>

              {/* Availability Filter */}
              <div className="filter-group">
                <label className="filter-label">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
                  </svg>
                  Disponibilité
                </label>
                <select
                  value={selectedAvailability}
                  onChange={(e) => setSelectedAvailability(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">Toute disponibilité</option>
                  <option value="Immédiate">Immédiate</option>
                  <option value="2 semaines">2 semaines</option>
                  <option value="3 semaines">3 semaines</option>
                  <option value="1 mois">1 mois</option>
                </select>
              </div>

              {/* Skills Filter */}
              <div className="filter-group">
                <label className="filter-label">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>
                  </svg>
                  Compétences
                </label>
                <div className="skills-chips">
                  {allSkills.slice(0, 10).map(skill => (
                    <button
                      key={skill}
                      onClick={() => toggleSkill(skill)}
                      className={`skill-chip ${selectedSkills.includes(skill) ? 'active' : ''}`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            {/* Results Section */}
            <div className="results-section">
              {/* Mobile Filters Toggle */}
              <button
                className="mobile-filters-toggle"
                onClick={() => setShowFilters(!showFilters)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/>
                </svg>
                Filtres {activeFiltersCount > 0 && `(${activeFiltersCount})`}
              </button>

              {/* Results Toolbar */}
              <div className="results-toolbar">
                <div className="toolbar-left">
                  <p className="results-count">
                    {filteredCandidates.length} candidat{filteredCandidates.length > 1 ? 's' : ''} trouvé{filteredCandidates.length > 1 ? 's' : ''}
                  </p>
                </div>
                <div className="toolbar-right">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="sort-select"
                  >
                    <option value="recent">Plus récents</option>
                    <option value="experience">Expérience</option>
                    <option value="name">Nom A-Z</option>
                    <option value="location">Localisation</option>
                  </select>

                  <div className="view-toggle">
                    <button
                      onClick={() => setViewMode('list')}
                      className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                      aria-label="Vue liste"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
                      </svg>
                    </button>
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                      aria-label="Vue grille"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M4 11h5V5H4v6zm0 7h5v-6H4v6zm6 0h5v-6h-5v6zm6 0h5v-6h-5v6zm-6-7h5V5h-5v6zm6-6v6h5V5h-5z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Candidates Display */}
              <div className={`candidates-display ${viewMode}`}>
                <AnimatePresence>
                  {filteredCandidates.map((candidate) => (
                    <motion.div
                      key={candidate.id}
                      className="candidate-card"
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="card-header">
                        <div className="candidate-info">
                          <div className="avatar">
                            {candidate.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <h3 className="candidate-name">{candidate.name}</h3>
                            <p className="candidate-position">{candidate.position}</p>
                          </div>
                        </div>
                        <div className="card-badges">
                          <span className="badge badge-sector">{candidate.sector}</span>
                          <span className="badge badge-availability">{candidate.availability}</span>
                        </div>
                      </div>

                      <div className="card-meta">
                        <div className="meta-item">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                          </svg>
                          <span>{candidate.location}, {candidate.region}</span>
                        </div>
                        <div className="meta-item">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                          </svg>
                          <span>{candidate.experience} d'expérience</span>
                        </div>
                      </div>

                      <div className="card-skills">
                        {candidate.skills.slice(0, 4).map((skill, idx) => (
                          <span key={idx} className="skill-tag">{skill}</span>
                        ))}
                        {candidate.skills.length > 4 && (
                          <span className="skill-tag more">+{candidate.skills.length - 4}</span>
                        )}
                      </div>

                      <button
                        onClick={() => setExpandedCandidate(expandedCandidate === candidate.id ? null : candidate.id)}
                        className="expand-btn"
                      >
                        {expandedCandidate === candidate.id ? 'Voir moins' : 'Voir plus'}
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          style={{
                            transform: expandedCandidate === candidate.id ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.3s ease'
                          }}
                        >
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </button>

                      <AnimatePresence>
                        {expandedCandidate === candidate.id && (
                          <motion.div
                            className="card-details"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="details-section">
                              <h4>Informations complètes</h4>
                              <div className="details-row">
                                <div className="detail-item">
                                  <strong>Formation:</strong>
                                  <span>{candidate.education}</span>
                                </div>
                                <div className="detail-item">
                                  <strong>Mobilité:</strong>
                                  <span>{candidate.mobility}</span>
                                </div>
                              </div>
                              <div className="details-row">
                                <div className="detail-item">
                                  <strong>Type de contrat:</strong>
                                  <span>{candidate.contractType}</span>
                                </div>
                                <div className="detail-item">
                                  <strong>Langues:</strong>
                                  <span>{candidate.languages.join(', ')}</span>
                                </div>
                              </div>
                              {candidate.certifications.length > 0 && (
                                <div className="detail-item full-width">
                                  <strong>Certifications:</strong>
                                  <div className="certifications">
                                    {candidate.certifications.map((cert, idx) => (
                                      <span key={idx} className="cert-badge">{cert}</span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>

                            <div className="card-actions">
                              <Link to="/paiements" className="btn-action btn-primary">
                                Débloquer le profil
                              </Link>
                              <button className="btn-action btn-secondary">
                                Ajouter aux favoris
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {filteredCandidates.length === 0 && (
                  <div className="no-results">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="m21 21-4.35-4.35"></path>
                    </svg>
                    <h3>Aucun candidat trouvé</h3>
                    <p>Essayez de modifier vos critères de recherche</p>
                    <button onClick={handleResetFilters} className="btn-reset">
                      Réinitialiser les filtres
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EspaceCandidats;
