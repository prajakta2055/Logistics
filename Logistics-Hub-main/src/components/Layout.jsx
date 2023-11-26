import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">LoginSignUp</Link>
          </li>
          <li>
            <Link to="/Homepage">Homepage</Link>
          </li>
          <li>
            <Link to="/SignUp">Homepage</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;