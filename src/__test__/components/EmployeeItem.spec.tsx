import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { EmployeeItem } from "../../components/EmployeeItem";
import { Employee } from "../../models/Employee";
import { APIURL } from "../../constants"; // Adjust import if needed

// Mock data
const mockEmployee: Employee = {
  id: 1,
  firstName: "John",
  lastName: "Doe",
  hireDate: "2020-01-01",
  departmentName: "Engineering",
  avatar: "john_doe.jpg",
  phone: "812828182812",
  address: "Calle 29",
  departmentId: 1,
  active: true,
  history: [],
};

// Mock delete function
const mockOnRemove = jest.fn();
const formattedDate = "December 31, 2019";
const tenure = "4y – 7m – -28d";

const findText = async (text: string) => {
  await waitFor(() => {
    const element = screen.getAllByText(
      (content, element) => element?.textContent?.includes(text) ?? false
    );
    if (!element) {
      throw new Error(`Unable to find element with text: ${text}`);
    }
    return element;
  });
};

describe("EmployeeItem", () => {
  test("renders employee details correctly", async () => {
    render(
      <Router>
        <EmployeeItem employee={mockEmployee} onRemove={mockOnRemove} />
      </Router>
    );
    await findText("John Doe");
    await findText("Department: Engineering");
    await findText("Hire Date");
    await findText(formattedDate);
    await findText(tenure);

    expect(screen.getByAltText(/user avatar/)).toHaveAttribute(
      "src",
      `${APIURL}john_doe.jpg`
    );
  });

  test("renders default image when avatar is not provided", () => {
    const employeeWithoutAvatar: Employee = { ...mockEmployee, avatar: "" };
    render(
      <Router>
        <EmployeeItem
          employee={employeeWithoutAvatar}
          onRemove={mockOnRemove}
        />
      </Router>
    );

    expect(screen.getByAltText(/user avatar/)).toHaveAttribute(
      "src",
      "./not_image.jpg"
    );
  });

  test("displays formatted hire date and tenure", async () => {
    render(
      <Router>
        <EmployeeItem employee={mockEmployee} onRemove={mockOnRemove} />
      </Router>
    );

    await findText(formattedDate);
    await findText(tenure);
  });

  test("calls onRemove when delete button is clicked", async () => {
    render(
      <Router>
        <EmployeeItem employee={mockEmployee} onRemove={mockOnRemove} />
      </Router>
    );

    fireEvent.click(screen.getByText(/Remove/));
    await findText("Confirm Deletion");
    fireEvent.click(screen.getByRole("button", { name: "Confirm" }));
    expect(mockOnRemove).toHaveBeenCalledWith(mockEmployee.id);
  });

  test("navigates to employee details page when view details link is clicked", () => {
    const { container } = render(
      <Router>
        <EmployeeItem employee={mockEmployee} onRemove={mockOnRemove} />
      </Router>
    );

    fireEvent.click(screen.getByText(/View Details/));

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    expect(container.querySelector("a")?.getAttribute("href")).toBe(
      `/employee/${mockEmployee.id}`
    );
  });
});
