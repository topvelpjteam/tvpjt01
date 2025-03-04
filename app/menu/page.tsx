"use client";
import { Tree, TreeApi } from "react-arborist";
import { useState, useEffect } from "react";
import {
  getMenuTree,
  menuTreeUpdate,
  menuCreate,
  menuDetail,
  menuDelete,
  menuRecorect,
} from "@/api/index";

export default function MenuTree() {
  const [treeData, setTreeData] = useState<any>([]);
  const [render, setrender] = useState<any>("");
  const [menuNo, setMenuNo] = useState<any>();
  const [menuOrder, setMenuOrder] = useState<any>();
  const [menuNm, setmenuNm] = useState<any>("");
  const [upperMenuNo, setUpperMenuNo] = useState<any>();
  const [progrmFileNm, setProgramFileNm] = useState<any>("untitled");
  const [relateImagePath, setRelateImagePath] = useState<any>("");
  const [relateImageNm, setRelateImageNm] = useState<any>("");
  const [menuDc, setMenuDc] = useState<any>("");
  const [menuPath, setMenuPath] = useState<any>("");
  const [isDetail, setIsDetail] = useState<boolean>(false);
  const [isNew, setIsNew] = useState<boolean>(false);
  const [controlNumber, setControlNumber] = useState<Number>();

  useEffect(() => {
    getMenu();
    console.log(isDetail);
  }, []);

  useEffect(() => {
    console.log(treeData);
    if (treeData.length > 1) {
      menuTreeUpdate(treeData);
    }

    setrender(
      <Tree
        data={treeData}
        onMove={onMove}
        onSelect={(e: any) => menuDetailOn(e)}
        onClick={() => {
          setIsDetail(true);
          setIsNew(false);
        }}
      />
    );
  }, [treeData]);

  const menuDetailOn = async (e: any) => {
    console.log(e);
    if (e.length > 0) {
      let menu_detail: any = await menuDetail(e[0].data.menuNo);
      console.log(menu_detail.data.data.data);
      let menuSelected = menu_detail.data.data.data;
      setMenuDc(menuSelected.menuDc);
      setmenuNm(menuSelected.menuNm);
      setMenuNo(menuSelected.menuNo);
      setMenuOrder(menuSelected.menuOrder);
      setMenuPath(menuSelected.menuPath);
      setUpperMenuNo(menuSelected.upperMenuNo);
      setRelateImageNm(menuSelected.relateImageNm);
      setRelateImagePath(menuSelected.relateImagePath);
      setControlNumber(menuSelected.menuNo);
    }
  };

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
    try {
      let mm: any = menuCreate(data);
      if (mm) {
        setIsNew(false);
        setIsDetail(true);
        setMenuDc("");
        setmenuNm("");
        setMenuNo(0);
        setMenuOrder(0);
        setMenuPath("");
        setUpperMenuNo(0);
        setRelateImageNm("");
        setRelateImagePath("");
        await getMenu();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMenu = async (menuNo: any) => {
    try {
      let res = await menuDelete(menuNo);
      if (res) {
        getMenu();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const recorectMenu = async (menuNo: any) => {
    try {
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
      let res = await menuRecorect(menuNo, data);
      if (res) {
        getMenu();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h2 className="title">메뉴관리</h2>
      <div className="menu_list_control">{render}</div>
      <div className="menu_list_control_rest">
        <div className="main_button_area">
          {isNew === true ? (
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
              추가메뉴 저장
            </button>
          ) : (
            <button
              className="blue"
              style={{
                position: "absolute",
                left: "0px",
                top: "0px",
                margin: "0px",
              }}
              onClick={() => {
                setIsNew(true);
                setIsDetail(false);
                setMenuDc("");
                setmenuNm("");
                setMenuNo(0);
                setMenuOrder(0);
                setMenuPath("");
                setRelateImageNm("");
                setRelateImagePath("");
              }}
            >
              메뉴추가
            </button>
          )}

          {isDetail === true ? (
            <>
              <button
                className="green"
                onClick={() => {
                  recorectMenu(controlNumber);
                }}
              >
                수정
              </button>
              <button
                className="red"
                onClick={() => {
                  deleteMenu(controlNumber);
                }}
              >
                삭제
              </button>
            </>
          ) : (
            ""
          )}
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
              <th>메뉴 패스 라우터</th>
              <td colSpan={3}>
                <input
                  type="text"
                  value={menuPath}
                  onChange={(e) => {
                    setMenuPath(e.target.value);
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
