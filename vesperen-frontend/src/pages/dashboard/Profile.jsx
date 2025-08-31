import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import "./profile.scss";

const Profile = () => {
  const { user } = useOutletContext();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    city: '',
    postalCode: '',
    preferences: {
      newsletter: false,
      smsNotifications: false,
      emailReminders: true
    }
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    // Charger les données utilisateur
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        dateOfBirth: user.dateOfBirth || '',
        address: user.address || '',
        city: user.city || '',
        postalCode: user.postalCode || '',
        preferences: {
          newsletter: user.preferences?.newsletter || false,
          smsNotifications: user.preferences?.smsNotifications || false,
          emailReminders: user.preferences?.emailReminders || true
        }
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('preferences.')) {
      const prefName = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          [prefName]: checked
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Profil mis à jour avec succès !' });
        setIsEditing(false);
        
        // Mettre à jour les données utilisateur dans le localStorage
        const updatedUser = { ...user, ...formData };
        localStorage.setItem('user', JSON.stringify(updatedUser));
      } else {
        throw new Error('Erreur lors de la mise à jour');
      }
    } catch (error) {
      console.error('Erreur:', error);
      setMessage({ type: 'error', text: 'Erreur lors de la mise à jour du profil' });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Restaurer les données originales
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        dateOfBirth: user.dateOfBirth || '',
        address: user.address || '',
        city: user.city || '',
        postalCode: user.postalCode || '',
        preferences: {
          newsletter: user.preferences?.newsletter || false,
          smsNotifications: user.preferences?.smsNotifications || false,
          emailReminders: user.preferences?.emailReminders || true
        }
      });
    }
    setMessage({ type: '', text: '' });
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Non renseigné';
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar">
          <div className="avatar-circle">
            {formData.firstName ? formData.firstName[0].toUpperCase() : '👤'}
          </div>
        </div>
        <div className="profile-info">
          <h1>{formData.firstName} {formData.lastName}</h1>
          <p className="profile-email">{formData.email}</p>
          <span className="member-since">
            Membre depuis {user?.createdAt ? formatDate(user.createdAt) : 'récemment'}
          </span>
        </div>
        <div className="profile-actions">
          {!isEditing ? (
            <button onClick={() => setIsEditing(true)} className="btn-edit">
              ✏️ Modifier le profil
            </button>
          ) : (
            <div className="edit-actions">
              <button onClick={handleCancel} className="btn-cancel">
                Annuler
              </button>
              <button 
                onClick={handleSubmit} 
                className="btn-save"
                disabled={loading}
              >
                {loading ? 'Sauvegarde...' : '💾 Sauvegarder'}
              </button>
            </div>
          )}
        </div>
      </div>

      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-sections">
          {/* Informations personnelles */}
          <div className="form-section">
            <h3>👤 Informations personnelles</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Prénom</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Votre prénom"
                  />
                ) : (
                  <div className="form-display">{formData.firstName || 'Non renseigné'}</div>
                )}
              </div>

              <div className="form-group">
                <label>Nom</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Votre nom"
                  />
                ) : (
                  <div className="form-display">{formData.lastName || 'Non renseigné'}</div>
                )}
              </div>

              <div className="form-group">
                <label>Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="votre.email@exemple.com"
                  />
                ) : (
                  <div className="form-display">{formData.email}</div>
                )}
              </div>

              <div className="form-group">
                <label>Téléphone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="01 23 45 67 89"
                  />
                ) : (
                  <div className="form-display">{formData.phone || 'Non renseigné'}</div>
                )}
              </div>

              <div className="form-group">
                <label>Date de naissance</label>
                {isEditing ? (
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                  />
                ) : (
                  <div className="form-display">{formatDate(formData.dateOfBirth)}</div>
                )}
              </div>
            </div>
          </div>

          {/* Adresse */}
          <div className="form-section">
            <h3>📍 Adresse</h3>
            <div className="form-grid">
              <div className="form-group full-width">
                <label>Adresse</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="123 Rue de la République"
                  />
                ) : (
                  <div className="form-display">{formData.address || 'Non renseigné'}</div>
                )}
              </div>

              <div className="form-group">
                <label>Ville</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Paris"
                  />
                ) : (
                  <div className="form-display">{formData.city || 'Non renseigné'}</div>
                )}
              </div>

              <div className="form-group">
                <label>Code postal</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    placeholder="75001"
                  />
                ) : (
                  <div className="form-display">{formData.postalCode || 'Non renseigné'}</div>
                )}
              </div>
            </div>
          </div>

          {/* Préférences */}
          <div className="form-section">
            <h3>⚙️ Préférences de notification</h3>
            <div className="preferences-grid">
              <div className="preference-item">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="preferences.newsletter"
                    checked={formData.preferences.newsletter}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                  <span className="checkmark"></span>
                  Recevoir la newsletter
                </label>
                <p className="preference-desc">
                  Restez informé de nos nouveaux spectacles et événements
                </p>
              </div>

              <div className="preference-item">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="preferences.smsNotifications"
                    checked={formData.preferences.smsNotifications}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                  <span className="checkmark"></span>
                  Notifications SMS
                </label>
                <p className="preference-desc">
                  Rappels avant vos spectacles par SMS
                </p>
              </div>

              <div className="preference-item">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="preferences.emailReminders"
                    checked={formData.preferences.emailReminders}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                  <span className="checkmark"></span>
                  Rappels par email
                </label>
                <p className="preference-desc">
                  Rappels de vos réservations par email
                </p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;