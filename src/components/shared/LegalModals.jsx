import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './LegalModals.css';

const LegalModals = () => {
  const [activeModal, setActiveModal] = useState(null);

  // Fermer avec Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && activeModal) {
        setActiveModal(null);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [activeModal]);

  // Empêcher le scroll quand une modale est ouverte
  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activeModal]);

  const openModal = (modalId) => (e) => {
    e.preventDefault();
    setActiveModal(modalId);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  // Expose openModal function globally for footer links
  useEffect(() => {
    window.openLegalModal = (modalId) => setActiveModal(modalId);
    return () => {
      delete window.openLegalModal;
    };
  }, []);

  return (
    <AnimatePresence>
      {activeModal && (
        <motion.div
          className="legal-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
        >
          <motion.div
            className="legal-modal-content"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="legal-head">
              <h3>
                {activeModal === 'mentions' && 'Mentions légales'}
                {activeModal === 'cookies' && 'Politique de cookies'}
                {activeModal === 'confidentialite' && 'Politique de confidentialité'}
                {activeModal === 'cgv' && 'Conditions générales de vente'}
              </h3>
              <button className="legal-close" onClick={closeModal}>
                Fermer ✕
              </button>
            </div>

            {/* Body */}
            <div className="legal-body">
              {activeModal === 'mentions' && <MentionsLegales />}
              {activeModal === 'cookies' && <PolitiqueCookies />}
              {activeModal === 'confidentialite' && <PolitiqueConfidentialite />}
              {activeModal === 'cgv' && <CGV />}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Composant Mentions Légales
const MentionsLegales = () => (
  <>
    <h1>Mentions légales</h1>
    <p className="muted">Dernière mise à jour : 13 octobre 2025</p>

    <section className="card">
      <h2>Éditeur du site</h2>
      <p>
        Le présent site <strong>www.skillijob.fr</strong> (ci-après « le Site ») est édité par <strong>SKILLIJOB</strong>
        <br />
        <br />
        <strong>Forme juridique :</strong> SAS (Société par actions simplifiée)
        <br />
        <strong>Siège social :</strong> 60 rue François 1er, 75008 Paris, France
        <br />
        <strong>Immatriculée au RCS Paris</strong> sous le numéro <strong>SIREN</strong> 980 918 858 — <strong>SIRET</strong> 980 918 858 00013
        <br />
        <strong>N° TVA intracommunautaire :</strong> FR35980918858
      </p>
      <p>
        <strong>Téléphone :</strong> 09 70 19 67 02
        <br />
        <strong>E-mail :</strong> <a href="mailto:contact@skillijob.fr">contact@skillijob.fr</a>
      </p>
      <p>
        <strong>Directrice de la publication :</strong> Anissa Melo — Présidente
      </p>
    </section>

    <section className="card">
      <h2>Hébergement</h2>
      <p>
        <strong>Hébergeur :</strong> IONOS
        <br />
        <strong>Adresse :</strong> 7 place de la Gare, 57200 Sarreguemines, France
        <br />
        <strong>Téléphone :</strong> 09 70 80 89 11
        <br />
        <strong>Site :</strong> <a href="https://www.ionos.fr" target="_blank" rel="noopener noreferrer">www.ionos.fr</a>
      </p>
    </section>

    <section className="card">
      <h2>Accès au site</h2>
      <p>
        L'accès au Site est gratuit. SKILLIJOB s'efforce d'en assurer l'accessibilité 24/7, sans obligation de résultat. L'éditeur ne saurait être tenu responsable en cas d'indisponibilité, de maintenance ou de mise à jour.
      </p>
    </section>

    <section className="card">
      <h2>Propriété intellectuelle</h2>
      <p>
        L'ensemble des éléments du Site (textes, images, graphismes, logos, vidéos, icônes, code, charte graphique, etc.) est protégé par le droit de la propriété intellectuelle et demeure la propriété exclusive de SKILLIJOB ou de ses partenaires.
      </p>
      <p>
        Toute reproduction, représentation, modification, adaptation, distribution ou exploitation, même partielle, sans autorisation écrite est interdite.
      </p>
    </section>

    <section className="card">
      <h2>Liens hypertextes</h2>
      <p>
        Le Site peut contenir des liens vers des sites tiers. SKILLIJOB n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leurs contenus ou pratiques.
      </p>
      <p>
        La mise en place de liens vers le Site est autorisée sous réserve d'un lien simple, non trompeur et respectueux des intérêts de SKILLIJOB ; l'éditeur peut exiger la suppression de tout lien non conforme.
      </p>
    </section>

    <section className="card">
      <h2>Responsabilité</h2>
      <p>
        L'éditeur ne saurait être tenu responsable des dommages directs ou indirects résultant de l'utilisation du Site (inaccessibilité, perte de données, détériorations, virus, etc.).
      </p>
    </section>

    <section className="card">
      <h2>Données personnelles</h2>
      <p>
        Pour les informations relatives aux traitements éventuels, l'utilisateur est invité à consulter la <strong>Politique de confidentialité</strong>.
      </p>
    </section>

    <section className="card">
      <h2>Droit applicable — Litiges</h2>
      <p>
        Les présentes mentions légales sont soumises au droit français. En cas de litige et à défaut d'accord amiable, les tribunaux compétents de Paris seront seuls compétents.
      </p>
    </section>

    <section className="card">
      <h2>Contact</h2>
      <p>
        <strong>SKILLIJOB</strong>
        <br />
        60 rue François 1er, 75008 Paris
        <br />
        📧 <a href="mailto:contact@skillijob.fr">contact@skillijob.fr</a>
        <br />
        📞 09 70 19 67 02
      </p>
    </section>
  </>
);

// Composant Politique Cookies
const PolitiqueCookies = () => (
  <>
    <h1>Politique de cookies</h1>
    <p className="muted">Dernière mise à jour : 13 octobre 2025</p>

    <section className="card">
      <p>
        La présente politique explique l'usage des cookies/traceurs sur la Landing Page « Candidat », la base juridique de leur dépôt et vos moyens de contrôle.
      </p>
      <p>
        <strong>Important :</strong> Sur cette Landing Page, seuls des cookies strictement nécessaires au fonctionnement sont déposés par défaut. Aucun cookie non essentiel (publicité, réseaux sociaux, analytics non exemptés) ne sera activé sans votre consentement préalable.
      </p>
    </section>

    <section className="card">
      <h2>1. Définition</h2>
      <p>
        Un cookie est un petit fichier texte enregistré sur votre terminal lors de la consultation d'un site. Des technologies similaires (localStorage, balises, pixels, SDK) peuvent avoir des fonctions équivalentes ; l'ensemble est désigné « cookies ».
      </p>
    </section>

    <section className="card">
      <h2>2. Cookies utilisés</h2>

      <h3>2.1. Cookies strictement nécessaires (déposés sans consentement)</h3>
      <p>Indispensables à la fourniture du service et à la sécurité du Site.</p>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Nom (exemple)</th>
              <th>Finalité</th>
              <th>Durée</th>
              <th>Type</th>
              <th>Fournisseur</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>__session</td>
              <td>Session / répartition de charge</td>
              <td>Session</td>
              <td>Interne</td>
              <td>SKILLIJOB</td>
            </tr>
            <tr>
              <td>cookie_consent</td>
              <td>Mémorisation des choix de consentement</td>
              <td>6 mois</td>
              <td>Interne</td>
              <td>SKILLIJOB</td>
            </tr>
            <tr>
              <td>sec_*</td>
              <td>Sécurité (anti-abus, anti-bot)</td>
              <td>24 h</td>
              <td>Interne</td>
              <td>SKILLIJOB</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="muted" style={{ fontSize: '0.9em', marginTop: '0.5rem' }}>
        Adapter ces noms à votre stack (reverse-proxy, CDN, framework, etc.).
      </p>

      <h3>2.2. Mesure d'audience exemptée (optionnelle)</h3>
      <p>
        Si vous implémentez un outil exempté de consentement (ex. Matomo auto-hébergé, IP anonymisée, pas de suivi cross-site), dépôt possible sur base d'intérêt légitime.
      </p>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Nom (exemple)</th>
              <th>Finalité</th>
              <th>Durée</th>
              <th>Type</th>
              <th>Fournisseur</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>_pk_id.*</td>
              <td>Statistiques agrégées de visites</td>
              <td>13 mois (max CNIL)</td>
              <td>Interne</td>
              <td>Matomo (self-host)</td>
            </tr>
            <tr>
              <td>_pk_ses.*</td>
              <td>Session statistique</td>
              <td>30 min</td>
              <td>Interne</td>
              <td>Matomo (self-host)</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="muted" style={{ fontSize: '0.9em', marginTop: '0.5rem' }}>
        Si vous n'utilisez pas une solution exemptée, ces cookies sont non essentiels et désactivés par défaut jusqu'au consentement.
      </p>

      <h3>2.3. Cookies non essentiels (activés uniquement après consentement)</h3>
      <ul>
        <li>Analytics non exemptée (p. ex. Google Analytics/GA4)</li>
        <li>Réseaux sociaux (pixels LinkedIn, Meta, X, TikTok, etc.)</li>
        <li>Publicité/retargeting (tags acquisition, AB testing externalisé, etc.)</li>
      </ul>
      <p className="muted" style={{ fontSize: '0.9em' }}>
        En cas d'activation future, ajoutez le tableau détaillé (nom, finalité, durée, fournisseur) et conservez la preuve du consentement.
      </p>
    </section>

    <section className="card">
      <h2>3. Gérer vos préférences</h2>
      <ul>
        <li><strong>Bandeau cookies à la première visite :</strong> Accepter, Refuser, Personnaliser.</li>
        <li><strong>Pied de page :</strong> lien « Paramétrer les cookies » disponible à tout moment.</li>
        <li><strong>Navigateurs :</strong> vous pouvez configurer votre navigateur pour bloquer/supprimer les cookies (voir l'aide de Chrome, Firefox, Safari, Edge).</li>
      </ul>
    </section>

    <section className="card">
      <h2>4. Durées de conservation</h2>
      <ul>
        <li><strong>Cookies strictement nécessaires :</strong> durée limitée au strict besoin (session/quelques heures ou jours).</li>
        <li><strong>Preuve du consentement</strong> (si cookies non essentiels) : 6 mois (recommandation CNIL).</li>
        <li><strong>Analytics exemptée :</strong> jusqu'à 13 mois.</li>
      </ul>
    </section>

    <section className="card">
      <h2>5. Contact</h2>
      <p>
        Toute question relative aux cookies :{' '}
        <a href="mailto:privacy@skillijob.fr">privacy@skillijob.fr</a> —{' '}
        <a href="mailto:contact@skillijob.fr">contact@skillijob.fr</a>
      </p>
    </section>

    <section className="card">
      <h2>6. Modifications</h2>
      <p>
        Cette politique peut évoluer. La date de mise à jour en haut de page fait foi.
      </p>
    </section>
  </>
);

// Composant Politique de Confidentialité
const PolitiqueConfidentialite = () => (
  <>
    <h1>Politique de confidentialité</h1>
    <p className="muted">Dernière mise à jour : 13 octobre 2025</p>

    <section className="card">
      <p>
        La présente politique décrit de manière transparente si et comment <strong>SKILLIJOB</strong> traite vos données personnelles lorsque vous consultez la landing page « Candidat » (ci-après « la Landing Page »), sans création de compte ni formulaire à cette étape.
      </p>
      <p>
        <strong>Résumé clair :</strong> sur cette Landing Page, aucune donnée personnelle n'est collectée via formulaire. Seules des informations techniques minimales peuvent être traitées pour assurer le fonctionnement, la sécurité et la mesure d'audience strictement nécessaire du Site. Aucun cookie non essentiel n'est déposé sans votre consentement (voir Politique de cookies).
      </p>
    </section>

    <section className="card">
      <h2>1. Responsable du traitement</h2>
      <p>
        <strong>SKILLIJOB</strong>
        <br />
        60 rue François 1er, 75008 Paris, France
        <br />
        📧 Contact : <a href="mailto:privacy@skillijob.fr">privacy@skillijob.fr</a>
      </p>
    </section>

    <section className="card">
      <h2>2. Données traitées à ce stade</h2>
      <p>
        <strong>Données techniques (journaux serveurs) :</strong> adresse IP (pouvant être anonymisée/abrégée si paramétrée), horodatages, URL consultées, user agent (navigateur, OS, appareil), pages de provenance, erreurs.
      </p>
      <p>
        <strong>Cookies strictement nécessaires :</strong> voir la Politique de cookies.
      </p>
      <p>
        <strong>Aucune donnée « formulaire »</strong> (identité, contact, CV, etc.) n'est collectée ici. Cette collecte interviendra exclusivement au moment du formulaire (2ᵉ étape) avec information et consentements dédiés.
      </p>
    </section>

    <section className="card">
      <h2>3. Finalités et bases légales</h2>
      <ul>
        <li>
          <strong>Fonctionnement, sécurité, maintenance du Site</strong> (prévention fraude/abus, diagnostics) — <em>Intérêt légitime (art. 6(1)(f) RGPD)</em>.
        </li>
        <li>
          <strong>Mesure d'audience strictement nécessaire</strong> (optionnelle), si outil exempté conforme (ex. Matomo auto-hébergé, IP anonymisée, pas de reciblage) — <em>Intérêt légitime</em>.
        </li>
        <li>
          Toute analyse non essentielle (ex. GA4) est désactivée par défaut et soumise à votre consentement.
        </li>
      </ul>
    </section>

    <section className="card">
      <h2>4. Destinataires</h2>
      <p>
        Accès limité aux équipes autorisées de SKILLIJOB et à ses prestataires techniques (hébergement/maintenance) soumis à confidentialité. Aucun partage à des tiers publicitaires.
      </p>
    </section>

    <section className="card">
      <h2>5. Transferts hors UE</h2>
      <p>
        Par défaut, aucun transfert hors UE. Si un prestataire impliquait un transfert, SKILLIJOB mettrait en place les garanties appropriées (clauses contractuelles types, etc.) et vous en informerait.
      </p>
    </section>

    <section className="card">
      <h2>6. Durées de conservation</h2>
      <ul>
        <li>
          <strong>Journaux serveurs :</strong> 3 mois
        </li>
        <li>
          <strong>Cookies nécessaires :</strong> durée strictement limitée au fonctionnement (voir Politique de cookies)
        </li>
      </ul>
    </section>

    <section className="card">
      <h2>7. Vos droits</h2>
      <p>
        Conformément au RGPD et à la loi « Informatique et Libertés », vous disposez des droits d'accès, rectification, effacement, opposition, limitation, portabilité, ainsi que du droit de définir des directives post-mortem.
      </p>
      <p>
        <strong>Exercice des droits :</strong> <a href="mailto:privacy@skillijob.fr">privacy@skillijob.fr</a> (pièce d'identité pouvant être demandée).
        <br />
        Réclamation possible auprès de la <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">CNIL</a>.
      </p>
    </section>

    <section className="card">
      <h2>8. Sécurité</h2>
      <p>
        Mise en œuvre de mesures techniques et organisationnelles appropriées (chiffrement en transit, contrôle d'accès, journalisation sécurité, sauvegardes, cloisonnement). En cas de violation de données, notification conformément au RGPD si requis.
      </p>
    </section>

    <section className="card">
      <h2>9. Évolutions</h2>
      <p>
        Cette politique peut être mise à jour. La date en tête de document en atteste. En cas de changement majeur, une information spécifique pourra être affichée.
      </p>
    </section>
  </>
);

// Composant CGV
const CGV = () => (
  <>
    <h1>Conditions Essentielles — Vente en ligne (B2B)</h1>
    <p className="intro">
      <strong>SKILLIJOB</strong> — 60 rue François 1er, 75008 Paris — RCS Paris 980 918 858
      <br />
      Assistance : 09 70 19 67 02 • <a href="mailto:support@skilliplace.com">support@skilliplace.com</a>
      <br />
      <span className="muted">Version : 30/09/2025</span>
    </p>

    <section className="card">
      <h2>1) Objet</h2>
      <p>
        Prestation de mise en relation qualifiée : consultation de profils anonymisés via l'Espace Candidats et déblocage de <strong>5 dossiers complets</strong> (CV, coordonnées, compte-rendu RH) en vue d'entretiens dans le cadre d'un recrutement réel et immédiat.
      </p>
    </section>

    <section className="card">
      <h2>2) Processus</h2>
      <ul>
        <li>
          <strong>Espace Candidats (gratuit) :</strong> le Client filtre et pré-sélectionne des profils.
        </li>
        <li>
          <strong>Commande & paiement en ligne</strong> (CB Stripe) ou choix virement.
        </li>
        <li>
          Le Client transmet à Skillijob les références des profils à débloquer.
        </li>
        <li>
          Skillijob envoie les dossiers complets <strong>&lt; 24 h ouvrées</strong> (par dossier débloqué).
        </li>
      </ul>
    </section>

    <section className="card">
      <h2>3) Prix & paiement</h2>
      <p>
        <strong>990 € HT</strong> (TVA en sus) pour 5 profils qualifiés.
      </p>
      <ul>
        <li>
          <strong>CB (Stripe) :</strong> débit immédiat, facture automatique.
        </li>
        <li>
          <strong>Virement :</strong> règlement reçu avant tout déblocage (RIB communiqué après commande).
        </li>
      </ul>
      <p>
        <strong>Aucun remboursement :</strong> la commande confirme l'ouverture du crédit et la mobilisation des équipes. En cas d'incident couvert par les garanties/SLA (articles 4–6), Skillijob applique remplacement et/ou prolongation du crédit, sans remboursement.
      </p>
    </section>

    <section className="card">
      <h2>4) Délais & SLA</h2>
      <ul>
        <li>
          <strong>Envoi d'un dossier débloqué :</strong> &lt; 24 h ouvrées après paiement + demande de déblocage.
        </li>
        <li>
          <strong>Fraîcheur :</strong> profils revérifiés &lt; 48 h avant envoi.
        </li>
        <li>
          <strong>Objectif :</strong> 95 % des envois dans le SLA.
        </li>
      </ul>
    </section>

    <section className="card">
      <h2>5) Crédit & durée</h2>
      <ul>
        <li>
          Crédit de <strong>5 déblocages</strong>, valable <strong>60 jours</strong> à compter de la commande.
        </li>
        <li>
          Tant que le crédit n'est pas consommé, le Client peut modifier sa sélection et débloquer d'autres profils.
        </li>
      </ul>
    </section>

    <section className="card">
      <h2>6) Garanties commerciales</h2>
      <ul>
        <li>
          <strong>No-Show / Non-joignable 48 h :</strong> si un candidat débloqué est injoignable 48 h ouvrées après le premier contact du Client (preuves d'essais de contact) ou annule avant entretien, Skillijob fournit un remplacement 1-pour-1 sans frais.
        </li>
        <li>
          <strong>Information caduque :</strong> si, au moment de l'envoi, une information clé (disponibilité/mobilité/prétentions) est caduque, Skillijob remplace le dossier.
        </li>
        <li>
          Les garanties ouvrent droit à <strong>remplacement/prolongation du crédit</strong>, aucun remboursement.
        </li>
      </ul>
    </section>

    <section className="card">
      <h2>7) Engagements du Client (recrutement réel)</h2>
      <p>Le Client déclare :</p>
      <ul>
        <li>être en <strong>recrutement réel</strong> (poste ouvert, décisionnaire identifié, modalités connues) ;</li>
        <li>contacter dans les meilleurs délais (recommandé &lt; 48 h ouvrées) tout candidat débloqué ;</li>
        <li>fournir, en cas de demande de remplacement, les preuves d'essais de contact (emails, appels, logs) ;</li>
        <li>utiliser les données reçues uniquement en interne, sans cession à des tiers ;</li>
        <li>respecter la non-discrimination et la réglementation sociale.</li>
      </ul>
      <p>
        <strong>Important :</strong> l'absence de prise de contact rapide peut faire tomber la garantie « Non-joignable 48 h ».
      </p>
    </section>

    <section className="card">
      <h2>8) Étendue du service</h2>
      <p>
        <strong>Inclus :</strong> Espace Candidats (consultation), 5 déblocages, envoi &lt; 24 h, revérification &lt; 48 h, accompagnement planif' (collecte des disponibilités).
      </p>
      <p>
        <strong>Non inclus :</strong> chasse sur mesure, tests techniques/psychométriques, garantie d'embauche, multi-diffusion illimitée (booster possible sur devis séparé).
      </p>
    </section>

    <section className="card">
      <h2>9) RGPD & confidentialité</h2>
      <p>
        Avant déblocage : profils anonymisés. Après : transmission sécurisée (CV, coordonnées, notes RH). Conservation limitée (mission + obligations légales). Droit de retrait sur demande. Usage interne exclusivement.
      </p>
    </section>

    <section className="card">
      <h2>10) Responsabilité</h2>
      <p>
        Skillijob fournit un service de mise en relation qualifiée ; <strong>aucune garantie d'embauche</strong>. Responsabilité limitée au montant HT payé pour l'offre concernée ; aucun dommage indirect indemnisable.
      </p>
    </section>

    <section className="card">
      <h2>11) Droit applicable – Litiges</h2>
      <p>
        Droit français – tentative amiable préalable – Tribunal de commerce de Paris compétent.
      </p>
    </section>

    <section className="card" style={{ backgroundColor: '#f8f9fa', border: '2px solid #0066CC', padding: '1.5rem' }}>
      <h3 style={{ marginTop: 0, color: '#0066CC' }}>Case à cocher (checkout)</h3>
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'flex', alignItems: 'flex-start', cursor: 'pointer' }}>
          <input type="checkbox" style={{ marginRight: '0.75rem', marginTop: '0.25rem' }} disabled />
          <span style={{ color: '#1E293B', fontSize: '0.95rem', lineHeight: '1.6' }}>
            J'ai lu et j'accepte les Conditions Essentielles et les CGV (liens), ainsi que la Politique RGPD (lien).
          </span>
        </label>
      </div>
      <div>
        <label style={{ display: 'flex', alignItems: 'flex-start', cursor: 'pointer' }}>
          <input type="checkbox" style={{ marginRight: '0.75rem', marginTop: '0.25rem' }} disabled />
          <span style={{ color: '#1E293B', fontSize: '0.95rem', lineHeight: '1.6' }}>
            Je confirme être en <strong style={{ color: '#0066CC' }}>RECRUTEMENT RÉEL</strong> et m'engage à contacter rapidement les candidats débloqués.
          </span>
        </label>
      </div>
    </section>

    <section className="card" style={{ backgroundColor: '#fffbea', borderLeft: '4px solid #FFC845', padding: '1.5rem' }}>
      <h3 style={{ marginTop: 0, color: '#1E293B' }}>Mentions sous le bouton « Payer »</h3>
      <ul style={{ marginBottom: 0, paddingLeft: 0, listStyle: 'none' }}>
        <li style={{ padding: '8px 0', paddingLeft: '24px', position: 'relative', color: '#1E293B' }}>
          <span style={{ position: 'absolute', left: '8px', color: '#FFC845', fontWeight: 'bold' }}>•</span>
          Paiement sécurisé Stripe (CB) ou virement avant déblocage
        </li>
        <li style={{ padding: '8px 0', paddingLeft: '24px', position: 'relative', color: '#1E293B' }}>
          <span style={{ position: 'absolute', left: '8px', color: '#FFC845', fontWeight: 'bold' }}>•</span>
          Dossiers envoyés &lt; 24 h après déblocage • Crédit 60 jours
        </li>
        <li style={{ padding: '8px 0', paddingLeft: '24px', position: 'relative', color: '#1E293B' }}>
          <span style={{ position: 'absolute', left: '8px', color: '#FFC845', fontWeight: 'bold' }}>•</span>
          Remplacement 1-pour-1 si no-show/non-joignable 48 h • Aucun remboursement
        </li>
      </ul>
    </section>
  </>
);

export default LegalModals;
