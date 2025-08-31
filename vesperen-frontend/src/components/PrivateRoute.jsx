
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, adminOnly = false }) => {
  const token = localStorage.getItem('token'); 
  const user = JSON.parse(localStorage.getItem('user')|| '{}');

  if(!token) return <Navigate to="/compte" replace />
  
  if(adminOnly && !user.isAdmin) {  // = si c'est une route admin ET que l'utilisateur N'EST PAS l'admin
    return <Navigate to="/dashboard/profile" replace />;

  }
return children;
};

export default PrivateRoute;
