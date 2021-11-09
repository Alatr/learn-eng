import { render } from "react-dom";
import init from "./init";

// TODO add heroky
// TODO add api methods change, del
// TODO add translate
// TODO dev mode aka admin panel pages

const run = async () => {
  const vdom = init();
  render(vdom, document.getElementById("root"));
};

run();
