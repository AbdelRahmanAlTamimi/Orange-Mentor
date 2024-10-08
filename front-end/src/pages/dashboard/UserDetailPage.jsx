import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Make sure to install axios: npm install axios

function UserDetailPage() {
    const { roleId,id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const baseApiUrl = "http://127.0.0.1:8000/api/";

    const getUserRoleTitle = (role) => {
        switch(parseInt(role)) {
            case 3:
                return 'managers';
            case 2:
                return 'supervisors';
            case 1:
                return 'teachers';
            default:
                return 'students';
        }
    };


    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                setLoading(true);
                const roleTitle = getUserRoleTitle(roleId);
                const ApiUrl = `${baseApiUrl}${roleTitle}/${id}`;
                const response = await axios.get(ApiUrl); // Replace with your actual API endpoint
                console.log(ApiUrl);
                setUser(response.data.results);
                // console.log(user.id)
                setLoading(false);
                // console.log(response)
            }
            catch (err) {
                setError('Failed to fetch user details');
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, [roleId,id]);

    // console.log(user.id)

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!user) return <div>No user data available</div>;




    return (
        <div className="container mt-5">
            <h1>{getUserRoleTitle(roleId)} Details</h1>
            {console.log(user)}
            <div className="card">
                <div className="card-body">
                    {roleId === "0" ?
                        <>
                            <img src={`http://127.0.0.1:8000/${user.image}`} alt="user image" width="150" height="150"/>
                            <img src={`http://127.0.0.1:8000/${user.national_img}`} alt="ID image" width="150" height="150"/>
                        </> :
                        <img src={`http://127.0.0.1:8000/${user.image}`} alt="user image" width="150" height="150"/>
                    }

                    <h5 className="card-title">{user.Full_name}</h5>
                    <p className="card-text"><strong>ID:</strong> {user.id}</p>
                    <p className="card-text"><strong>Email:</strong> {user.email}</p>
                    <p className="card-text"><strong>Username:</strong> {user.username}</p>
                    <p className="card-text"><strong>Address:</strong> {user.address}</p>
                    <p className="card-text"><strong>Date of birth:</strong> {user.DOB}</p>
                    <p className="card-text"><strong>Gender:</strong> {user.gender}</p>
                    {roleId === '0' ?
                        <>
                        <p className="card-text"><strong>Parent Phone:</strong> {user.phone}</p>
                        <p className="card-text"><strong>Parent Name:</strong> {user.parent_name}</p>
                        <p className="card-text"><strong>Class Id:</strong> {user.school_class_id}</p>
                        </>:
                        <p className="card-text"><strong>Phone:</strong> {user.phone}</p>
                    }
                    {/* Add more user details as needed */}
                </div>
            </div>
            <button className="btn btn-primary mt-3" onClick={() => navigate(-1)}>
                Back to {getUserRoleTitle()} List
            </button>
        </div>
    );
}

export default UserDetailPage;