"use client";

import { useEffect, useState } from "react";
import React from "react";

export default function Header() {
  const [sel, setsel] = useState("");

  const userMenuOpen = () => {
    console.log("on");
    if (sel === "") {
      setsel("sel");
    } else {
      setsel("");
    }
  };
  return (
    <>
      <header className="header">
        <h1>TIVIC</h1>
        <div className="menu_open_close">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="header_search">
          <input type="text" placeholder="Search" />
          <button></button>
        </div>
        <div className="user_info">
          Aron cutter
          <div
            className="user_face"
            onClick={() => {
              userMenuOpen();
            }}
          ></div>
        </div>
      </header>
      <div className={"user_menu " + sel}>
        <a href="#">cdsvfdavfb </a>
        <a href="#">cdsvfdavfb </a>
        <a href="#">cdsvfdavfb </a>
        <a href="#">cdsvfdavfb </a>
      </div>
    </>
  );
}
