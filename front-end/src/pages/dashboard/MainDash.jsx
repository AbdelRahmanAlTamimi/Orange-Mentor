import Statics from '../.././components/dashboard/Statics';
import Statics2 from '../.././components/dashboard/Statics2';
import Statics3 from '../.././components/dashboard/Statics3';
import Statics4 from '../.././components/dashboard/Statics4';
import UserStatistics from '../.././components/dashboard/UserStatistics';
function MainDash() {

    return (
        <>
        <div className="row">
            <Statics/>
            <Statics2/>
            <Statics3/>
            <Statics4/>
        </div>

    <UserStatistics/>
        </>
)
    ;
}

export default MainDash;