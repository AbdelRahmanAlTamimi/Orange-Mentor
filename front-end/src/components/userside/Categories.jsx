import React from 'react'

export default function Categories() {
    return (
        <>
            {/* Categories Start */}
            <div className="container-xxl py-5 category">
                <div className="container">
                    <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                        <h6 className="section-title bg-white text-center  px-3" style={{color:'#06BBCC'}}>
                            Events
                        </h6>
                        <h1 className="mb-5">Our Events</h1>
                    </div>
                    <div className="row g-3">
                        <div className="col-lg-7 col-md-6">
                            <div className="row g-3">
                                <div
                                    className="col-lg-12 col-md-12 wow zoomIn"
                                    data-wow-delay="0.1s"
                                >
                                    <a className="position-relative d-block overflow-hidden" href="">
                                        <img className="img-fluid" src="https://www.austswimsea.com/wp-content/uploads/2023/06/cover1.jpg" alt="" />
                                        <div
                                            className="bg-white text-center position-absolute bottom-0 end-0 py-2 px-3"
                                            style={{ margin: 1 }}
                                        >
                                            <h5 className="m-0">swimming training </h5>

                                        </div>
                                    </a>
                                </div>
                                <div
                                    className="col-lg-6 col-md-12 wow zoomIn"
                                    data-wow-delay="0.3s"
                                >
                                    <a className="position-relative d-block overflow-hidden" href="">
                                        <img className="img-fluid" src="https://www.ittihad.edu.jo/wp-content/uploads/2023/12/DSC05585.jpg" alt="" />
                                        <div
                                            className="bg-white text-center position-absolute bottom-0 end-0 py-2 px-3"
                                            style={{ margin: 1 }}
                                        >
                                            <h5 className="m-0">Football Day</h5>

                                        </div>
                                    </a>
                                </div>
                                <div
                                    className="col-lg-6 col-md-12 wow zoomIn"
                                    data-wow-delay="0.5s"
                                >
                                    <a className="position-relative d-block overflow-hidden" href="">
                                        <img className="img-fluid" src="https://www.shutterstock.com/image-vector/jordan-independence-day-greeting-card-260nw-2295949511.jpg" alt="" />
                                        <div
                                            className="bg-white text-center position-absolute bottom-0 end-0 py-2 px-3"
                                            style={{ margin: 1 }}
                                        >
                                            <h5 className="m-0">Graduation party </h5>

                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div
                            className="col-lg-5 col-md-6 wow zoomIn"
                            data-wow-delay="0.7s"
                            style={{ minHeight: 350 }}
                        >
                            <a
                                className="position-relative d-block h-100 overflow-hidden"
                                href=""
                            >
                                <img
                                    className="img-fluid position-absolute w-100 h-100"
                                    src="https://www.ittihad.edu.jo/wp-content/uploads/2023/12/DSC04778-scaled.jpg"
                                    alt=""
                                    style={{ objectFit: "cover" }}
                                />
                                <div
                                    className="bg-white text-center position-absolute bottom-0 end-0 py-2 px-3"
                                    style={{ margin: 1 }}
                                >
                                    <h5 className="m-0">Scout Team</h5>

                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            {/* Categories Start */}
        </>

    )
}