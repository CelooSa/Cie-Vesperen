import React, { useState, useEffect } from 'react';
import './reservations.scss';

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, upcoming, past

  // Charger les réservations au début
  useEffect(() => {
    loadReservations();
  }, []);

  // Fonction pour charger les réservations
  const loadReservations = () => {
    try {
      // Récupérer depuis localStorage (temporaire)
      const savedReservations = JSON.parse(localStorage.getItem('userReservations') || '[]');
      setReservations(savedReservations);
    } catch (error) {
      console.error('Erreur:', error);
      setReservations([]);
    } finally {
      setLoading(false);
    }
  };

  // Vérifier si un spectacle est à venir
  const isUpcoming = (dateString) => {
    return new Date(dateString) > new Date();
  };

  // Pouvoir annuler une réservation (24h avant)
  const canCancel = (reservation) => {
    const showDate = new Date(reservation.showDate);
    const now = new Date();
    const hoursDiff = (showDate - now) / (1000 * 60 * 60);
    return hoursDiff > 24 && reservation.status === 'confirmed';
  };

  // Filtrer les réservations
  const filteredReservations = reservations.filter(reservation => {
    switch (filter) {
      case 'upcoming':
        return isUpcoming(reservation.showDate) && reservation.status !== 'cancelled';
      case 'past':
        return !isUpcoming(reservation.showDate) || reservation.status === 'completed';
      default:
        return true;
    }
  });

  // Annuler une réservation
  const handleCancelReservation = (reservationId) => {
    const confirmed = window.confirm('Êtes-vous sûr de vouloir annuler cette réservation ?');
    
    if (confirmed) {
      const updatedReservations = reservations.map(res => 
        res.id === reservationId 
          ? { ...res, status: 'cancelled' }
          : res
      );
      
      setReservations(updatedReservations);
      localStorage.setItem('userReservations', JSON.stringify(updatedReservations));
    }
  };

  // Télécharger un billet (simulation)
  const downloadTicket = (reservation) => {
    const ticketContent = `
BILLET DE SPECTACLE
==================
Spectacle: ${reservation.showTitle}
Date: ${new Date(reservation.showDate).toLocaleDateString('fr-FR')}
Heure: ${reservation.showTime}
Quantité: ${reservation.quantity} billet(s)
Référence: ${reservation.bookingReference}
Total payé: ${reservation.totalPrice}€

Merci pour votre réservation !
Compagnie Vesperen
    `;

    const element = document.createElement('a');
    element.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(ticketContent);
    element.download = `billet-${reservation.bookingReference}.txt`;
    element.click();
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Chargement de vos réservations...</p>
      </div>
    );
  }

  return (
    <div className="reservations-container">
      {/* En-tête avec statistiques */}
      <div className="reservations-header">
        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-number">{reservations.length}</span>
            <span className="stat-label">Total réservations</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">
              {reservations.filter(r => isUpcoming(r.showDate) && r.status === 'confirmed').length}
            </span>
            <span className="stat-label">À venir</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">
              {reservations.reduce((sum, r) => sum + r.totalPrice, 0)}€
            </span>
            <span className="stat-label">Total dépensé</span>
          </div>
        </div>
      </div>

      {/* Filtres */}
      <div className="filters">
        <button 
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          Toutes ({reservations.length})
        </button>
        <button 
          className={filter === 'upcoming' ? 'active' : ''}
          onClick={() => setFilter('upcoming')}
        >
          À venir ({reservations.filter(r => isUpcoming(r.showDate) && r.status !== 'cancelled').length})
        </button>
        <button 
          className={filter === 'past' ? 'active' : ''}
          onClick={() => setFilter('past')}
        >
          Passées ({reservations.filter(r => !isUpcoming(r.showDate) || r.status === 'completed').length})
        </button>
      </div>

      {/* Liste des réservations */}
      {filteredReservations.length === 0 ? (
        <div className="no-reservations">
          <div className="no-reservations-icon">🎭</div>
          <h3>Aucune réservation</h3>
          <p>
            {filter === 'all' 
              ? "Vous n'avez pas encore effectué de réservation."
              : "Aucune réservation pour ce filtre."
            }
          </p>
        </div>
      ) : (
        <div className="reservations-list">
          {filteredReservations.map(reservation => (
            <div key={reservation.id} className="reservation-card">
              <div className="reservation-main">
                {/* Infos du spectacle */}
                <div className="show-section">
                  <h3>{reservation.showTitle}</h3>
                  <div className="show-details">
                    <span className="detail-item">
                      📅 {new Date(reservation.showDate).toLocaleDateString('fr-FR', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </span>
                    <span className="detail-item">🕐 {reservation.showTime}</span>
                    <span className="detail-item">🎫 {reservation.quantity} billet(s)</span>
                  </div>
                </div>

                {/* Infos de réservation */}
                <div className="booking-section">
                  <div className="booking-info">
                    <div className="info-line">
                      <span>Référence:</span>
                      <span className="reference">{reservation.bookingReference}</span>
                    </div>
                    <div className="info-line">
                      <span>Prix total:</span>
                      <span className="price">{reservation.totalPrice}€</span>
                    </div>
                    <div className="info-line">
                      <span>Réservé le:</span>
                      <span>{new Date(reservation.bookingDate).toLocaleDateString('fr-FR')}</span>
                    </div>
                  </div>

                  {/* Statut */}
                  <div className="status-section">
                    <span 
                      className={`status-badge ${reservation.status}`}
                    >
                      {reservation.status === 'confirmed' && '✅ Confirmée'}
                      {reservation.status === 'completed' && '✔️ Terminée'}
                      {reservation.status === 'cancelled' && '❌ Annulée'}
                      {reservation.status === 'pending' && '⏳ En attente'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="reservation-actions">
                {reservation.status === 'confirmed' && (
                  <button 
                    onClick={() => downloadTicket(reservation)}
                    className="btn-action download"
                  >
                    📥 Télécharger
                  </button>
                )}

                {canCancel(reservation) && (
                  <button 
                    onClick={() => handleCancelReservation(reservation.id)}
                    className="btn-action cancel"
                  >
                    ❌ Annuler
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reservations;