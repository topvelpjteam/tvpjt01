"use client";
import { Tree, TreeApi } from "react-arborist";
import { useState, useRef, useEffect } from "react";

export default function MenuTree() {
  const initialData = [
    { id: "1", name: "Unread" },
    { id: "2", name: "Threads" },
    {
      id: "3",
      name: "Chat Rooms",
      children: [
        { id: "c1", name: "General" },
        { id: "c2", name: "Random" },
        { id: "c3", name: "Open Source Projects" },
      ],
    },
    {
      id: "4",
      name: "Direct Messages",
      children: [
        { id: "d1", name: "Alice" },
        { id: "d2", name: "Bob" },
        { id: "d3", name: "Charlie" },
      ],
    },
  ];

  const [treeData, setTreeData] = useState<any>(initialData);
  const [render, setrender] = useState<any>("");

  const removeItemById = (data: any[], targetId: string): any[] => {
    return data.reduce((result, item) => {
      if (item.id === targetId) {
        return result;
      }

      const updatedItem = item.children
        ? { ...item, children: removeItemById(item.children, targetId) }
        : item;

      result.push(updatedItem);
      return result;
    }, []);
  };

  const findItemById = (data: any[], targetId: string): any | null => {
    for (let item of data) {
      if (item.id === targetId) {
        return item;
      }
      if (item.children) {
        const found = findItemById(item.children, targetId);
        if (found) return found;
      }
    }
    return null;
  };

  const insertAtIndex = (
    arr: any[],
    parentId: any,
    index: number,
    item: any
  ) => {
    if (parentId === null) {
      const newArr = [...arr];
      newArr.splice(index, 0, item);
      return newArr;
    } else {
      const findParentAndInsert = (
        list: any[],
        parentId: any,
        item: any,
        index: number
      ) => {
        for (let i = 0; i < list.length; i++) {
          if (list[i].id === parentId) {
            list[i].children = list[i].children || [];
            list[i].children.splice(index, 0, item);
            return true;
          }

          if (list[i].children && list[i].children.length > 0) {
            if (findParentAndInsert(list[i].children, parentId, item, index)) {
              return true;
            }
          }
        }
        return false;
      };

      const newArr = [...arr];
      const success = findParentAndInsert(newArr, parentId, item, index);

      if (success) {
        return newArr;
      } else {
        console.error("Parent not found");
        return arr;
      }
    }
  };

  const onMove = (props: any) => {
    console.log(props.dragIds);
    console.log(props.parentId);
    console.log(props.index);
    let newData = removeItemById(treeData, props.dragIds[0]);
    let movingData = findItemById(treeData, props.dragIds[0]);
    let result = insertAtIndex(
      newData,
      props.parentId,
      props.index,
      movingData
    );
    console.log(result);
    setTreeData(result);
  };
  useEffect(() => {
    console.log(treeData);
    setrender(<Tree data={treeData} onMove={onMove} />);
  }, [treeData]);
  return (
    <>
      <h2 className="title">메뉴관리</h2>
      <div className="menu_list_control">{render}</div>
      <div className="menu_list_control_rest">
        <div className="main_button_area">
          <button
            className="blue"
            style={{
              position: "absolute",
              left: "0px",
              top: "0px",
              margin: "0px",
            }}
          >
            메뉴추가
          </button>
          <button className="blue">저장</button>
          <button className="green">수정</button>
          <button className="red">삭제</button>
        </div>
        <table>
          <tbody>
            <tr>
              <th>
                메뉴 no <span>*</span>
              </th>
              <td>
                <input type="number" />
              </td>
              <th>
                메뉴 순서 <span>*</span>
              </th>

              <td>
                <input type="number" />
              </td>
            </tr>
            <tr>
              <th>
                메뉴 명 <span>*</span>
              </th>
              <td>
                <input type="text" />
              </td>
              <th>
                상위메뉴No <span>*</span>
              </th>
              <td>
                <input type="number" disabled />
              </td>
            </tr>
            <tr>
              <th>
                파일명 <span>*</span>
              </th>
              <td colSpan={3}>
                <input
                  type="text"
                  disabled
                  style={{ width: "50%", marginRight: "10px" }}
                />
                <button>프로그램 파일명 검색</button>
              </td>
            </tr>
            <tr>
              <th>
                관련이미지명 <span>*</span>
              </th>
              <td>
                <input type="text" />
              </td>
              <th>
                관련이미지경로 <span>*</span>
              </th>
              <td>
                <input type="text" />
              </td>
            </tr>
            <tr>
              <th>
                메뉴설명 <span>*</span>
              </th>
              <td colSpan={3}>
                <textarea></textarea>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
