import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

function Profile() {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  return (
    <div className="dropdown">
      <label tabIndex="0" className="btn btn-ghost">
        <FontAwesomeIcon icon={faUser} size="lg" />
      </label>
      <ul
        tabIndex="0"
        className="absolute dropdown-content menu p-2 shadow bg-base-200 rounded-box text-sm"
      >
        <li>
          <a>{user.username}</a>
        </li>
        <li>
          <a>Profile</a>
        </li>
        <li>
          <a>
            <button onClick={logout}>Logout</button>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Profile;
