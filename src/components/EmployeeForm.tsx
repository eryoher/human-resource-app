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
      departmentId: Yup.number()
        .min(1, "Department is required")
        .required("Department is required"),
      avatar: Yup.mixed()
        .required("Avatar is required")
        .test("fileSize", "File size is too large, Max 1MB", (value: any) => {
          return value && value.size <= 1000000; // 1MB
        })
        .test("fileFormat", "Unsupported File Format", (value: any) => {
          return value && SUPPORTED_FORMATS.includes(value.type);
        }),
    }),
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  const { touched, errors, values } = formik;

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="max-w-full w-full lg:max-w-full my-5 border border-gray-300 bg-white rounded-lg shadow-md grid grid-cols-1 lg:grid-cols-1 gap-4 p-4"
    >
      <div className="col-span-1">
        <div className="text-gray-900 font-bold text-2xl mb-4">
          Employee Form
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="text-gray-700 text-base mb-2">
            <label
              htmlFor="firstName"
              aria-labelledby="firstName"
              className="font-semibold"
            >
              First Name:
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={classNames(
                "bg-white border border-gray-300 rounded px-3 py-1 focus:outline-none focus:border-blue-500 w-full",
                {
                  "border-red-500": touched.firstName && errors.firstName,
                }
              )}
            />
            {errors.firstName ? (
              <div className="text-red-500 text-sm">{errors.firstName}</div>
            ) : null}
          </div>
          <div className="text-gray-700 text-base mb-2">
            <label htmlFor="lastName" className="font-semibold">
              Last Name:
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={classNames(
                "bg-white border border-gray-300 rounded px-3 py-1 focus:outline-none focus:border-blue-500 w-full",
                {
                  "border-red-500": touched.lastName && errors.lastName,
                }
              )}
            />
            {errors.lastName ? (
              <div className="text-red-500 text-sm">{errors.lastName}</div>
            ) : null}
          </div>
          <div className="text-gray-700 text-base mb-2">
            <label htmlFor="phone" className="font-semibold">
              Phone:
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={classNames(
                "bg-white border border-gray-300 rounded px-3 py-1 focus:outline-none focus:border-blue-500 w-full",
                {
                  "border-red-500": touched.phone && errors.phone,
                }
              )}
            />
            {errors.phone ? (
              <div className="text-red-500 text-sm">{errors.phone}</div>
            ) : null}
          </div>
          <div className="text-gray-700 text-base mb-2">
            <label htmlFor="address" className="font-semibold">
              Address:
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={classNames(
                "bg-white border border-gray-300 rounded px-3 py-1 focus:outline-none focus:border-blue-500 w-full",
                {
                  "border-red-500": touched.address && errors.address,
                }
              )}
            />
            {errors.address ? (
              <div className="text-red-500 text-sm">{errors.address}</div>
            ) : null}
          </div>
          <div className="text-gray-700 text-base mb-2">
            <label htmlFor="departmentId" className="font-semibold">
              Department:
            </label>
            <select
              id="departmentId"
              name="departmentId"
              value={values.departmentId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={classNames(
                "bg-white border border-gray-300 rounded px-3 py-1 focus:outline-none focus:border-blue-500 w-full",
                {
                  "border-red-500": touched.departmentId && errors.departmentId,
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
            {errors.departmentId ? (
              <div className="text-red-500 text-sm">{errors.departmentId}</div>
            ) : null}
          </div>
          <div className="text-gray-700 text-base mb-2">
            <label className="font-semibold" htmlFor="avatar">
              Avatar:
            </label>
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
              className={classNames(
                "bg-white border border-gray-300 rounded px-3 py-1 focus:outline-none focus:border-blue-500 w-full",
                {
                  "border-red-500": errors.avatar,
                  "text-red-500": errors.avatar,
                }
              )}
            />
            {errors.avatar ? (
              <div className="text-red-500 text-sm">{errors.avatar}</div>
            ) : null}
          </div>
          <div className="text-gray-700 text-base mb-2 grid grid-cols-2 ">
            <div className="flex items-start justify-center mr-5">
              <button
                type="submit"
                className="px-4 py-2 rounded-lg shadow text-white bg-blue-500 w-full"
              >
                Submit
              </button>
            </div>
            <div className="flex items-start justify-center">
              <Link
                to="/"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow text-center w-full"
              >
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EmployeeForm;
