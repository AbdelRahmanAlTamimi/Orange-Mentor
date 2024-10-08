import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
// import './custom.css';

export default function Testimonial() {
    return (
        <>
            <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
                <div className="container">
                    <div className="text-center">
                        <h6 className="section-title bg-white text-center px-3" style={{color:'#06BBCC'}}>
                            Testimonial
                        </h6>
                        <h1 className="mb-5">Our Students Say!</h1>
                    </div>
                    <OwlCarousel
                        className="owl-theme testimonial-carousel"
                        loop
                        margin={10}
                        // nav
                        items={2}
                        autoplay
                        autoplayTimeout={3000}
                        autoplayHoverPause
                    >
                        <div className="testimonial-item text-center">
                            <img
                                className="border rounded-circle p-2 mx-auto mb-3"
                                src="https://img.freepik.com/premium-vector/girl-s-face-with-beautiful-smile-female-avatar-website-social-network_499739-527.jpg"
                                style={{ width: 80, height: 80 }}
                                alt="Testimonial 1"
                            />
                            <h5 className="mb-0">Fatima Al-Sayed</h5>
                            <p>Profession</p>
                            <div className="testimonial-text bg-light text-center p-4">
                                <p className="mb-0">
                                    Alithad School has transformed how we manage student records. The system is user-friendly and efficient!
                                </p>
                            </div>
                        </div>
                        <div className="testimonial-item text-center">
                            <img
                                className="border rounded-circle p-2 mx-auto mb-3"
                                src="https://st4.depositphotos.com/8230070/38126/v/450/depositphotos_381265120-stock-illustration-face-expression-handsome-young-man.jpg"
                                style={{ width: 80, height: 80 }}
                                alt="Testimonial 2"
                            />
                            <h5 className="mb-0">Ahmed Jabari</h5>
                            <p>Profession</p>
                            <div className="testimonial-text bg-light text-center p-4">
                                <p className="mb-0">
                                    The school management system is a game changer! It has streamlined our communication and improved organization.

                                </p>
                            </div>
                        </div>
                        <div className="testimonial-item text-center">
                            <img
                                className="border rounded-circle p-2 mx-auto mb-3"
                                src="https://thumbs.dreamstime.com/b/portrait-beautiful-young-woman-avatar-girl-short-hair-portrait-beautiful-young-woman-avatar-girl-254959102.jpg"
                                style={{ width: 80, height: 80 }}
                                alt="Testimonial 3"
                            />
                            <h5 className="mb-0">Layla Mansour
                            </h5>
                            <p>Profession</p>
                            <div className="testimonial-text bg-light text-center p-4">
                                <p className="mb-0">
                                    Thanks to Alithad School's management system, tracking assignments and grades has never been easier!
                                </p>
                            </div>
                        </div>
                        <div className="testimonial-item text-center">
                            <img
                                className="border rounded-circle p-2 mx-auto mb-3"
                                src="https://thumbs.dreamstime.com/b/face-expression-man-smiling-male-emotions-handsome-cartoon-character-vector-illustration-isolated-white-background-95568316.jpg"
                                style={{ width: 80, height: 80 }}
                                alt="Testimonial 4"
                            />
                            <h5 className="mb-0">Omar Khaled
                            </h5>
                            <p>Profession</p>
                            <div className="testimonial-text bg-light text-center p-4">
                                <p className="mb-0">
                                    An excellent tool for teachers and parents alike. The system is intuitive and saves us so much time!
                                </p>
                            </div>
                        </div>
                        <div className="testimonial-item text-center">
                            <img
                                className="border rounded-circle p-2 mx-auto mb-3"
                                src="https://i.pinimg.com/736x/d3/7c/ab/d37cabfd065c9f05dcafb69e91dfc48f.jpg"
                                style={{ width: 80, height: 80 }}
                                alt="Testimonial 4"
                            />
                            <h5 className="mb-0">Sara Nasser

                            </h5>
                            <p>Profession</p>
                            <div className="testimonial-text bg-light text-center p-4">
                                <p className="mb-0">
                                    I love how easy it is to stay updated with my child's progress. Alithad School makes everything accessible!
                                </p>
                            </div>
                        </div>
                    </OwlCarousel>
                </div>
            </div>
        </>
    );
}