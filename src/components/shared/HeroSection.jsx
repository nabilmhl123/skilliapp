import React from 'react';
import { motion } from 'framer-motion';
import Button from './Button';
import './HeroSection.css';

const HeroSection = ({
  title,
  subtitle,
  badges = [],
  buttons = [],
  note,
  image,
  imageAlt = "Hero image",
  variant = "default" // "default", "centered"
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };

  return (
    <section className="hero-section">
      <div className="container">
        <motion.div
          className={`hero-section-content ${variant === 'centered' && !image ? 'centered' : ''}`}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Hero Text */}
          <motion.div className="hero-section-text" variants={itemVariants}>
            {badges.length > 0 && (
              <div className="hero-badges">
                {badges.map((badge, index) => (
                  <span key={index} className="badge">{badge}</span>
                ))}
              </div>
            )}

            <h1>{title}</h1>

            <p className="hero-section-subtitle">{subtitle}</p>

            {buttons.length > 0 && (
              <div className="hero-section-buttons">
                {buttons.map((button, index) => (
                  <Button
                    key={index}
                    variant={button.variant || 'primary'}
                    size={button.size || 'large'}
                    href={button.href}
                  >
                    {button.text}
                  </Button>
                ))}
              </div>
            )}

            {note && (
              <p className="hero-section-note">{note}</p>
            )}
          </motion.div>

          {/* Hero Image */}
          {image && (
            <motion.div
              className="hero-section-image"
              variants={itemVariants}
            >
              <div className="image-wrapper">
                <img
                  src={image}
                  alt={imageAlt}
                  className="hero-img"
                  onError={(e) => {
                    e.target.parentNode.innerHTML = `
                      <div class="image-placeholder">
                        <div class="placeholder-content">
                          <span>🚀</span>
                          <p>Votre succès commence ici</p>
                        </div>
                      </div>
                    `;
                  }}
                />
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Effet de fond animé */}
      <div className="hero-background">
        <div className="bg-shape shape-1"></div>
        <div className="bg-shape shape-2"></div>
        <div className="bg-shape shape-3"></div>
      </div>
    </section>
  );
};

export default HeroSection;
