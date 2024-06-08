export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  departmentName: string;
  departmentId: number;
  hireDate: string;
  history: IHistory[];
}

export interface IHistory {
  id: number;
  name: string;
  employeeId: null | number;
  departmentId: null | number;
  startDate: null | string;
  endDate: null | string;
}

export interface IEmployeeApiData {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  departmentId: number;
}
