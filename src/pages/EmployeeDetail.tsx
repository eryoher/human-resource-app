import React, { Suspense, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useEmployee } from "../context/EmployeeContext";
import { Employee, IEmployeeApiData } from "../models/Employee";
import _ from "lodash";
import EmployeeDetailData from "../components/EmployeeDetailData";

const EmployeeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { fetchEmployeeById, fetchUpdateEmployee } = useEmployee();
  const [error, setError] = useState<string | null>(null);
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchEmployee = useCallback(async () => {
    if (!_.isUndefined(id)) {
      const employeeId = parseInt(id, 10);
      try {
        const data = await fetchEmployeeById(employeeId);
        if (data) {
          setEmployee(data);
        } else {
          setError("Employee not found");
        }
      } catch (err) {
        setError("Failed to fetch employee details");
      } finally {
        setLoading(false);
      }
    }
  }, [id, fetchEmployeeById]);

  useEffect(() => {
    fetchEmployee();
  }, [fetchEmployee]);

  const ComponentLoading = () => {
    return <div>Loading...</div>;
  };

  if (error) {
    return <div>{error}</div>;
  }

  const handleUpdateEmployee = async (departmentId: number) => {
    if (employee) {
      const { id } = employee;
      const params: IEmployeeApiData = {
        firstName: employee?.firstName,
        lastName: employee?.lastName,
        address: employee?.address,
        phone: employee?.phone,
        departmentId,
      };

      const response = await fetchUpdateEmployee(id, params);
      if (!_.isEmpty(response) && response?.message === "Employee updated") {
        fetchEmployee();
      }
      return response;
    }
  };

  return (
    <Suspense fallback={<ComponentLoading />}>
      {employee && (
        <EmployeeDetailData
          employee={employee}
          handleUpdateEmployee={handleUpdateEmployee}
        />
      )}
    </Suspense>
  );
};

export default EmployeeDetail;
