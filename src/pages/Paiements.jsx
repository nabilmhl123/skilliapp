import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../components/shared/Button';
import './Paiements.css';

const Paiements = () => {
  const [selectedPlan, setSelectedPlan] = useState('premium');

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      price: '299',
      period: 'pack',
      popular: false,
      features: [
        '3 profils qualifiés',
        'Dossiers complets sous 24h',
        'CV + coordonnées + compte-rendu RH',
        'Support par email',
        'Validité 30 jours'
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '499',
      period: 'pack',
      popular: true,
      features: [
        '5 profils qualifiés',
        'Dossiers complets sous 24h',
        'CV + coordonnées + compte-rendu RH',
        'Garantie remplacement',
        'Support prioritaire',
        'Validité 60 jours',
        'Sourcing renforcé'
      ]
    },
    {
      id: 'business',
      name: 'Business',
      price: '899',
      period: 'pack',
      popular: false,
      features: [
        '10 profils qualifiés',
        'Dossiers complets sous 24h',
        'CV + coordonnées + compte-rendu RH',
        'Garantie remplacement',
        'Support dédié',
        'Validité 90 jours',
        'Sourcing renforcé',
        'Accès base de données étendue'
      ]
    }
  ];

  const handleSelectPlan = (planId) => {
    setSelectedPlan(planId);
  };

  const handleCheckout = () => {
    console.log('Proceeding to checkout with plan:', selectedPlan);
    // Logique de paiement
  };

  return (
    <main className="paiements-page">
      {/* Hero Section */}
      <section className="paiements-hero">
        <div className="container">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1>Choisissez votre formule</h1>
            <p className="hero-subtitle">
              Accédez à des profils qualifiés et recrutez rapidement
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing-section">
        <div className="container">
          <div className="pricing-grid">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.id}
                className={`pricing-card ${plan.popular ? 'popular' : ''} ${selectedPlan === plan.id ? 'selected' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => handleSelectPlan(plan.id)}
              >
                {plan.popular && (
                  <div className="popular-badge">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    Populaire
                  </div>
                )}

                <div className="plan-header">
                  <h3 className="plan-name">{plan.name}</h3>
                  <div className="plan-price">
                    <span className="price-amount">{plan.price}€</span>
                    <span className="price-period">/ {plan.period}</span>
                  </div>
                </div>

                <ul className="plan-features">
                  {plan.features.map((feature, idx) => (
                    <li key={idx}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="plan-action">
                  {selectedPlan === plan.id ? (
                    <div className="selected-indicator">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      <span>Sélectionné</span>
                    </div>
                  ) : (
                    <button className="select-btn">
                      Sélectionner
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Checkout Button */}
          <motion.div
            className="checkout-action"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button
              variant="primary"
              size="large"
              onClick={handleCheckout}
            >
              Procéder au paiement
            </Button>
            <p className="checkout-note">
              Paiement sécurisé • Satisfaction garantie • Aucun engagement
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Ce qui est inclus dans tous les packs</h2>

          <div className="features-grid">
            <motion.div
              className="feature-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="feature-icon">⚡</div>
              <h3>Livraison rapide</h3>
              <p>Recevez les dossiers complets en moins de 24h ouvrées après déblocage.</p>
            </motion.div>

            <motion.div
              className="feature-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="feature-icon">✅</div>
              <h3>Profils qualifiés</h3>
              <p>Tous nos candidats sont préqualifiés par notre équipe RH avant diffusion.</p>
            </motion.div>

            <motion.div
              className="feature-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="feature-icon">📋</div>
              <h3>Dossiers complets</h3>
              <p>CV détaillé, coordonnées complètes et compte-rendu RH pour chaque profil.</p>
            </motion.div>

            <motion.div
              className="feature-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="feature-icon">💰</div>
              <h3>Prix fixe</h3>
              <p>Aucune commission sur l'embauche, vous payez uniquement pour l'accès aux profils.</p>
            </motion.div>

            <motion.div
              className="feature-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <div className="feature-icon">🔒</div>
              <h3>Paiement sécurisé</h3>
              <p>Transactions 100% sécurisées via notre plateforme de paiement certifiée.</p>
            </motion.div>

            <motion.div
              className="feature-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <div className="feature-icon">🎯</div>
              <h3>Ciblage précis</h3>
              <p>Accédez uniquement aux profils qui correspondent à vos critères de recherche.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <h2 className="section-title">Questions fréquentes</h2>

          <div className="faq-grid">
            <div className="faq-item">
              <h3>Comment fonctionne le déblocage de profils ?</h3>
              <p>
                Une fois votre pack acheté, vous accédez à notre base de candidats. Sélectionnez les profils
                qui vous intéressent et débloquez-les. Vous recevrez les dossiers complets sous 24h.
              </p>
            </div>

            <div className="faq-item">
              <h3>Quelle est la validité des packs ?</h3>
              <p>
                La validité dépend du pack choisi : 30 jours pour Starter, 60 jours pour Premium,
                et 90 jours pour Business. Vous pouvez utiliser vos crédits durant cette période.
              </p>
            </div>

            <div className="faq-item">
              <h3>Que contient un dossier complet ?</h3>
              <p>
                Chaque dossier inclut le CV détaillé du candidat, ses coordonnées complètes (téléphone, email),
                et un compte-rendu RH avec motivation, disponibilité, mobilité et prétentions salariales.
              </p>
            </div>

            <div className="faq-item">
              <h3>Y a-t-il des frais cachés ?</h3>
              <p>
                Non, le prix affiché est le prix final. Aucune commission sur l'embauche, aucun frais
                supplémentaire. Vous payez uniquement pour l'accès aux profils.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Paiements;
