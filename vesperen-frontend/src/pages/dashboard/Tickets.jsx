import React, { useState, useEffect } from 'react';
import './tickets.scss';

const Tickets = () => {
  // États pour gérer les données
  const [shows, setShows] = useState([]);
  const [selectedShow, setSelectedShow] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Charger les spectacles au début
  useEffect(() => {
    loadShows();
  }, []);

  // Fonction pour charger les spectacles
  const loadShows = () => {
    // Pour l'instant, données fictives. Plus tard vous remplacerez par votre API
    const demoShows = [
      {
        id: 1,
        title: 'Le Malade Imaginaire',
        description: 'Comédie de Molière',
        dates: ['2025-09-15', '2025-09-16', '2025-09-22'],
        availableSeats: 150,
        price: 25
      },
      {
        id: 2,
        title: 'Hamlet',
        description: 'Tragédie de Shakespeare',
        dates: ['2025-10-01', '2025-10-02', '2025-10-08'],
        availableSeats: 200,
        price: 30
      },
      {
        id: 3,
        title: 'La Tempête',
        description: 'Drame de Shakespeare',
        dates: ['2025-10-15', '2025-10-16'],
        availableSeats: 180,
        price: 28
      }
    ];
    
    setShows(demoShows);
  };

  // Sélectionner un spectacle
  const handleShowSelect = (show) => {
    setSelectedShow(show);
    setSelectedDate(''); // Reset la date quand on change de spectacle
    setMessage({ type: '', text: '' });
  };

  // Calculer le prix total
  const calculateTotal = () => {
    if (!selectedShow) return 0;
    return selectedShow.price * ticketQuantity;
  };

  // Fonction pour réserver
  const handleReservation = async () => {
    // Vérifications
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
      // Simuler une réservation (remplacez par votre API)
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simule l'attente

      // Créer la réservation
      const newReservation = {
        id: Date.now(), // ID temporaire
        showTitle: selectedShow.title,
        showDate: selectedDate,
        showTime: '20:00', // Heure par défaut
        quantity: ticketQuantity,
        totalPrice: calculateTotal(),
        status: 'confirmed',
        bookingDate: new Date().toISOString(),
        bookingReference: `CIE${Date.now().toString().slice(-6)}`
      };

      // Sauvegarder dans localStorage (temporaire)
      const existingReservations = JSON.parse(localStorage.getItem('userReservations') || '[]');
      existingReservations.push(newReservation);
      localStorage.setItem('userReservations', JSON.stringify(existingReservations));

      // Message de succès
      setMessage({ 
        type: 'success', 
        text: `Réservation confirmée ! Référence: ${newReservation.bookingReference}` 
      });

      // Reset du formulaire
      setSelectedShow(null);
      setSelectedDate('');
      setTicketQuantity(1);

    } catch (error) {
      console.error('Erreur:', error);
      setMessage({ type: 'error', text: 'Erreur lors de la réservation' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tickets-container">
      {/* Message de feedback */}
      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="tickets-content">
        {/* Section 1: Choisir un spectacle */}
        <div className="section">
          <h2>🎭 Choisissez votre spectacle</h2>
          
          <div className="shows-grid">
            {shows.map(show => (
              <div 
                key={show.id}
                className={`show-card ${selectedShow?.id === show.id ? 'selected' : ''}`}
                onClick={() => handleShowSelect(show)}
              >
                <div className="show-header">
                  <h3>{show.title}</h3>
                  <div className="show-price">{show.price}€</div>
                </div>
                <p className="show-description">{show.description}</p>
                <div className="show-info">
                  <span className="seats-available">
                    📍 {show.availableSeats} places disponibles
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Détails de réservation (apparaît quand spectacle sélectionné) */}
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
                    {selectedShow.dates.map(date => (
                      <option key={date} value={date}>
                        {new Date(date).toLocaleDateString('fr-FR', {
                          weekday: 'long',
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </option>
                    ))}
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
                    <span>
                      {selectedDate ? 
                        new Date(selectedDate).toLocaleDateString('fr-FR') : 
                        'Non sélectionnée'
                      }
                    </span>
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