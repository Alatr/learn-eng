import React, { Fragment } from "react";
import "./App.css";
import MixSentence from "./components/MixSentence";
import { useApiService } from "./services/index.js";
const data = [
  "He quickly reads a book.",
  "Mandy is a pretty girl.",
  "The class is terribly loud today.",
  "Max is a good singer.",
  "You can easily open this tin.",
  'It"s a terrible day today.',
  "She sings the song well.",
  "He is a careful driver.",
  "He drives the car carefully.",
  "The dog barks loudly.",
];

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

function App() {
  const { sentences, addSentence } = useApiService();

  return (
    <Fragment>
      <div className="App">
        {sentences.map(({ text }) => (
          <MixSentence
            sentence={text}
            options={{ shuffleSentence: true, fakeWords: vocabulary }}
          />
        ))}
      </div>
      <form
        onSubmit={(event: React.FormEvent<HTMLFormElement>): void => {
          event.preventDefault();
          const text = new FormData(event.currentTarget).get("text");
          if (!text) {
            return;
          }
          addSentence(text);
        }}
      >
        <input type="text" name="text" placeholder="sentence" />
        <button>add sentence</button>
      </form>
    </Fragment>
  );
}

export default App;
