import { Routes, Route } from 'react-router-dom';
// import Land from "./pages/userside/Land.jsx";
// import Home from './pages/userside/Home.jsx';
//
//
// import AboutLand from './components/userside/About.jsx';
// import ServiceLand from './components/userside/Service.jsx';
//
//
//
// import TestimonialLand from './components/userside/testimonial';
// import CoursesLand from './components/userside/Courses';
// import FAQLand from './components/userside/FAQ';
// import Contact from './components/userside/ContactLand.jsx';
// import AmenitiesLand from './components/userside/Amenities.jsx';
// import UserProfile from './pages/userside/UserProfile.jsx';
import Register from './components/Register.jsx'

function UserRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Land />}>
                {/*<Route index element={<Home />} />*/}

                <Route path="/register" element={<Register />} />
            </Route>
        </Routes>
    )
}

export default UserRoutes;