import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { useSignin } from "../hooks/useSignin";
import { signinSchema } from "../validations/signinSchema";

function Signin() {
  const [message, setMessage] = useState("");
  const { signin, isLoading, error } = useSignin({
    successRedirect: "/auth/tickets",
  });
  const {
    handleSubmit,
    handleChange,
    values,
    errors: validationErrors,
    touched,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signinSchema,
    onSubmit: async ({ email, password }) => {
      await signin(email, password);
    },
  });

  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    setMessage(location.state?.message);
    navigate(location.pathname, { replace: true }); //clear message (otherwise it persisits on reload);
  }, []);

  return (
    <div className="mt-20 w-96 bg-base-200 mx-auto">
      {message && <div className="p-2 text-sm text-green-500">{message}</div>}
      {isLoading && <div className="text-sm">Loading...</div>}
      <p className="p-4 bg-base-300 ">Sign In</p>
      <form
        onSubmit={handleSubmit}
        className="form-control w-full space-y-4 p-4"
      >
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
                email is invalid
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
                password not strong
              </span>
            </label>
          )}
        </div>
        <p className="text-sm">
          Don't have an account?
          <span className="text-primary px-2">
            <Link to="/signup">Create one</Link>
          </span>
        </p>
        <button className="btn btn-primary" disabled={isLoading}>
          Submit
        </button>
        {error && <div className="text-sm text-red-500">{error}</div>}
      </form>
    </div>
  );
}

export default Signin;
