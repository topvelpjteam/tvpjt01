'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type SidebarContextType = {
  isCollapsed: boolean;
  toggleSidebar: () => void;
  expandSidebar: () => void;
  collapseSidebar: () => void;
  showSecondColumn: boolean;
  setShowSecondColumn: (show: boolean) => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [showSecondColumn, setShowSecondColumn] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleSidebar = () => {
    if (!mounted) return;
    setIsCollapsed(!isCollapsed);
    setShowSecondColumn(false);
  };

  const expandSidebar = () => {
    if (!mounted) return;
    setIsCollapsed(false);
  };

  const collapseSidebar = () => {
    if (!mounted) return;
    setIsCollapsed(true);
  };

  if (!mounted) {
    return null;
  }

  return (
    <SidebarContext.Provider 
      value={{ 
        isCollapsed, 
        toggleSidebar, 
        expandSidebar, 
        collapseSidebar,
        showSecondColumn,
        setShowSecondColumn
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
} 