import React from 'react';
import { Navigate } from 'react-router-dom';

const Outlet = () => {
    return (
        <div>Error</div>
    )
}

export const ProtectRoute = ({isAllowed, redirectTo="/login", children}) => {

    if (!isAllowed) {
        return <Navigate to={redirectTo} replace />;
    }

    return children ? children : <Outlet />;
    
}