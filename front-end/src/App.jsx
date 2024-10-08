// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserRoutes from './UserRoutes.jsx';
import AdminRoutes from './AdminRoutes';
import ProtectedRoute from './utils/ProtectedRoute.jsx';
import Sidebar from './components/dashboard/Sidebar.jsx';
import Navbar from './components/dashboard/Navbar.jsx';
import Footer from './components/dashboard/Footer.jsx';
import Login from './components/Login';
import Register from './components/Register.jsx';
import { AuthProvider } from './context/AuthContext';
import '@fortawesome/fontawesome-free/css/all.min.css';



function AdminLayout({ children }) {
    return (
        <>
            <Sidebar />
            <div className="main-panel">
                <Navbar />
                <div className="container">
                    <div className="page-inner">
                        {children}
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}

function App() {
    return (
        <AuthProvider>
        <Router>
            <Routes>
                <Route path="/*" element={<UserRoutes />} />
                <Route path="/login" element={<Login />} />


                <Route
                    path="/admin/*"
                    element={
                        <ProtectedRoute allowedRoles={[1,2,3]}>
                            <AdminLayout>
                                <AdminRoutes />
                            </AdminLayout>
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
            </AuthProvider>
    );
}

export default App;