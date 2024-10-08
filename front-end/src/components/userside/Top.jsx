import React from 'react';

export default function Top() {
    return (
        <>
            {/* Back to Top */}
            <a href="#" className="btn btn-lg btn-lg-square back-to-top d-flex justify-content-center align-items-center" style={{ backgroundColor: '#06BBCC' , color:'#ffff' }}>
                <i className="bi bi-arrow-up" />
            </a>
        </>
    );
}
