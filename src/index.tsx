import { render } from "react-dom";
import init from "./init";

// TODO add translate
// TODO add trim /s
// add ui validation
// add reload after action
// search error api middleware
// add validator

const run = async () => {
  const vdom = init();
  render(vdom, document.getElementById("root"));
};

run();
