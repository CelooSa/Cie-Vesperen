import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./dashboard.scss";

export default function DashboardLayout({ user }) {
  const navigate = useNavigate();
  const isAdmin = user?.role === 'admin';

  const handleLogout = () => {
    // Logique de déconnexion
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  // ma partie nav pour l'user 
  const userNavigation = [
    { to: "/dashboard/profile", label: "Mon Profil", icon: "👤" },
    { to: "/dashboard/reservations", label: "Mes Réservations", icon: "🎫" },
    { to: "/dashboard/book-ticket", label: "Réserver un Billet", icon: "🎭" },
  ];

  // celle pour l'admin
  const adminNavigation = [
    { to: "/dashboard/admin/overview", label: "Vue d'ensemble", icon: "📊" },
    { to: "/dashboard/admin/shows", label: "Gestion Spectacles", icon: "🎭" },
    { to: "/dashboard/admin/reservations", label: "Toutes Réservations", icon: "🎫" },
    { to: "/dashboard/admin/users", label: "Gestion Utilisateurs", icon: "👥" },
    { to: "/dashboard/admin/settings", label: "Paramètres", icon: "⚙️" },
  ];

  const navigation = isAdmin ? adminNavigation : userNavigation;

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>{isAdmin ? "Admin Panel" : "Mon Espace"}</h2>
          <div className="user-info">
            <p>Bonjour, {user?.firstName || user?.name}</p>
            <span className={`role-badge ${isAdmin ? 'admin' : 'user'}`}>
              {isAdmin ? 'Administrateur' : 'Utilisateur'}
            </span>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navigation.map((item) => (
            <NavLink 
              key={item.to} 
              to={item.to}
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-btn">
            🚪 Déconnexion
          </button>
        </div>
      </aside>

      <main className="dashboard-content">
        <div className="content-header">
          <h1>
            {isAdmin ? 'Tableau de bord administrateur' : 'Bienvenue dans votre espace'}
          </h1>
          <div className="breadcrumb">
            <span>Accueil</span>
          </div>
        </div>
        
        <div className="content-body">
          <Outlet context={{ user, isAdmin }} />
        </div>
      </main>
    </div>
  );
}