"use client";

import React from "react";
import ModalPop from "@/component/modalPop";
import useStore from "@/store/useStore";
import { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);

export default function Test() {
  const isblock = useStore((state: any) => state.isblock);

  const [rowData, setRowData] = useState<any>([
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    { make: "Mercedes", model: "EQA", price: 48890, electric: true },
    { make: "Fiat", model: "500", price: 15774, electric: false },
    { make: "Nissan", model: "Juke", price: 20675, electric: false },
  ]);

  const [colDefs, setColDefs] = useState<any>([
    { field: "make" },
    { field: "model" },
    { field: "price" },
    { field: "electric" },
  ]);

  const defaultColDef = {
    flex: 1,
  };

  return (
    <>
      <h2>
        Test 페이지
        <div className="bread">
          first<em></em>second<em></em>third
        </div>
      </h2>
      <div style={{ height: "500px", width: "100%" }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
        />
      </div>
      <ModalPop isblock={isblock}></ModalPop>
    </>
  );
}
