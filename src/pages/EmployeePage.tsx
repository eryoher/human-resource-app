import React from "react";
import EmployeeList from "../components/EmployeeList";

const EmployeePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <EmployeeList />
    </div>
  );
};

export default EmployeePage;
