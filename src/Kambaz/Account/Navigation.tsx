import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { pathname } = useLocation();
  const active = (path: string) => (pathname.includes(path) ? "active" : "");

  return (
    <div id="wd-account-navigation" className="wd list-group rounded-0">
      {!currentUser && (
        <>
          <Link to={`/Kambaz/Account/Signin`}
            className="list-group-item list-group-item-action text-danger border border-0">
            Sign in
          </Link>
          <Link to={`/Kambaz/Account/Signup`}
            className="list-group-item list-group-item-action text-danger border border-0">
            Sign up
          </Link>
        </>
      )}

      {currentUser && (
        <Link to={`/Kambaz/Account/Profile`}
          className="list-group-item list-group-item-action text-danger border border-0">
          Profile
        </Link>
      )}

      {currentUser && currentUser.role === "ADMIN" && (
        <Link to={`/Kambaz/Account/Users`} className={`list-group-item ${active("Users")}`}> Users </Link>)}

    </div>
  );
}