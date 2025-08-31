import React, { useState, useEffect } from 'react';
import './adminSpectacles.scss';

const AdminSpectacles = () => {
  const [spectacles, setSpectacles] = useState([]);
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    artistId: '',
    date: '',
    time: '',
    duration: '',
    price: '',
    maxSeats: '',
    venue: '',
    imageUrl: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Charger spectacles et artistes (simulation avec localStorage pour l'instant)
      const savedSpectacles = JSON.parse(localStorage.getItem('spectacles') || '[]');
      const savedArtists = JSON.parse(localStorage.getItem('artists') || '[]');
      
      setSpectacles(savedSpectacles);
      setArtists(savedArtists);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      artistId: '',
      date: '',
      time: '',
      duration: '',
      price: '',
      maxSeats: '',
      venue: '',
      imageUrl: ''
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingId) {
        // Modifier spectacle existant
        const updatedSpectacles = spectacles.map(spec => 
          spec.id === editingId 
            ? { ...spec, ...formData, updatedAt: new Date().toISOString() }
            : spec
        );
        setSpectacles(updatedSpectacles);
        localStorage.setItem('spectacles', JSON.stringify(updatedSpectacles));
      } else {
        // Créer nouveau spectacle
        const newSpectacle = {
          id: Date.now().toString(),
          ...formData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          bookings: 0
        };
        const updatedSpectacles = [...spectacles, newSpectacle];
        setSpectacles(updatedSpectacles);
        localStorage.setItem('spectacles', JSON.stringify(updatedSpectacles));
      }
      
      resetForm();
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de la sauvegarde');
    }
  };

  const handleEdit = (spectacle) => {
    setFormData({
      title: spectacle.title,
      description: spectacle.description,
      artistId: spectacle.artistId,
      date: spectacle.date,
      time: spectacle.time,
      duration: spectacle.duration,
      price: spectacle.price,
      maxSeats: spectacle.maxSeats,
      venue: spectacle.venue,
      imageUrl: spectacle.imageUrl || ''
    });
    setEditingId(spectacle.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Êtes-vous sûr de vouloir supprimer ce spectacle ?');
    
    if (confirmed) {
      try {
        const updatedSpectacles = spectacles.filter(spec => spec.id !== id);
        setSpectacles(updatedSpectacles);
        localStorage.setItem('spectacles', JSON.stringify(updatedSpectacles));
      } catch (error) {
        console.error('Erreur:', error);
        alert('Erreur lors de la suppression');
      }
    }
  };

  const getArtistName = (artistId) => {
    const artist = artists.find(a => a.id === artistId);
    return artist ? artist.name : 'Artiste inconnu';
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Chargement des spectacles...</p>
      </div>
    );
  }

  return (
    <div className="admin-spectacles">
      <div className="page-header">
        <div className="header-info">
          <h2>🎭 Gestion des Spectacles</h2>
          <p>{spectacles.length} spectacle(s) au total</p>
        </div>
        <button 
          onClick={() => setShowForm(true)}
          className="btn-add-spectacle"
        >
          ➕ Nouveau spectacle
        </button>
      </div>

      {/* Formulaire d'ajout/modification */}
      {showForm && (
        <div className="form-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{editingId ? 'Modifier le spectacle' : 'Nouveau spectacle'}</h3>
              <button onClick={resetForm} className="close-btn">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="spectacle-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>Titre *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    placeholder="Titre du spectacle"
                  />
                </div>

                <div className="form-group">
                  <label>Artiste *</label>
                  <select
                    name="artistId"
                    value={formData.artistId}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Sélectionner un artiste</option>
                    {artists.map(artist => (
                      <option key={artist.id} value={artist.id}>
                        {artist.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Date *</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Heure *</label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Durée (minutes)</label>
                  <input
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    placeholder="90"
                    min="1"
                  />
                </div>

                <div className="form-group">
                  <label>Prix (€) *</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    placeholder="25"
                    min="0"
                    step="0.01"
                  />
                </div>

                <div className="form-group">
                  <label>Nombre de places *</label>
                  <input
                    type="number"
                    name="maxSeats"
                    value={formData.maxSeats}
                    onChange={handleInputChange}
                    required
                    placeholder="100"
                    min="1"
                  />
                </div>

                <div className="form-group">
                  <label>Lieu *</label>
                  <input
                    type="text"
                    name="venue"
                    value={formData.venue}
                    onChange={handleInputChange}
                    required
                    placeholder="Théâtre des Arts"
                  />
                </div>

                <div className="form-group full-width">
                  <label>Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Description du spectacle..."
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
                    placeholder="https://exemple.com/image.jpg"
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

      {/* Liste des spectacles */}
      <div className="spectacles-list">
        {spectacles.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🎭</div>
            <h3>Aucun spectacle</h3>
            <p>Commencez par ajouter votre premier spectacle</p>
          </div>
        ) : (
          <div className="spectacles-grid">
            {spectacles.map(spectacle => (
              <div key={spectacle.id} className="spectacle-card">
                <div className="card-header">
                  <h4>{spectacle.title}</h4>
                  <div className="card-actions">
                    <button 
                      onClick={() => handleEdit(spectacle)}
                      className="btn-edit"
                      title="Modifier"
                    >
                      ✏️
                    </button>
                    <button 
                      onClick={() => handleDelete(spectacle.id)}
                      className="btn-delete"
                      title="Supprimer"
                    >
                      🗑️
                    </button>
                  </div>
                </div>

                <div className="card-content">
                  <div className="spectacle-info">
                    <span className="info-item">
                      🎨 {getArtistName(spectacle.artistId)}
                    </span>
                    <span className="info-item">
                      📅 {new Date(spectacle.date).toLocaleDateString('fr-FR')}
                    </span>
                    <span className="info-item">
                      🕐 {spectacle.time}
                    </span>
                    <span className="info-item">
                      📍 {spectacle.venue}
                    </span>
                    <span className="info-item">
                      💰 {spectacle.price}€
                    </span>
                    <span className="info-item">
                      🪑 {spectacle.maxSeats} places
                    </span>
                  </div>

                  {spectacle.description && (
                    <p className="spectacle-description">
                      {spectacle.description}
                    </p>
                  )}

                  <div className="spectacle-status">
                    {(spectacle.bookings || 0) >= spectacle.maxSeats ? (
                      <span className="status-full">🔴 Complet</span>
                    ) : (
                      <span className="status-available">
                        🟢 {spectacle.maxSeats - (spectacle.bookings || 0)} places restantes
                      </span>
                    )}
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

export default AdminSpectacles;