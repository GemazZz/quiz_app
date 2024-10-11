import React from "react";
import HTML from "../icons/HTML.svg";
import CSS from "../icons/CSS.svg";
import javascript from "../icons/javascript.svg";
import accessibility from "../icons/accessibility.svg";
import Image from "next/image";

interface CategoryIconsProps {
  category: string;
  isDarkMode: boolean;
}

const CategoryIcons = ({ category, isDarkMode }: CategoryIconsProps) => {
  return (
    <>
      {category === "HTML" && (
        <>
          <div className="w-[40px] h-[40px] flex justify-center items-center rounded-[6px] bg-[#FFF1E9] mr-[16px]">
            <Image src={HTML} alt={"HTML"} width={23.21} height={17.86} />
          </div>
          <p className={`text-[18px] ${isDarkMode ? "text-white" : "text-[#313E51]"} leading-[100%] font-semibold`}>HTML</p>
        </>
      )}
      {category === "CSS" && (
        <>
          <div className="w-[40px] h-[40px] flex justify-center items-center rounded-[6px] bg-[#E0FDEF] mr-[16px]">
            <Image src={CSS} alt={"CSS"} width={23.21} height={17.86} />
          </div>
          <p className={`text-[18px] ${isDarkMode ? "text-white" : "text-[#313E51]"} leading-[100%] font-semibold`}>CSS</p>
        </>
      )}
      {category === "javascript" && (
        <>
          <div className="w-[40px] h-[40px] flex justify-center items-center rounded-[6px] bg-[#EBF0FF] mr-[16px]">
            <Image src={javascript} alt={"javascript"} width={23.21} height={17.86} />
          </div>
          <p className={`text-[18px] ${isDarkMode ? "text-white" : "text-[#313E51]"} leading-[100%] font-semibold`}>Javascript</p>
        </>
      )}
      {category === "accessibility" && (
        <>
          <div className="w-[40px] h-[40px] flex justify-center items-center rounded-[6px] bg-[#F6E7FF] mr-[16px]">
            <Image src={accessibility} alt={"accessibility"} width={23.21} height={17.86} />
          </div>
          <p className={`text-[18px] ${isDarkMode ? "text-white" : "text-[#313E51]"} leading-[100%] font-semibold`}>Accessibility</p>
        </>
      )}
    </>
  );
};

export default CategoryIcons;
