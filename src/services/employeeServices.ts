import axios from "axios";
import { Employee, IEmployeeApiData } from "../models/Employee";
import { transformKeysToCamelCase } from "../utils/transformKeys";

const API_URL = "http://localhost:3001/employees"; // Replace with your API endpoint

export const getEmployees = async (): Promise<Employee[]> => {
  const response = await axios.get<Employee[]>(API_URL);
  return transformKeysToCamelCase(response.data);
};

export const getEmployeeById = async (id: number): Promise<Employee> => {
  const response = await axios.get<Employee>(`${API_URL}/${id}`);
  return transformKeysToCamelCase(response.data);
};

export const updateEmployee = async (
  employeeId: number,
  updatedEmployeeData: IEmployeeApiData
): Promise<{ message: string }> => {
  const response = await axios.put(
    `${API_URL}/${employeeId}`,
    updatedEmployeeData
  );

  return transformKeysToCamelCase(response.data);
};
