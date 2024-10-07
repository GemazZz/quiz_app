"use client";
import { useEffect, useState } from "react";
import questionData from "./data/questionData.json";
import { shuffleArray } from "./helpers/helpers";

interface PrintDataProps {
  quetionId: string;
  question: string;
  answers: string[];
}

const Home = () => {
  const [category, setCategory] = useState<string>();
  const [questionIndex, setQuestionIndex] = useState<number>(4);
  const [printData, setPrintData] = useState<PrintDataProps[]>([]);
  const [chosenAnswer, setChosenAnswer] = useState<string>("");
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);

  useEffect(() => {
    if (category) {
      const filteredData = questionData.filter((data) => data.category === category);
      if (filteredData.length === 1) {
        const shuffledQuestions = shuffleArray(filteredData[0].questions);
        setPrintData(shuffledQuestions);
      }
    }
  }, [category]);

  return (
    <>
      {questionIndex === 4 && (
        <div className="w-[100vw] h-[100vh] flex justify-center items-center gap-4">
          <p>choose category</p>
          <button
            onClick={() => {
              setCategory("javascript");
              setQuestionIndex(0);
            }}
          >
            javascript
          </button>
          <button>typescript</button>
          <button>module</button>
          <button>fuckboy</button>
        </div>
      )}
      {questionIndex !== 4 && printData.length > 0 && questionIndex < printData.length && (
        <div className="w-[100vw] h-[100vh] flex justify-center items-center gap-4">
          <div>{printData[questionIndex].question}</div>
          {printData[questionIndex].answers.map((multipleChoice) => {
            return <button onClick={() => setChosenAnswer(multipleChoice)}>{multipleChoice}</button>;
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
                setIsAnswerSubmitted(false);
                setQuestionIndex(questionIndex + 1);
              }}
            >
              next question
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default Home;
