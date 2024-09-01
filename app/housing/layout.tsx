import React from "react";
import '@fontsource/poppins';
import { ProtectedRoute } from "../components/UserSession";

interface HousingPageLayoutProps {
    children: React.ReactNode;
}

const HousingLayout: React.FC<HousingPageLayoutProps> = ({ children }) => {
    return (
        <ProtectedRoute>
            <div className="flex flex-col font-['Poppins'] items-center justify-center h-screen">
                { children }
            </div>
        </ProtectedRoute>
    )
}

export default HousingLayout;