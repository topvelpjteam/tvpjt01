"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/context/SidebarContext";
import { getMenuTree } from "@/api/index";

export default function Sidebar() {
  const pathname = usePathname();
  const { isCollapsed, showSecondColumn, setShowSecondColumn, toggleSidebar } =
    useSidebar();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [menuItems, setMenuItems] = useState<any>([]);

  useEffect(() => {
    getAllMenu();
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      if (!isCollapsed && !activeMenu) {
        setActiveMenu("대시보드");
      }
      if (isCollapsed) {
        setShowSecondColumn(false);
        setActiveMenu(null);
      }
    }
  }, [isCollapsed, setShowSecondColumn, activeMenu, mounted]);

  const getAllMenu = async () => {
    let me = await getMenuTree();
    setMenuItems(me.data.data.data);
  };

  if (!mounted) {
    return null;
  }

  const handleMenuClick = (title: string) => {
    if (expandedMenu === title) {
      setExpandedMenu(null);
    } else {
      setExpandedMenu(title);
    }
  };

  const handleIconClick = (title: string) => {
    if (isCollapsed) {
      //closed
      console.log("click");
      toggleSidebar();
      setActiveMenu(title);
      setShowSecondColumn(true);
    } else {
      //open

      if (activeMenu === title) {
        setActiveMenu(null);
        setShowSecondColumn(false);
        toggleSidebar();
      } else {
        setActiveMenu(title);
        setShowSecondColumn(true);
      }
    }
  };

  const renderSecondColumn = (item: any) => {
    console.log("second");
    console.log(item);
    if (!item.children) return null;

    return (
      <div className="inner">
        <div className="title">{item.menuNm}</div>
        <ul className="nav-sub">
          {item.children.map((child: any, index: any) => (
            <li key={index} className="items">
              {child.menuPath ? (
                <Link
                  href={child.menuPath}
                  className={`link-items ${
                    pathname === child.menuPath ? "active" : ""
                  }`}
                  onClick={(e) => {
                    if (child.menuPath === "/code/common") {
                      e.preventDefault();
                      window.location.href = "/code";
                    }
                  }}
                >
                  <i className="ico nav" />
                  <span>{child.menuNm}</span>
                </Link>
              ) : (
                <>
                  <Link
                    href={"#"}
                    className={`link-items ${
                      expandedMenu === child.menuNm ? "active" : ""
                    }`}
                    onClick={() => handleMenuClick(child.menuNm)}
                  >
                    <i
                      className={`ico nav ${
                        expandedMenu === child.menuNm ? "open" : ""
                      }`}
                    />
                    <span>{child.menuNm}</span>

                    {child.children && (
                      <i
                        className={`ico toggle ${
                          expandedMenu === child.menuNm
                            ? "transform rotate-180"
                            : "transform rotate-0"
                        }`}
                      />
                    )}
                  </Link>
                  {expandedMenu === child.menuNm && child.children && (
                    <ul className="sub-items">
                      {child.children.map((subChild: any, subIndex: any) => (
                        <li key={subIndex}>
                          <Link
                            href={subChild.menuPath || "#"}
                            className={`link-items ${
                              pathname === subChild.menuPath ? "active" : ""
                            }`}
                          >
                            <i className="ico nav-sub" />
                            <span>{subChild.menuNm}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const handleToggle = () => {
    console.log(isCollapsed);
    if (isCollapsed) {
      toggleSidebar();
      setShowSecondColumn(true);
    } else {
      toggleSidebar();
      setShowSecondColumn(false);
    }
  };

  return (
    <>
      {/* Icon Menu */}
      <div className="sidebar">
        <nav>
          <button
            onClick={handleToggle}
            className="toggle-sidebar"
            aria-label="Toggle Sidebar"
          >
            <i className="ico hamburger" />
          </button>

          <ul className="nav-menu">
            {menuItems.map((item: any, index: any) => (
              <li key={index} className="items">
                <Link
                  href={item.menuPath || "#"}
                  className={`link-items ${
                    activeMenu === item.menuNm ? "active" : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleIconClick(item.menuNm);
                  }}
                >
                  <i
                    className={`ico nav0${index + 1} ${
                      activeMenu === item.menuNm ? "active" : ""
                    }`}
                  />
                  <span>{item.menuNm}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Second Column */}
      <div className={`sidebar-sub ${showSecondColumn ? "active" : ""}`}>
        {activeMenu &&
          renderSecondColumn(
            menuItems.find((item: any) => item.menuNm === activeMenu)!
          )}
      </div>
    </>
  );
}
