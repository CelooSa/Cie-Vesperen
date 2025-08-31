import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import './adminDashboard.scss';

const AdminDashboardLayout = () => {
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Charger les infos admin
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    setUser(userData);

    // Vérifier si c'est bien un admin
    if (!userData.isAdmin) {
      navigate('/dashboard/profile'); // Rediriger vers dashboard user
    }
  }, [navigate]);

  const handleLogout = () => {
    const confirmed = window.confirm('Êtes-vous sûr de vouloir vous déconnecter ?');
    if (confirmed) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/');
    }
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="admin-logo">
            <span className="logo-icon">⚡</span>
            <span className="logo-text">Admin Panel</span>
          </div>
          <button 
            className="sidebar-close"
            onClick={() => setSidebarOpen(false)}
          >
            ✕
          </button>
        </div>

        <nav className="admin-nav">
          <NavLink 
            to="/admin/spectacles" 
            className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}
          >
            <span className="nav-icon">🎭</span>
            Spectacles
          </NavLink>

          <NavLink 
            to="/admin/artists" 
            className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}
          >
            <span className="nav-icon">🎨</span>
            Artistes
          </NavLink>

          <NavLink 
            to="/admin/reservations" 
            className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}
          >
            <span className="nav-icon">📋</span>
            Réservations
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <div className="admin-info">
            <div className="admin-avatar">
              {user?.firstName ? user.firstName[0].toUpperCase() : 'A'}
            </div>
            <div className="admin-details">
              <span className="admin-name">{user?.firstName} {user?.lastName}</span>
              <span className="admin-role">Administrateur</span>
            </div>
          </div>
          
          <button onClick={handleLogout} className="logout-btn">
            🚪 Déconnexion
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="admin-main">
        <header className="admin-header">
          <button 
            className="menu-toggle"
            onClick={() => setSidebarOpen(true)}
          >
            ☰
          </button>
          
          <div className="header-title">
            <h1>Administration</h1>
            <p>Gestion de la compagnie Vesperen</p>
          </div>

          <div className="header-actions">
            <button 
              onClick={() => navigate('/dashboard/profile')}
              className="btn-user-dashboard"
            >
              👤 Vue utilisateur
            </button>
          </div>
        </header>

        <div className="admin-content">
          <Outlet context={{ user }} />
        </div>
      </main>

      {/* Overlay pour mobile */}
      {sidebarOpen && (
        <div 
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminDashboardLayout;