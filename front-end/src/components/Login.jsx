import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from "../context/AuthContext.jsx";
import { useNavigate } from 'react-router-dom';
// import './Login.module.css'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // Added missing state for name
  const [isSignup, setIsSignup] = useState(false);
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', { email, password });
      setAuth({
        user: response.data.user,
        token: response.data.token,
        role_id: response.data.role_id
      });
      if (response.data.role_id > 0) {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      console.log('Error details:', err.response ? err.response.data : err.message);
    }
  };

  return (
    <>
      <div className={`cont ${isSignup ? 's--signup' : ''}`}>
        <div className="form sign-in">
          <h2>Welcome</h2>
          <label>
            <span>Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            <span>Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <p className="forgot-pass">Forgot password?</p>
          <button type="button" className="submit" onClick={handleSubmit}>
            {isSignup ? 'Sign Up' : 'Sign In'}
          </button>
        </div>
        <div className="sub-cont">
          <div className="img">
            <div className="img__text m--up">
              <h3>Don't have an account? Please Sign up!</h3>
            </div>
            <div className="img__text m--in">
              <h3>If you already have an account, just login.</h3>
            </div>
            <div className="img__btn" onClick={() => setIsSignup(!isSignup)}>
              <span className="m--up">Sign Up</span>
              <span className="m--in">LogIn</span>
            </div>
          </div>
          <div className="form sign-up">
            <h2>Create your Account</h2>
            <label>
              <span>Name:</span>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name" 
                required
              />
            </label>
            <label>
              <span>Email:</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label>
              <span>Password:</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <label>
              <span>Password Confirmation:</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            
            <button type="button" className="submit" onClick={handleSubmit}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;