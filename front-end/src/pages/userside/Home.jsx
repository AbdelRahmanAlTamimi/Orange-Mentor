import HeroLand from '../../components/userside/Hero.jsx';
import AboutLand from '../../components/userside/About.jsx';
import ServiceLand from '../../components/userside/Service.jsx';
import TestimonialLand from '../../components/userside/testimonial';
import CategoriesLand from '../../components/userside/categories';
import CoursesLand from '../../components/userside/Courses';
import FAQLand from '../../components/userside/FAQ';





const Home = () => {
    return (
        <div>

            <HeroLand/>
            <AboutLand/>
            <ServiceLand/>
            <CategoriesLand/>
            <CoursesLand/>
            <TestimonialLand/>
            <FAQLand/>

        </div>
    );
};

export default Home;