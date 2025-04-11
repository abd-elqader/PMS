import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import navLogo from '../../../assets/images/navLogo.png'
import navLogoLight from '../../../assets/images/PMSlogo.png'
import profileImage from '../../../assets/images/registerAvatar.png'
import { Authcontext } from '../../AuthContext/AuthContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import useDarkModeToggle from '../../hooks/useDarkModeToggle';

export default function NavBar() {
  const { darkMode, setDarkMode } = useDarkModeToggle()
  const authContext = useContext(Authcontext);
  const loginData = authContext?.loginData;
  const navigate = useNavigate()
  const Logout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }


  return (
    <Navbar expand="sm" className=" nav ">

      <Navbar.Brand className='py-0' >
        <img className='imgLogoNav' src={darkMode?navLogoLight:navLogo} alt="" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto align-items-center  pe-4">
          <Nav.Link className='py-0 border-end'>
            <Button
              variant={darkMode ? 'light' : 'outline-secondary'}
              onClick={() => setDarkMode(!darkMode)}
              className="rounded-circle p-2"
            >
              {darkMode ? (
                // Light mode icon
                <svg fill="currentColor" viewBox="0 0 20 20" width="24" height="24">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              ) : (
                // Dark mode icon (sun)
                <svg className='dark-text' fill="currentColor" viewBox="0 0 20 20" width="24" height="24">
                  <path
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </Button>
          </Nav.Link>
          <Nav.Link className='d-flex align-items-center py-0'>

            <img src={profileImage} alt="Profile" className="profileImage" />
            <div className="my-0 py-0">
              <a className="nav-link fs-12 my-0 py-0 text-dark-main" aria-current="page" >{loginData?.userName}</a>
              <a className="nav-link fs-12 my-0 py-0 text-dark-main" aria-current="page" >{loginData?.userEmail}</a>
            </div>
          </Nav.Link>
          <NavDropdown
            title={
              <span>
                 <i className="fa-solid fa-caret-down"></i>
              </span>
            }
            id="basic-nav-dropdown"
          >
            <NavDropdown.Item onClick={Logout}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}