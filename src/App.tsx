import React from "react";
import "./App.css";
import { EmployeeProvider } from "./context/EmployeeContext";
import EmployeePage from "./pages/EmployeePage";
import { BrowserRouter } from "react-router-dom";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <EmployeeProvider>
        <EmployeePage />
      </EmployeeProvider>
    </BrowserRouter>
  );
};

export default App;
