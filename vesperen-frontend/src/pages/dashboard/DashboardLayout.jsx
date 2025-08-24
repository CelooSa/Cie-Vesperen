import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./dashboard.scss";

export default function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div className="sidebar-header">Mon Espace</div>
        <nav className="sidebar-nav">
          <Link to="/dashboard/profile">Profil</Link>
          <Link to="/dashboard/reservations">Mes réservations</Link>
          <Link to="/dashboard/tickets">Réserver un billet</Link>
        </nav>
        <div className="sidebar-footer">
          <button>Déconnexion</button>
        </div>
      </aside>

      <main className="dashboard-content">
        <h1>Bienvenue dans votre espace</h1>
        <p>Ici s’affichera le contenu : profil, réservations, etc.</p>
        <Outlet />
      </main>
    </div>
  );
}
