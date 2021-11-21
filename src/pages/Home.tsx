import React from "react";
import { useApiService } from "../services";
import MixSentence from "../components/MixSentence";

const vocabulary = ["advantage", "usually", "opportunities", "impact"];
// "appropriate",
// "invoke",
// "favour",
// "verbose",
// "obvious",
// "explicitly",
// "consistency",
// "purpose",
// "effort",
// "essential",
// "either",
// "significantly",

// const data = [
//     "He quickly reads a book.",
//     "Mandy is a pretty girl.",
//     "The class is terribly loud today.",
//     "Max is a good singer.",
//     "You can easily open this tin.",
//     'It"s a terrible day today.',
//     "She sings the song well.",
//     "He is a careful driver.",
//     "He drives the car carefully.",
//     "The dog barks loudly.",
// ];

const Home = () => {
  const { sentences } = useApiService();

  return (
    <div>
      {sentences.map(({ text }) => (
        <MixSentence
          sentence={text}
          options={{ shuffleSentence: true, fakeWords: vocabulary }}
        />
      ))}
    </div>
  );
};

export default Home;
