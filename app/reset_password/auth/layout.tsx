import React from "react";
import '@fontsource/poppins';
import { PublicRoute } from "@/app/components/UserSession";

interface AuthLayoutProps {
    children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
    return (
        <PublicRoute>
            <div className="flex flex-col font-['Poppins'] items-center justify-center h-screen bg-[#23465d]">
                { children }
            </div>
        </PublicRoute>
    )
}

export default AuthLayout;