import React, { Suspense } from "react";
import { useEmployee } from "../context/EmployeeContext";
import { EmployeeItem } from "./EmployeeItem";

const EmployeeList: React.FC = () => {
  const { employees, error } = useEmployee();

  const handleRemoveEmployee = (id: number) => {
    console.log(id);
  };

  const ComponentLoading = () => <p>Loading...</p>;

  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto mt-8 rounded  ">
      <h1 className="text-2xl font-bold mb-4">Employee List</h1>
      <Suspense fallback={<ComponentLoading />}>
        {employees.map((employee) => (
          <EmployeeItem
            key={employee.id}
            employee={employee}
            onRemove={handleRemoveEmployee}
          />
        ))}
      </Suspense>
    </div>
  );
};

export default EmployeeList;
