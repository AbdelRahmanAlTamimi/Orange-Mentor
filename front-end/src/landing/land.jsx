import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '../assets/css/style.css';
import '../assets/css/bootstrap.min.css';

// Import your components
import NavLand from './components/nav';
import HeroLand from './components/hero';
import AboutLand from './components/about';
import ServiceLand from './components/service';
import TestimonialLand from './components/testimonial';
import CategoriesLand from './components/categories';
import CoursesLand from './components/Courses';
import FAQLand from './components/FAQ';
import FooterLand from './components/footer';
import TopLand from './components/top';
import Home from './components/Home';  
import AmenitiesLand from './components/Amenities';  

export default function App() {
  return (
    <Router>
      <NavLand />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutLand />} />
        <Route path="/services" element={<ServiceLand />} />
        <Route path="/amenities" element={<AmenitiesLand />} />
        <Route path="/courses" element={<CoursesLand />} />
        <Route path="/testimonials" element={<TestimonialLand />} />
        <Route path="/faq" element={<FAQLand />} />
      </Routes>
      <TopLand />
      <FooterLand />
    </Router>
  );
}
