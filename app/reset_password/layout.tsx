import React from "react";
import '@fontsource/poppins';
import { PublicRoute } from "../components/UserSession";

interface PasswordResetLayoutProps {
    children: React.ReactNode;
}

const PasswordResetLayout: React.FC<PasswordResetLayoutProps> = ({ children }) => {
    return (
        <PublicRoute>
            <div className="flex flex-col font-['Poppins'] items-center justify-center h-screen bg-[#23465d]">
                { children }
            </div>
        </PublicRoute>
    )
}

export default PasswordResetLayout;