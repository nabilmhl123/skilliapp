import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../components/shared/Button';
import './CV.css';

const CV = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    position: '',
    summary: '',
    cv: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      cv: file
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Logique d'envoi du formulaire
  };

  return (
    <main className="cv-page">
      {/* Hero Section */}
      <section className="cv-hero">
        <div className="container">
          <motion.div
            className="cv-hero-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1>Déposez votre CV</h1>
            <p className="cv-hero-subtitle">
              Rejoignez notre base de talents et accédez à des opportunités exclusives
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="cv-form-section">
        <div className="container">
          <div className="cv-form-wrapper">
            <motion.div
              className="cv-form-container"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="form-intro">
                <h2>Informations personnelles</h2>
                <p>Remplissez le formulaire ci-dessous pour créer votre profil candidat</p>
              </div>

              <form onSubmit={handleSubmit} className="cv-form">
                {/* Personal Info */}
                <div className="form-section">
                  <h3>Identité</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="firstName">Prénom *</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        placeholder="Votre prénom"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName">Nom *</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        placeholder="Votre nom"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="email">Email *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="votre.email@exemple.com"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">Téléphone *</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        placeholder="06 12 34 56 78"
                      />
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="form-section">
                  <h3>Adresse</h3>
                  <div className="form-group">
                    <label htmlFor="address">Adresse</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Numéro et nom de rue"
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="postalCode">Code postal</label>
                      <input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        placeholder="75001"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="city">Ville</label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Paris"
                      />
                    </div>
                  </div>
                </div>

                {/* Professional Info */}
                <div className="form-section">
                  <h3>Informations professionnelles</h3>
                  <div className="form-group">
                    <label htmlFor="position">Poste recherché *</label>
                    <input
                      type="text"
                      id="position"
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      required
                      placeholder="Ex: Développeur Full Stack"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="summary">Résumé professionnel</label>
                    <textarea
                      id="summary"
                      name="summary"
                      value={formData.summary}
                      onChange={handleInputChange}
                      rows="5"
                      placeholder="Décrivez brièvement votre parcours et vos compétences..."
                    />
                  </div>
                </div>

                {/* CV Upload */}
                <div className="form-section">
                  <h3>CV</h3>
                  <div className="form-group">
                    <label htmlFor="cv">Télécharger votre CV *</label>
                    <div className="file-upload-wrapper">
                      <input
                        type="file"
                        id="cv"
                        name="cv"
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx"
                        required
                      />
                      <label htmlFor="cv" className="file-upload-label">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="17 8 12 3 7 8"></polyline>
                          <line x1="12" y1="3" x2="12" y2="15"></line>
                        </svg>
                        <span>
                          {formData.cv ? formData.cv.name : 'Choisir un fichier (PDF, DOC, DOCX)'}
                        </span>
                      </label>
                    </div>
                    <p className="file-upload-hint">Taille maximale: 5 MB</p>
                  </div>
                </div>

                {/* Submit */}
                <div className="form-actions">
                  <Button variant="primary" size="large" type="submit">
                    Envoyer mon CV
                  </Button>
                  <p className="form-note">
                    En soumettant ce formulaire, vous acceptez nos conditions d'utilisation
                    et notre politique de confidentialité.
                  </p>
                </div>
              </form>
            </motion.div>

            {/* Side Info */}
            <motion.div
              className="cv-side-info"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="info-card">
                <div className="info-icon">✓</div>
                <h3>100% Gratuit</h3>
                <p>Aucun frais, aucune commission. Notre service est entièrement gratuit pour les candidats.</p>
              </div>

              <div className="info-card">
                <div className="info-icon">🔒</div>
                <h3>Données sécurisées</h3>
                <p>Vos informations personnelles sont protégées et ne seront jamais partagées sans votre consentement.</p>
              </div>

              <div className="info-card">
                <div className="info-icon">⚡</div>
                <h3>Réponse rapide</h3>
                <p>Notre équipe examine votre profil sous 48h et vous met en relation avec des recruteurs.</p>
              </div>

              <div className="info-card">
                <div className="info-icon">🎯</div>
                <h3>Opportunités ciblées</h3>
                <p>Recevez uniquement des offres correspondant à votre profil et vos attentes.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CV;
