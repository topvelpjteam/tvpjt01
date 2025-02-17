"use client";

import React from "react";

export default function LeftMenu() {
  return (
    <>
      <ul>
        <li className="first sel">
          first_depth
          <ul>
            <li className="second">second_depth</li>
            <li className="second sel">
              second_depth
              <ul>
                <li className="third">third_depth</li>
                <li className="third">third_depth</li>
                <li className="third sel">third_depth</li>
                <li className="third">third_depth</li>
              </ul>
            </li>
            <li className="second">second_depth</li>
            <li className="second">second_depth</li>
          </ul>
        </li>
        <li className="first">first_depth</li>
        <li className="first">first_depth</li>
        <li className="first">first_depth</li>
      </ul>
    </>
  );
}
