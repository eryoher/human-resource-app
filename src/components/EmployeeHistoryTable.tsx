import React from "react";
import { usePagination } from "../hooks/usePagination";
import { IHistory } from "../models/Employee";
import classNames from "classnames";
import { format } from "date-fns";

interface EmployeeHistoryProps {
  history: IHistory[];
}

const EmployeeHistory: React.FC<EmployeeHistoryProps> = ({ history }) => {
  const itemsPerPage = 5;
  const { currentData, next, prev, currentPage, maxPage, goToPage } =
    usePagination(history, itemsPerPage);

  const renderPage = () => {
    const result = [];
    let startPage = Math.max(currentPage - 1, 1);
    let endPage = Math.min(currentPage + 1, maxPage);

    if (currentPage === 1) {
      endPage = 3;
    } else if (currentPage === maxPage) {
      startPage = maxPage - 2;
    }

    startPage = Math.max(startPage, 1);
    endPage = Math.min(endPage, maxPage);

    for (let i = startPage; i <= endPage; i++) {
      result.push(
        <li key={i}>
          <button
            onClick={() => goToPage(i)}
            className={classNames({
              "page-btn-pagination": i !== currentPage,
              "page-select-btn-pagination": i === currentPage,
            })}
          >
            {i}
          </button>
        </li>
      );
    }

    return result;
  };

  const renderRowsTable = () => {
    return currentData().map((item) => {
      const startDate = format(new Date(item.startDate), "dd/MM/yyyy");
      const endDate = item.endDate
        ? format(new Date(item.endDate), "dd/MM/yyyy")
        : "Present";

      return (
        <tr
          key={item.id}
          className="bg-blue-500 border-b border-blue-400 hover:bg-gray-50 dark:hover:bg-gray-500"
        >
          <td className="px-6 py-4">{item.departmentName}</td>
          <td className="px-6 py-4">{startDate}</td>
          <td className="px-6 py-4">{endDate}</td>
        </tr>
      );
    });
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-7">
      <table className="w-full text-sm text-left rtl:text-right text-blue-100 dark:text-blue-100">
        <thead className="text-xs text-gray-600 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-6 py-3 w-1/3" scope="col">
              Department Name
            </th>
            <th className="px-6 py-3 w-1/3" scope="col">
              Start Date
            </th>
            <th className="px-6 py-3 w-1/3" scope="col">
              End Date
            </th>
          </tr>
        </thead>
        <tbody>{renderRowsTable()}</tbody>
      </table>
      <nav
        className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
        aria-label="Table navigation"
      >
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
          Showing
          <span className="font-semibold dark:text-black px-2">{`${currentPage}`}</span>
          of
          <span className="font-semibold  dark:text-black px-3">{maxPage}</span>
        </span>
        <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
          <li>
            <button
              onClick={prev}
              disabled={currentPage === 1}
              className="prev-btn-pagination"
            >
              Previous
            </button>
          </li>
          {renderPage()}
          <li>
            <button
              onClick={next}
              disabled={currentPage === maxPage}
              className="next-btn-pagination"
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default EmployeeHistory;
