import React from "react";
import "@fontsource/poppins";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col font-['Poppins'] items-center justify-center h-screen bg-[#23465d]">
        { children }
    </div>
  );
};

export default AuthLayout;
