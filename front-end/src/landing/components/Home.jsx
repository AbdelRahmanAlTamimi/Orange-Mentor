import React from 'react';

import HeroLand from './hero';
import AboutLand from './about';
import ServiceLand from './service';
import TestimonialLand from './testimonial';
import CategoriesLand from './categories';
import CoursesLand from './Courses';
import FAQLand from './FAQ';

import TopLand from './top';



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
