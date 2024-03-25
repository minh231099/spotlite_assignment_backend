import Header from '@/components/Header/Header';
import React, { ReactNode } from 'react';
import BackToTopButton from '@/components/BackToTopBtn';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      <main>
        {children}
        <BackToTopButton/>
      </main>
    </div>
  );
};

export default Layout;