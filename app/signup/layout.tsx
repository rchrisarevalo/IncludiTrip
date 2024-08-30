import React from "react";
import '@fontsource/poppins';
import { PublicRoute } from "../components/UserSession";

interface SignUpLayoutProps {
    children: React.ReactNode;
}

const SignUpLayout: React.FC<SignUpLayoutProps> = ({ children }) => {
    return (
        <div className="grid grid-cols-2 max-sm:grid-cols-1 w-full items-center font-['Poppins'] text-center justify-center min-h-screen">
            <PublicRoute>
                { children }
            </PublicRoute>
        </div>
    )
}

export default SignUpLayout;