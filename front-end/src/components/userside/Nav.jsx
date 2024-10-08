import React, {useContext, useState} from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext.jsx';
import axios from 'axios';

export default function NavLand() {
    const [showServices, setShowServices] = useState(true);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const { auth ,setAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    console.log(auth)
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
            navigate('/');
        } catch (err) {
            console.log('Error details:', err.response ? err.response.data : err.message);
        }
    };
    // Handle the click to toggle the dropdown
    const handleServicesClick = () => {
        setShowServices(prevState => !prevState);
    };

    const handleUserMenuClick = () => {
        setShowUserMenu(prevState => !prevState);
    };


    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0">
                <Link to="/" className="navbar-brand d-flex align-items-center px-4 px-lg-5">
                    <img
                        src="https://www.ittihad.edu.jo/wp-content/uploads/2022/09/ittihad-logo.png"
                        alt="Logo"
                        style={{ width: '150px', height: 'auto', marginBottom: '0.1rem' }}
                    />
                </Link>
                <button
                    type="button"
                    className="navbar-toggler me-4"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarCollapse"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse" >
                    <div className="navbar-nav ms-auto p-4 p-lg-0" >
                        <Link to="/" className="nav-item nav-link" >
                            Home
                        </Link>
                        <Link to="/about" className="nav-item nav-link">
                            About
                        </Link>
                        <Link to="/courses" className="nav-item nav-link">
                            Courses
                        </Link>
                         {/* Services Dropdown */}
                        <div className={ `d-flex align-items-center nav-item dropdown ${showServices ? "show" : ""}`}>
                            <Link
                                className=" nav-item nav-link  dropdown-toggle"
                                onClick={handleServicesClick} // Toggle dropdown on click
                                role="button"
                                aria-expanded={showServices ? "true" : "false"}
                                aria-haspopup="true"
                                style={{  color:'gray' , fontSize:'1.1rem' }}
                                
                            >
                                Services
                            </Link>

                            <div className={`dropdown-menu ${showServices ? "show" : ""}`}>
                                <Link to="/services" className="dropdown-item">
                                    View Accreditation
                                </Link>
                                <Link to="/amenities" className="dropdown-item">
                                    View Amenities
                                </Link>
                            </div>
                        </div>
                        <Link to="/contact" className="nav-item nav-link">
                            Contact
                        </Link>
                    </div>


                    {auth ? (
                        // User is logged in
                        <div className={`nav-item dropdown ${showUserMenu ? "show" : ""}`}>
                            <a
                                className="btn py-4 px-lg-5 d-none d-lg-block"
                                onClick={handleUserMenuClick}
                                role="button"
                                aria-expanded={showUserMenu ? "true" : "false"}
                                style={{ backgroundColor: '#06BBCC', color: 'white', fontSize: '1.1rem' }}
                            >
                                {auth.user.username} <i className="fa fa-caret-down ms-2" />
                            </a>
                            <div className={`dropdown-menu ${showUserMenu ? "show" : ""}`}>
                                <Link to="/userprofile" className="dropdown-item">My Account</Link>
                                <a onClick={handleLogout} className="dropdown-item" href="#">Logout</a>
                            </div>
                        </div>
                    ) : (
                        // User is not logged in
                        <div className="d-none d-lg-flex">
                            <Link to="/login" className="btn py-4 px-lg-5" style={{ backgroundColor: '#06BBCC', color: 'white', fontSize: '1.1rem', marginRight: '10px' }}>
                                Login <i className="fa fa-arrow-right ms-3" />
                            </Link>
                            <Link to="/register" className="btn py-4 px-lg-5" style={{ backgroundColor: '#0dcaf0', color: 'white', fontSize: '1.1rem' }}>
                                Register <i className="fa fa-user-plus ms-3" />
                            </Link>
                        </div>
                    )}

                </div>
            </nav>
        </div>
    );
}
