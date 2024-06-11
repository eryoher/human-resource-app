import React, { Suspense } from "react";
import { useEmployee } from "../context/EmployeeContext";
import { EmployeeItem } from "./EmployeeItem";
import { useNavigate } from "react-router";

const EmployeeList: React.FC = () => {
  const { employees, error, fetchDeleteEmployee } = useEmployee();
  const navigate = useNavigate();

  const handleRemoveEmployee = async (id: number) => {
    try {
      const response = await fetchDeleteEmployee(id);
      console.log("DELETE:::", response);
    } catch (error) {
      console.error("Failed to remove employee", error);
    }
  };

  const ComponentLoading = () => <p>Loading...</p>;

  if (error) return <p>{error}</p>;

  const handleRedirectPage = () => {
    navigate("/createEmployee");
  };

  return (
    <div className="container mx-auto mt-8 rounded  ">
      <div className="grid grid-cols-2">
        <div>
          <h1 className="text-2xl font-bold mb-4">Employee List</h1>
        </div>
        <div className="text-right">
          <button
            onClick={handleRedirectPage}
            className={
              "px-4 py-2 rounded-lg shadow text-white w-1/3 items-center bg-blue-500"
            }
          >
            New Employee
          </button>
        </div>
      </div>
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
