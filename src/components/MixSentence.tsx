// @ts-ignore
import React, { FC, useCallback, useEffect, useState } from "react";
import { uniqueId, shuffle } from "lodash";
import "./MixSentence.css";

function checkResult(answers: number[]) {
  if (answers.length === 0) return false;

  for (let i = 0; i < answers.length; i++) {
    if (answers[i] !== i) return false;
  }
  return true;
}
interface prepareSentenceOptions {
  shuffleSentence: boolean;
  fakeWords: string[];
}
interface preparedWord {
  word: string;
  order: number;
  handleClick: React.Dispatch<React.SetStateAction<number[]>>;
}

function usePrepareSentence(sentence: string, options: prepareSentenceOptions) {
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<boolean | null>(null);
  const [preparedSentence, setPreparedSentence] = useState<preparedWord[] | []>(
    []
  );

  useEffect(() => {
    const result = [...sentence.split(" "), ...options.fakeWords].map(
      (word, order) => ({
        word,
        order,
        handleClick: setAnswers,
      })
    );

    if (options.shuffleSentence) {
      return setPreparedSentence(shuffle(result));
    }
    return setPreparedSentence(result);
  }, [options.fakeWords, options.shuffleSentence, sentence]);

  const checkExercise = useCallback((): boolean | void => {
    if (sentence.length === 0) return;

    setResult(checkResult(answers));
  }, [answers, sentence]);
  function resetExercise(): void {
    setAnswers([]);
    setResult(null);
  }

  return { preparedSentence, result, answers, resetExercise, checkExercise };
}

interface MixSentenceProps {
  sentence: string;
  options: prepareSentenceOptions;
}

const MixSentence: FC<MixSentenceProps> = ({ sentence, options }) => {
  const { preparedSentence, result, answers, resetExercise, checkExercise } =
    usePrepareSentence(sentence, options);

  let backgroundColor: undefined | string;
  switch (true) {
    case result !== null && result === false:
      backgroundColor = "#d96b6b";
      break;
    case result !== null && result === true:
      backgroundColor = "#81a135";
      break;
  }

  return (
    <div className="mb10">
      {preparedSentence.map(({ word, order, handleClick }) => (
        <button
          style={{ backgroundColor }}
          className="word--margin"
          type="button"
          disabled={answers.includes(order)}
          onClick={() => handleClick([...answers, order])}
          key={uniqueId()}
        >
          {word}
        </button>
      ))}
      <span>{"-->"}</span>
      <button type="button" onClick={checkExercise}>
        check
      </button>
      {result === false && (
        <button type="button" onClick={resetExercise}>
          restart
        </button>
      )}
      {result === true && <span>done!</span>}
    </div>
  );
};

export default MixSentence;
