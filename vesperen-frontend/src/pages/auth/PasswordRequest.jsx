import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PasswordRequest = () => {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Si pas de token, afficher un message d'erreur
    if (!token) {
      setMessage('Token manquant dans l\'URL.');
      setIsLoading(false);
      return;
    }

    const verifyToken = async () => {
      try {
        setIsLoading(true);
        
        // Utilisez la bonne URL et méthode
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/users/verify-reset-token/${token}`
        );
        
        setMessage(data.message || 'Token vérifié avec succès !');
        setIsSuccess(true);

        // Redirection après 3 secondes seulement si succès
        setTimeout(() => {
          navigate('/sign');
        }, 3000);
        
      } catch (err) {
        console.error('Erreur lors de la vérification du token:', err);
        const msg = err.response?.data?.message || 'Token invalide ou expiré.';
        setMessage(msg);
        setIsSuccess(false);
      } finally {
        setIsLoading(false);
      }
    };

    verifyToken();
  }, [token, navigate]);

  if (isLoading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Réinitialisation du mot de passe</h2>
        <p>Vérification en cours...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Réinitialisation du mot de passe</h2>
      <p style={{ color: isSuccess ? 'green' : 'red' }}>
        {message}
      </p>
      
      {isSuccess ? (
        <p>Redirection automatique vers la page de connexion...</p>
      ) : (
        <Link to="/sign" style={{ marginTop: '1rem', display: 'inline-block' }}>
          Retour à la connexion
        </Link>
      )}
    </div>
  );
};

export default PasswordRequest;