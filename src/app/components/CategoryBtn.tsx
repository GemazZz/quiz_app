import React from "react";
import CategoryIcons from "./CategoryIcons";
interface CategoryBtnProps {
  isDarkMode: boolean;
  category: string;
  onClick: () => void;
}

const CategoryBtn = ({ isDarkMode, category, onClick }: CategoryBtnProps) => {
  return (
    <button
      className="w-[100%] h-[64px] p-[12px] flex items-center rounded-[12px] mb-[12px]"
      style={{
        background: isDarkMode ? "#404c64" : "#FFF",
        boxShadow: "0px 16px 40px 0px rgba(143, 160, 193, 0.14)",
      }}
      onClick={onClick}
    >
      <CategoryIcons category={category} isDarkMode={isDarkMode} />
    </button>
  );
};

export default CategoryBtn;
