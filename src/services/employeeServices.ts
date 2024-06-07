import axios from "axios";
import { Employee } from "../models/Employee";
import { transformKeysToCamelCase } from "../utils/transformKeys";

const API_URL = "http://localhost:3001/employees"; // Replace with your API endpoint

export const getEmployees = async (): Promise<Employee[]> => {
  const response = await axios.get<Employee[]>(API_URL);
  return transformKeysToCamelCase(response.data);
};
