import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Employee, IEmployeeApiData } from "../models/Employee";
import {
  getEmployees,
  getEmployeeById,
  updateEmployee,
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
}

const EmployeeContext = createContext<EmployeeContextProps | undefined>(
  undefined
);

export const EmployeeProvider = ({ children }: { children: ReactNode }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getEmployees();
        setEmployees(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch employees");
        setLoading(false);
      }
    };

    fetchEmployees();
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
      return await updateEmployee(id, employee);
    } catch (error) {
      setError("Failed to fetch update employee");
      return { message: "Failed to fetch update employee" };
    }
  };

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        loading,
        error,
        fetchEmployeeById,
        fetchUpdateEmployee,
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
