import { useEffect, useState } from "react";
import { FaCheck, FaUserCircle } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { useParams, useNavigate } from "react-router";
import * as client from "../../Account/client";
import { FaPencil } from "react-icons/fa6";

export default function PeopleDetails() {
  const { uid } = useParams();
  const [user, setUser] = useState<any>({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [editingName, setEditingName] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  const [editingRole, setEditingRole] = useState(false);
  const roleOptions = ["STUDENT", "FACULTY", "ADMIN", "TA"];
  const navigate = useNavigate();
  const saveUser = async () => {
    const [firstName, lastName] = name.split(" ");
    const updatedUser = { ...user, firstName, lastName, email, role };
    await client.updateUser(updatedUser);
    setUser(updatedUser);
    setEditingName(false);
    setEditingEmail(false);
    setEditingRole(false);
  };
  const deleteUser = async (uid: string) => {
    await client.deleteUser(uid);
    navigate(-1);
  };
  const fetchUser = async () => {
    if (!uid) return;
    const user = await client.findUserById(uid);
    setUser(user);
    setName(`${user.firstName} ${user.lastName}`);
    setEmail(user.email);
    setRole(user.role);
  };
  useEffect(() => {
    if (uid) fetchUser();
  }, [uid]);
  if (!uid) return null;

  return (
    <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">
      <button onClick={() => navigate(-1)} className="btn position-fixed end-0 top-0 wd-close-details">
        <IoCloseSharp className="fs-1" />
      </button>
      <div className="text-center mt-2">
        <FaUserCircle className="text-secondary me-2 fs-1" />
      </div>
      <hr />
      <div className="text-danger fs-4 wd-name">
        {!editingName && (
          <FaPencil
            onClick={() => { setEditingName(true) }}
            className="float-end fs-5 mt-2 wd-edit"
          />
        )}
        {editingName && (
          <FaCheck
            onClick={() => saveUser()}
            className="float-end fs-5 mt-2 me-2 wd-save"
          />
        )}
        {!editingName && (
          <div className="wd-name" onClick={() => setEditingName(true)}>
            {user.firstName} {user.lastName}
          </div>
        )}
        {user && editingName && (
          <input
            className="form-control w-50 wd-edit-name"
            defaultValue={`${user.firstName} ${user.lastName}`}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                saveUser();
              }
            }}
          />
        )}
      </div>
      <div className="wd-email d-flex align-items-center">
        <b className="me-2">Email:</b>
        <div
          className="wd-email d-flex align-items-center flex-grow-1"
          onClick={() => setEditingEmail(true)}
          style={{ cursor: "pointer" }}
        >
          {!editingEmail && (
            <>
              <span className="flex-grow-1">{user.email}</span>
              <FaPencil
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingEmail(true);
                }}
                className="text-danger ms-2 wd-edit fs-5"
              />
            </>
          )}
          {editingEmail && (
            <>
              <input
                className="form-control flex-grow-1 me-2 wd-edit-email"
                defaultValue={user.email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    saveUser();
                  }
                }}
              />
              <FaCheck
                onClick={saveUser}
                className="text-danger fs-5 wd-save"
              />
            </>
          )}
        </div>
      </div>
      <div className="wd-role d-flex align-items-center">
        <b className="me-2">Roles:</b>
        <div
          className="d-flex align-items-center flex-grow-1"
          onClick={() => setEditingRole(true)}
          style={{ cursor: "pointer" }}
        >
          {!editingRole && (
            <>
              <span className="flex-grow-1">{user.role}</span>
              <FaPencil
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingRole(true);
                }}
                className="text-danger ms-2 wd-edit fs-5"
              />
            </>
          )}
          {editingRole && (
            <>
              <select
                className="form-select flex-grow-1 me-2 wd-edit-role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                {roleOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <FaCheck
                onClick={saveUser}
                className="text-danger fs-5 wd-save"
              />
            </>
          )}
        </div>
      </div>

      <b>Login ID:</b> <span className="wd-login-id">{user.loginId}</span> <br />
      <b>Section:</b> <span className="wd-section">{user.section}</span> <br />
      <b>Total Activity:</b>{" "}
      <span className="wd-total-activity">{user.totalActivity}</span>
      <hr />
      <button
        onClick={() => deleteUser(uid)}
        className="btn btn-danger float-end wd-delete"
      >
        Delete
      </button>
      <button
        onClick={() => navigate(-1)}
        className="btn btn-secondary float-start float-end me-2 wd-cancel"
      >
        Cancel
      </button>
    </div>
  );
}