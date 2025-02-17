"use client";

import React, { useEffect } from "react";
import useStore from "@/store/useStore";

export default function ModalPop(props: any) {
  const setIsBlock = useStore((state: any) => state.setIsBlock);
  return (
    <>
      <div className="modal_wrap" style={{ display: props.isblock }}>
        <div className="modal_pop">
          <div
            className="modal_pop_x"
            onClick={() => {
              setIsBlock("none");
            }}
          >
            X
          </div>
          {props.children}
        </div>
      </div>
    </>
  );
}
