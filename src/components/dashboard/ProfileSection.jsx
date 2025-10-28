import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import './ProfileSection.css';

const ProfileSection = () => {
  const { currentUser, updateProfile, changePassword } = useAuth();
  const [activeTab, setActiveTab] = useState('info');
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    phone: '',
    position: '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (currentUser) {
      setProfileData({
        firstName: currentUser.firstName || '',
        lastName: currentUser.lastName || '',
        companyName: currentUser.companyName || '',
        phone: currentUser.phone || '',
        position: currentUser.position || '',
      });
    }
  }, [currentUser]);

  const handleProfileChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      await updateProfile(profileData);
      setMessage({ type: 'success', text: '✅ Profil mis à jour avec succès !' });
      setIsEditing(false);
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: '❌ ' + error.message });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: 'error', text: '❌ Les nouveaux mots de passe ne correspondent pas' });
      setLoading(false);
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setMessage({ type: 'error', text: '❌ Le mot de passe doit contenir au moins 6 caractères' });
      setLoading(false);
      return;
    }

    try {
      await changePassword(passwordData.currentPassword, passwordData.newPassword);
      setMessage({ type: 'success', text: '✅ Mot de passe changé avec succès !' });
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: '❌ ' + error.message });
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) {
    return <div className="profile-loading">Chargement...</div>;
  }

  const isCandidate = currentUser.userType === 'candidate';

  return (
    <div className="profile-section">
      <div className="profile-header">
        <div className="profile-avatar">
          <div className="avatar-circle">
            {currentUser.firstName?.[0]?.toUpperCase() || currentUser.email[0].toUpperCase()}
          </div>
        </div>
        <div className="profile-header-info">
          <h2>
            {isCandidate
              ? `${currentUser.firstName || ''} ${currentUser.lastName || ''}`
              : currentUser.companyName || 'Entreprise'}
          </h2>
          <p className="profile-email">{currentUser.email}</p>
          <span className={`profile-badge ${isCandidate ? 'candidate' : 'company'}`}>
            {isCandidate ? '👤 Candidat' : '🏢 Entreprise'}
          </span>
        </div>
      </div>

      {message.text && (
        <div className={`profile-message ${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="profile-tabs">
        <button
          className={`tab-button ${activeTab === 'info' ? 'active' : ''}`}
          onClick={() => setActiveTab('info')}
        >
          📋 Informations
        </button>
        <button
          className={`tab-button ${activeTab === 'security' ? 'active' : ''}`}
          onClick={() => setActiveTab('security')}
        >
          🔒 Sécurité
        </button>
      </div>

      <div className="profile-content">
        {activeTab === 'info' && (
          <div className="profile-info-tab">
            <div className="tab-header">
              <h3>Informations personnelles</h3>
              {!isEditing && (
                <button className="btn-edit" onClick={() => setIsEditing(true)}>
                  ✏️ Modifier
                </button>
              )}
            </div>

            {isEditing ? (
              <form onSubmit={handleProfileSubmit} className="profile-form">
                {isCandidate ? (
                  <>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Prénom *</label>
                        <input
                          type="text"
                          name="firstName"
                          value={profileData.firstName}
                          onChange={handleProfileChange}
                          required
                          placeholder="Votre prénom"
                        />
                      </div>
                      <div className="form-group">
                        <label>Nom *</label>
                        <input
                          type="text"
                          name="lastName"
                          value={profileData.lastName}
                          onChange={handleProfileChange}
                          required
                          placeholder="Votre nom"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Téléphone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleProfileChange}
                        placeholder="06 12 34 56 78"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="form-group">
                      <label>Nom de l'entreprise *</label>
                      <input
                        type="text"
                        name="companyName"
                        value={profileData.companyName}
                        onChange={handleProfileChange}
                        required
                        placeholder="Nom de votre entreprise"
                      />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Prénom du contact *</label>
                        <input
                          type="text"
                          name="firstName"
                          value={profileData.firstName}
                          onChange={handleProfileChange}
                          required
                          placeholder="Prénom"
                        />
                      </div>
                      <div className="form-group">
                        <label>Nom du contact *</label>
                        <input
                          type="text"
                          name="lastName"
                          value={profileData.lastName}
                          onChange={handleProfileChange}
                          required
                          placeholder="Nom"
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Fonction *</label>
                        <input
                          type="text"
                          name="position"
                          value={profileData.position}
                          onChange={handleProfileChange}
                          required
                          placeholder="Ex: Responsable RH"
                        />
                      </div>
                      <div className="form-group">
                        <label>Téléphone *</label>
                        <input
                          type="tel"
                          name="phone"
                          value={profileData.phone}
                          onChange={handleProfileChange}
                          required
                          placeholder="01 23 45 67 89"
                        />
                      </div>
                    </div>
                  </>
                )}

                <div className="form-actions">
                  <button
                    type="button"
                    className="btn-cancel"
                    onClick={() => {
                      setIsEditing(false);
                      setProfileData({
                        firstName: currentUser.firstName || '',
                        lastName: currentUser.lastName || '',
                        companyName: currentUser.companyName || '',
                        phone: currentUser.phone || '',
                        position: currentUser.position || '',
                      });
                    }}
                    disabled={loading}
                  >
                    Annuler
                  </button>
                  <button type="submit" className="btn-save" disabled={loading}>
                    {loading ? 'Enregistrement...' : '💾 Enregistrer'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="profile-display">
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">Email</span>
                    <span className="info-value">{currentUser.email}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Type de compte</span>
                    <span className="info-value">
                      {isCandidate ? 'Candidat' : 'Entreprise'}
                    </span>
                  </div>
                  {isCandidate ? (
                    <>
                      <div className="info-item">
                        <span className="info-label">Prénom</span>
                        <span className="info-value">{currentUser.firstName || 'Non renseigné'}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Nom</span>
                        <span className="info-value">{currentUser.lastName || 'Non renseigné'}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Téléphone</span>
                        <span className="info-value">{currentUser.phone || 'Non renseigné'}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="info-item">
                        <span className="info-label">Entreprise</span>
                        <span className="info-value">{currentUser.companyName || 'Non renseigné'}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Contact</span>
                        <span className="info-value">
                          {currentUser.firstName} {currentUser.lastName}
                        </span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Fonction</span>
                        <span className="info-value">{currentUser.position || 'Non renseigné'}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Téléphone</span>
                        <span className="info-value">{currentUser.phone || 'Non renseigné'}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'security' && (
          <div className="profile-security-tab">
            <h3>Changer le mot de passe</h3>
            <form onSubmit={handlePasswordSubmit} className="profile-form">
              <div className="form-group">
                <label>Mot de passe actuel *</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  required
                  placeholder="••••••••"
                />
              </div>
              <div className="form-group">
                <label>Nouveau mot de passe *</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  required
                  placeholder="••••••••"
                  minLength={6}
                />
                <small>Minimum 6 caractères</small>
              </div>
              <div className="form-group">
                <label>Confirmer le nouveau mot de passe *</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  required
                  placeholder="••••••••"
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn-save" disabled={loading}>
                  {loading ? 'Modification...' : '🔒 Changer le mot de passe'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileSection;
