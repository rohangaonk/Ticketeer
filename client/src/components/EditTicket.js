import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useTicket } from "../hooks/useTicket";
import useAuthFetch from "../hooks/useAuthFetch";
import { ticketSchema } from "../validations/ticketSchema";

//if fields prop is provided then use same component for editing ticket
function EditTicket() {
  const { state, pathname } = useLocation();
  const navigate = useNavigate();
  const fields = state?.fields;
  const { saveTicket, success, error, isLoading } = useTicket();
  //for fetching data with user in localstorage (auth data)
  const { data: userData } = useAuthFetch("/api/users");
  const {
    handleChange,
    handleSubmit,
    setFieldValue,
    values,
    errors: validationErrors,
    touched,
  } = useFormik({
    initialValues: {
      title: fields?.title,
      description: fields?.description,
      priority: fields?.priority,
      assignee: fields?.assignee,
    },
    validationSchema: ticketSchema,
    onSubmit: async (
      { title, description, priority, assignee },
      { resetForm }
    ) => {
      const url = `/api/tickets/${fields.id}`;
      const body = {
        title,
        description,
        priority,
        assigneeId: assignee,
      };
      await saveTicket(url, body);
      resetForm({ values: "" });
      //after success clear route state
      navigate(`/auth/tickets/${fields.id}`);
    },
  });

  if (isLoading) return <div className="text-sm">Loading...</div>;
  if (error) return <div className="text-sm text-red-500">{error}</div>;
  if (!fields)
    return <div className="text-sm text-red-500">Select ticket to edit</div>;

  return (
    <div className="relative">
      <div className="w-96 bg-base-200 mt-4 mx-auto">
        <p className="p-4 bg-base-300 ">Edit Ticket</p>
        <form
          onSubmit={handleSubmit}
          className="form-control w-full space-y-4 p-4"
        >
          <div className="_title flex flex-col">
            <label className="label-text pb-2">Title</label>
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="input input-bordered input-primary w-full  max-w-xs"
              onChange={handleChange}
              value={values.title}
            />
            {validationErrors.title && touched.title && (
              <label className="label">
                <span className="label-text-alt text-secondary">
                  {validationErrors.title}
                </span>
              </label>
            )}
          </div>
          <div className="_description flex flex-col">
            <label className="label-text pb-2">Description</label>
            <textarea
              type="textarea"
              name="description"
              placeholder="Description"
              onChange={handleChange}
              value={values.description}
              className="textarea textarea-bordered textarea-primary w-full h-24 "
            />
            {validationErrors.description && touched.description && (
              <label className="label">
                <span className="label-text-alt text-secondary">
                  {validationErrors.description}
                </span>
              </label>
            )}
          </div>
          <div className="_priority">
            <label className="label-text">Priority</label>
            <div className="flex justify-between">
              <label className="label cursor-pointer">
                <span className="label-text pr-4">High</span>
                <input
                  type="radio"
                  name="priority"
                  checked={values.priority === "high"}
                  onChange={() => setFieldValue("priority", "high")}
                  className="radio checked:bg-primary"
                  value={values.priority}
                />
              </label>
              <label className="label cursor-pointer">
                <span className="label-text pr-4">Low</span>
                <input
                  type="radio"
                  name="priority"
                  checked={values.priority === "low"}
                  onChange={() => setFieldValue("priority", "low")}
                  className="radio checked:bg-primary"
                  value={values.priority}
                />
              </label>
              <label className="label cursor-pointer">
                <span className="label-text pr-4">Medium</span>
                <input
                  type="radio"
                  name="priority"
                  checked={values.priority === "medium"}
                  onChange={() => setFieldValue("priority", "medium")}
                  className="radio checked:bg-primary"
                  value={values.priority}
                />
              </label>
            </div>
            {validationErrors.priority && touched.priority && (
              <label className="label">
                <span className="label-text-alt text-secondary">
                  {validationErrors.priority}
                </span>
              </label>
            )}
          </div>
          <div className="_assignee flex flex-col">
            <label className="label-text pb-2">Assign To</label>
            <select
              placeholder="Assign To"
              name="assignee"
              className="select select-primary w-full font-normal"
              onChange={handleChange}
              value={values.assignee}
            >
              <option value="">Choose Assignee</option>
              {userData?.users?.map((user) => (
                <option key={user.id} value={user.id}>
                  {`${user.name} (${user.email})`}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        {/* toast */}

        <div
          className={`_toast  ${
            success ? "" : "hidden"
          }    w-40 flex justify-between border-l-4 text-green-700 border-green-500 py-2 px-2 text-sm bg-green-300 fixed top-24 rounded right-0 text-center z-30`}
        >
          <span>Ticket saved </span>
        </div>
      </div>
    </div>
  );
}

export default EditTicket;
