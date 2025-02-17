"use client";

import React from "react";
import ModalPop from "@/component/modalPop";
import useStore from "@/store/useStore";

export default function Test() {
  const isblock = useStore((state: any) => state.isblock);
  return (
    <>
      <h2>
        Test 페이지
        <div className="bread">
          first<em></em>second<em></em>third
        </div>
      </h2>
      <ModalPop isblock={isblock}></ModalPop>
    </>
  );
}
