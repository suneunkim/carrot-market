import { cls } from "@/libs/client/utils";
import React from "react";

//category는 업로드 시 넘겼던 path 값임.

interface CategoryBoxProps {
  name: string;
  path: string;
  onClick: (value: string) => void;
  selected?: boolean;
}

const CategoryBox = ({ name, path, onClick, selected }: CategoryBoxProps) => {
  return (
    <div
      onClick={() => onClick(path)}
      className={cls(
        "border-2 rounded-xl py-2 flex justify-center hover:border-orange-300 transition  cursor-pointer",
        selected ? "border-orange-300" : "border border-gray-200"
      )}
    >
      <div className="text-sm text-gray-500">{name}</div>
    </div>
  );
};

export default CategoryBox;
