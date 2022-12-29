import React from "react";

function Ticket({ item }) {
  return (
    <tr className="hover">
      <td>
        <span>{item.id}</span>
      </td>
      <td>{item.date}</td>
      <td>
        <p className="font-medium w-40 truncate">{item.title}</p>
      </td>
      <td>
        <div className="flex space-x-2 items-center">
          <div className="h-8 w-8 bg-primary flex justify-center items-center rounded-full text-primary-content uppercase">
            <span>{item.assignee[0]}</span>
          </div>
          <div>
            <p className="text-sm">{item.assignee}</p>
          </div>
        </div>
      </td>
      <td>
        <div className="flex space-x-2 items-center">
          <div className="h-8 w-8 bg-secondary flex justify-center items-center rounded-full text-primary-content uppercase">
            <span>{item.assignor[0]}</span>
          </div>
          <div>
            <p className="text-sm">{item.assignor}</p>
          </div>
        </div>
      </td>
      <td>
        <div
          className={`w-16 text-xs badge ${
            item.priority === "high"
              ? "badge-error"
              : item.priority === "medium"
              ? "badge-warning"
              : "badge-info"
          }`}
        >
          {item.priority}
        </div>
      </td>
      <td>
        <div
          className={`w-16 text-xs badge ${
            item.status === "pending" ? "badge-warning" : "badge-success"
          }`}
        >
          {item.status}
        </div>
      </td>
    </tr>

    // <div className="flex bg-base-200 rounded-md shadow-md p-2 relative">
    //   <div className="mid w-9/12 items-center ml-4">
    //     <div className="flex items-baseline space-x-2">
    //       <span className="text-xs font-medium">13-12-2022</span>
    //       <p className="text-indigo-700 dark:text-indigo-500 font-medium">
    //         Login functionality not working
    //       </p>
    //     </div>
    //     <div className="flex mt-4 space-x-8">

    //       <div className="flex  space-x-2">
    //         <div className="h-8 w-8 bg-secondary flex justify-center items-center rounded-full text-secondary-content">
    //           <span>V</span>
    //         </div>
    //         <div>
    //           <p className="text-sm">Vihan Naik</p>
    //           <p className="text-xs">Created By</p>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="_right w-2/12 flex flex-col justify-between">
    //     <div className="badge badge-warning  ">pending</div>
    //     <div className="badge badge-error ">high</div>
    //   </div>
    // </div>
  );
}

export default Ticket;
