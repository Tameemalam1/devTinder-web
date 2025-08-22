import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      return navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  // Hide nav extras on login page
  const isLoginPage = location.pathname === "/login";

  return (
    <div className="navbar bg-base-300 shadow-sm text-white">
  <div className="flex-1">
    <Link to="/feed" className="btn btn-ghost text-xl text-red-500">🧑‍💻DevTinder</Link>
  </div>
  {user && (
    <div className="flex gap-4 items-center">
      <div className="font-medium text-red-500">Welcome, {user.firstName}</div>
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full ring ring-red-500 ring-offset-base-100 ring-offset-2">
            <img alt="User Photo" src={user.photoUrl} />
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-200 text-white rounded-box z-1 mt-3 w-52 p-2 shadow"
        >
          <li>
            <Link to="/profile" className="justify-between text-red-500 hover:text-white">
              Profile
              <span className="badge badge-error text-white">New</span>
            </Link>
          </li>
          <li><Link to="/connections" className="text-red-500 hover:text-white">Connections</Link></li>
          <li><Link to="/requests" className="text-red-500 hover:text-white">Requests Received</Link></li>
          <li><a onClick={handleLogout} className="text-red-500 hover:text-white">Logout</a></li>
        </ul>
      </div>
    </div>
  )}
</div>
  );
};

export default NavBar;
