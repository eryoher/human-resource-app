import { Employee, IEmployeeApiData } from "../models/Employee";

export const transformToApiData = (
  employee: Partial<Employee>
): IEmployeeApiData => {
  return {
    firstName: employee.firstName ?? "",
    lastName: employee.lastName ?? "",
    phone: employee.phone ?? "",
    address: employee.address ?? "",
    departmentId: employee.departmentId ?? 0,
    active: employee.active ?? true,
    avatar: employee.avatar,
  };
};
