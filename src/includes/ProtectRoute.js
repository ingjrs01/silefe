import React from 'react';
import { Navigate } from 'react-router-dom';

export const ProtectRoute = ({isAllowed, redirectTo="/login", children}) => {

    if (!isAllowed) {
        return <Navigate to={redirectTo} replace />;
    }

    return children ? children : <Outlet />;
    
}