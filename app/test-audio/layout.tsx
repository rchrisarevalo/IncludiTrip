import React from "react";
import "@fontsource/poppins";
import { ProtectedRoute } from "../components/UserSession";

interface TestAudioPageLayoutProps {
  children: React.ReactNode;
}

const TestAudioPageLayout: React.FC<TestAudioPageLayoutProps> = ({
  children,
}) => {
  return (
    <ProtectedRoute>
      <div className="bg-[#23465d] flex flex-col font-['Poppins'] items-center justify-center h-screen">
        {children}
      </div>
    </ProtectedRoute>
  );
};

export default TestAudioPageLayout;
