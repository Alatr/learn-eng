import React, { Fragment } from "react";
import { useApiService } from "../services";

const Admin = () => {
  const { addSentence, sentences, editSentence, deleteSentence } =
    useApiService();
  return (
    <Fragment>
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

      {sentences.map(({ text, id }) => (
        <form
          onSubmit={(event: React.FormEvent<HTMLFormElement>): void => {
            event.preventDefault();
            const newText = new FormData(event.currentTarget).get("sentence");
            if (!text) {
              const isDelete = prompt("delete?");
              if (isDelete) {
                deleteSentence(id);
                return;
              }
            }
            if (newText !== text) {
              editSentence(text, id);
            }
          }}
        >
          <input type="text" name="sentence" value={text} />
          <button>change</button>
        </form>
      ))}
    </Fragment>
  );
};

export default Admin;
