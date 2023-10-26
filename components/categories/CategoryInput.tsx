import { cls } from "@/libs/client/utils";
import React from "react";
import { IconType } from "react-icons";

interface CategoryInputProps {
  label: string;
  path: string;
  icon: IconType;
  onClick: (value: string) => void;
  selected?: boolean;
}

const CategoryInput = ({ label, path, icon: Icon, onClick, selected }: CategoryInputProps) => {
  return (
    <div
      onClick={() => onClick(path)}
      className={cls(
        "border-2 rounded-lg p-4 flex items-end hover:border-orange-300 transition justify-between cursor-pointer",
        selected ? "border-orange-300" : "border border-gray-300"
      )}
    >
      <Icon size={30} />
      <div className="text-sm text-gray-500">{label}</div>
    </div>
  );
};

export default CategoryInput;
