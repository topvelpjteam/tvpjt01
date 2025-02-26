"use client";

import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { useSidebar } from "@/context/SidebarContext";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isCollapsed, showSecondColumn } = useSidebar();

  const getMainContentMargin = () => {
    if (isCollapsed && !showSecondColumn) {
      return "collapsed";
    } else if (!isCollapsed || showSecondColumn) {
      return "";
    }
    return "collapsed";
  };

  return (
    <div className="wrap">
      <Sidebar />
      <div
        className={`container transition-all duration-300 ${getMainContentMargin()}`}
      >
        <Header />
        <main
          className={`main flex-grow transition-all duration-300 ${getMainContentMargin()}`}
        >
          <div className="tab_wrap">
            <div className="tab_cell ac">
              메뉴<div className="tab_x">X</div>
            </div>
            <div className="tab_cell">
              tab test1<div className="tab_x">X</div>
            </div>
            <div className="tab_cell">
              tab test2<div className="tab_x">X</div>
            </div>
            <div className="tab_cell">
              tab test3<div className="tab_x">X</div>
            </div>
          </div>
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
