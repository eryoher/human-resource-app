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
  return await axios.put(`${API_URL}/${employeeId}`, updatedEmployeeData);
};

export const createEmployee = async (
  employeeData: IEmployeeApiData
): Promise<{ message: string }> => {
  const { avatar, active, address, departmentId, firstName, lastName, phone } =
    employeeData;

  const formData = new FormData();
  formData.append("avatar", avatar as Blob);
  formData.append("firstName", firstName);
  formData.append("lastName", lastName);
  formData.append("address", address);
  formData.append("phone", phone);
  formData.append("departmentId", `${departmentId}`);
  formData.append("active", `${active}`);

  return await axios.post(`${API_URL}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteEmployee = async (
  employeeId: number
): Promise<{ message: string }> => {
  return await axios.delete(`${API_URL}/${employeeId}`);
};
