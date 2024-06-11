import React from "react";
import { Employee } from "../models/Employee";
import { Link } from "react-router-dom";

import { getFormattedDate } from "../utils/date";
import { APIURL } from "../constants";
import DeleteEmployeeButton from "./DeleteEmployeeButton";

type Props = {
  employee: Employee;
  onRemove: (id: number) => void;
};

export const EmployeeItem = ({ employee, onRemove }: Props) => {
  const { formattedDate, tenure } = getFormattedDate(employee.hireDate);
  const urlImage = employee.avatar
    ? `${APIURL}${employee.avatar}`
    : "./not_image.jpg";

  return (
    <div className="max-w-full w-full lg:max-w-full lg:flex my-5 border border-gray-300 bg-white rounded-lg shadow-md">
      <div
        className="flex-shrink-0 flex justify-center items-center p-4"
        title="user avatar"
      >
        <img
          src={urlImage} // Replace with actual employee image URL if available
          alt="user avatar"
          className="object-cover h-48 w-48 rounded-full border-4 border-gray-300 shadow-lg"
        />
      </div>
      <div className="p-4 flex flex-col justify-between leading-normal flex-grow">
        <div className="mb-8">
          <div className="text-gray-900 font-bold text-2xl mb-4">
            {employee.firstName} {employee.lastName}
          </div>
          <div className="text-gray-700 text-base mb-4">
            <span className="font-semibold">Department: </span>
            {employee.departmentName}
          </div>
          <div className="text-gray-700 text-base">
            <span className="font-semibold">Hire Date: </span>
            {formattedDate} ({tenure})
          </div>
        </div>
        <div className="flex justify-end space-x-4">
          <Link
            to={`/employee/${employee.id}`}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow"
          >
            View Details
          </Link>

          <DeleteEmployeeButton onDelete={() => onRemove(employee.id)} />
        </div>
      </div>
    </div>
  );
};
