
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import fImage from '../../assets/img/WhatsApp Image 2024-10-05 at 19.19.15.jpeg';
import sImage from '../../assets/img/WhatsApp Image 2024-10-05 at 19.19.15 (1).jpeg';

export default function Hero() {


    return (
        <>
            <div className="container-fluid p-0 mb-5">
                <OwlCarousel className="owl-theme" loop margin={10}  items={1} autoplay autoplayTimeout={3000} autoplayHoverPause>
                    <div className="item">
                        <img
                            className="img-fluid"
                            src={fImage}
                            alt="carousel-1"
                        />
                        <div
                            className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center"
                            style={{ background: "rgba(24, 29, 56, .7)" }}
                        >
                            <div className="container">
                                <div className="row justify-content-start">
                                    <div className="col-sm-10 col-lg-8">

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <img
                            className="img-fluid"
                            src={sImage}
                            alt="carousel-2"
                        />
                        <div
                            className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center"
                            style={{ background: "rgba(24, 29, 56, .7)" }}
                        >
                            <div className="container">
                                <div className="row justify-content-start">
                                    <div className="col-sm-10 col-lg-8">

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </OwlCarousel>
            </div>
        </>
    );
}