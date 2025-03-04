"use client";

import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { useSidebar } from "@/context/SidebarContext";
import useStore from "@/store/useStore";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isCollapsed, showSecondColumn } = useSidebar();
  const { tabData, setTabData }: any = useStore();
  const [tabRender, setTabRender] = useState();
  const [dragstartNo, setDragStartNo] = useState<any>();
  const getMainContentMargin = () => {
    if (isCollapsed && !showSecondColumn) {
      return "collapsed";
    } else if (!isCollapsed || showSecondColumn) {
      return "";
    }
    return "collapsed";
  };
  let dr_no: number;
  useEffect(() => {
    console.log(tabData);
    if (tabData.length > 0) {
      setTabRender(
        tabData.map((data: any, i: any) => {
          return (
            <>
              <Link
                style={{
                  width: "auto",
                  height: "auto",
                  display: "inline-block",
                  verticalAlign: "top",
                }}
                href={data.path}
                draggable
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  console.log(dr_no);
                  const newTabs = [...tabData];
                  const [removed] = newTabs.splice(dr_no, 1);
                  newTabs.splice(i, 0, removed);
                  console.log(newTabs);
                  setTabData(newTabs);
                }}
                onDragStart={() => {
                  console.log(i);
                  dr_no = i;
                }}
                key={i}
              >
                <div
                  className={`tab_cell ${data.active === true ? "ac" : ""} ${
                    "t" + i
                  }`}
                >
                  {data.title}
                  <div className="tab_x">X</div>
                </div>
              </Link>
            </>
          );
        })
      );
    }
  }, [tabData]);

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
          <div className="tab_wrap">{tabRender}</div>

          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
