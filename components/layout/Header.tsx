"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSidebar } from "@/context/SidebarContext";
import Image from "next/image";

export default function Header() {
  const router = useRouter();
  const { isCollapsed, toggleSidebar, setShowSecondColumn } = useSidebar();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showSystemMenu, setShowSystemMenu] = useState(false);
  const [showEmployeeSearch, setShowEmployeeSearch] = useState(false);

  // Refs for dropdown containers
  const systemMenuRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const employeeSearchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // 시스템 메뉴
      if (
        systemMenuRef.current &&
        !systemMenuRef.current.contains(event.target as Node)
      ) {
        setShowSystemMenu(false);
      }
      // 알림
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
      // 프로필 메뉴
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setShowProfileMenu(false);
      }
      // 임직원 검색
      if (
        employeeSearchRef.current &&
        !employeeSearchRef.current.contains(event.target as Node)
      ) {
        setShowEmployeeSearch(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const notifications = {
    mail: {
      count: 3,
      items: [
        { id: 1, title: "새로운 메일", sender: "홍길동", time: "5분 전" },
        {
          id: 2,
          title: "프로젝트 회의 일정",
          sender: "김철수",
          time: "30분 전",
        },
        { id: 3, title: "업무 보고서", sender: "이영희", time: "1시간 전" },
      ],
    },
    message: {
      count: 2,
      items: [
        { id: 1, title: "긴급 회의 소집", sender: "팀장", time: "10분 전" },
        { id: 2, title: "자료 요청", sender: "과장", time: "45분 전" },
      ],
    },
    approval: {
      count: 4,
      items: [
        { id: 1, title: "휴가 신청서", requester: "박민수", time: "2시간 전" },
        { id: 2, title: "지출 결의서", requester: "최영미", time: "3시간 전" },
        { id: 3, title: "출장 신청서", requester: "정대리", time: "4시간 전" },
        { id: 4, title: "구매 요청서", requester: "김대리", time: "5시간 전" },
      ],
    },
  };

  const systems = [
    {
      id: 1,
      name: "ERP 시스템",
      icon: "system01",
      url: "http://erp.example.com",
      description: "기업 자원 관리 시스템",
    },
    {
      id: 2,
      name: "메일 시스템",
      icon: "system02",
      url: "http://mail.example.com",
      description: "기업용 메일 시스템",
    },
    {
      id: 3,
      name: "그룹웨어",
      icon: "system03",
      url: "http://groupware.example.com",
      description: "기업용 그룹웨어",
    },
    {
      id: 4,
      name: "인사관리",
      icon: "system04",
      url: "http://hr.example.com",
      description: "인사 관리 시스템",
    },
  ];

  const handleToggle = () => {
    if (isCollapsed) {
      toggleSidebar();
      setShowSecondColumn(true);
    } else {
      toggleSidebar();
      setShowSecondColumn(false);
    }
  };

  const handleSystemClick = (url: string) => {
    window.open(url, "_blank");
    setShowSystemMenu(false);
  };

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <header className="header">
      {/* Left Section */}
      <div className="header-left">
        {/*         
        <button
          onClick={handleToggle}
          className="toggle-sidebar focus:outline-none"
          aria-label="Toggle Sidebar"
        >
          <i className='ico hamburger' />
        </button>
        */}

        <div className="tivic_logo"></div>

        {/* Search */}
        <div className="search-box">
          <i className="ico search" />
          <input
            type="text"
            placeholder="Search..."
            className="inp focus:outline-none"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="header-right">
        <div className="button-group">
          {/* Systems Menu */}
          <div
            className={showSystemMenu ? "relative active" : "relative"}
            ref={systemMenuRef}
          >
            <button
              onClick={() => setShowSystemMenu(!showSystemMenu)}
              className="buttons"
            >
              {showNotifications}
              <i className="ico header01" />
            </button>
            {/* Systems Dropdown */}
            {showSystemMenu && (
              <div className="menu-shows w-240">
                <h3 className="title">시스템 바로가기</h3>

                <div className="system-list overflow-y-auto">
                  {systems.map((system) => (
                    <button
                      key={system.id}
                      onClick={() => handleSystemClick(system.url)}
                      className="items"
                    >
                      <i className={`ico ${system.icon}`} />
                      <div className="text-wrap">
                        <p className="name">{system.name}</p>
                        <p className="description">{system.description}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Notifications */}
          <div
            className={showNotifications ? "relative active" : "relative"}
            ref={notificationsRef}
          >
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="buttons"
            >
              <i className="ico header02" />
              <i className="alarm" />
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div id="notificationDropdown" className="menu-shows w-240">
                <h3 className="title">알림</h3>
                <ul className="todo-list">
                  {notifications.mail.items.map((item) => (
                    <li key={item.id} className="items">
                      <strong>{item.title}</strong>
                      <div className="info">
                        <span className="sender">{item.sender}</span>
                        <span className="time">{item.time}</span>
                      </div>
                    </li>
                  ))}
                </ul>
                <button className="buttons">
                  <span>모든 알림 보기</span>
                  <i className="ico arrow-right" />
                </button>
              </div>
            )}
          </div>

          {/* Employee Search */}
          <div className="relative" ref={employeeSearchRef}>
            <button
              onClick={() => setShowEmployeeSearch(!showEmployeeSearch)}
              className="buttons"
              title="임직원 찾기"
            >
              <i className="ico header03" />
            </button>
          </div>

          {/* Mail Notifications */}
          <div className="relative" ref={notificationsRef}>
            <button className="buttons" title="메일">
              <i className="ico header04" />
              {notifications.mail.count > 0 && (
                <span className="badge">{notifications.mail.count}</span>
              )}
            </button>
          </div>

          {/* Message Notifications */}
          <div className="relative" ref={notificationsRef}>
            <button className="buttons" title="쪽지">
              <i className="ico header05" />
              {notifications.message.count > 0 && (
                <span className="badge">{notifications.message.count}</span>
              )}
            </button>
          </div>

          {/* Approval Notifications */}
          <div className="relative" ref={notificationsRef}>
            <button className="buttons" title="결재">
              <i className="ico header06" />
              {notifications.approval.count > 0 && (
                <span className="badge">{notifications.approval.count}</span>
              )}
            </button>
          </div>
        </div>

        {/* Profile */}
        <div className="profile" ref={profileMenuRef}>
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="buttons focus:outline-none"
          >
            <div className="thums overflow-hidden">
              <Image
                src="/assets/images/users/avatar-1.jpg"
                alt="user"
                width={20}
                height={20}
                className="object-cover"
              />
            </div>
            <span className="text sm:block">관리자</span>
            <i className="ico chevron-down" />
          </button>

          {showProfileMenu && (
            <div className="menu-shows">
              <ul className="lists">
                <li>
                  <a href="#profile" className="link-item">
                    프로필
                  </a>
                </li>
                <li>
                  <a href="#settings" className="link-item">
                    설정
                  </a>
                </li>
                <li>
                  <button onClick={handleLogout} className="link-item">
                    로그아웃
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Search (Responsive) */}
      {showSearch && (
        <div className="md:hidden fixed top-[70px] left-0 right-0 bg-white p-4 border-b border-gray-200 z-20">
          <div className="relative">
            <input
              type="text"
              placeholder="검색..."
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            <svg
              className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      )}
    </header>
  );
}
