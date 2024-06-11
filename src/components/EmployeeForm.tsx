import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDepartment } from "../context/DepartmentContext";
import classNames from "classnames";
import { Employee } from "../models/Employee";
import { Link } from "react-router-dom";

type Props = {
  initialValues: Partial<Employee>;
  onSubmit: (values: Partial<Employee>) => void;
};

const EmployeeForm = ({ initialValues, onSubmit }: Props) => {
  const { departments } = useDepartment();
  const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/png",
    "image/gif",
  ];
  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      phone: Yup.string().required("Phone number is required"),
      address: Yup.string().required("Address is required"),
      departmentId: Yup.number().required("Department is required"),
      avatar: Yup.mixed()
        .required("Avatar is required")
        .test("fileSize", "File size is too large", (value: any) => {
          return value && value.size <= 2000000; // 2MB
        })
        .test("fileFormat", "Unsupported File Format", (value: any) => {
          return value && SUPPORTED_FORMATS.includes(value.type);
        }),
    }),
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="max-w-full w-full lg:max-w-full lg:flex my-5 border border-gray-300 bg-white rounded-lg shadow-md"
    >
      <div className="p-4 flex flex-col justify-between leading-normal flex-grow">
        <div className="mb-8">
          <div className="text-gray-900 font-bold text-2xl mb-4">
            Employee Form
          </div>
          <div className="text-gray-700 text-base mb-2">
            <label className="font-semibold">First Name:</label>
            <input
              type="text"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={classNames(
                "bg-white border border-gray-300 rounded px-3 py-1 focus:outline-none focus:border-blue-500",
                {
                  "border-red-500":
                    formik.touched.firstName && formik.errors.firstName,
                }
              )}
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <div className="text-red-500 text-sm">
                {formik.errors.firstName}
              </div>
            ) : null}
          </div>
          <div className="text-gray-700 text-base mb-2">
            <label className="font-semibold">Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={classNames(
                "bg-white border border-gray-300 rounded px-3 py-1 focus:outline-none focus:border-blue-500",
                {
                  "border-red-500":
                    formik.touched.lastName && formik.errors.lastName,
                }
              )}
            />
            {formik.touched.lastName && formik.errors.lastName ? (
              <div className="text-red-500 text-sm">
                {formik.errors.lastName}
              </div>
            ) : null}
          </div>
          <div className="text-gray-700 text-base mb-2">
            <label className="font-semibold">Phone:</label>
            <input
              type="text"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={classNames(
                "bg-white border border-gray-300 rounded px-3 py-1 focus:outline-none focus:border-blue-500",
                {
                  "border-red-500": formik.touched.phone && formik.errors.phone,
                }
              )}
            />
            {formik.touched.phone && formik.errors.phone ? (
              <div className="text-red-500 text-sm">{formik.errors.phone}</div>
            ) : null}
          </div>
          <div className="text-gray-700 text-base mb-2">
            <label className="font-semibold">Address:</label>
            <input
              type="text"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={classNames(
                "bg-white border border-gray-300 rounded px-3 py-1 focus:outline-none focus:border-blue-500",
                {
                  "border-red-500":
                    formik.touched.address && formik.errors.address,
                }
              )}
            />
            {formik.touched.address && formik.errors.address ? (
              <div className="text-red-500 text-sm">
                {formik.errors.address}
              </div>
            ) : null}
          </div>
          <div className="text-gray-700 text-base mb-2">
            <label className="font-semibold">Department:</label>
            <select
              name="departmentId"
              value={formik.values.departmentId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={classNames(
                "bg-white border border-gray-300 rounded px-3 py-1 focus:outline-none focus:border-blue-500",
                {
                  "border-red-500":
                    formik.touched.departmentId && formik.errors.departmentId,
                }
              )}
            >
              <option value="" label="Select department" />
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
            {formik.touched.departmentId && formik.errors.departmentId ? (
              <div className="text-red-500 text-sm">
                {formik.errors.departmentId}
              </div>
            ) : null}
          </div>
          <input
            id="avatar"
            name="avatar"
            type="file"
            onChange={(event) => {
              const file = event.currentTarget.files
                ? event.currentTarget.files[0]
                : null;
              formik.setFieldValue("avatar", file);
            }}
            className="form-input mt-1 block w-full"
          />

          <div className="text-gray-700 text-base mb-2 grid grid-cols-1">
            <button
              type="submit"
              className="px-4 py-2 rounded-lg shadow text-white bg-blue-500 w-1/2 items-center"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <div className="p-4 flex flex-col justify-between leading-normal flex-grow w-1/3">
        <Link
          to="/"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow text-center"
        >
          Back
        </Link>
      </div>
    </form>
  );
};

export default EmployeeForm;
