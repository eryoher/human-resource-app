import React, { act } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import EmployeeForm from "../../components/EmployeeForm";
import { useDepartment } from "../../context/DepartmentContext";

jest.mock("../../context/DepartmentContext", () => ({
  useDepartment: jest.fn(),
}));

const mockDepartments = [
  { id: 1, name: "HR" },
  { id: 2, name: "Engineering" },
];

const setup = (initialValues = {}) => {
  const onSubmit = jest.fn();
  (useDepartment as jest.Mock).mockReturnValue({
    departments: mockDepartments,
    loading: false,
    error: null,
  });

  render(
    <Router>
      <EmployeeForm initialValues={initialValues} onSubmit={onSubmit} />
    </Router>
  );

  return {
    onSubmit,
    initialValues,
  };
};

// Custom function to find text in the document
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

describe("EmployeeForm", () => {
  it("should render the form with initial values", () => {
    setup({
      firstName: "John",
      lastName: "Doe",
      phone: "1234567890",
      address: "123 Main St",
      departmentId: 1,
    });
    expect(screen.getByLabelText(/First Name:/)).toHaveValue("John");
    expect(screen.getByLabelText(/Last Name:/)).toHaveValue("Doe");
    expect(screen.getByLabelText(/Phone:/)).toHaveValue("1234567890");
    expect(screen.getByLabelText(/Address:/)).toHaveValue("123 Main St");
    expect(screen.getByLabelText(/Department:/)).toHaveValue("1");
  });

  it("should show validation errors when fields are left empty and submitted", async () => {
    setup();

    fireEvent.click(screen.getByText(/Submit/));
    await findText("First name is required");
    await findText("Last name is required");
    await findText("Phone number is required");
    await findText("Address is required");
    await findText("Department is required");
    await findText("Avatar is required");
  });

  it("should call onSubmit with form values when form is submitted", async () => {
    const { onSubmit } = setup({
      firstName: "John",
      lastName: "Doe",
      phone: "1234567890",
      address: "123 Main St",
      departmentId: 1,
    });

    // Fill out the form fields
    fireEvent.change(screen.getByLabelText(/First Name:/), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText(/Last Name:/), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByLabelText(/Phone:/), {
      target: { value: "1234567890" },
    });
    fireEvent.change(screen.getByLabelText(/Address:/), {
      target: { value: "123 Main St" },
    });
    fireEvent.change(screen.getByLabelText(/Department:/), {
      target: { value: "1" },
    });

    const file = new File(["(⌐□_□)"], "avatar.png", { type: "image/png" });
    const input = screen.getByLabelText(/Avatar:/) as HTMLInputElement;

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.change(input, { target: { files: [file] } });
    });

    fireEvent.click(screen.getByText(/Submit/));
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        firstName: "John",
        lastName: "Doe",
        phone: "1234567890",
        address: "123 Main St",
        departmentId: "1",
        avatar: file,
      });
    });
  });

  it("should handle file input change", async () => {
    setup();
    const file = new File(["(⌐□_□)"], "avatar.png", { type: "image/png" });
    const input = screen.getByLabelText(/Avatar:/) as HTMLInputElement;

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.change(input, { target: { files: [file] } });
    });

    expect(input.files?.[0]).toBe(file);
  });
});
