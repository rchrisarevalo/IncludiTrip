import React from "react";
import '@fontsource/poppins';

interface HousingPageLayoutProps {
    children: React.ReactNode;
}

const HousingLayout: React.FC<HousingPageLayoutProps> = ({ children }) => {
    return (
        <div className="flex flex-col font-['Poppins'] items-center justify-center h-screen">
            { children }
        </div>
    )
}

export default HousingLayout;