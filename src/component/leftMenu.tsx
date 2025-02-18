"use client";

import { useEffect } from "react";
import React from "react";

export default function LeftMenu() {
  useEffect(() => {
    let first = document.querySelectorAll(".first");
    for (let i = 0; i < first.length; i++) {
      first[i].addEventListener("click", function (event) {
        if (
          (event.target as HTMLElement).classList.contains("second") ||
          (event.target as HTMLElement).classList.contains("third")
        ) {
          return;
        } else {
          if (first[i].classList.contains("sel")) {
            first[i].classList.remove("sel");
          } else {
            first[i].classList.add("sel");
          }
        }
      });
    }
    let second = document.querySelectorAll(".second");
    for (let ii = 0; ii < second.length; ii++) {
      (second[ii]?.parentNode as HTMLElement).classList.add("sel");
      second[ii].addEventListener("click", function (event) {
        if (
          (event.target as HTMLElement).classList.contains("first") ||
          (event.target as HTMLElement).classList.contains("third")
        ) {
          return;
        } else {
          if (second[ii].classList.contains("sel")) {
            second[ii].classList.remove("sel");
          } else {
            second[ii].classList.add("sel");
          }
        }
      });
    }

    let third = document.querySelectorAll(".third");
    for (let iii = 0; iii < second.length; iii++) {
      third[iii].addEventListener("click", function (event) {
        console.log((event.target as HTMLElement).classList);
        if (
          (event.target as HTMLElement).classList.contains("first") ||
          (event.target as HTMLElement).classList.contains("second")
        ) {
          return;
        } else {
          if (third[iii].classList.contains("sel")) {
            third[iii].classList.remove("sel");
          } else {
            third[iii].classList.add("sel");
          }
        }
      });
    }
  }, []);

  return (
    <>
      <ul>
        <li className="first ">
          first_depth
          <ul>
            <li className="second">second_depth</li>
            <li className="second ">
              second_depth
              <ul>
                <li className="third">third_depth</li>
                <li className="third">third_depth</li>
                <li className="third ">third_depth</li>
                <li className="third">third_depth</li>
              </ul>
            </li>
            <li className="second">second_depth</li>
            <li className="second">second_depth</li>
          </ul>
        </li>
        <li className="first ">
          first_depth
          <ul>
            <li className="second">second_depth</li>
            <li className="second ">
              second_depth
              <ul>
                <li className="third">third_depth</li>
                <li className="third">third_depth</li>
                <li className="third ">third_depth</li>
                <li className="third">third_depth</li>
              </ul>
            </li>
            <li className="second">second_depth</li>
            <li className="second">second_depth</li>
          </ul>
        </li>
        <li className="first ">
          first_depth
          <ul>
            <li className="second">second_depth</li>
            <li className="second ">
              second_depth
              <ul>
                <li className="third">third_depth</li>
                <li className="third">third_depth</li>
                <li className="third ">third_depth</li>
                <li className="third">third_depth</li>
              </ul>
            </li>
            <li className="second">second_depth</li>
            <li className="second">second_depth</li>
          </ul>
        </li>
        <li className="first ">
          first_depth
          <ul>
            <li className="second">second_depth</li>
            <li className="second ">
              second_depth
              <ul>
                <li className="third">third_depth</li>
                <li className="third">third_depth</li>
                <li className="third ">third_depth</li>
                <li className="third">third_depth</li>
              </ul>
            </li>
            <li className="second">second_depth</li>
            <li className="second">second_depth</li>
          </ul>
        </li>
        <li className="first ">
          first_depth
          <ul>
            <li className="second">second_depth</li>
            <li className="second ">
              second_depth
              <ul>
                <li className="third">third_depth</li>
                <li className="third">third_depth</li>
                <li className="third ">third_depth</li>
                <li className="third">third_depth</li>
              </ul>
            </li>
            <li className="second">second_depth</li>
            <li className="second">second_depth</li>
          </ul>
        </li>
      </ul>
    </>
  );
}
