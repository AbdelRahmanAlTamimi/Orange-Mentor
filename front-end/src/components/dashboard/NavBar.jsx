import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import  { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext.jsx';
import axios from 'axios';


function NavBar() {
    const { auth ,setAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    // console.log(auth)

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://127.0.0.1:8000/api/logout', {}, {
                headers: {
                    'Authorization': `Bearer ${auth.token}`
                }
            });

            // Clear the auth context
            setAuth(null);

            // Redirect to login page or home page
            navigate('/login');
        } catch (err) {
            console.log('Error details:', err.response ? err.response.data : err.message);
        }
    };

    return (
        <div className="main-header">
            <div className="main-header-logo">
                {/* Logo Header */}
                <div className="logo-header" data-background-color="dark">
                    <a href="index.html" className="logo">
                        <img
                            src="assets/img/kaiadmin/logo_light.svg"
                            alt="navbar brand"
                            className="navbar-brand"
                            height={20}
                        />
                    </a>
                    <div className="nav-toggle">
                        <button className="btn btn-toggle toggle-sidebar">
                            <i className="gg-menu-right" />
                        </button>
                        <button className="btn btn-toggle sidenav-toggler">
                            <i className="gg-menu-left" />
                        </button>
                    </div>
                    <button className="topbar-toggler more">
                        <i className="gg-more-vertical-alt" />
                    </button>
                </div>
                {/* End Logo Header */}
            </div>
            {/* Navbar Header */}
            <nav className="navbar navbar-header navbar-header-transparent navbar-expand-lg border-bottom">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {auth.user.username}
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                    <li>
                                        <Link 
                                            className="dropdown-item" 
                                            to="/admin/adminprof" 
                                            onClick={(e) => {
                                                window.scrollTo(0, 0); // Scroll to the top when navigating
                                            }}
                                        >
                                            your Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <a
                                            className="dropdown-item"
                                            href="#"
                                            onClick={handleLogout}
                                        >
                                            <i className="fas fa-sign-out-alt"></i>
                                            Logout
                                        </a>
                                    </li>

                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            {/* End Navbar */}
        </div>
    );
}

export default NavBar;
