import { Outlet } from 'react-router-dom';
import '../../assets/css/style.css';
import '../../assets/css/bootstrap.min.css';
import NavLand from '../../components/userside/Nav.jsx';
import FooterLand from '../../components/userside/footer';
import TopLand from '../../components/userside/Top.jsx';

export default function Land() {
    return (
        <>
            <NavLand />
            <Outlet /> {/* This will render nested routes */}
            <TopLand />
            <FooterLand />
        </>
    );
}