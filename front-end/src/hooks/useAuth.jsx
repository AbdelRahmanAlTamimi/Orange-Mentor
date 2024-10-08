// useAuth.js
import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from '../utils/axiosConfig';

export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { auth, setAuth } = useContext(AuthContext);

    const login = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post('/login', { email, password });
            setAuth({ token: response.data.token, role: response.data.role });
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        setLoading(true);
        setError(null);
        try {
            await axios.post('/logout');
            setAuth({ token: null, role: null });
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return { auth, login, logout, loading, error };
};