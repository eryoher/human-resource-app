// src/components/EmployeeHistory.tsx
import React from "react";
import { usePagination } from "../hooks/usePagination";
import { IHistory } from "../models/Employee";

interface EmployeeHistoryProps {
  history: IHistory[];
}

const EmployeeHistory: React.FC<EmployeeHistoryProps> = ({ history }) => {
  console.log(history);
  const itemsPerPage = 5;
  const { currentData, next, prev, currentPage, maxPage } = usePagination(
    history,
    itemsPerPage
  );

  return (
    <div className="my-5">
      <table className="table-fixed">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Department Name</th>
            <th className="py-2 px-4 border-b">Start Date</th>
            <th className="py-2 px-4 border-b">End Date</th>
          </tr>
        </thead>
        <tbody>
          {currentData().map((item) => (
            <tr key={item.id}>
              <td className="py-2 px-4 border-b">{item.departmentName}</td>
              <td className="py-2 px-4 border-b">{item.startDate}</td>
              <td className="py-2 px-4 border-b">
                {item.endDate ?? "Present"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={prev}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {maxPage}
        </span>
        <button
          onClick={next}
          disabled={currentPage === maxPage}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EmployeeHistory;
