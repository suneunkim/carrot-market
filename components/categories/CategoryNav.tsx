import React, { useEffect } from "react";
import categoryList from "@/components/categories/Categories";
import CategoryBox from "./CategoryBox";

const CategoryNav = ({ setSelected }: { setSelected: (path: string) => void }) => {
  const [path, setPath] = React.useState<string>("");

  const handleCategoryClick = (categoryPath: string) => {
    setPath(categoryPath);
    setSelected(categoryPath);
  };

  return (
    <div className="grid grid-cols-6">
      {categoryList.map((item) => (
        <div key={item.label} className="col-span-1 p-2 mb-2">
          <CategoryBox
            onClick={() => handleCategoryClick(item.path)}
            selected={path === item.path}
            name={item.name}
            path={item.path}
          />
        </div>
      ))}
    </div>
  );
};

export default CategoryNav;
