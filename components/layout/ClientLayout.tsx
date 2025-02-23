'use client';

import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { useSidebar } from '@/context/SidebarContext';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { isCollapsed, showSecondColumn } = useSidebar();
  
  const getMainContentMargin = () => {
    if (isCollapsed && !showSecondColumn) {
      return 'collapsed';
    } else if (!isCollapsed || showSecondColumn) {
      return '';
    }
    return 'collapsed';
  };

  return (
    <div className="wrap">
      <Sidebar />
      <div className={`container transition-all duration-300 ${getMainContentMargin()}`}>
        <Header />
        <main className={`main flex-grow transition-all duration-300 ${getMainContentMargin()}`}>
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
} 