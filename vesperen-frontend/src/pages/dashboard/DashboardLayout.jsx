import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./dashboard.scss";

export default function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div className="sidebar-header">Mon Espace</div>
        <nav className="sidebar-nav">
          <NavLink to="/dashboard/profile">Profil</NavLink>
          <NavLink to="/dashboard/reservations">Mes réservations</NavLink>
          <NavLink to="/dashboard/tickets">Réserver un billet</NavLink>
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
