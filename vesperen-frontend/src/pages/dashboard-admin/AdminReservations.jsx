import React, { useState, useEffect } from 'react';
import './adminReservations.scss';

const AdminReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [spectacles, setSpectacles] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // ts les filtres pr annulés , confirmés etc...
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Charger toutes les données nécessaires
      const allReservations = JSON.parse(localStorage.getItem('allReservations') || '[]');
      const savedSpectacles = JSON.parse(localStorage.getItem('spectacles') || '[]');
      const savedUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');
      
      setReservations(allReservations);
      setSpectacles(savedSpectacles);
      setUsers(savedUsers);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSpectacleTitle = (spectacleId) => {
    const spectacle = spectacles.find(s => s.id === spectacleId);
    return spectacle ? spectacle.title : 'Spectacle supprimé';
  };

  const getUserName = (userId) => {
    const user = users.find(u => u.id === userId);
    return user ? `${user.firstName} ${user.lastName}` : 'Utilisateur inconnu';
  };

  const getUserEmail = (userId) => {
    const user = users.find(u => u.id === userId);
    return user ? user.email : 'Email inconnu';
  };

  const handleStatusChange = async (reservationId, newStatus) => {
    try {
      const updatedReservations = reservations.map(res => 
        res.id === reservationId 
          ? { ...res, status: newStatus, updatedAt: new Date().toISOString() }
          : res
      );
      
      setReservations(updatedReservations);
      localStorage.setItem('allReservations', JSON.stringify(updatedReservations));
      
      // Mettre à jour aussi les réservations utilisateur si c'est le même user
      const userReservations = JSON.parse(localStorage.getItem('userReservations') || '[]');
      const updatedUserReservations = userReservations.map(res => 
        res.id === reservationId 
          ? { ...res, status: newStatus }
          : res
      );
      localStorage.setItem('userReservations', JSON.stringify(updatedUserReservations));
      
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de la mise à jour');
    }
  };

  const filteredReservations = reservations.filter(reservation => {
    // Filtre par statut
    const matchesFilter = filter === 'all' || reservation.status === filter;
    
    // Recherche par nom d'utilisateur, email ou titre spectacle
    const matchesSearch = searchTerm === '' || 
      getUserName(reservation.userId).toLowerCase().includes(searchTerm.toLowerCase()) ||
      getUserEmail(reservation.userId).toLowerCase().includes(searchTerm.toLowerCase()) ||
      getSpectacleTitle(reservation.spectacleId).toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.bookingReference.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const getStatusCounts = () => {
    return {
      all: reservations.length,
      confirmed: reservations.filter(r => r.status === 'confirmed').length,
      pending: reservations.filter(r => r.status === 'pending').length,
      cancelled: reservations.filter(r => r.status === 'cancelled').length,
      completed: reservations.filter(r => r.status === 'completed').length
    };
  };

  const statusCounts = getStatusCounts();
  const totalRevenue = reservations
    .filter(r => r.status === 'confirmed' || r.status === 'completed')
    .reduce((sum, r) => sum + r.totalPrice, 0);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Chargement des réservations...</p>
      </div>
    );
  }

  return (
    <div className="admin-reservations">
      <div className="page-header">
        <div className="header-info">
          <h2>📋 Gestion des Réservations</h2>
          <p>{reservations.length} réservation(s) au total</p>
        </div>
        <div className="header-stats">
          <div className="stat-item">
            <span className="stat-number">{statusCounts.confirmed}</span>
            <span className="stat-label">Confirmées</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{totalRevenue}€</span>
            <span className="stat-label">Revenus</span>
          </div>
        </div>
      </div>

      {/* Filtres et recherche */}
      <div className="controls">
        <div className="filters">
          <button 
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            Toutes ({statusCounts.all})
          </button>
          <button 
            className={filter === 'confirmed' ? 'active' : ''}
            onClick={() => setFilter('confirmed')}
          >
            Confirmées ({statusCounts.confirmed})
          </button>
          <button 
            className={filter === 'pending' ? 'active' : ''}
            onClick={() => setFilter('pending')}
          >
            En attente ({statusCounts.pending})
          </button>
          <button 
            className={filter === 'completed' ? 'active' : ''}
            onClick={() => setFilter('completed')}
          >
            Terminées ({statusCounts.completed})
          </button>
          <button 
            className={filter === 'cancelled' ? 'active' : ''}
            onClick={() => setFilter('cancelled')}
          >
            Annulées ({statusCounts.cancelled})
          </button>
        </div>

        <div className="search">
          <input
            type="text"
            placeholder="Rechercher par nom, email, spectacle..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {/* Liste des réservations */}
      {filteredReservations.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📋</div>
          <h3>Aucune réservation</h3>
          <p>
            {filter === 'all' 
              ? "Aucune réservation trouvée."
              : `Aucune réservation ${filter}.`
            }
          </p>
        </div>
      ) : (
        <div className="reservations-table">
          <div className="table-header">
            <div className="col-user">Utilisateur</div>
            <div className="col-spectacle">Spectacle</div>
            <div className="col-date">Date/Heure</div>
            <div className="col-tickets">Billets</div>
            <div className="col-price">Prix</div>
            <div className="col-status">Statut</div>
            <div className="col-actions">Actions</div>
          </div>

          <div className="table-body">
            {filteredReservations.map(reservation => (
              <div key={reservation.id} className="table-row">
                <div className="col-user">
                  <div className="user-info">
                    <strong>{getUserName(reservation.userId)}</strong>
                    <span className="user-email">{getUserEmail(reservation.userId)}</span>
                    <span className="booking-ref">{reservation.bookingReference}</span>
                  </div>
                </div>

                <div className="col-spectacle">
                  <strong>{getSpectacleTitle(reservation.spectacleId)}</strong>
                </div>

                <div className="col-date">
                  <div className="date-info">
                    <span>{new Date(reservation.showDate).toLocaleDateString('fr-FR')}</span>
                    <span className="time">{reservation.showTime}</span>
                  </div>
                </div>

                <div className="col-tickets">
                  <span className="ticket-count">{reservation.quantity}</span>
                </div>

                <div className="col-price">
                  <span className="price">{reservation.totalPrice}€</span>
                </div>

                <div className="col-status">
                  <select
                    value={reservation.status}
                    onChange={(e) => handleStatusChange(reservation.id, e.target.value)}
                    className={`status-select ${reservation.status}`}
                  >
                    <option value="pending">En attente</option>
                    <option value="confirmed">Confirmée</option>
                    <option value="completed">Terminée</option>
                    <option value="cancelled">Annulée</option>
                  </select>
                </div>

                <div className="col-actions">
                  <div className="booking-date">
                    <small>Réservé le {new Date(reservation.bookingDate).toLocaleDateString('fr-FR')}</small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminReservations;