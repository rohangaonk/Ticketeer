import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useEditTicket } from "../hooks/useTickets";
import { ticketSchema } from "../validations/ticketSchema";
import { useGetUsers } from "../hooks/useUsers";

function EditTicket() {
  const { data: userData } = useGetUsers();
  const { state, pathname } = useLocation();
  const navigate = useNavigate();
  const fields = state?.fields;
  const {
    mutate: editTicket,
    isError,
    isLoading,
    error,
  } = useEditTicket(fields.id);

  console.log(error);
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
    onSubmit: ({ title, description, priority, assignee }) => {
      const data = {
        title,
        description,
        priority,
        assigneeId: assignee,
      };
      editTicket(data, {
        onSuccess: () => {
          navigate(`/auth/tickets/${fields.id}`);
        },
      });
    },
  });

  if (isLoading) return <div className="text-sm">Loading...</div>;
  if (isError)
    return <div className="text-sm text-red-500">{error.message}</div>;

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
            {/* check for "string" to make typescript happy */}
            {validationErrors.title === "string" && touched.title && (
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
            {validationErrors.description === "string" &&
              touched.description && (
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
            {validationErrors.priority === "string" && touched.priority && (
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
      </div>
    </div>
  );
}

export default EditTicket;
