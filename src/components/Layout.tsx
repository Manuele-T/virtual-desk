import React from 'react';
import Experience from '@/components/canvas/Experience';
import HUD from '@/components/dom/HUD';

const Layout: React.FC = () => {
  return (
    <div className="relative w-full h-full bg-black">
      <Experience />
      <HUD />
    </div>
  );
};

export default Layout;