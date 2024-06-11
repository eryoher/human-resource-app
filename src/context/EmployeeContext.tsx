import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { Employee, IEmployeeApiData } from "../models/Employee";
import {
  getEmployees,
  getEmployeeById,
  updateEmployee,
  createEmployee,
  deleteEmployee,
} from "../services/employeeServices";

interface EmployeeContextProps {
  employees: Employee[];
  loading: boolean;
  error: string | null;
  fetchEmployeeById: (id: number) => Promise<Employee | undefined>;
  fetchUpdateEmployee: (
    id: number,
    employee: IEmployeeApiData
  ) => Promise<{ message: string }>;
  fetchCreateEmployee: (
    employee: IEmployeeApiData
  ) => Promise<{ message: string }>;
  fetchDeleteEmployee: (employeeId: number) => Promise<{ message: string }>;
}

const EmployeeContext = createContext<EmployeeContextProps | undefined>(
  undefined
);

export const EmployeeProvider = ({ children }: { children: ReactNode }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEmployees = useCallback(async () => {
    try {
      const data = await getEmployees();
      setEmployees(data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch employees");
      setLoading(false);
    }
  }, []);

  const fetchEmployeeById = async (
    id: number
  ): Promise<Employee | undefined> => {
    try {
      const employee = await getEmployeeById(id);
      return employee;
    } catch (err) {
      setError("Failed to fetch employee details");
      return undefined;
    }
  };

  const fetchUpdateEmployee = async (
    id: number,
    employee: IEmployeeApiData
  ) => {
    try {
      fetchEmployees(); // update list of employees
      return await updateEmployee(id, employee);
    } catch (error) {
      setError("Failed to fetch update employee");
      return { message: "Failed to fetch update employee" };
    }
  };

  const fetchCreateEmployee = async (employee: IEmployeeApiData) => {
    try {
      const response = await createEmployee(employee);
      fetchEmployees(); // update list of employees
      return response;
    } catch (error) {
      setError("Failed to fetch create employee");
      return { message: "Failed to fetch create employee" };
    }
  };

  const fetchDeleteEmployee = async (employeeId: number) => {
    try {
      const response = await deleteEmployee(employeeId);
      fetchEmployees(); // update list of employees
      return response;
    } catch (error) {
      setError("Failed to fetch remove employee");
      return { message: "Failed to fetch remove employee" };
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        loading,
        error,
        fetchEmployeeById,
        fetchUpdateEmployee,
        fetchCreateEmployee,
        fetchDeleteEmployee,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployee = () => {
  const context = useContext(EmployeeContext);
  if (context === undefined) {
    throw new Error("useEmployee must be used within an EmployeeProvider");
  }
  return context;
};
