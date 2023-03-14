import React, { useState } from "react";
import { useFormik } from "formik";
import { useCreateTicket } from "../hooks/useTickets";
import { ticketSchema } from "../validations/ticketSchema";
import { useGetUsers } from "../hooks/useUsers";

function CreateTicket() {
  const [successToast, setSuccessToast] = useState(false);
  const {
    mutate: createNewTicket,
    isError,
    isLoading,
    error,
  } = useCreateTicket();
  const { data: userData } = useGetUsers();
  const {
    handleChange,
    handleSubmit,
    setFieldValue,
    values,
    errors: validationErrors,
    touched,
  } = useFormik({
    initialValues: {
      title: "",
      description: "",
      priority: "",
      assignee: "",
    },
    validationSchema: ticketSchema,
    onSubmit: ({ title, description, priority, assignee }, { resetForm }) => {
      const data = {
        title,
        description,
        priority,
        assigneeId: assignee,
      };
      createNewTicket(data, {
        onSuccess: () => {
          resetForm();
          setSuccessToast(true);
          setTimeout(() => {
            setSuccessToast(false);
          }, 2000);
        },
      });
    },
  });

  return (
    <div className="relative">
      {isLoading && <div className="text-sm">Loading...</div>}
      <div className="w-96 bg-base-200 mt-4 mx-auto">
        <p className="p-4 bg-base-300 ">Create Ticket</p>
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
          {isError && (
            <div className="text-sm text-red-500">{error.message}</div>
          )}
        </form>
        {/* toast */}

        <div
          className={`_toast  ${
            successToast ? "" : "hidden"
          }    w-40 flex justify-between border-l-4 text-green-700 border-green-500 py-2 px-2 text-sm bg-green-300 fixed top-24 rounded right-0 text-center z-30`}
        >
          <span>Ticket saved </span>
        </div>
      </div>
    </div>
  );
}

export default CreateTicket;
