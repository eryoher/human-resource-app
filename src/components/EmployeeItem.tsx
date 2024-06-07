import React from "react";
import { Employee } from "../models/Employee";
import { Link } from "react-router-dom";
import {
  format,
  differenceInYears,
  differenceInMonths,
  differenceInDays,
} from "date-fns";

type Props = {
  employee: Employee;
  onRemove: (id: number) => void;
};

export const EmployeeItem = ({ employee, onRemove }: Props) => {
  const hireDate = new Date(`${employee.hireDate}T00:00`);
  const today = new Date();

  const years = differenceInYears(today, hireDate);
  const months = differenceInMonths(today, hireDate) % 12;
  // const days = differenceInDays(today, hireDate) % 30;
  const days = parseInt(format(today, "d")) - parseInt(format(hireDate, "d"));

  const formattedHireDate = format(hireDate, "MMMM d, yyyy");
  const tenure = `${years}y – ${months}m – ${days}d`;

  return (
    <div className="max-w-full w-full lg:max-w-full lg:flex my-5 border border-gray-300 bg-white rounded-lg shadow-md">
      <div
        className="flex-shrink-0 flex justify-center items-center p-4"
        title="user avatar"
      >
        <img
          src="./not_image.jpg" // Replace with actual employee image URL if available
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
            {formattedHireDate} ({tenure})
          </div>
        </div>
        <div className="flex justify-end space-x-4">
          <Link
            to={`/employee/${employee.id}`}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow"
          >
            View Details
          </Link>
          <button
            onClick={() => onRemove(employee.id)}
            className="bg-red-500 text-white px-4 py-2 rounded-lg shadow"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};
