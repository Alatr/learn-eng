import React from "react";

import { ApiService } from "./services/index.js";
import App from "./App";

const init = () => {
  return (
    <ApiService>
      <App />
    </ApiService>
  );
};
export default init;
