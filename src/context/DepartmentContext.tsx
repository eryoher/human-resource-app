import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { getDepartments } from "../services/departmentService";
import { IDepartment } from "../models/Department";

interface DepartmentContextProps {
  departments: IDepartment[];
  loading: boolean;
  error: string | null;
}

const DepartmentContext = createContext<DepartmentContextProps | undefined>(
  undefined
);

export const DepartmentProvider = ({ children }: { children: ReactNode }) => {
  const [departments, setDepartments] = useState<IDepartment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDepartmentsData = async () => {
      try {
        const departmentsData = await getDepartments();
        setDepartments(departmentsData);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchDepartmentsData();
  }, []);

  return (
    <DepartmentContext.Provider value={{ departments, loading, error }}>
      {children}
    </DepartmentContext.Provider>
  );
};

export const useDepartment = () => {
  const context = useContext(DepartmentContext);
  if (context === undefined) {
    throw new Error("useDepartment must be used within a DepartmentProvider");
  }
  return context;
};
