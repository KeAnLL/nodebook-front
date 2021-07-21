import React, { useState, FC } from "react";
import Homepage from "./components/Homepage";

import "../static/styles/App.scss";

const App:FC = () => {
  return (
    <div className="container">
      <Homepage />
    </div>
  );
};

export default App;
