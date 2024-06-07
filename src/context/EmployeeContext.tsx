import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Employee } from "../models/Employee";
import { getEmployees } from "../services/employeeServices";

interface EmployeeContextProps {
  employees: Employee[];
  loading: boolean;
  error: string | null;
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

  return (
    <EmployeeContext.Provider value={{ employees, loading, error }}>
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
