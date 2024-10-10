"use client";
import { useEffect, useState } from "react";
import questionData from "./data/questionData.json";
import { shuffleArray } from "./helpers/helpers";
import { PrintDataProps } from "./common/props";
import Image from "next/image";
import sun from "./icons/sun.svg";
import moon from "./icons/moon.svg";
import HTML from "./icons/HTML.svg";
import CSS from "./icons/CSS.svg";
import javascript from "./icons/javascript.svg";
import accessibility from "./icons/accessibility.svg";

const Home = () => {
  const [category, setCategory] = useState<string>(localStorage.getItem("category") || "");
  const [questionIndex, setQuestionIndex] = useState<number>(() => parseInt(localStorage.getItem("questionIndex") || "1000"));
  const [printData, setPrintData] = useState<PrintDataProps[]>(() => JSON.parse(localStorage.getItem("printData") || "[]"));
  const [chosenAnswer, setChosenAnswer] = useState<string>(() => localStorage.getItem("chosenAnswer") || "");
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(() => JSON.parse(localStorage.getItem("isAnswerSubmitted") || "false"));
  const [score, setScore] = useState<number>(() => parseInt(localStorage.getItem("score") || "0"));
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => JSON.parse(localStorage.getItem("isDarkMode") || "false"));

  useEffect(() => {
    if (category) {
      const filteredData = questionData.filter((data) => data.category === category);
      if (filteredData.length === 1) {
        const shuffledQuestions = shuffleArray(filteredData[0].questions);
        setPrintData(shuffledQuestions);
        localStorage.setItem("printData", JSON.stringify(shuffledQuestions));
      }
    }
  }, [category]);

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
  }, [questionIndex, chosenAnswer, isAnswerSubmitted, isDarkMode]);

  return (
    <div className={`${isDarkMode ? "bg-black" : "bg-[#eef1f6]"}`}>
      <div className="w-[100%] h-[72px] px-[24px] py-[16px] flex justify-between items-center bg-[#eef1f6]">
        <div className="w-[167px] h-[40px]"></div>
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
      <div className="w-[100%] h-[740px] pt-[32px] px-[24px] bg-[#eef1f6]">
        <div className="w-[100%] h-[125PX] mb-[40px]">
          <p className="font-thin text-[40px] text-[#313E51] leading-[100%] mb-[8px]">Welcome to the</p>
          <p className="font-bold text-[40px] text-[#313E51] leading-[100%] mb-[16px]">Frontend Quiz!</p>
          <p className="font-[400] text-[14px] text-[#313E51] italic ">Pick a subject to get started.</p>
        </div>
        {questionIndex === 1000 && (
          <div className="flex flex-col justify-center items-center">
            <button
              className="w-[100%] h-[64px] p-[12px] flex items-center rounded-[12px] mb-[12px]"
              style={{
                background: "#FFF",
                boxShadow: "0px 16px 40px 0px rgba(143, 160, 193, 0.14)",
              }}
              onClick={() => {
                setCategory("HTML");
                setQuestionIndex(0);
              }}
            >
              <div className="w-[40px] h-[40px] flex justify-center items-center bg-[#FFF1E9] mr-[16px]">
                <Image src={HTML} alt={"HTML"} width={23.21} height={17.86} />
              </div>
              <p className="text-[18px] text-[#313E51] leading-[100%] font-semibold">HTML</p>
            </button>
            <button
              className="w-[100%] h-[64px] p-[12px] flex items-center rounded-[12px] mb-[12px]"
              style={{
                background: "#FFF",
                boxShadow: "0px 16px 40px 0px rgba(143, 160, 193, 0.14)",
              }}
              onClick={() => {
                setCategory("CSS");
                setQuestionIndex(0);
              }}
            >
              <div className="w-[40px] h-[40px] flex justify-center items-center bg-[#E0FDEF] mr-[16px]">
                <Image src={CSS} alt={"HTML"} width={23.21} height={17.86} />
              </div>
              <p className="text-[18px] text-[#313E51] leading-[100%] font-semibold">CSS</p>
            </button>
            <button
              className="w-[100%] h-[64px] p-[12px] flex items-center rounded-[12px] mb-[12px]"
              style={{
                background: "#FFF",
                boxShadow: "0px 16px 40px 0px rgba(143, 160, 193, 0.14)",
              }}
              onClick={() => {
                setCategory("javascript");
                setQuestionIndex(0);
              }}
            >
              <div className="w-[40px] h-[40px] flex justify-center items-center bg-[#EBF0FF] mr-[16px]">
                <Image src={javascript} alt={"HTML"} width={23.21} height={17.86} />
              </div>
              <p className="text-[18px] text-[#313E51] leading-[100%] font-semibold">Javascript</p>
            </button>
            <button
              className="w-[100%] h-[64px] p-[12px] flex items-center rounded-[12px] mb-[12px]"
              style={{
                background: "#FFF",
                boxShadow: "0px 16px 40px 0px rgba(143, 160, 193, 0.14)",
              }}
              onClick={() => {
                setCategory("accessibility");
                setQuestionIndex(0);
              }}
            >
              <div className="w-[40px] h-[40px] flex justify-center items-center bg-[#F6E7FF] mr-[16px]">
                <Image src={accessibility} alt={"HTML"} width={23.21} height={17.86} />
              </div>
              <p className="text-[18px] text-[#313E51] leading-[100%] font-semibold">Accessibility</p>
            </button>
          </div>
        )}
        {questionIndex !== 1000 && questionIndex < printData.length && (
          <div className="flex justify-center items-center gap-4">
            <h1>
              {questionIndex + 1}/{printData.length}
            </h1>
            <div>{printData[questionIndex]?.question}</div>
            {printData[questionIndex]?.answers.map((multipleChoice, index) => {
              const correctAnswer = printData[questionIndex]?.correctAnswer;
              return (
                <button
                  key={index}
                  className={` ${isAnswerSubmitted && correctAnswer === multipleChoice ? "bg-[green]" : ""} ${
                    multipleChoice === chosenAnswer && !isAnswerSubmitted ? "bg-[yellow]" : ""
                  } ${multipleChoice === chosenAnswer && isAnswerSubmitted && chosenAnswer !== correctAnswer ? "bg-[red]" : ""} `}
                  onClick={() => {
                    if (!isAnswerSubmitted) {
                      setChosenAnswer(multipleChoice);
                    }
                  }}
                >
                  {multipleChoice}
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
              >
                Submit Answer
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
              >
                Next Question
              </button>
            )}
          </div>
        )}
        {questionIndex >= printData.length && questionIndex !== 1000 && (
          <div className="flex justify-center items-center gap-4">
            Your score is {score} out of {printData.length}
            <button
              onClick={() => {
                setQuestionIndex(1000);
                localStorage.clear();
                setCategory("");
              }}
            >
              Retry
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
