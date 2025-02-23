'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSidebar } from '@/context/SidebarContext';

type MenuItem = {
  title: string;
  path?: string;
  icon: string;
  children?: MenuItem[];
};

export default function Sidebar() {
  const pathname = usePathname();
  const { isCollapsed, showSecondColumn, setShowSecondColumn, toggleSidebar } = useSidebar();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      if (!isCollapsed && !activeMenu) {
        setActiveMenu('대시보드');
      }
      if (isCollapsed) {
        setShowSecondColumn(false);
        setActiveMenu(null);
      }
    }
  }, [isCollapsed, setShowSecondColumn, activeMenu, mounted]);

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
      
      if(isCollapsed){
        //closed
        console.log('click');
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

  const menuItems: MenuItem[] = [
    {
      title: '대시보드',
      path: '/',
      icon: '📊',
      children: [
        { title: '기본 대시보드', path: '/', icon: '📈' },
        { title: '상세 대시보드', path: '/dashboard/detail', icon: '📉' }
      ]
    },
    {
      title: '코드관리',
      path: '/code',
      icon: '⚙️',
      children: [
        {
          title: '기준정보',
          icon: '📋',
          children: [
            { title: '공통코드', path: '/code', icon: '🔤' },
            { title: '분류코드', path: '/code/category', icon: '📑' }
          ]
        },
        { title: '코드등록', path: '/code/new', icon: '✏️' }
      ]
    },
    {
      title: '사용자관리',
      path: '/users',
      icon: '👥',
      children: [
        { title: '사용자 목록', path: '/users', icon: '📋' },
        { title: '권한 관리', path: '/users/roles', icon: '🔒' }
      ]
    },
    {
      title: '설정',
      path: '/settings',
      icon: '🔧',
      children: [
        { title: '프로필설정', path: '/settings', icon: '📋' },
        { title: '메뉴', path: '/menu', icon: '📋' }
      ]
      
    }
  ];

  const renderSecondColumn = (item: MenuItem) => {
    if (!item.children) return null;

    return (
      <div className="inner">
        <div className="title">
          {item.title}
        </div>
        <ul className='nav-sub'>
          {item.children.map((child, index) => (
            <li
              key={index}
              className='items'
            >
              {child.path ? (
                <Link
                  href={child.path}
                  className={`link-items ${pathname === child.path ? 'active' : ''}`}
                  onClick={(e) => {
                    if (child.path === '/code/common') {
                      e.preventDefault();
                      window.location.href = '/code';
                    }
                  }}
                >
                  <i className='ico nav' />
                  <span>{child.title}</span>
                </Link>
              ) : (
                <>
                <Link
                  href={'#'}
                  className={`link-items ${expandedMenu === child.title ? 'active' : ''}`}
                  onClick={() => handleMenuClick(child.title)}
                >
                  <i className={`ico nav ${expandedMenu === child.title ? 'open' : ''}`} />
                  <span>{child.title}</span>
                  
                  {child.children && (
                    <i className={`ico toggle ${expandedMenu === child.title ? 'transform rotate-180' : 'transform rotate-0'}`} />
                  )}
                </Link>
                {expandedMenu === child.title && child.children && (
                  <ul className="sub-items">
                    {child.children.map((subChild, subIndex) => (
                      <li key={subIndex}>
                        <Link
                          href={subChild.path || '#'}
                          className={`link-items ${pathname === subChild.path ? 'active' : ''}`}
                        >
                          <i className='ico nav-sub' />
                          <span>{subChild.title}</span>
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
      <div className='sidebar'>
        <nav>
          <button
            onClick={handleToggle}
            className="toggle-sidebar"
            aria-label="Toggle Sidebar"
          >
            <i className='ico hamburger' />
          </button>


          <ul className='nav-menu'>
          {menuItems.map((item, index) => (
            <li key={index} className='items'>
              <Link 
                href={item.path || '#'}
                className={`link-items ${activeMenu === item.title ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleIconClick(item.title);
                }}
              >
                <i className={`ico nav0${index + 1} ${activeMenu === item.title ? 'active' : ''}`} />
                <span>{item.title}</span>
              </Link>
            </li>
          ))}
          </ul>
        </nav>
      </div>

      {/* Second Column */}
      <div className={`sidebar-sub ${showSecondColumn ? 'active' : ''}`}
      >
        {activeMenu && renderSecondColumn(menuItems.find(item => item.title === activeMenu)!)}
      </div>
      
    </>
  );
} 