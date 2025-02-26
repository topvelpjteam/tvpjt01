"use client";
import { Tree, TreeApi } from "react-arborist";
import { useState, useEffect } from "react";
import { getMenuTree, menuTreeUpdate, menuCreate } from "@/api/index";

export default function MenuTree() {
  const [treeData, setTreeData] = useState<any>([]);
  const [render, setrender] = useState<any>("");
  const [menuNo, setMenuNo] = useState<any>(0);
  const [menuOrder, setMenuOrder] = useState<any>(0);
  const [menuNm, setmenuNm] = useState<any>("");
  const [upperMenuNo, setUpperMenuNo] = useState<any>(0);
  const [progrmFileNm, setProgramFileNm] = useState<any>("");
  const [relateImagePath, setRelateImagePath] = useState<any>("");
  const [relateImageNm, setRelateImageNm] = useState<any>("");
  const [menuDc, setMenuDc] = useState<any>("");

  useEffect(() => {
    getMenu();
  }, []);

  useEffect(() => {
    console.log(treeData);
    menuTreeUpdate(treeData);
    setrender(<Tree data={treeData} onMove={onMove} />);
  }, [treeData]);

  const getMenu = async () => {
    const menus = await getMenuTree();
    console.log(menus.data.data.data);
    let m = transformMenuData(menus.data.data.data);
    setTreeData(m);
  };
  function transformMenuData(menuArray: any) {
    let i = 0;
    return menuArray.map(
      ({
        menuNo,
        menuNm,
        children,
        menuDc,
        menuOrdr,
        progrmFileNm,
        relateImageNm,
        relateImagePath,
        upperMenuNo,
      }: any) => ({
        id: String(menuNo),
        name: menuNm,
        menuNo: Number(menuNo),
        menuNm: menuNm,
        menuDc: menuDc,
        menuOrdr: i++,
        progrmFileNm: progrmFileNm,
        relateImageNm: relateImageNm,
        relateImagePath: relateImagePath,
        upperMenuNo: upperMenuNo,
        ...(children ? { children: transformMenuData(children) } : {}),
      })
    );
  }
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
      item.upperMenuNo = 0;
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
            item.upperMenuNo = Number(parentId);
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
        let re = transformMenuData(newArr);
        return re;
      } else {
        console.error("Parent not found");
        let re_arr = transformMenuData(arr);
        return re_arr;
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

  const createMenu = async () => {
    if (menuNm === "") {
      alert("메뉴명을 입력해주세요.");
      (document.querySelector("#menu_nm") as HTMLInputElement).focus();
    }
    let data = {
      menuNm: menuNm,
      progrmFileNm: progrmFileNm,
      menuNo: menuNo,
      upperMenuNo: upperMenuNo,
      menuOrdr: menuOrder,
      menuDc: menuDc,
      relateImagePath: relateImagePath,
      relateImageNm: relateImageNm,
    };
    await menuCreate(data);
    await getMenu();
  };

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
            onClick={createMenu}
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
                <input
                  type="number"
                  value={menuNo}
                  onChange={(e: any) => {
                    setMenuNo(e.target.value);
                  }}
                />
              </td>
              <th>
                메뉴 순서 <span>*</span>
              </th>
              <td>
                <input
                  type="number"
                  value={menuOrder}
                  onChange={(e: any) => {
                    setMenuOrder(e.target.value);
                  }}
                />
              </td>
            </tr>
            <tr>
              <th>
                메뉴 명 <span>*</span>
              </th>
              <td>
                <input
                  type="text"
                  id="menu_nm"
                  value={menuNm}
                  onChange={(e: any) => {
                    setmenuNm(e.target.value);
                  }}
                />
              </td>
              <th>
                상위메뉴No <span>*</span>
              </th>
              <td>
                <input
                  type="number"
                  disabled
                  value={upperMenuNo}
                  onChange={(e: any) => {
                    setUpperMenuNo(e.target.value);
                  }}
                />
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
                  value={progrmFileNm}
                  onChange={(e: any) => {
                    setProgramFileNm(e.target.value);
                  }}
                />
                <button>프로그램 파일명 검색</button>
              </td>
            </tr>
            <tr>
              <th>
                관련이미지명 <span>*</span>
              </th>
              <td>
                <input
                  type="text"
                  value={relateImagePath}
                  onChange={(e: any) => {
                    setRelateImagePath(e.target.value);
                  }}
                />
              </td>
              <th>
                관련이미지경로 <span>*</span>
              </th>
              <td>
                <input
                  type="text"
                  value={relateImageNm}
                  onChange={(e: any) => {
                    setRelateImageNm(e.target.value);
                  }}
                />
              </td>
            </tr>
            <tr>
              <th>
                메뉴설명 <span>*</span>
              </th>
              <td colSpan={3}>
                <textarea
                  value={menuDc}
                  onChange={(e: any) => {
                    setMenuDc(e.target.value);
                  }}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
