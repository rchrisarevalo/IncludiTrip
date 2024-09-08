import React from "react";
import { ProtectedRoute } from "../components/UserSession";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-[#23465d] flex flex-col items-center font-['Poppins'] justify-center gap-10">
                { children }
            </div>
        </ProtectedRoute>
    )
}

export default DashboardLayout;