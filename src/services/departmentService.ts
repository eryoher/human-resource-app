import axios from "axios";
import { IDepartment } from "../models/Department";

const API_URL = "http://localhost:3001/departments"; // Replace with your API endpoint

export const getDepartments = async (): Promise<IDepartment[]> => {
  const response = await axios.get<IDepartment[]>(API_URL);
  return response.data;
};
