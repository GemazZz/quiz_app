"use client";
import { useEffect, useState } from "react";
import questionData from "./data/questionData.json";
import { shuffleArray } from "./helpers/helpers";
import { PrintDataProps } from "./common/props";

const Home = () => {
  const [category, setCategory] = useState<string>("");
  const [questionIndex, setQuestionIndex] = useState<number>(1000);
  const [printData, setPrintData] = useState<PrintDataProps[]>([]);
  const [chosenAnswer, setChosenAnswer] = useState<string>("");
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  console.log(questionIndex, printData.length);

  useEffect(() => {
    if (category) {
      const filteredData = questionData.filter((data) => data.category === category);
      if (filteredData.length === 1) {
        const shuffledQuestions = shuffleArray(filteredData[0].questions);
        setPrintData(shuffledQuestions);
      }
    }
  }, [category]);

  useEffect(() => {
    if (isAnswerSubmitted) {
      const correctAnswer = printData[questionIndex].correctAnswer;
      if (correctAnswer === chosenAnswer) {
        setScore(score + 1);
      }
    }
  }, [isAnswerSubmitted]);

  return (
    <>
      {questionIndex === 1000 && (
        <div className="w-[100vw] h-[100vh] flex justify-center items-center gap-4">
          <p>choose category</p>
          <button
            onClick={() => {
              setCategory("HTML");
              setQuestionIndex(0);
            }}
          >
            HTML
          </button>
          <button
            onClick={() => {
              setCategory("CSS");
              setQuestionIndex(0);
            }}
          >
            CSS
          </button>
          <button
            onClick={() => {
              setCategory("javascript");
              setQuestionIndex(0);
            }}
          >
            Javascript
          </button>
          <button
            onClick={() => {
              setCategory("accessibility");
              setQuestionIndex(0);
            }}
          >
            Accessibility
          </button>
        </div>
      )}
      {questionIndex !== 1000 && printData.length > 0 && questionIndex < printData.length && (
        <div className="w-[100vw] h-[100vh] flex justify-center items-center gap-4">
          <h1>
            {questionIndex + 1}/{printData.length}
          </h1>
          <div>{printData[questionIndex].question}</div>
          {printData[questionIndex].answers.map((multipleChoice, index) => {
            const correctAnswer = printData[questionIndex].correctAnswer;
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
              submit answer
            </button>
          )}
          {isAnswerSubmitted && (
            <button
              onClick={() => {
                setQuestionIndex(questionIndex + 1);
                setIsAnswerSubmitted(false);
              }}
            >
              next question
            </button>
          )}
          {questionIndex >= printData.length && (
            <div className="w-[100vw] h-[100vh] flex justify-center items-center gap-4">
              your score is {score} out of {printData.length}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Home;
