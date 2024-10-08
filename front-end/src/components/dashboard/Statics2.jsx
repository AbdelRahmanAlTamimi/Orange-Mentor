function Statics({heading,content,icon}) {
    return (
        <div className="col-sm-6 col-md-3">
            <div className="card card-stats card-round">
                <div className="card-body">
                    <div className="row align-items-center">
                        <div className="col-icon">
                            <div
                                className="icon-big text-center icon-secondary bubble-shadow-small"
                            >
                                <i className="far fa-check-circle"/>
                            </div>
                        </div>
                        <div className="col col-stats ms-3 ms-sm-0">
                            <div className="numbers">
                                <p className="card-category">teachers</p>
                                <h4 className="card-title">20</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Statics;