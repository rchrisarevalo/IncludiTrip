import React from "react";
import "@fontsource/poppins";
import { ProtectedRoute } from "../components/UserSession";

interface HousingPageLayoutProps {
  children: React.ReactNode;
}

const HousingLayout: React.FC<HousingPageLayoutProps> = ({ children }) => {
  return (
    <ProtectedRoute>
      <div className="bg-[#23465d] flex flex-col font-['Poppins'] min-h-screen items-center justify-center">
        {children}
      </div>
    </ProtectedRoute>
  );
};

export default HousingLayout;
