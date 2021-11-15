import React from "react";
import "./App.css";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import routes from './routes-config.js';


function App() {
  return (
    <Router>
      <Routes>
        <Route
          path={routes.admin.path}
          element={routes.admin.component}
        />
        <Route
          path={routes.homePage.path}
          element={routes.homePage.component}
        />
        <Route
          path={routes.notMatchPage.path}
          element={routes.notMatchPage.component}
        />
      </Routes>
    </Router>
  );
}

export default App;
