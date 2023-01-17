import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { useSignup } from "../hooks/useAuthUser";
import { signupSchema } from "../validations/signupSchema";

function Signup() {
  const { mutate: doSignup, isLoading, isError, error } = useSignup();
  const {
    handleChange,
    handleSubmit,
    values,
    errors: validationErrors,
    touched,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signupSchema,
    onSubmit: async ({ name, email, password }) => {
      doSignup({ name, email, password });
    },
  });

  return (
    <div className="mt-20 w-96 bg-base-200 mx-auto">
      {isLoading && <div>Loading...</div>}
      <p className="p-4 bg-base-300 ">Sign Up</p>
      <form
        onSubmit={handleSubmit}
        className="form-control w-full space-y-4 p-4"
      >
        <div className="_name flex flex-col">
          <label className="label-text pb-2">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="input input-bordered input-primary w-full  max-w-xs"
            onChange={handleChange}
            value={values.name}
          />
          {validationErrors.name && touched.name && (
            <label className="label">
              <span className="label-text-alt text-secondary">
                {validationErrors.name}
              </span>
            </label>
          )}
        </div>
        <div className="_email flex flex-col">
          <label className="label-text pb-2">Email</label>
          <input
            type="text"
            name="email"
            placeholder="Email"
            className="input input-bordered input-primary w-full  max-w-xs"
            onChange={handleChange}
            value={values.email}
          />
          {validationErrors.email && touched.email && (
            <label className="label">
              <span className="label-text-alt text-secondary">
                {validationErrors.email}
              </span>
            </label>
          )}
        </div>
        <div className="_password flex flex-col">
          <label className="label-text pb-2">Password</label>
          <input
            type="text"
            name="password"
            placeholder="Password"
            className="input input-bordered input-primary w-full  max-w-xs"
            onChange={handleChange}
            value={values.password}
          />
          {validationErrors.password && touched.password && (
            <label className="label">
              <span className="label-text-alt text-secondary">
                {validationErrors.password}
              </span>
            </label>
          )}
        </div>
        <div className="_confirmPassword flex flex-col">
          <label className="label-text pb-2">Confirm Password</label>
          <input
            type="text"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="input input-bordered input-primary w-full  max-w-xs"
            onChange={handleChange}
            value={values.confirmPassword}
          />
          {validationErrors.confirmPassword && touched.confirmPassword && (
            <label className="label">
              <span className="label-text-alt text-secondary">
                {validationErrors.confirmPassword}
              </span>
            </label>
          )}
        </div>
        <p className="text-sm">
          Already have an account?
          <span className="text-primary px-2">
            <Link to="/signin">Sign in</Link>
          </span>
        </p>
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          Submit
        </button>

        {isError && (
          <div className="_error text-sm text-red-500">{error.message}</div>
        )}
      </form>
    </div>
  );
}

export default Signup;
