import { useContext, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { HiOutlineUserCircle } from "react-icons/hi";
import Tools from "./Tools";
import { AuthContext } from "../../provider/AuthProvider";

const Navbar = () => {
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOutUser } = useContext(AuthContext);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = () => {
    signOutUser()
      .then(() => { })
      .catch(error => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  const renderAuthButtons = () => {
    if (user) {
      return (
        <div className="flex items-center space-x-2 md:space-x-4">
          <Tools text={user.displayName}>
            {user.photoURL ? (
              <img className="rounded-full h-6 w-6" src={user.photoURL} alt="" />
            ) : (
              <HiOutlineUserCircle className="h-8 w-8" />
            )}
          </Tools>
          <button
            onClick={handleSignOut}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
          >
            Log Out
          </button>
        </div>
      );
    } else {
      return (
        <Link to="/login">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md">
            Login
          </button>
        </Link>
      );
    }
  };

  return (
    <nav className="container mx-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 pt-5">
          <div className="flex items-center">
            <img
              src="https://i.ibb.co/1Jj7wZY/png-transparent-act-sat-reading-computer-icons-reading-child-text-reading-removebg-preview.png"
              alt="Logo"
              className="w-18 h-12"
            />
            <Link to="/" className="text-blue-900 text-4xl font-bold">
              Camp <br /> Knowledge
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex font-bold items-baseline space-x-4 text-lg">
              <NavLink to="/" className="text-gray-500">
                Home
              </NavLink>
              <NavLink to="/instructors" className="text-gray-500">
                Instructors
              </NavLink>
              <NavLink to="/classes" className="text-gray-500">
                Classes
              </NavLink>
              {user && <NavLink to={'/dashboard'} className="text-gray-500">Dashboard</NavLink>}
              {renderAuthButtons()}
            </div>
          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {renderAuthButtons()}
            <NavLink
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-black hover:text-white hover:bg-gray-700"
            >
              Home
            </NavLink>
            <NavLink
              to="/instructors"
              className="block px-3 py-2 rounded-md text-base font-medium text-black hover:text-white hover:bg-gray-700"
            >
              Instructors
            </NavLink>
            <NavLink
              to="/classes"
              className="block px-3 py-2 rounded-md text-base font-medium text-black hover:text-white hover:bg-gray-700"
            >
              Classes
            </NavLink>
            {user && <NavLink to={'/dashboard'} className="block px-3 py-2 rounded-md text-base font-medium text-black hover:text-white hover:bg-gray-700">Dashboard</NavLink>}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
