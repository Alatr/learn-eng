import React, { Fragment } from "react";
import { useApiService } from "../services";

const Admin = () => {
  const { addSentence, sentences, editSentence, deleteSentence } =
    useApiService();
  return (
    <Fragment>
      {sentences.map(({ text, id }) => (
        <form
          key={id}
          onSubmit={(event: React.FormEvent<HTMLFormElement>): void => {
            event.preventDefault();
            const newText = new FormData(event.currentTarget).get("sentence");
            if (newText === "") {
              const isDelete = window.confirm("delete?");
              if (isDelete) {
                deleteSentence(id);
                return;
              }
            }
            if (newText && newText !== text) {
              editSentence(newText, id);
            }
          }}
        >
          <input type="text" name="sentence" defaultValue={text} />
          <button>change</button>
        </form>
      ))}
      <hr />
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
};

export default Admin;
