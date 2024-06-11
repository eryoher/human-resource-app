import React from "react";
import { useNavigate } from "react-router-dom";
import { Employee } from "../models/Employee";
import { useEmployee } from "../context/EmployeeContext";
import EmployeeForm from "../components/EmployeeForm";
import { transformToApiData } from "../utils/transformEmployeeData";

const EmployeeFormPage = () => {
  const navigate = useNavigate();
  const { fetchCreateEmployee, fetchUpdateEmployee } = useEmployee();

  const initialValues: Partial<Employee> = {
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    departmentId: 0,
    active: true,
  };

  const handleSubmit = async (values: Partial<Employee>) => {
    try {
      const params = transformToApiData(values);
      if (values.id) {
        await fetchUpdateEmployee(values.id, params);
      } else {
        await fetchCreateEmployee(params);
      }
      navigate("/");
    } catch (error) {
      console.error("Failed to submit employee form", error);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <EmployeeForm initialValues={initialValues} onSubmit={handleSubmit} />
    </div>
  );
};

export default EmployeeFormPage;
