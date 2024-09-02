import React from "react";
import { ProtectedRoute } from "../components/UserSession";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-[#23465d] flex flex-col items-center font-['Poppins'] justify-center gap-10">
            <ProtectedRoute>
                { children }
            </ProtectedRoute>
        </div>
    )
}

export default DashboardLayout;