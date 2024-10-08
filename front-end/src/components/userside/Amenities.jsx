import React from 'react';

const Amenities = () => {
  return (
    <>
      {/* Amenities Start */}
      <div className="container-xxl py-5">
        <div className="container">
        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
        <h6 className="section-title bg-white text-center  px-3" style={{ color: '#06BBCC' }}>
            OUR Amenities
          </h6>
          </div>

          <p className="text-center mb-5" style={{ fontSize: '1.5rem' }}>
            At Alithad School, we provide a range of top-notch facilities to support student learning and development.
          </p>
          <div className="row g-4">
            {/* Facility 1 */}
            <div className="col-lg-4 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
              <div className="service-item text-center pt-3">
                <div className="p-4">
                  <img 
                    src="https://www.jks.edu.sa/wp-content/uploads/2023/10/Comp_Lab2_1-scaled.jpg" 
                    className="img-fluid mb-3" 
                    alt="Computer Lab" 
                  />
                  <h5 className="mb-3 section-title text-primary pe-3">Computer Lab</h5>
                  <p>
                    A modern computer lab equipped with the latest technology and software to enhance digital literacy and innovation.
                  </p>
                </div>
              </div>
            </div>

            {/* Facility 2 */}
            <div className="col-lg-4 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
              <div className="service-item text-center pt-3">
                <div className="p-4">
                  <img 
                    src="https://www.ittihad.edu.jo/wp-content/uploads/2023/02/5B-scaled.jpg" 
                    className="img-fluid mb-3" 
                    alt="Sports Complex" 
                  />
                  <h5 className="mb-3 section-title text-primary pe-3">Sports Complex</h5>
                  <p>
                    Our state-of-the-art sports complex includes fields and courts for various sports, encouraging physical activity and teamwork.
                  </p>
                </div>
              </div>
            </div>

            {/* Facility 3 */}
            <div className="col-lg-4 col-sm-6 wow fadeInUp" data-wow-delay="0.5s">
              <div className="service-item text-center pt-3">
                <div className="p-4">
                  <img 
                    src="https://www.jks.edu.sa/wp-content/uploads/2023/10/Lab_3-scaled.jpg" 
                    className="img-fluid mb-3" 
                    alt="Science Lab" 
                  />
                  <h5 className="mb-3 section-title text-primary pe-3">Advanced Science Labs</h5>
                  <p>
                    Our fully equipped science labs provide hands-on learning experiences in physics, chemistry, and biology.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Amenities End */}
    </>
  );
};

export default Amenities;
