import React from 'react';
import '@fontsource/poppins'
import { PublicRoute } from '../components/UserSession';

interface LoginLayoutProps {
    children: React.ReactNode
}

const LoginLayout: React.FC<LoginLayoutProps> = ({ children }) => {
    return (
        <PublicRoute>
            <div className="grid grid-cols-2 max-sm:grid-cols-1 w-full items-center font-['Poppins'] text-center justify-center min-h-screen">
                { children }
            </div>
        </PublicRoute>
    )
}

export default LoginLayout;