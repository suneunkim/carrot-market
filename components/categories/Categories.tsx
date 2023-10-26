import React from "react";
import { TbBeach } from "react-icons/tb";
import { CiBasketball, CiMonitor } from "react-icons/ci";
import { GiWindmill } from "react-icons/gi";
import { TbMountain } from "react-icons/tb";
import { GiIsland } from "react-icons/gi";
//기기 가구 의류 미용 스포츠 기타

export const categoryList = [
  {
    label: "디지털/가전",
    path: "digital",
    icon: CiMonitor,
    name: "기기",
  },
  {
    label: "가구/인테리어",
    path: "interior",
    icon: GiWindmill,
    name: "가구",
  },
  {
    label: "의류/잡화",
    path: "clothes",
    icon: TbMountain,
    name: "의류",
  },
  {
    label: "미용/뷰티",
    path: "beauty",
    icon: GiIsland,
    name: "미용",
  },
  {
    label: "스포츠/레저",
    path: "sports",
    icon: CiBasketball,
    name: "스포츠",
  },
  {
    label: "기타",
    path: "etc",
    icon: TbBeach,
    name: "기타",
  },
];

const Categories = () => {
  return <div>Categories</div>;
};

export default Categories;
