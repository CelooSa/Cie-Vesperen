import React, { useState, useEffect } from 'react';
import './tickets.scss';

const Tickets = () => {
  const [shows, setShows] = useState([]);
  const [selectedShow, setSelectedShow] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });

  const token = localStorage.getItem('token');

  useEffect(() => {
    loadShows();
  }, []);

  const loadShows = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        'https://cie-vesperen.onrender.com/api/shows/allShows',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        }
      );

      if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);

      const allShows = await response.json();
      setShows(Array.isArray(allShows) ? allShows : []);
    } catch (error) {
      console.error('Erreur chargement spectacles:', error);
      setShows([]);
    } finally {
      setLoading(false);
    }
  };

  const handleShowSelect = (show) => {
    setSelectedShow(show);
    setSelectedDate('');
    setMessage({ type: '', text: '' });
  };

  const calculateTotal = () => {
    if (!selectedShow) return 0;
    return selectedShow.price * ticketQuantity;
  };

  const handleReservation = async () => {
    if (!selectedShow) {
      setMessage({ type: 'error', text: 'Veuillez choisir un spectacle' });
      return;
    }
    if (!selectedDate) {
      setMessage({ type: 'error', text: 'Veuillez choisir une date' });
      return;
    }
    if (ticketQuantity < 1 || ticketQuantity > 8) {
      setMessage({ type: 'error', text: 'Nombre de billets invalide (1-8)' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const newReservation = {
        id: Date.now(),
        showTitle: selectedShow.title,
        showDate: selectedDate,
        showTime: '20:00',
        quantity: ticketQuantity,
        totalPrice: calculateTotal(),
        status: 'confirmed',
        bookingDate: new Date().toISOString(),
        bookingReference: `CIE${Date.now().toString().slice(-6)}`,
      };

      const existingReservations = JSON.parse(
        localStorage.getItem('userReservations') || '[]'
      );
      existingReservations.push(newReservation);
      localStorage.setItem(
        'userReservations',
        JSON.stringify(existingReservations)
      );

      setMessage({
        type: 'success',
        text: `Réservation confirmée ! Référence: ${newReservation.bookingReference}`,
      });

      setSelectedShow(null);
      setSelectedDate('');
      setTicketQuantity(1);
    } catch (error) {
      console.error('Erreur réservation:', error);
      setMessage({ type: 'error', text: 'Erreur lors de la réservation' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tickets-container">
      {message.text && <div className={`message ${message.type}`}>{message.text}</div>}

      <div className="tickets-content">
        <div className="section">
          <h2>🎭 Choisissez votre spectacle</h2>
          {loading && <p>Chargement des spectacles...</p>}
          <div className="shows-grid">
            {shows.map((show) => (
              <div
                key={show._id || show.id}
                className={`show-card ${selectedShow?.id === show.id ? 'selected' : ''}`}
                onClick={() => handleShowSelect(show)}
              >
                <div className="show-header">
                  <h3>{show.title}</h3>
                  <div className="show-price">{show.price}€</div>
                </div>
                <p className="show-description">{show.show_description || show.description}</p>
                <div className="show-info">
                  <span className="seats-available">
                    📍 {show.availableSeats ?? 'N/A'} places disponibles
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedShow && (
          <div className="section">
            <h2>📅 Détails de votre réservation</h2>
            <div className="booking-form">
              <div className="selected-show-info">
                <h3>Spectacle sélectionné: {selectedShow.title}</h3>
                <p>Prix unitaire: {selectedShow.price}€</p>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Date du spectacle</label>
                  <select
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  >
                    <option value="">-- Choisir une date --</option>
                    {selectedShow.date_time && (
                      <option value={selectedShow.date_time}>
                        {new Date(selectedShow.date_time).toLocaleDateString('fr-FR', {
                          weekday: 'long',
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </option>
                    )}
                  </select>
                </div>

                <div className="form-group">
                  <label>Nombre de billets</label>
                  <input
                    type="number"
                    min="1"
                    max="8"
                    value={ticketQuantity}
                    onChange={(e) => setTicketQuantity(parseInt(e.target.value) || 1)}
                  />
                  <small>Maximum 8 billets par réservation</small>
                </div>
              </div>

              <div className="booking-summary">
                <div className="summary-details">
                  <div className="summary-line">
                    <span>Spectacle:</span>
                    <span>{selectedShow.title}</span>
                  </div>
                  <div className="summary-line">
                    <span>Date:</span>
                    <span>{selectedDate ? new Date(selectedDate).toLocaleDateString('fr-FR') : 'Non sélectionnée'}</span>
                  </div>
                  <div className="summary-line">
                    <span>Billets:</span>
                    <span>{ticketQuantity} × {selectedShow.price}€</span>
                  </div>
                  <div className="summary-line total">
                    <span>Total:</span>
                    <span>{calculateTotal()}€</span>
                  </div>
                </div>
                <button
                  onClick={handleReservation}
                  disabled={loading || !selectedDate}
                  className="btn-reserve"
                >
                  {loading ? '⏳ Réservation en cours...' : '🎫 Confirmer la réservation'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tickets;
