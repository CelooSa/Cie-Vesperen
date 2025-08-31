import React, { useState, useEffect } from 'react';
import './adminArtists.scss';

const AdminArtists = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    biography: '',
    specialty: '',
    imageUrl: '',
    website: '',
    socialMedia: {
      instagram: '',
      facebook: '',
      twitter: ''
    }
  });

  useEffect(() => {
    loadArtists();
  }, []);

  const loadArtists = async () => {
    try {
      const savedArtists = JSON.parse(localStorage.getItem('artists') || '[]');
      setArtists(savedArtists);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('socialMedia.')) {
      const platform = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        socialMedia: {
          ...prev.socialMedia,
          [platform]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      biography: '',
      specialty: '',
      imageUrl: '',
      website: '',
      socialMedia: {
        instagram: '',
        facebook: '',
        twitter: ''
      }
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingId) {
        // Modifier artiste existant
        const updatedArtists = artists.map(artist => 
          artist.id === editingId 
            ? { ...artist, ...formData, updatedAt: new Date().toISOString() }
            : artist
        );
        setArtists(updatedArtists);
        localStorage.setItem('artists', JSON.stringify(updatedArtists));
      } else {
        // Créer nouvel artiste
        const newArtist = {
          id: Date.now().toString(),
          ...formData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        const updatedArtists = [...artists, newArtist];
        setArtists(updatedArtists);
        localStorage.setItem('artists', JSON.stringify(updatedArtists));
      }
      
      resetForm();
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de la sauvegarde');
    }
  };

  const handleEdit = (artist) => {
    setFormData({
      name: artist.name,
      biography: artist.biography || '',
      specialty: artist.specialty || '',
      imageUrl: artist.imageUrl || '',
      website: artist.website || '',
      socialMedia: {
        instagram: artist.socialMedia?.instagram || '',
        facebook: artist.socialMedia?.facebook || '',
        twitter: artist.socialMedia?.twitter || ''
      }
    });
    setEditingId(artist.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    // Vérifier si l'artiste a des spectacles
    const spectacles = JSON.parse(localStorage.getItem('spectacles') || '[]');
    const hasSpectacles = spectacles.some(spec => spec.artistId === id);
    
    if (hasSpectacles) {
      alert('Impossible de supprimer cet artiste car il a des spectacles programmés.');
      return;
    }

    const confirmed = window.confirm('Êtes-vous sûr de vouloir supprimer cet artiste ?');
    
    if (confirmed) {
      try {
        const updatedArtists = artists.filter(artist => artist.id !== id);
        setArtists(updatedArtists);
        localStorage.setItem('artists', JSON.stringify(updatedArtists));
      } catch (error) {
        console.error('Erreur:', error);
        alert('Erreur lors de la suppression');
      }
    }
  };

  const countSpectacles = (artistId) => {
    const spectacles = JSON.parse(localStorage.getItem('spectacles') || '[]');
    return spectacles.filter(spec => spec.artistId === artistId).length;
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Chargement des artistes...</p>
      </div>
    );
  }

  return (
    <div className="admin-artists">
      <div className="page-header">
        <div className="header-info">
          <h2>🎨 Gestion des Artistes</h2>
          <p>{artists.length} artiste(s) au total</p>
        </div>
        <button 
          onClick={() => setShowForm(true)}
          className="btn-add-artist"
        >
          ➕ Nouvel artiste
        </button>
      </div>

      {/* Formulaire d'ajout/modification */}
      {showForm && (
        <div className="form-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{editingId ? 'Modifier l\'artiste' : 'Nouvel artiste'}</h3>
              <button onClick={resetForm} className="close-btn">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="artist-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>Nom de l'artiste *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Nom de l'artiste ou du groupe"
                  />
                </div>

                <div className="form-group">
                  <label>Spécialité</label>
                  <input
                    type="text"
                    name="specialty"
                    value={formData.specialty}
                    onChange={handleInputChange}
                    placeholder="Théâtre, Musique, Danse..."
                  />
                </div>

                <div className="form-group full-width">
                  <label>Biographie</label>
                  <textarea
                    name="biography"
                    value={formData.biography}
                    onChange={handleInputChange}
                    placeholder="Biographie de l'artiste..."
                    rows="4"
                  />
                </div>

                <div className="form-group full-width">
                  <label>URL Image</label>
                  <input
                    type="url"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleInputChange}
                    placeholder="https://exemple.com/photo-artiste.jpg"
                  />
                </div>

                <div className="form-group">
                  <label>Site web</label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    placeholder="https://site-artiste.com"
                  />
                </div>

                <div className="form-group">
                  <label>Instagram</label>
                  <input
                    type="text"
                    name="socialMedia.instagram"
                    value={formData.socialMedia.instagram}
                    onChange={handleInputChange}
                    placeholder="@username"
                  />
                </div>

                <div className="form-group">
                  <label>Facebook</label>
                  <input
                    type="text"
                    name="socialMedia.facebook"
                    value={formData.socialMedia.facebook}
                    onChange={handleInputChange}
                    placeholder="Page Facebook"
                  />
                </div>

                <div className="form-group">
                  <label>Twitter/X</label>
                  <input
                    type="text"
                    name="socialMedia.twitter"
                    value={formData.socialMedia.twitter}
                    onChange={handleInputChange}
                    placeholder="@username"
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="button" onClick={resetForm} className="btn-cancel">
                  Annuler
                </button>
                <button type="submit" className="btn-save">
                  {editingId ? '💾 Mettre à jour' : '➕ Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Liste des artistes */}
      <div className="artists-list">
        {artists.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🎨</div>
            <h3>Aucun artiste</h3>
            <p>Commencez par ajouter votre premier artiste</p>
          </div>
        ) : (
          <div className="artists-grid">
            {artists.map(artist => (
              <div key={artist.id} className="artist-card">
                <div className="card-header">
                  <div className="artist-avatar">
                    {artist.imageUrl ? (
                      <img src={artist.imageUrl} alt={artist.name} />
                    ) : (
                      <div className="avatar-placeholder">
                        {artist.name[0]?.toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="artist-main-info">
                    <h4>{artist.name}</h4>
                    {artist.specialty && (
                      <span className="specialty">{artist.specialty}</span>
                    )}
                  </div>
                  <div className="card-actions">
                    <button 
                      onClick={() => handleEdit(artist)}
                      className="btn-edit"
                      title="Modifier"
                    >
                      ✏️
                    </button>
                    <button 
                      onClick={() => handleDelete(artist.id)}
                      className="btn-delete"
                      title="Supprimer"
                    >
                      🗑️
                    </button>
                  </div>
                </div>

                <div className="card-content">
                  {artist.biography && (
                    <p className="artist-bio">
                      {artist.biography.length > 150 
                        ? `${artist.biography.substring(0, 150)}...`
                        : artist.biography
                      }
                    </p>
                  )}

                  <div className="artist-links">
                    {artist.website && (
                      <a href={artist.website} target="_blank" rel="noopener noreferrer" className="link-btn">
                        🌐 Site web
                      </a>
                    )}
                    {artist.socialMedia?.instagram && (
                      <a href={`https://instagram.com/${artist.socialMedia.instagram}`} target="_blank" rel="noopener noreferrer" className="link-btn">
                        📷 Instagram
                      </a>
                    )}
                  </div>

                  <div className="artist-stats">
                    <span className="stat">
                      🎭 {countSpectacles(artist.id)} spectacle(s)
                    </span>
                    <span className="stat">
                      📅 Créé le {new Date(artist.createdAt).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminArtists;