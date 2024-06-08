import React from "react";
import "./App.css";

import AppRoute from "./AppRouter";

const App: React.FC = () => {
  return (
    <div className="App">
      <AppRoute />
    </div>
  );
};

export default App;
