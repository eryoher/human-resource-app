import React, { Fragment, useState } from "react";
import { Employee } from "../models/Employee";
import { getFormattedDate } from "../utils/date";
import { useDepartment } from "../context/DepartmentContext";
import classNames from "classnames";
import EmployeeHistory from "./EmployeeHistoryTable";
import { transformKeysToCamelCase } from "../utils/transformKeys";
import { Link } from "react-router-dom";
import { APIURL } from "../constants";

type Props = {
  employee: Employee;
  handleUpdateEmployee: (departmentId: number, state: boolean) => void;
};

const EmployeeDetailData = ({ employee, handleUpdateEmployee }: Props) => {
  const {
    firstName,
    lastName,
    phone,
    address,
    departmentName,
    departmentId,
    hireDate,
    active,
    id,
    avatar,
  } = employee;

  const urlImage = avatar ? `${APIURL}${avatar}` : "../not_image.jpg";

  const [selectedDepartment, setSelectedDepartment] =
    useState<number>(departmentId);

  const [employeeStatus, setEmployeeStatus] = useState<boolean>(active);

  const { formattedDate, tenure } = getFormattedDate(hireDate);
  const { departments } = useDepartment();

  const onChangeDepartment = (departmentId: number) => {
    setSelectedDepartment(departmentId);
  };

  const handleUpdate = () => {
    handleUpdateEmployee(selectedDepartment, active ? true : false);
  };

  const onChangeStatus = () => {
    handleUpdateEmployee(departmentId, !employeeStatus);
    setEmployeeStatus(!employeeStatus);
  };

  return (
    <Fragment>
      <div className="max-w-full w-full lg:max-w-full lg:flex my-5 border border-gray-300 bg-white rounded-lg shadow-md relative ">
        {/* Avatar */}
        <div
          className="flex-none w-1/3 flex justify-center items-center p-4 relative"
          title="user avatar"
        >
          <img
            src={urlImage} // Replace with actual employee image URL if available
            alt="user avatar"
            className="object-cover h-48 w-48 rounded-full border-4 border-gray-300 shadow-lg"
          />
          {!active && (
            <div className="w-full absolute bottom-0 left-0 text-center mb-14 ">
              <h2 className="text-4xl font-bold text-gray-500 text-center">
                Inactive
              </h2>
            </div>
          )}
        </div>
        <div className="p-4 flex flex-col justify-between leading-normal flex-grow w-1/3">
          <div className="mb-8">
            <div className="text-gray-900 font-bold text-2xl mb-4">
              {firstName} {lastName}
            </div>
            <div className="text-gray-700 text-base mb-2">
              <span className="font-semibold">Employee Id: </span>
              {id}
            </div>
            <div className="text-gray-700 text-base mb-2">
              <span className="font-semibold">Department: </span>
              {departmentName}
            </div>
            <div className="text-gray-700 text-base mb-2">
              <span className="font-semibold">Telephone: </span>
              {phone}
            </div>

            <div className="text-gray-700 text-base mb-2">
              <span className="font-semibold">Address: </span>
              {address}
            </div>
            <div className="text-gray-700 text-base mb-2">
              <span className="font-semibold">Department: </span>
              <select
                value={selectedDepartment}
                disabled={!active}
                onChange={(e) => onChangeDepartment(parseInt(e.target.value))}
                className="bg-white border border-gray-300 rounded px-3 py-1 focus:outline-none focus:border-blue-500"
              >
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="text-gray-700 text-base mb-2 grid grid-cols-1 ">
              <button
                onClick={handleUpdate}
                disabled={departmentId === selectedDepartment}
                className={classNames(
                  "px-4 py-2 rounded-lg shadow text-white w-1/2 items-center",
                  {
                    "bg-blue-500": departmentId !== selectedDepartment,
                    "bg-gray-500": departmentId === selectedDepartment,
                  }
                )}
              >
                Update
              </button>
            </div>
          </div>
        </div>
        <div className="p-4 flex flex-col justify-between leading-normal flex-grow w-1/3">
          <div className="mb-8">
            <div className="text-gray-700 text-base">
              <span className="font-semibold">Hire Date: </span>
            </div>
            <div className="text-gray-700 text-base">{formattedDate}</div>
            <div className="text-gray-700 text-base">{tenure}</div>
            <div className="text-gray-700 text-base mb-2 pt-3 grid grid-cols-2 ">
              <button
                onClick={onChangeStatus}
                className={classNames(
                  "px-4 py-2 rounded-lg shadow text-white mr-5",
                  { "bg-red-500": active, "bg-green-500": !active }
                )}
              >
                {active ? "Deactivate" : "Activate"}
              </button>
              <Link
                to={`/`}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow text-center"
              >
                Back
              </Link>
            </div>
          </div>
        </div>
      </div>
      <EmployeeHistory history={transformKeysToCamelCase(employee.history)} />
    </Fragment>
  );
};

export default EmployeeDetailData;
