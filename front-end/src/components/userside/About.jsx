import React from 'react'

export default function About() {
    return (
        <>
            {/* About Start */}
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="row g-5">
                        <div
                            className="col-lg-6 wow fadeInUp"
                            data-wow-delay="0.1s"
                            style={{ minHeight: 400 }}
                        >
                            <div className="position-relative h-100">
                                <img
                                    className="img-fluid position-absolute w-100 h-100"
                                    src="https://www.ittihad.edu.jo/wp-content/uploads/2023/12/Untitled-1-31-rgb.jpg"
                                    alt=""
                                    style={{ objectFit: "cover" }}
                                />
                            </div>
                        </div>
                        <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.3s">
                            <h6 className="section-title bg-white text-start pe-3" style={{color:'#06BBCC'}}>
                                About Us
                            </h6>
                            <h1 className="mb-4">Welcome to eLEARNING</h1>
                            <p className="mb-4">
                                Ittihad School is a distinguished educational institution dedicated to fostering academic excellence and
                                personal growth among its students. Committed to providing a holistic learning experience,
                                the school emphasizes a well-rounded curriculum that integrates both academic and extracurricular activities.
                                With a focus on nurturing critical thinking, creativity, and social responsibility, Ittihad School prepares students to
                                become responsible global citizens. The school’s experienced faculty and modern facilities create a supportive environment that
                                encourages exploration and innovation,
                                ensuring that each student achieves their fullest potential.
                            </p>
                            <div className="row gy-2 gx-4 mb-4">
                                <div className="col-sm-6">
                                    <p className="mb-0">
                                        <i className="fa fa-arrow-right text-primary me-2" />
                                        Student Enrollment


                                    </p>
                                </div>
                                <div className="col-sm-6">
                                    <p className="mb-0">
                                        <i className="fa fa-arrow-right text-primary me-2" />
                                        Attendance Tracking


                                    </p>
                                </div>
                                <div className="col-sm-6">
                                    <p className="mb-0">
                                        <i className="fa fa-arrow-right text-primary me-2" />
                                        Grade Management

                                    </p>
                                </div>
                                <div className="col-sm-6">
                                    <p className="mb-0">
                                        <i className="fa fa-arrow-right text-primary me-2" />
                                        Parent Communication
                                    </p>
                                </div>
                                <div className="col-sm-6">
                                    <p className="mb-0">
                                        <i className="fa fa-arrow-right text-primary me-2" />
                                        Timetable Management

                                    </p>
                                </div>
                                <div className="col-sm-6">
                                    <p className="mb-0">
                                        <i className="fa fa-arrow-right text-primary me-2" />
                                        Fee Management

                                    </p>
                                </div>
                                <div className="col-sm-6">
                                    <p className="mb-0">
                                        <i className="fa fa-arrow-right text-primary me-2" />
                                        Event Management



                                    </p>
                                </div>
                                <div className="col-sm-6">
                                    <p className="mb-0">
                                        <i className="fa fa-arrow-right text-primary me-2" />
                                        Resource Sharing

                                    </p>
                                </div>
                            </div>
                            <a className="btn btn-primary py-3 px-5 mt-2" href="" style={{backgroundColor:'#06BBCC'}}>
                                Read More
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            {/* About End */}
        </>

    )
}