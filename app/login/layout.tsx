import React from 'react';
import '@fontsource/poppins'

interface LoginLayoutProps {
    children: React.ReactNode
}

const LoginLayout: React.FC<LoginLayoutProps> = ({ children }) => {
    return (
        <div className="grid grid-cols-2 items-center font-['Poppins'] text-center justify-center min-h-screen">
            { children }
        </div>
    )
}

export default LoginLayout;