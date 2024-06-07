import React from "react";
import { useEmployee } from "../context/EmployeeContext";
import { EmployeeItem } from "./EmployeeItem";

const EmployeeList: React.FC = () => {
  const { employees, loading, error } = useEmployee();

  const handleRemoveEmployee = (id: number) => {
    console.log(id);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto mt-8 rounded  ">
      <h1 className="text-2xl font-bold mb-4">Employee List</h1>

      {employees.map((employee) => (
        <EmployeeItem
          key={employee.id}
          employee={employee}
          onRemove={handleRemoveEmployee}
        />
      ))}
    </div>
  );
};

export default EmployeeList;
