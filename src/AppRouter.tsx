import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import EmployeePage from "./pages/EmployeePage";
import { EmployeeProvider } from "./context/EmployeeContext";
import EmployeeDetail from "./pages/EmployeeDetail";
import { DepartmentProvider } from "./context/DepartmentContext";
import EmployeeFormPage from "./pages/EmployeeFormPage";

const AppRoute: React.FC = () => {
  return (
    <Router>
      <EmployeeProvider>
        <DepartmentProvider>
          <Routes>
            <Route path="/" element={<EmployeePage />} />
            <Route path="/employee/:id" element={<EmployeeDetail />} />
            <Route path="/createEmployee" element={<EmployeeFormPage />} />
          </Routes>
        </DepartmentProvider>
      </EmployeeProvider>
    </Router>
  );
};

export default AppRoute;
