import {Navigate, Outlet} from 'react-router-dom';




const ProtectedRoute = ({ user, children }) => {

    if (!user) {
         return <Navigate to="/Login" replace />;
    }
    return children ? children : <Outlet />;
};


export default ProtectedRoute