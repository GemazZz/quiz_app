"use client";
import { useEffect, useState } from "react";
import questionData from "./data/questionData.json";
import { shuffleArray } from "./helpers/helpers";
import { PrintDataProps } from "./common/props";
import Image from "next/image";
import sun from "./icons/sun.svg";
import moon from "./icons/moon.svg";
import X from "./icons/X.svg";
import V from "./icons/V.svg";
import CategoryIcons from "./components/CategoryIcons";
import CategoryBtn from "./components/CategoryBtn";

const Home = () => {
  const [category, setCategory] = useState<string>(() => localStorage.getItem("category") || "");
  const [questionIndex, setQuestionIndex] = useState<number>(() => parseInt(localStorage.getItem("questionIndex") || "1000"));
  const [printData, setPrintData] = useState<PrintDataProps[]>(() => JSON.parse(localStorage.getItem("printData") || "[]"));
  const [chosenAnswer, setChosenAnswer] = useState<string>(() => localStorage.getItem("chosenAnswer") || "");
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(() => JSON.parse(localStorage.getItem("isAnswerSubmitted") || "false"));
  const [score, setScore] = useState<number>(() => parseInt(localStorage.getItem("score") || "0"));
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => JSON.parse(localStorage.getItem("isDarkMode") || "false"));
  const [progressPercentage, setProgressPercentage] = useState<number>();

  useEffect(() => {
    if (category && printData.length === 0) {
      const filteredData = questionData.filter((data) => data.category === category);
      if (filteredData.length === 1) {
        const shuffledQuestions = shuffleArray(filteredData[0].questions);
        setPrintData(shuffledQuestions);
        localStorage.setItem("printData", JSON.stringify(shuffledQuestions));
      }
    }
  }, [category, printData.length]);

  useEffect(() => {
    if (isAnswerSubmitted) {
      const correctAnswer = printData[questionIndex]?.correctAnswer;
      if (correctAnswer === chosenAnswer) {
        const newScore = score + 1;
        setScore(newScore);
        localStorage.setItem("score", newScore.toString());
      }
    }
  }, [isAnswerSubmitted]);

  useEffect(() => {
    localStorage.setItem("questionIndex", questionIndex.toString());
    localStorage.setItem("chosenAnswer", chosenAnswer);
    localStorage.setItem("category", category);
    localStorage.setItem("isAnswerSubmitted", JSON.stringify(isAnswerSubmitted));
    localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));
    setProgressPercentage(((questionIndex + 1) / printData.length) * 100);
  }, [questionIndex, chosenAnswer, isAnswerSubmitted, isDarkMode]);

  return (
    <div>
      <div
        className={`w-[100%] h-[72px] px-[24px] py-[16px] flex justify-between items-center ${isDarkMode ? "bg-[#313d51]" : "bg-[#eef1f6]"}`}
      >
        <div className="w-[167px] h-[40px] flex justify-start items-center">
          {category === "HTML" && <CategoryIcons category={"HTML"} isDarkMode={isDarkMode} />}
          {category === "CSS" && <CategoryIcons category={"CSS"} isDarkMode={isDarkMode} />}
          {category === "javascript" && <CategoryIcons category={"javascript"} isDarkMode={isDarkMode} />}
          {category === "accessibility" && <CategoryIcons category={"accessibility"} isDarkMode={isDarkMode} />}
        </div>
        <div className="w-[80px] h-[20px] flex justify-between items-center ">
          <Image src={sun} alt={"sun"} width={16} />
          <label className="relative inline-block h-[20px] w-[32px] m-[4px]">
            <input type="checkbox" checked={isDarkMode} onChange={() => setIsDarkMode(!isDarkMode)} className="hidden peer" />
            <span className="absolute inset-0 bg-purple-800 border border-purple-800 rounded-full cursor-pointer transition-all duration-500 peer-checked:bg-purple-800 peer-checked:border-purple-800"></span>
            <span className="absolute left-1 bottom-1 h-[12px] w-[12px] bg-white rounded-full transition-all duration-500 peer-checked:translate-x-[12px] peer-checked:bg-white"></span>
          </label>
          <Image src={moon} alt={"moon"} width={16} />
        </div>
      </div>
      <div className={`w-[100%] h-[740px] pt-[32px] px-[24px] ${isDarkMode ? "bg-[#313d51]" : "bg-[#eef1f6]"}`}>
        {questionIndex === 1000 && (
          <>
            <div className="w-[100%] h-[125PX] mb-[40px]">
              <p className={`font-thin text-[40px] ${isDarkMode ? "text-white" : "text-[#313E51]"} leading-[100%] mb-[8px]`}>Welcome to the</p>
              <p className={`font-bold text-[40px] ${isDarkMode ? "text-white" : "text-[#313E51]"} leading-[100%] mb-[16px]`}>Frontend Quiz!</p>
              <p className={`font-[400] text-[14px] ${isDarkMode ? "text-white" : "text-[#313E51]"} italic`}>Pick a subject to get started.</p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <CategoryBtn
                isDarkMode={isDarkMode}
                category={"HTML"}
                onClick={() => {
                  setCategory("HTML");
                  setQuestionIndex(0);
                }}
              />
              <CategoryBtn
                isDarkMode={isDarkMode}
                category={"CSS"}
                onClick={() => {
                  setCategory("CSS");
                  setQuestionIndex(0);
                }}
              />
              <CategoryBtn
                isDarkMode={isDarkMode}
                category={"javascript"}
                onClick={() => {
                  setCategory("javascript");
                  setQuestionIndex(0);
                }}
              />
              <CategoryBtn
                isDarkMode={isDarkMode}
                category={"accessibility"}
                onClick={() => {
                  setCategory("accessibility");
                  setQuestionIndex(0);
                }}
              />
            </div>
          </>
        )}
        {questionIndex !== 1000 && questionIndex < printData.length && (
          <div className="flex flex-col justify-center items-center">
            <div className="w-[100%] mb-[40px]">
              <p className={`font-[400] text-[14px] ${isDarkMode ? "text-white" : "text-[#313E51]"} italic mb-[12px]`}>
                question {questionIndex + 1} of {printData.length}
              </p>
              <p className={`font-[600] text-[20px] ${isDarkMode ? "text-white" : "text-[#313E51]"} mb-[24px]`}>
                {printData[questionIndex]?.question}
              </p>
              <div className={`w-[100%] h-[16px] ${isDarkMode ? "bg-[#313d51]" : "bg-[#fff]"} rounded-[999px] p-[4px] flex justify-start`}>
                <div className={`h-[8px] bg-purple-500 rounded-[104px]`} style={{ width: `${progressPercentage}%` }}></div>
              </div>
            </div>
            {printData[questionIndex]?.answers.map((multipleChoice, index) => {
              const correctAnswer = printData[questionIndex]?.correctAnswer;
              const letters = ["A", "B", "C", "D"];
              return (
                <button
                  style={{
                    background: isDarkMode ? "#404c64" : "#FFF",
                    boxShadow: "0px 16px 40px 0px rgba(143, 160, 193, 0.14)",
                  }}
                  key={index}
                  className={`w-[100%] h-[64px] p-[12px] flex items-center justify-between rounded-[12px] mb-[12px] ${
                    isAnswerSubmitted && correctAnswer === multipleChoice ? "border-[3px] border-[#26D782]" : ""
                  } ${multipleChoice === chosenAnswer && !isAnswerSubmitted ? "border-[3px] border-[#A729F5]" : ""} ${
                    multipleChoice === chosenAnswer && isAnswerSubmitted && chosenAnswer !== correctAnswer
                      ? "border-[3px] border-[#EE5454]"
                      : ""
                  } `}
                  onClick={() => {
                    if (!isAnswerSubmitted) {
                      setChosenAnswer(multipleChoice);
                    }
                  }}
                >
                  <div className="flex justify-center items-center">
                    <div
                      className={`w-[40px] h-[40px] flex justify-center items-center rounded-[6px] bg-[#F4F6FA] mr-[16px]`}
                      style={
                        multipleChoice === chosenAnswer && !isAnswerSubmitted
                          ? { backgroundColor: "#A729F5" }
                          : isAnswerSubmitted && correctAnswer === multipleChoice
                          ? { backgroundColor: "#26D782" }
                          : multipleChoice === chosenAnswer && isAnswerSubmitted && chosenAnswer !== correctAnswer
                          ? { backgroundColor: "#EE5454" }
                          : { backgroundColor: "#F4F6FA" }
                      }
                    >
                      <p
                        className={`text-18px font-bold w-[100%] "text-[#313E51]" ${
                          (multipleChoice === chosenAnswer && !isAnswerSubmitted) ||
                          (isAnswerSubmitted && correctAnswer === multipleChoice) ||
                          (multipleChoice === chosenAnswer && isAnswerSubmitted && chosenAnswer !== correctAnswer)
                            ? "text-white"
                            : ""
                        }`}
                      >
                        {letters[index]}
                      </p>
                    </div>
                    <p className="font-bold">{multipleChoice}</p>
                  </div>
                  <div className="w-[40px] h-[40px] flex justify-center items-center ">
                    {multipleChoice === chosenAnswer && isAnswerSubmitted && chosenAnswer !== correctAnswer && (
                      <Image src={X} alt={"X"} width={32} />
                    )}
                    {isAnswerSubmitted && correctAnswer === multipleChoice && <Image src={V} alt={"V"} width={32} />}
                  </div>
                </button>
              );
            })}
            {!isAnswerSubmitted && (
              <button
                onClick={() => {
                  if (chosenAnswer !== "") {
                    setIsAnswerSubmitted(true);
                  }
                }}
                style={{
                  background: isDarkMode ? "#404c64" : "#FFF",
                  boxShadow: "0px 16px 40px 0px rgba(143, 160, 193, 0.14)",
                  backgroundColor: "#A729F5",
                }}
                className="w-[100%] h-[64px] bg-[#A729F5] p-[12px] flex items-center justify-center rounded-[12px] "
              >
                <p className="text-white text-[18px]">Submit Answer</p>
              </button>
            )}
            {isAnswerSubmitted && (
              <button
                onClick={() => {
                  if (questionIndex < printData.length) {
                    setQuestionIndex(questionIndex + 1);
                    setIsAnswerSubmitted(false);
                    setChosenAnswer("");
                  }
                }}
                style={{
                  background: isDarkMode ? "#404c64" : "#FFF",
                  boxShadow: "0px 16px 40px 0px rgba(143, 160, 193, 0.14)",
                  backgroundColor: "#A729F5",
                }}
                className="w-[100%] h-[64px] bg-[#A729F5] p-[12px] flex items-center justify-center rounded-[12px] "
              >
                <p className="text-white text-[18px]">Next Question</p>
              </button>
            )}
          </div>
        )}
        {questionIndex >= printData.length && questionIndex !== 1000 && (
          <div className="flex flex-col justify-center items-center gap-4">
            <div className="w-[100%] h-[88PX] mb-[40px]">
              <p className={`font-thin text-[40px] ${isDarkMode ? "text-white" : "text-[#313E51]"} leading-[100%] mb-[8px]`}>Quiz completed</p>
              <p className={`font-bold text-[40px] ${isDarkMode ? "text-white" : "text-[#313E51]"} leading-[100%] mb-[16px]`}>You scored...</p>
            </div>
            <div
              className="w-[100%] h-[242px] p-[32px] flex flex-col gap-[16px] justify-center items-center"
              style={{
                background: isDarkMode ? "#404c64" : "#FFF",
                boxShadow: "0px 16px 40px 0px rgba(143, 160, 193, 0.14)",
              }}
            >
              {category === "HTML" && <CategoryIcons category={"HTML"} isDarkMode={isDarkMode} />}
              {category === "CSS" && <CategoryIcons category={"CSS"} isDarkMode={isDarkMode} />}
              {category === "javascript" && <CategoryIcons category={"javascript"} isDarkMode={isDarkMode} />}
              {category === "accessibility" && <CategoryIcons category={"accessibility"} isDarkMode={isDarkMode} />}
              <p className={`text-[88px] ${isDarkMode ? "text-white" : "text-[#313E51]"} leading-[100%] font-semibold`}>{score}</p>
              <p className={`text-[18px] ${isDarkMode ? "text-white" : "text-[#313E51]"} leading-[100%] font-semibold`}>
                out of {printData.length}
              </p>
            </div>
            <button
              onClick={() => {
                setQuestionIndex(1000);
                localStorage.clear();
                setCategory("");
                setScore(0);
              }}
              style={{
                background: isDarkMode ? "#404c64" : "#FFF",
                boxShadow: "0px 16px 40px 0px rgba(143, 160, 193, 0.14)",
                backgroundColor: "#A729F5",
              }}
              className="w-[100%] h-[64px] bg-[#A729F5] p-[12px] flex items-center justify-center rounded-[12px] "
            >
              <p className="text-white text-[18px]">Play Again </p>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
