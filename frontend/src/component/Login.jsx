// Login.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import logo from '../assets/logo.png'; // Adjust the path to your logo
import bgImage from '../assets/bg.jpeg'; // Adjust the path to your background image

const Login = () => {
  const { login, error } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    console.log('Attempting login with:', { email, password, role });
    await login(email, password, role);

    switch (role) {
      case 'admin':
        navigate('/admin-dashboard');
        break;
      case 'student':
        navigate('/student-dashboard');
        break;
      case 'faculty':
        navigate('/faculty-dashboard');
        break;
      default:
        break;
    }
  };

  const styles = {
    body: {
      margin: 0,
      padding: 0,
      fontFamily: 'Arial, sans-serif',
      backgroundImage: `url(${bgImage})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
    },
    loginContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      paddingTop: '50px',
    },
    loginBox: {
      backgroundColor: 'rgba(240, 233, 233, 0.95)',
      padding: '40px',
      borderRadius: '10px',
      boxShadow: '0 0 15px rgba(0, 0, 0, 0.2)',
      width: '350px',
      textAlign: 'center',
      marginTop: '-20px',
      paddingTop: '20px',
      position: 'relative',
    },
    heading: {
      fontSize: '28px',
      color: '#2f8db3',
      marginTop: 0,
      marginBottom: '150px',
      textTransform: 'uppercase',
      letterSpacing: '2px',
      fontWeight: 'bold',
      position: 'absolute',
      top: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
    },
    logo: {
      width: '200px',
      marginTop: '40px',
      marginBottom: '20px',
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
      position: 'relative',
    },
    inputGroup: {
      marginBottom: '15px',
      position: 'relative',
    },
    input: {
      width: '100%',
      padding: '10px',
      border: 'none',
      borderRadius: '4px',
      backgroundColor: '#f7f7f7',
      boxShadow: 'inset 0 0 5px rgba(0, 0, 0, 0.1)',
    },
    inputFocus: {
      outline: 'none',
      boxShadow: '0 0 5px #2f8db3',
    },
    button: {
      width: '100%',
      padding: '10px',
      backgroundColor: '#0e8fc2',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '16px',
      textTransform: 'uppercase',
    },
    buttonHover: {
      backgroundColor: '#25769b',
    },
    errorMessage: {
      color: 'red',
      marginBottom: '20px',
    },
  };

  return (
    <div style={styles.body}>
      <div style={styles.loginContainer}>
        <div style={styles.loginBox}>
          <img src={logo} alt="Logo" style={styles.logo} />
          <h2 style={styles.heading}>-LOGIN-</h2>
          {error && <p style={styles.errorMessage}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <div style={styles.inputGroup}>
              <input
                type="email"
                placeholder="Roll/Enrollment No/Faculty Code"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <select
                value={role}
                onChange={e => setRole(e.target.value)}
                required
                style={styles.input}
              >
                <option value="student">Student</option>
                <option value="faculty">Faculty</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button type="submit" style={styles.button}>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
